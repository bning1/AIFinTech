import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real app, validate payload rigorously.
    // Assuming body aligns with BondEntryForm fields:
    const { deskId, counterpartyId, instrumentId, portfolioId, buySell, tradeDate, quantity, price, currency } = body;

    const trade = await prisma.trade.create({
      data: {
        trade_date: new Date(tradeDate),
        buy_sell: buySell,
        quantity: quantity,
        price: price,
        trade_currency: currency || "USD",
        status: "Booked",
        // Relations
        counterparty: { connect: { party_id: counterpartyId } },
        portfolio: { connect: { portfolio_id: portfolioId } },
        instrument: { connect: { instrument_id: instrumentId } },
        ...(deskId ? { desk: { connect: { party_id: deskId } } } : {})
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
    // Fetch recent Bond trades
    const trades = await prisma.trade.findMany({
      where: {
        instrument: { instrument_type: "Bond" }
      },
      include: {
        instrument: true,
        counterparty: true,
        portfolio: true
      },
      orderBy: { created_at: "desc" },
      take: 20
    });
    return NextResponse.json({ success: true, trades });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
