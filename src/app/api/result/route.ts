import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const purchaseId = req.nextUrl.searchParams.get("purchase_id");

  if (!purchaseId) {
    return NextResponse.json({ error: "Missing purchase_id" }, { status: 400 });
  }

  const purchase = await prisma.purchase.findUnique({
    where: { id: purchaseId },
  });

  if (!purchase) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (purchase.status === "pending") {
    return NextResponse.json({ status: "pending" });
  }

  if (purchase.status === "failed") {
    return NextResponse.json({ status: "failed", error: "Processing failed. Please contact support for a refund." });
  }

  return NextResponse.json({
    status: "completed",
    type: purchase.type,
    result: JSON.parse(purchase.result || "{}"),
  });
}
