import { NextRequest, NextResponse } from "next/server";
import { buildPayPalCheckoutUrl } from "@/lib/paypal";
import { prisma } from "@/lib/db";
import { generateNames } from "@/lib/naming";
import { selectAuspiciousDays } from "@/lib/calendar";
import { performDivination } from "@/lib/divination";
import type { NamingInput, CalendarInput, DivinationInput } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, input, free } = body as { type: string; input: Record<string, unknown>; free?: boolean };

    if (!["naming", "calendar", "divination", "palm-reading"].includes(type)) {
      return NextResponse.json({ error: "Invalid request type" }, { status: 400 });
    }

    if (free && type !== "palm-reading") {
      // Free tier — preview only, unlock full result with contribution
      let result: unknown;
      switch (type) {
        case "naming": result = generateNames(input as unknown as NamingInput, true); break;
        case "calendar": result = selectAuspiciousDays(input as unknown as CalendarInput, true); break;
        case "divination": result = performDivination(input as unknown as DivinationInput, true); break;
      }

      const purchase = await prisma.purchase.create({
        data: {
          checkoutId: crypto.randomUUID(),
          type,
          input: JSON.stringify(input),
          status: "completed",
          paid: false,
          result: JSON.stringify(result),
        },
      });

      return NextResponse.json({ purchase_id: purchase.id, free: true });
    }

    // Paid flow — create pending purchase, return PayPal URL
    const tempId = crypto.randomUUID();
    const purchase = await prisma.purchase.create({
      data: {
        checkoutId: tempId,
        type,
        input: JSON.stringify(input),
        status: "pending",
      },
    });

    const host = req.headers.get("host") || undefined;
    const amount = typeof input.amount === "number" && input.amount >= 1 ? input.amount : 1;
    const url = buildPayPalCheckoutUrl(purchase.id, type, host, amount);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
