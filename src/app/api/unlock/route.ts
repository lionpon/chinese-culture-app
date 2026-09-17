import { NextRequest, NextResponse } from "next/server";
import { buildPayPalCheckoutUrl, getAppUrl } from "@/lib/paypal";
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

    // Already-paid guard: if this free preview was already unlocked and paid
    // (unlock rows embed `unlockFrom`), never create a second order — send
    // the buyer straight to the full result they own. Prevents double charge.
    // Match the JSON field exactly so unrelated rows whose free-form input
    // happens to contain the id string can never be mistaken for a sibling.
    const unlockFromMark = `"unlockFrom":"${purchase_id}"`;
    const paidSibling = await prisma.purchase.findFirst({
      where: {
        status: "completed",
        paid: true,
        input: { contains: unlockFromMark },
      },
      orderBy: { createdAt: "desc" },
    });
    if (paidSibling) {
      return NextResponse.json({
        url: `${getAppUrl()}/success?purchase_id=${paidSibling.id}`,
      });
    }

    // Idempotency: a quick double-click must not create two PayPal orders.
    // Reuse the most recent unpaid pending row that was created by an unlock
    // of this same original purchase within the last 5 minutes.
    const fiveMinAgo = new Date(Date.now() - 5 * 60_000);
    const existing = await prisma.purchase.findFirst({
      where: {
        status: "pending",
        paid: false,
        createdAt: { gte: fiveMinAgo },
        input: { contains: unlockFromMark },
      },
      orderBy: { createdAt: "desc" },
    });
    if (existing) {
      const existingInput = JSON.parse(existing.input);
      const payAmount = Math.max(
        (typeof existingInput.amount === "number" ? existingInput.amount : 0) || (amount ?? 1),
        1
      );
      return NextResponse.json({
        url: buildPayPalCheckoutUrl(existing.id, existing.type, payAmount, {
          cancelReturn: `${getAppUrl()}/success?purchase_id=${purchase_id}&free=1`,
        }),
      });
    }

    // Read user's chosen amount from original purchase (preserves AmountPicker selection)
    let originalInput: Record<string, unknown> = {};
    try { originalInput = JSON.parse(original.input); } catch { /* use default */ }
    const payAmount = Math.max(
      (typeof originalInput.amount === "number" ? originalInput.amount : 0) || (amount ?? 1),
      1
    );

    // Create new pending purchase from original input. Two key properties:
    //  1. result is COPIED from the original — the buyer pays to unlock the
    //     exact full result they already previewed (regeneration would show
    //     them different names/dates than what convinced them to pay).
    //  2. unlockFrom is embedded so the system can route the buyer back to
    //     their free result page if payment is abandoned.
    const pending = await prisma.purchase.create({
      data: {
        checkoutId: crypto.randomUUID(),
        type: original.type,
        input: JSON.stringify({ ...originalInput, unlockFrom: purchase_id }),
        status: "pending",
        result: original.result, // copy full result — paid unlock reveals it as-is
      },
    });

    // PayPal (LS dropped support for Chinese merchants)
    const url = buildPayPalCheckoutUrl(pending.id, pending.type, payAmount, {
      cancelReturn: `${getAppUrl()}/success?purchase_id=${purchase_id}&free=1`,
    });
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Unlock error:", error);
    return NextResponse.json(
      { error: "Unlock failed — please try again" },
      { status: 500 }
    );
  }
}
