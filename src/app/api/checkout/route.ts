import { NextRequest, NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, input } = body as { type: string; input: Record<string, unknown> };

    if (!["naming", "calendar", "divination"].includes(type)) {
      return NextResponse.json({ error: "Invalid request type" }, { status: 400 });
    }

    const purchase = await prisma.purchase.create({
      data: {
        checkoutId: "",
        type,
        input: JSON.stringify(input),
        status: "pending",
      },
    });

    const { orderId } = await createPayPalOrder({
      purchaseId: purchase.id,
      type,
    });

    await prisma.purchase.update({
      where: { id: purchase.id },
      data: { checkoutId: orderId },
    });

    return NextResponse.json({ orderId, purchaseId: purchase.id });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
