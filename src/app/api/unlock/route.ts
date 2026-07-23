import { NextRequest, NextResponse } from "next/server";
import { buildPayPalCheckoutUrl } from "@/lib/paypal";
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

    // Read user's chosen amount from original purchase (preserves AmountPicker selection)
    let originalInput: Record<string, unknown> = {};
    try { originalInput = JSON.parse(original.input); } catch { /* use default */ }
    const payAmount = Math.max(
      (typeof originalInput.amount === "number" ? originalInput.amount : 0) || (amount ?? 1),
      1
    );

    // Create new pending purchase from original input
    const pending = await prisma.purchase.create({
      data: {
        checkoutId: crypto.randomUUID(),
        type: original.type,
        input: original.input,
        status: "pending",
      },
    });

    // PayPal (LS dropped support for Chinese merchants)
    const url = buildPayPalCheckoutUrl(pending.id, pending.type, payAmount);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Unlock error:", error);
    return NextResponse.json(
      { error: "Unlock failed — please try again" },
      { status: 500 }
    );
  }
}
