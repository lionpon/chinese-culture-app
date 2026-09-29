// Shared "payment verified → complete the purchase" state machine.
// Used by: legacy IPN webhook, REST capture route, REST webhook.
// Invariants (9/17 定案):
//  - result is NEVER regenerated when it already exists (buyer paid to unlock
//    exactly what they previewed)
//  - payer_email is merged into input when the buyer left none
//  - generation failure after verified payment → paid=true + status=pending
//    (PayPal re-delivers / /api/result retries) — never mark paid orders failed
import { prisma } from "@/lib/db";
import { generateNames, analyzeName } from "@/lib/naming";
import { selectAuspiciousDays } from "@/lib/calendar";
import { performDivination } from "@/lib/divination";
import { readPalm } from "@/lib/palm-reading";
import { interpretDream } from "@/lib/dream-interpretation";
import { translateResultEnFields } from "@/lib/translate";
import type { NamingInput, CalendarInput, DivinationInput, PalmReadingInput, DreamInterpretationInput } from "@/types";

export async function completePaidPurchase(
  purchaseId: string,
  payerEmail?: string
): Promise<{ ok: boolean; alreadyCompleted?: boolean; notFound?: boolean }> {
  const purchase = await prisma.purchase.findUnique({ where: { id: purchaseId } });
  if (!purchase) return { ok: false, notFound: true };
  if (purchase.status === "completed") return { ok: true, alreadyCompleted: true };

  const input = JSON.parse(purchase.input);

  if (payerEmail && !input.email) {
    input.email = payerEmail;
    await prisma.purchase.update({
      where: { id: purchaseId },
      data: { input: JSON.stringify(input) },
    });
  }

  // Unlock flow: result was copied from the free preview at creation time.
  // Mark paid+completed as-is — never regenerate what the buyer previewed.
  if (purchase.result) {
    await prisma.purchase.update({
      where: { id: purchaseId },
      data: { status: "completed", paid: true },
    });
    return { ok: true };
  }

  let result: unknown;
  switch (purchase.type) {
    case "naming":
      result = (input.mode === "analyze") ? analyzeName(input as NamingInput) : await generateNames(input as NamingInput);
      break;
    case "calendar":
      result = selectAuspiciousDays(input as CalendarInput);
      break;
    case "divination":
      result = performDivination(input as DivinationInput);
      break;
    case "palm-reading":
      result = await readPalm(input as PalmReadingInput);
      break;
    case "dream-interpretation":
      result = await interpretDream(input as DreamInterpretationInput);
      break;
    default:
      throw new Error(`Unknown purchase type: ${purchase.type}`);
  }

  const locale = typeof input.locale === "string" ? input.locale : "en";
  await translateResultEnFields(result, locale);

  await prisma.purchase.update({
    where: { id: purchaseId },
    data: { status: "completed", paid: true, result: JSON.stringify(result) },
  });
  return { ok: true };
}
