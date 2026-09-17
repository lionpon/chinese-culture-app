import { NextRequest, NextResponse } from "next/server";
import { verifyIPN } from "@/lib/paypal";
import { prisma } from "@/lib/db";
import { generateNames, analyzeName } from "@/lib/naming";
import { selectAuspiciousDays } from "@/lib/calendar";
import { performDivination } from "@/lib/divination";
import { readPalm } from "@/lib/palm-reading";
import { interpretDream } from "@/lib/dream-interpretation";
import { translateResultEnFields } from "@/lib/translate";
import type { NamingInput, CalendarInput, DivinationInput, PalmReadingInput, DreamInterpretationInput } from "@/types";

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
    const purchase = await prisma.purchase.findUnique({ where: { id: purchaseId } });
    if (!purchase || purchase.status === "completed") {
      return NextResponse.json({ received: true });
    }

    const input = JSON.parse(purchase.input);

    // Capture the PayPal payer email when the buyer never left one in the
    // form — enables result delivery by email after payment.
    const payerEmail = params.get("payer_email") || "";
    if (payerEmail && !input.email) {
      input.email = payerEmail;
      await prisma.purchase.update({
        where: { id: purchaseId },
        data: { input: JSON.stringify(input) },
      });
    }

    // Unlock flow: result was copied from the free preview at creation time.
    // Mark paid+completed as-is — never regenerate what the buyer previewed.
    if (purchase.result) {
      await prisma.purchase.update({
        where: { id: purchaseId },
        data: { status: "completed", paid: true },
      });
      return NextResponse.json({ received: true });
    }

    let result: unknown;

    switch (purchase.type) {
      case "naming":
        result = (input.mode === "analyze") ? analyzeName(input as NamingInput) : await generateNames(input as NamingInput);
        break;
      case "calendar":
        result = selectAuspiciousDays(input as CalendarInput);
        break;
      case "divination":
        result = performDivination(input as DivinationInput);
        break;
      case "palm-reading":
        result = await readPalm(input as PalmReadingInput);
        break;
      case "dream-interpretation":
        result = await interpretDream(input as DreamInterpretationInput);
        break;
      default:
        return NextResponse.json({ error: "Unknown type" }, { status: 400 });
    }

    const locale = typeof input.locale === "string" ? input.locale : "en";
    await translateResultEnFields(result, locale);

    await prisma.purchase.update({
      where: { id: purchaseId },
      data: { status: "completed", paid: true, result: JSON.stringify(result) },
    });
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
