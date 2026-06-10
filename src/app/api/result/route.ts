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
      // Create mode
      const options = r.options as Array<Record<string, unknown>> | undefined;
      return {
        options: options?.slice(0, 1) ?? [],
        // Exclude: remaining options, baziAnalysis
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
