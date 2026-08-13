import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateNames, analyzeName } from "@/lib/naming";
import { selectAuspiciousDays } from "@/lib/calendar";
import { performDivination } from "@/lib/divination";
import { readPalm } from "@/lib/palm-reading";
import { interpretDream } from "@/lib/dream-interpretation";
import { translateResultEnFields } from "@/lib/translate";
import type { NamingInput, CalendarInput, DivinationInput, PalmReadingInput, DreamInterpretationInput } from "@/types";

// Throttle for retrying result generation on PayPal-verified purchases
// (paid=true, status=pending). 1 attempt per purchase per 60s.
const genRetryMap = new Map<string, number>();
const GEN_RETRY_INTERVAL_MS = 60_000;

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

async function computeFingerprint(req: NextRequest): Promise<string> {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ua = req.headers.get("user-agent") || "";
  const raw = ip + "|" + ua;
  const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function truncateForFreePreview(type: string, result: Record<string, unknown>): Record<string, unknown> {
  switch (type) {
    case "divination": {
      const r = result as Record<string, unknown>;
      return {
        mainHexagram: r.mainHexagram,
        // Exclude: changedHexagram, mutualHexagram, changingLine
      };
    }
    case "naming": {
      const r = result as Record<string, unknown>;
      // Analyze mode
      if (r.type === "analysis") {
        return {
          type: "analysis",
          characters: r.characters,
          pinyin: r.pinyin,
          score: r.score,
          baziCompatibility: { match: (r.baziCompatibility as Record<string, unknown>)?.match },
          // Exclude: elementBreakdown, full baziCompatibility, suggestion, baziAnalysis
        };
      }
      // Create mode — free hook: name + pinyin + meaning + wuxing (enough to intrigue, not enough to satisfy)
      const options = r.options as Array<Record<string, unknown>> | undefined;
      const first = options?.[0];
      return {
        options: first ? [{ characters: first.characters, pinyin: first.pinyin, meaning: first.meaning, wuxing: first.wuxing }] : [],
        // Locked: source, sourceText, Recommended badge, baziAnalysis
      };
    }
    case "calendar": {
      const r = result as Record<string, unknown>;
      const days = r.auspiciousDays as Array<Record<string, unknown>> | undefined;
      const first = days?.[0];
      if (!first) return { auspiciousDays: [] };
      // Free preview: only show date + score + lunar date, hide suitability details
      return {
        auspiciousDays: [{
          date: first.date,
          lunarDate: first.lunarDate,
          score: first.score,
          // Locked: ganzhi, jianchu, constellation, suitable, unsuitable, gods, hours
        }],
        lockedCount: (days?.length ?? 1) - 1,
      };
    }
    case "dream-interpretation": {
      const r = result as Record<string, unknown>;
      const zhouGong = r.zhouGong as Record<string, unknown>;
      const symbols = zhouGong?.symbols as Array<Record<string, unknown>> | undefined;
      const overallZh = (zhouGong?.overallInterpretation as string) || "";
      const overallEn = (zhouGong?.overallInterpretationEn as string) || "";
      return {
        dreamType: r.dreamType,
        zhouGong: {
          symbols: symbols?.slice(0, 1) ?? [],
          overallInterpretation: overallZh.slice(0, 250),
          overallInterpretationEn: overallEn.slice(0, 250),
          classicalRef: "",
        },
        freudian: {
          latentMeaning: "",
          latentMeaningEn: "",
          wishFulfillment: "",
          wishFulfillmentEn: "",
          keySymbols: [],
        },
        overview: {
          text: "",
          textEn: "",
          classicalRef: "",
        },
        advice: {
          practical: "",
          practicalEn: "",
          psychological: "",
          psychologicalEn: "",
        },
      };
    }
    default:
      return result;
  }
}

export async function GET(req: NextRequest) {
  const purchaseId = req.nextUrl.searchParams.get("purchase_id");

  if (!purchaseId) {
    return NextResponse.json({ error: "Missing purchase_id" }, { status: 400 });
  }

  const purchase = await prisma.purchase.findUnique({
    where: { id: purchaseId },
  });

  if (!purchase) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Require fingerprint match for free purchases (prevent enumeration)
  if (purchase.fingerprint) {
    const reqFingerprint = await computeFingerprint(req);
    if (reqFingerprint !== purchase.fingerprint) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
  }

  if (purchase.status === "pending") {
    // Payment must be verified by PayPal before results are released.
    // Two verified channels mark the purchase completed:
    //   1. PDT  — /api/pdt (instant, on buyer return)
    //   2. IPN  — /api/webhook/paypal (server-to-server backup)
    //
    // paid=true && pending means PayPal verified payment but result
    // generation failed (e.g. AI outage). Retry generation here, throttled.
    if (purchase.paid) {
      const last = genRetryMap.get(purchaseId) || 0;
      if (Date.now() - last < GEN_RETRY_INTERVAL_MS) {
        return NextResponse.json({ status: "pending" });
      }
      genRetryMap.set(purchaseId, Date.now());
      try {
        const input = JSON.parse(purchase.input);
        const result = await generateResult(purchase.type, input);
        const locale = typeof input.locale === "string" ? input.locale : "en";
        await translateResultEnFields(result, locale);
        await prisma.purchase.update({
          where: { id: purchaseId },
          data: { status: "completed", result: JSON.stringify(result) },
        });
        genRetryMap.delete(purchaseId);
        return NextResponse.json({ status: "completed", type: purchase.type, result });
      } catch (err) {
        console.error("Result retry failed (paid, pending):", err);
        return NextResponse.json({ status: "pending" });
      }
    }
    // Unpaid pending — waiting for PDT/IPN verification.
    return NextResponse.json({ status: "pending" });
  }

  if (purchase.status === "failed") {
    return NextResponse.json({ status: "failed", error: "Processing failed. Please contact support for assistance." });
  }

  const fullResult = JSON.parse(purchase.result || "{}");

  // Truncate result for free purchases — server-side enforcement of paywall
  if (!purchase.paid) {
    const truncated = truncateForFreePreview(purchase.type, fullResult);
    return NextResponse.json({
      status: "completed",
      type: purchase.type,
      result: truncated,
      free: true,
      purchase_id: purchase.id,
    });
  }

  return NextResponse.json({
    status: "completed",
    type: purchase.type,
    result: fullResult,
  });
}
