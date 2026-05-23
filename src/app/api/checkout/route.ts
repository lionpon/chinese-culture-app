import { NextRequest, NextResponse } from "next/server";
import { buildPayPalCheckoutUrl } from "@/lib/paypal";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, input } = body as { type: string; input: Record<string, unknown> };

    if (!["naming", "calendar", "divination"].includes(type)) {
      return NextResponse.json({ error: "Invalid request type" }, { status: 400 });
    }

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
    const url = buildPayPalCheckoutUrl(purchase.id, type, host);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
