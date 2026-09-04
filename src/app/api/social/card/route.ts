// GET /api/social/card?kind=hexagram|zodiac&date=YYYY-MM-DD — PNG card for social pins.
// Public endpoint: Pinterest fetches this URL as the pin's media source, so no auth
// is required. Deterministic per date; cached for 24h.

import { NextRequest, NextResponse } from "next/server";
import { hexagramCardSVG, zodiacCardSVG } from "@/lib/social/images";
import { getDailySocialPosts } from "@/lib/social/content";
import { allHexagrams } from "@/data/hexagrams";
import { getZodiacInfo } from "@/data/zodiac-data";

export const runtime = "nodejs";

function parseDate(raw: string | null): string {
  const fallback = new Date().toISOString().slice(0, 10);
  if (!raw || !/^\d{4}-\d{2}-\d{2}$/.test(raw)) return fallback;
  const t = new Date(raw + "T00:00:00Z");
  return Number.isNaN(t.getTime()) ? fallback : raw;
}

export async function GET(req: NextRequest) {
  const dateStr = parseDate(req.nextUrl.searchParams.get("date"));
  const kind = req.nextUrl.searchParams.get("kind") === "zodiac" ? "zodiac" : "hexagram";

  const svg = (() => {
    if (kind === "zodiac") {
      const year = new Date(dateStr + "T00:00:00Z").getFullYear();
      const z = getZodiacInfo(year, "en");
      return zodiacCardSVG(z, dateStr);
    }
    const social = getDailySocialPosts(new Date(dateStr + "T00:00:00Z"));
    const hex = allHexagrams.find((x) => x.id === social.hexagram.id) || allHexagrams[0];
    return hexagramCardSVG(hex, dateStr);
  })();

  const { svgToPng } = await import("@/lib/social/images");
  const png = await svgToPng(svg);

  return new NextResponse(png as unknown as BodyInit, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}

