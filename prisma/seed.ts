const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

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

  // 4. Create an Instrument (Base + Bond extension)
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
          day_count_convention: "ACT/ACT",
          issuer_id: internalParty.party_id // Treating US Treasury as an internal/system entity for seed simplicity
        }
      }
    }
  });

  console.log(`Seed successful!`);
  console.log(`Internal Desk ID: ${internalParty.party_id}`);
  console.log(`Counterparty ID: ${cpParty.party_id}`);
  console.log(`Portfolio ID: ${portfolio.portfolio_id}`);
  console.log(`Instrument ID: ${bondInst.instrument_id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
