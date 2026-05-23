import { NextRequest, NextResponse } from "next/server";
import { verifyIPN } from "@/lib/paypal";
import { prisma } from "@/lib/db";
import { generateNames } from "@/lib/naming";
import { selectAuspiciousDays } from "@/lib/calendar";
import { performDivination } from "@/lib/divination";
import type { NamingInput, CalendarInput, DivinationInput } from "@/types";

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
    let result: unknown;

    switch (purchase.type) {
      case "naming":
        result = generateNames(input as NamingInput);
        break;
      case "calendar":
        result = selectAuspiciousDays(input as CalendarInput);
        break;
      case "divination":
        result = performDivination(input as DivinationInput);
        break;
      default:
        return NextResponse.json({ error: "Unknown type" }, { status: 400 });
    }

    await prisma.purchase.update({
      where: { id: purchaseId },
      data: { status: "completed", result: JSON.stringify(result) },
    });
  } catch (error) {
    console.error("IPN error:", error);
    await prisma.purchase.update({
      where: { id: purchaseId },
      data: { status: "failed" },
    });
  }

  return NextResponse.json({ received: true });
}
