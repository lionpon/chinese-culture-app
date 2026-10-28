import { NextRequest, NextResponse } from "next/server";
import { buildPayPalCheckoutUrl, getAppUrl } from "@/lib/paypal";
import { smartButtonsEnabled } from "@/lib/paypal-rest";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { purchase_id, amount, email, mode } = body as { purchase_id: string; amount?: number; email?: string; mode?: string };
    const buyerEmail = typeof email === "string" && email.trim() ? email.trim() : null;
    // Smart Buttons mode: client stays on-page and renders the JS SDK buttons;
    // the returned standard_url is the legacy PayPal page as fallback.
    const smartMode = mode === "smart" && smartButtonsEnabled();

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
      // Merge a newly provided email into the reused order (buyer may have
      // skipped the form email but filled it at the paywall).
      if (buyerEmail && !existingInput.email) {
        await prisma.purchase.update({
          where: { id: existing.id },
          data: { input: JSON.stringify({ ...existingInput, email: buyerEmail }) },
        });
      }
      const payAmount = Math.max(
        (typeof existingInput.amount === "number" ? existingInput.amount : 0) || (amount ?? 1),
        1
      );
      const standardUrl = buildPayPalCheckoutUrl(existing.id, existing.type, payAmount, {
        cancelReturn: `${getAppUrl()}/success?purchase_id=${purchase_id}&free=1`,
      });
      if (smartMode) {
        const existingOffer = existingInput.offer === "first-order-1.99";
        return NextResponse.json({
          purchase_id: existing.id,
          standard_url: standardUrl,
          amount: payAmount,
          offer: existingOffer,
        });
      }
      return NextResponse.json({ url: standardUrl });
    }

    // Read user's chosen amount from original purchase (preserves AmountPicker selection)
    let originalInput: Record<string, unknown> = {};
    try { originalInput = JSON.parse(original.input); } catch { /* use default */ }
    const baseAmount = Math.max(
      (typeof originalInput.amount === "number" ? originalInput.amount : 0) || (amount ?? 1),
      1
    );

    // 首单 offer 实验 (2026-10-28 预注册 §⑰): 按指纹哈希确定性分桶 50/50,
    // offer 组首单 $1.99 (原价保留在 originalAmount)。同指纹已付费过则不再给 offer。
    const fp = typeof original.fingerprint === "string" && original.fingerprint ? original.fingerprint : null;
    let offerApplied = false;
    if (fp) {
      const bucket = parseInt(fp.slice(0, 8), 16) % 2;
      const paidBefore = await prisma.purchase.count({ where: { fingerprint: fp, paid: true } });
      offerApplied = bucket === 1 && paidBefore === 0;
    }
    const payAmount = offerApplied ? 1.99 : baseAmount;

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
        input: JSON.stringify({
          ...originalInput,
          unlockFrom: purchase_id,
          // Paywall-captured email wins when the form email was skipped
          ...(buyerEmail && !originalInput.email ? { email: buyerEmail } : {}),
          amount: payAmount,
          ...(offerApplied ? { offer: "first-order-1.99", originalAmount: baseAmount } : {}),
        }),
        status: "pending",
        result: original.result, // copy full result — paid unlock reveals it as-is
      },
    });

    // PayPal (LS dropped support for Chinese merchants)
    const url = buildPayPalCheckoutUrl(pending.id, pending.type, payAmount, {
      cancelReturn: `${getAppUrl()}/success?purchase_id=${purchase_id}&free=1`,
    });
    if (smartMode) {
      return NextResponse.json({
        purchase_id: pending.id,
        standard_url: url,
        amount: payAmount,
        offer: offerApplied,
      });
    }
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Unlock error:", error);
    return NextResponse.json(
      { error: "Unlock failed — please try again" },
      { status: 500 }
    );
  }
}
