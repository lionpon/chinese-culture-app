import { NextRequest, NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";
import { prisma } from "@/lib/db";
import { generateNames } from "@/lib/naming";
import { selectAuspiciousDays } from "@/lib/calendar";
import { performDivination } from "@/lib/divination";
import type { NamingInput, CalendarInput, DivinationInput } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, purchaseId } = body as { orderId: string; purchaseId: string };

    const purchase = await prisma.purchase.findUnique({ where: { id: purchaseId } });
    if (!purchase) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
    }

    if (purchase.status === "completed") {
      return NextResponse.json({ success: true, purchaseId });
    }

    // Capture payment on PayPal
    await capturePayPalOrder(orderId);

    // Generate the result
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

    return NextResponse.json({ success: true, purchaseId });
  } catch (error) {
    console.error("Capture error:", error);
    return NextResponse.json({ error: "Payment capture failed" }, { status: 500 });
  }
}
