import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createOrder, smartButtonsEnabled } from "@/lib/paypal-rest";

// Smart Buttons: server-side order creation for an existing pending purchase.
// The purchase (and its result-copy / idempotency semantics) is always created
// by /api/checkout or /api/unlock first — this route only wraps PayPal's
// Orders v2 API. Amount comes from the purchase input (client cannot set it).
export async function POST(req: NextRequest) {
  if (!smartButtonsEnabled()) {
    return NextResponse.json({ error: "Smart Buttons not enabled" }, { status: 503 });
  }
  try {
    const body = await req.json();
    const { purchase_id } = body as { purchase_id?: string };

    if (!purchase_id) {
      return NextResponse.json({ error: "Missing purchase_id" }, { status: 400 });
    }

    const purchase = await prisma.purchase.findUnique({ where: { id: purchase_id } });
    if (!purchase) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
    }
    if (purchase.paid) {
      return NextResponse.json({ error: "Purchase already paid" }, { status: 409 });
    }

    let input: Record<string, unknown> = {};
    try { input = JSON.parse(purchase.input); } catch { /* fall through */ }
    const amount = typeof input.amount === "number" && input.amount >= 1 ? input.amount : 5.99;

    const orderId = await createOrder({ purchaseId: purchase.id, type: purchase.type, amount });
    console.log(`[paypal-rest] order ${orderId} <- purchase ${purchase.id} ($${amount.toFixed(2)})`);
    return NextResponse.json({ order_id: orderId });
  } catch (error) {
    console.error("PayPal order create error:", error);
    return NextResponse.json({ error: "Payment service temporarily unavailable" }, { status: 500 });
  }
}
