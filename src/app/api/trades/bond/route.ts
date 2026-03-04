import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { desk, counterparty, buySell, tradeDate, quantity, price, bondType, ticker, couponRate, maturityDate, currency } = body;

    // 1. Look up or create Trading Desk
    let deskEntity = await prisma.party.findFirst({ where: { party_name: desk, party_type: "Internal" } });
    if (!deskEntity) {
      deskEntity = await prisma.party.create({ data: { party_name: desk || "Default Desk", party_type: "Internal" } });
    }

    // 2. Look up or create Counterparty
    let cpEntity = await prisma.party.findFirst({ where: { party_name: counterparty, party_type: "Counterparty" } });
    if (!cpEntity) {
      cpEntity = await prisma.party.create({ data: { party_name: counterparty || "Unknown Counterparty", party_type: "Counterparty" } });
    }

    // 3. Look up or create Portfolio for the desk
    let portfolioEntity = await prisma.portfolio.findFirst({ where: { desk_id: deskEntity.party_id } });
    if (!portfolioEntity) {
      portfolioEntity = await prisma.portfolio.create({
        data: { portfolio_name: `${desk} Book`, currency: currency || "USD", desk_id: deskEntity.party_id }
      });
    }

    // 4. Look up or create the Bond Instrument
    let instrumentEntity = await prisma.instrument.findFirst({ where: { ticker_symbol: ticker } });
    if (!instrumentEntity) {
      instrumentEntity = await prisma.instrument.create({
        data: {
          asset_class: "FixedIncome",
          instrument_type: "Bond",
          ticker_symbol: ticker,
          currency: currency || "USD",
          maturity_date: maturityDate ? new Date(maturityDate) : null,
          bond_details: {
            create: {
              bond_type: bondType,
              coupon_rate: couponRate ? parseFloat(couponRate) : null
            }
          }
        }
      });
    }

    // 5. Create the recorded Trade instance
    const trade = await prisma.trade.create({
      data: {
        trade_date: new Date(tradeDate),
        buy_sell: buySell,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        trade_currency: currency || "USD",
        status: "Booked",
        counterparty_id: cpEntity.party_id,
        portfolio_id: portfolioEntity.portfolio_id,
        instrument_id: instrumentEntity.instrument_id,
        desk_id: deskEntity.party_id
      }
    });

    return NextResponse.json({ success: true, trade }, { status: 201 });
  } catch (error: any) {
    console.error("Trade booking error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const trades = await prisma.trade.findMany({
      where: { instrument: { instrument_type: "Bond" } },
      include: { instrument: true, counterparty: true, portfolio: true },
      orderBy: { created_at: "desc" },
      take: 20
    });
    return NextResponse.json({ success: true, trades });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
