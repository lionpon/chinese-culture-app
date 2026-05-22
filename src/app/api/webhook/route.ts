import { NextRequest, NextResponse } from "next/server";
import { verifyLemonWebhook } from "@/lib/lemon";
import { prisma } from "@/lib/db";
import { generateNames } from "@/lib/naming";
import { selectAuspiciousDays } from "@/lib/calendar";
import { performDivination } from "@/lib/divination";
import type { NamingInput, CalendarInput, DivinationInput } from "@/types";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature") || "";
  const eventName = req.headers.get("x-event-name") || "";

  if (!verifyLemonWebhook(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (eventName !== "order_created") {
    return NextResponse.json({ received: true });
  }

  let payload: { data?: { meta?: { custom_data?: { purchaseId?: string; type?: string } } } };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const customData = payload?.data?.meta?.custom_data;
  const purchaseId = customData?.purchaseId;
  const type = customData?.type;

  if (!purchaseId || !type) {
    return NextResponse.json({ error: "Missing custom data" }, { status: 400 });
  }

  try {
    const purchase = await prisma.purchase.findUnique({ where: { id: purchaseId } });
    if (!purchase || purchase.status === "completed") {
      return NextResponse.json({ received: true });
    }

    const input = JSON.parse(purchase.input);
    let result: unknown;

    switch (type) {
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
    console.error("Webhook processing error:", error);
    await prisma.purchase.update({
      where: { id: purchaseId },
      data: { status: "failed" },
    });
  }

  return NextResponse.json({ received: true });
}
