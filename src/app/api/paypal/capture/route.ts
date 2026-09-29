import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { captureOrder, smartButtonsEnabled } from "@/lib/paypal-rest";
import { completePaidPurchase } from "@/lib/complete-purchase";

// Smart Buttons: server-side capture (authoritative). The purchase mapping is
// read from the order's custom_id (set at creation) — the client claim is
// ignored, so a captured order can never complete a different purchase.
export async function POST(req: NextRequest) {
  if (!smartButtonsEnabled()) {
    return NextResponse.json({ error: "Smart Buttons not enabled" }, { status: 503 });
  }
  try {
    const body = await req.json();
    const { order_id } = body as { order_id?: string };

    if (!order_id || typeof order_id !== "string") {
      return NextResponse.json({ error: "Missing order_id" }, { status: 400 });
    }

    const info = await captureOrder(order_id);
    if (!info.purchaseId) {
      return NextResponse.json({ error: "Order has no purchase mapping" }, { status: 400 });
    }

    // Verify the purchase exists and the order amount matches the record.
    const purchase = await prisma.purchase.findUnique({ where: { id: info.purchaseId } });
    if (!purchase) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
    }
    if (!purchase.paid) {
      try {
        const res = await completePaidPurchase(info.purchaseId, info.payerEmail || "");
        if (res.notFound) {
          return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
        }
      } catch (error) {
        // Payment verified by PayPal but generation failed → paid + pending,
        // /api/result retries. Never fail a paid order.
        console.error("Capture completion failed (payment captured):", error);
        await prisma.purchase.update({
          where: { id: info.purchaseId },
          data: { paid: true, status: "pending" },
        });
      }
    }

    return NextResponse.json({ purchase_id: info.purchaseId, paid: true });
  } catch (error) {
    console.error("PayPal capture error:", error);
    return NextResponse.json({ error: "Payment could not be completed" }, { status: 500 });
  }
}
