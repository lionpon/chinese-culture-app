import { NextRequest, NextResponse } from "next/server";
import { buildPayPalCheckoutUrl } from "@/lib/paypal";
import { createLemonCheckout } from "@/lib/lemon";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { purchase_id, amount } = body as { purchase_id: string; amount?: number };

    if (!purchase_id) {
      return NextResponse.json({ error: "Missing purchase_id" }, { status: 400 });
    }

    const original = await prisma.purchase.findUnique({ where: { id: purchase_id } });
    if (!original) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
    }
    if (original.paid || original.status !== "completed") {
      return NextResponse.json({ error: "Invalid purchase" }, { status: 400 });
    }

    // Create new pending purchase from original input
    const pending = await prisma.purchase.create({
      data: {
        checkoutId: crypto.randomUUID(),
        type: original.type,
        input: original.input,
        status: "pending",
      },
    });

    const payAmount = Math.max(amount ?? 1, 1);

    // Prefer Lemon Squeezy, fall back to PayPal
    const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
    const variantId = process.env.LEMON_SQUEEZY_VARIANT_ID;

    if (storeId && variantId) {
      const result = await createLemonCheckout({
        storeId,
        variantId,
        purchaseId: pending.id,
        type: pending.type,
        amount: payAmount,
      });
      return NextResponse.json({ url: result.url });
    }

    const url = buildPayPalCheckoutUrl(pending.id, pending.type, payAmount);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Unlock error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed" },
      { status: 500 }
    );
  }
}
