import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateNames, analyzeName } from "@/lib/naming";
import { selectAuspiciousDays } from "@/lib/calendar";
import { performDivination } from "@/lib/divination";
import { readPalm } from "@/lib/palm-reading";
import { interpretDream } from "@/lib/dream-interpretation";
import type { NamingInput, CalendarInput, DivinationInput, PalmReadingInput, DreamInterpretationInput } from "@/types";

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
    // Auto-create result for paid purchases — only within 10 minutes after checkout.
    // Covers normal PayPal redirect (~1-2 min) when PDT doesn't complete instantly.
    // Prevents stale pending purchases from being exploited via id enumeration.
    if (!purchase.fingerprint) {
      const ageSeconds = (Date.now() - new Date(purchase.createdAt).getTime()) / 1000;
      if (ageSeconds > 600) {
        return NextResponse.json({ status: "expired", error: "Purchase expired. Please try again." });
      }
      try {
        const input = JSON.parse(purchase.input);
        let result: unknown;
        switch (purchase.type) {
          case "naming": result = (input.mode === "analyze") ? analyzeName(input as NamingInput) : generateNames(input as NamingInput); break;
          case "calendar": result = selectAuspiciousDays(input as CalendarInput); break;
          case "divination": result = performDivination(input as DivinationInput); break;
          case "palm-reading": result = await readPalm(input as PalmReadingInput); break;
          case "dream-interpretation": result = await interpretDream(input as DreamInterpretationInput); break;
        }
        await prisma.purchase.update({
          where: { id: purchaseId },
          data: { status: "completed", paid: true, result: JSON.stringify(result) },
        });
        return NextResponse.json({ status: "completed", type: purchase.type, result });
      } catch (err) {
        console.error("Proactive result generation failed:", err);
        return NextResponse.json({ status: "pending" });
      }
    }
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
