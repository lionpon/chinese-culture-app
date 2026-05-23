import { NextRequest, NextResponse } from "next/server";
import { createLemonCheckout } from "@/lib/lemon";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, input } = body as { type: string; input: Record<string, unknown> };

    if (!["naming", "calendar", "divination"].includes(type)) {
      return NextResponse.json({ error: "Invalid request type" }, { status: 400 });
    }

    // Create Purchase record (status: pending)
    const purchase = await prisma.purchase.create({
      data: {
        checkoutId: "",
        type,
        input: JSON.stringify(input),
        status: "pending",
      },
    });

    const storeId = process.env.LEMON_SQUEEZY_STORE_ID || "1";
    const variantId = process.env.LEMON_SQUEEZY_VARIANT_ID || "1";

    // Create Lemon Squeezy checkout
    const { checkoutId, url } = await createLemonCheckout({
      storeId,
      variantId,
      purchaseId: purchase.id,
      type,
    });

    // Update purchase with Lemon Squeezy checkout ID
    await prisma.purchase.update({
      where: { id: purchase.id },
      data: { checkoutId },
    });

    // Force English language on Lemon Squeezy checkout page
    const englishUrl = url.includes("?") ? `${url}&lang=en` : `${url}?lang=en`;
    return NextResponse.json({ url: englishUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
