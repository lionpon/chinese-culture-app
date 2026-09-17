import { prisma } from "@/lib/db";
import { generateNames, analyzeName } from "@/lib/naming";
import { selectAuspiciousDays } from "@/lib/calendar";
import { performDivination } from "@/lib/divination";
import { readPalm } from "@/lib/palm-reading";
import { interpretDream } from "@/lib/dream-interpretation";
import { translateResultEnFields } from "@/lib/translate";
import type { NamingInput, CalendarInput, DivinationInput, PalmReadingInput, DreamInterpretationInput } from "@/types";

export const ABANDON_AFTER_MS = 24 * 60 * 60 * 1000; // unpaid pending → abandoned after 24h

async function generateResult(type: string, input: Record<string, unknown>): Promise<unknown> {
  switch (type) {
    case "naming": return (input.mode === "analyze") ? analyzeName(input as unknown as NamingInput) : await generateNames(input as unknown as NamingInput);
    case "calendar": return selectAuspiciousDays(input as unknown as CalendarInput);
    case "divination": return performDivination(input as unknown as DivinationInput);
    case "palm-reading": return await readPalm(input as unknown as PalmReadingInput);
    case "dream-interpretation": return await interpretDream(input as unknown as DreamInterpretationInput);
    default: throw new Error(`Unknown type: ${type}`);
  }
}

/**
 * 1. Mark unpaid pending rows older than 24h as `abandoned` (zombie cleanup —
 *    PayPal IPN arrives within seconds; 24h slack is generous).
 *    Late IPN/PDT still complete them afterwards — handlers only skip when
 *    status is already `completed`.
 *
 * 2. Retry result generation for paid-but-unfinished rows (paid=true,
 *    pending, result IS NULL). These are buyers whose payment was verified
 *    but generation failed — the only background retry they have.
 */
export async function runPurchaseRecovery(): Promise<{
  abandoned: number;
  paidRetried: number;
  paidSucceeded: number;
  paidFailed: number;
}> {
  const out = { abandoned: 0, paidRetried: 0, paidSucceeded: 0, paidFailed: 0 };

  // ── Step 1: zombie cleanup ──
  const stale = await prisma.purchase.findMany({
    where: {
      status: "pending",
      paid: false,
      createdAt: { lt: new Date(Date.now() - ABANDON_AFTER_MS) },
    },
    select: { id: true },
  });
  if (stale.length) {
    await prisma.purchase.updateMany({
      where: { id: { in: stale.map((r) => r.id) } },
      data: { status: "abandoned" },
    });
    out.abandoned = stale.length;
  }

  // ── Step 2: paid-but-no-result retry ──
  const stuckPaid = await prisma.purchase.findMany({
    where: { status: "pending", paid: true, result: null },
    select: { id: true, type: true, input: true },
  });
  out.paidRetried = stuckPaid.length;
  for (const row of stuckPaid) {
    try {
      const input = JSON.parse(row.input);
      const result = await generateResult(row.type, input);
      const locale = typeof input.locale === "string" ? input.locale : "en";
      await translateResultEnFields(result, locale);
      await prisma.purchase.update({
        where: { id: row.id },
        data: { status: "completed", result: JSON.stringify(result) },
      });
      out.paidSucceeded++;
      console.log(`[purchase-recovery] paid purchase ${row.id} completed via retry`);
    } catch (err) {
      out.paidFailed++;
      console.error(`[purchase-recovery] retry failed for paid purchase ${row.id}:`, err);
    }
  }

  return out;
}
