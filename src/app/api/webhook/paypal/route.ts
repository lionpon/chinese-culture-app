import { NextRequest, NextResponse } from "next/server";
import { verifyIPN } from "@/lib/paypal";
import { prisma } from "@/lib/db";
import { completePaidPurchase } from "@/lib/complete-purchase";

// Legacy PayPal Standard IPN (form-encoded). Logic moved to
// complete-purchase.ts (shared with the REST capture/webhook paths).
export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  const ok = await verifyIPN(rawBody);
  if (!ok) {
    return NextResponse.json({ error: "Invalid IPN" }, { status: 400 });
  }

  const params = new URLSearchParams(rawBody);
  const purchaseId = params.get("custom");
  const paymentStatus = params.get("payment_status");

  if (!purchaseId || paymentStatus !== "Completed") {
    return NextResponse.json({ received: true });
  }

  try {
    const payerEmail = params.get("payer_email") || "";
    const res = await completePaidPurchase(purchaseId, payerEmail);
    if (res.notFound) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
    }
  } catch (error) {
    // Payment was verified (IPN passed PayPal's validation) but result
    // generation failed. Mark paid + keep pending — PayPal re-delivers IPN
    // and /api/result retries generation. Never mark a paid order failed.
    console.error("IPN generation failed (payment verified):", error);
    await prisma.purchase.update({
      where: { id: purchaseId },
      data: { paid: true, status: "pending" },
    });
  }

  return NextResponse.json({ received: true });
}
