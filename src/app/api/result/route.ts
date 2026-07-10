import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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
      return {
        auspiciousDays: days?.slice(0, 1) ?? [],
        // Exclude: remaining days
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
