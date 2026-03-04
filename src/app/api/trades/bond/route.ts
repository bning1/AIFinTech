import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const desk = searchParams.get("desk");
    console.log("API GET desk filter:", desk);

    const where: any = { instrument: { instrument_type: "Bond" } };
    if (desk) {
      where.desk = { party_name: desk };
      console.log("Prisma where:", JSON.stringify(where));
    }

    const trades = await prisma.trade.findMany({
      where,
      include: {
        instrument: true,
        portfolio: true,
        desk: true,
        counterparty: true
      },
      orderBy: { created_at: "desc" },
      take: 50
    });
    console.log("Found trades:", trades.length, trades.map(t => t.desk?.party_name));
    return NextResponse.json({ success: true, trades });
  } catch (error: any) {
    console.error("GET error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST same as before...
