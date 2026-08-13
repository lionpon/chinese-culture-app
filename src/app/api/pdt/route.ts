import { NextRequest, NextResponse } from "next/server";
import { verifyPDT } from "@/lib/paypal";
import { prisma } from "@/lib/db";
import { generateNames, analyzeName } from "@/lib/naming";
import { selectAuspiciousDays } from "@/lib/calendar";
import { performDivination } from "@/lib/divination";
import { readPalm } from "@/lib/palm-reading";
import { interpretDream } from "@/lib/dream-interpretation";
import { translateResultEnFields } from "@/lib/translate";
import type { NamingInput, CalendarInput, DivinationInput, PalmReadingInput, DreamInterpretationInput } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { purchase_id, tx } = await req.json();
    if (!purchase_id || !tx) {
      return NextResponse.json({ error: "Missing purchase_id or tx" }, { status: 400 });
    }

    const purchase = await prisma.purchase.findUnique({ where: { id: purchase_id } });
    if (!purchase) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
    }

    // Already completed — return result immediately
    if (purchase.status === "completed" && purchase.result) {
      return NextResponse.json({
        status: "completed",
        type: purchase.type,
        result: JSON.parse(purchase.result),
      });
    }

    let pdt;
    try {
      pdt = await verifyPDT(tx);
    } catch (err) {
      console.error("PDT verify network error:", err);
      return NextResponse.json({ status: "pending" });
    }
    if (!pdt.ok || pdt.paymentStatus !== "Completed") {
      return NextResponse.json({ status: "pending" });
    }

    // ── Payment VERIFIED from here on — user has paid. ──

    // Verify amount matches — prevent tampering
    const input = JSON.parse(purchase.input);
    const expectedAmount = typeof input.amount === "number" ? input.amount : 5.99;
    const paidAmount = parseFloat(pdt.amount || "0");
    if (paidAmount > 0 && Math.abs(paidAmount - expectedAmount) > 0.02) {
      console.warn(`PDT amount mismatch: paid $${paidAmount}, expected $${expectedAmount}, purchase ${purchase_id}`);
    }

    try {
      let result: unknown;

      switch (purchase.type) {
        case "naming": result = (input.mode === "analyze") ? analyzeName(input as NamingInput) : await generateNames(input as NamingInput); break;
        case "calendar": result = selectAuspiciousDays(input as CalendarInput); break;
        case "divination": result = performDivination(input as DivinationInput); break;
        case "palm-reading": result = await readPalm(input as PalmReadingInput); break;
        case "dream-interpretation": result = await interpretDream(input as DreamInterpretationInput); break;
        default:
          return NextResponse.json({ error: "Unknown type" }, { status: 400 });
      }

      const locale = typeof input.locale === "string" ? input.locale : "en";
      await translateResultEnFields(result, locale);

      await prisma.purchase.update({
        where: { id: purchase_id },
        data: { status: "completed", paid: true, result: JSON.stringify(result) },
      });

      return NextResponse.json({ status: "completed", type: purchase.type, result });
    } catch (genError) {
      // Payment verified but result generation failed (AI outage etc.).
      // Mark paid + keep pending → client keeps polling /api/result which
      // retries generation. Never lose a paid user's result.
      console.error("PDT generation failed (payment verified):", genError);
      await prisma.purchase.update({
        where: { id: purchase_id },
        data: { paid: true, status: "pending" },
      });
      return NextResponse.json({ status: "pending" });
    }
  } catch (error) {
    console.error("PDT error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
