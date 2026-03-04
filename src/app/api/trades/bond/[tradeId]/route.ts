import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function DELETE(
  request: Request,
  { params }: { params: { tradeId: string } }
) {
  try {
    const { tradeId } = params;
    const deleted = await prisma.trade.delete({
      where: { trade_id: tradeId }
    });
    return NextResponse.json({ success: true, deleted });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
    request: Request, 
    { params }: { params: Promise<{ tradeId: string }> }
  ) {
    try {
      const { tradeId } = await params; // Add 'await' here for Next.js 15+
      const body = await request.json();

      const updated = await prisma.trade.update({
        where: { 
          trade_id: tradeId // Remove the String() wrapper if tradeId is already a string
        },
        data: body
      });
      return NextResponse.json({ success: true, updated });
    } catch (error: any) {
      console.error("PATCH error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
