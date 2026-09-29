import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyWebhookSignature } from "@/lib/paypal-rest";
import { completePaidPurchase } from "@/lib/complete-purchase";

interface CaptureEvent {
  event_type: string;
  resource?: {
    purchase_units?: Array<{
      custom_id?: string;
      payments?: { captures?: Array<{ custom_id?: string }> };
    }>;
  };
  payer?: { email_address?: string };
}

// PayPal REST webhook — fallback authority for Smart Buttons payments.
// Signature is verified against PAYPAL_WEBHOOK_ID before any action.
export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  const headers = {
    "paypal-auth-algo": req.headers.get("paypal-auth-algo") || "",
    "paypal-cert-url": req.headers.get("paypal-cert-url") || "",
    "paypal-transmission-id": req.headers.get("paypal-transmission-id") || "",
    "paypal-transmission-sig": req.headers.get("paypal-transmission-sig") || "",
    "paypal-transmission-time": req.headers.get("paypal-transmission-time") || "",
  };

  const ok = await verifyWebhookSignature(headers, rawBody);
  if (!ok) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody) as CaptureEvent;

  // CHECKOUT.ORDER.APPROVED is informational — capture happens via /api/paypal/capture
  if (event.event_type !== "PAYMENT.CAPTURE.COMPLETED") {
    return NextResponse.json({ received: true });
  }

  const unit = event.resource?.purchase_units?.[0];
  const purchaseId = unit?.payments?.captures?.[0]?.custom_id || unit?.custom_id || "";
  if (!purchaseId) {
    return NextResponse.json({ received: true });
  }

  try {
    const res = await completePaidPurchase(purchaseId, event.payer?.email_address || "");
    if (res.notFound) {
      // PayPal retries on non-2xx; a vanished purchase is terminal, so accept.
      return NextResponse.json({ received: true });
    }
  } catch (error) {
    // Payment verified — mark paid + pending so /api/result retries generation.
    console.error("REST webhook completion failed (payment captured):", error);
    await prisma.purchase.update({
      where: { id: purchaseId },
      data: { paid: true, status: "pending" },
    });
  }

  return NextResponse.json({ received: true });
}
