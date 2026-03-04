const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Starting full multi-asset seed...");

  // 1. Create Internal Party (Trading Desk)
  const internalParty = await prisma.party.create({
    data: {
      party_name: "US Rates Desk",
      party_type: "Internal",
      country: "US"
    }
  });

  // 2. Create Counterparty
  const cpParty = await prisma.party.create({
    data: {
      party_name: "JPMorgan Chase",
      party_type: "Counterparty",
      country: "US"
    }
  });

  // 3. Create a Portfolio for the internal desk
  const portfolio = await prisma.portfolio.create({
    data: {
      portfolio_name: "US Treasury Trading Book",
      currency: "USD",
      desk_id: internalParty.party_id
    }
  });

  // 4. Create a Bond Instrument
  const bondInst = await prisma.instrument.create({
    data: {
      asset_class: "FixedIncome",
      instrument_type: "Bond",
      ticker_symbol: "US912828XX99",
      isin: "US912828XX99",
      currency: "USD",
      issue_date: new Date("2020-01-01"),
      maturity_date: new Date("2035-12-31"),
      bond_details: {
        create: {
          bond_type: "Treasury",
          coupon_rate: 3.50,
          coupon_frequency: "SEMI_ANNUAL",
          day_count_convention: "ACT/ACT"
        }
      }
    }
  });

  // 5. Create an IR Swap Instrument
  const swapInst = await prisma.instrument.create({
    data: {
      asset_class: "Rates",
      instrument_type: "IRSwap",
      ticker_symbol: "USD-SOFR-5Y",
      currency: "USD",
      maturity_date: new Date("2031-01-01")
    }
  });

  console.log(`Seed successful!`);
  console.log(`Internal Desk ID: ${internalParty.party_id}`);
  console.log(`Counterparty ID: ${cpParty.party_id}`);
  console.log(`Portfolio ID: ${portfolio.portfolio_id}`);
  console.log(`Bond ID: ${bondInst.instrument_id}`);
  console.log(`Swap ID: ${swapInst.instrument_id}`);
  
  console.log("\nUpdate your `/src/app/api/trades/bond/route.ts` hardcoded UUIDs with these if testing the UI -> DB flow directly!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
