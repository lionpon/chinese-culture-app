import createMiddleware from "next-intl/middleware";
import { defaultLocale } from "@/i18n-config";
import { NextRequest, NextResponse } from "next/server";
import { isBadBot, checkRateLimit, checkCsrf } from "@/lib/security";
import { BASE_URL } from "@/lib/config";

const intlMiddleware = createMiddleware({
  locales: ["en", "ru", "ja", "ko"],
  defaultLocale,
  localePrefix: "as-needed",
});

export default function middleware(req: NextRequest) {
  // ── llms.txt — AI discoverability ──
  if (req.nextUrl.pathname === "/llms.txt") {
    const content = `# Chinese Culture Studio
> Discover ancient Chinese wisdom — I Ching divination, Chinese name creation, auspicious date selection, and palm reading.

## Core Tools
- [I Ching Divination](${BASE_URL}/divination): Traditional 3-coin method with hexagram interpretations.
- [Chinese Name Creation](${BASE_URL}/naming): Authentic names based on Bazi and Five Elements.
- [Auspicious Date Selection](${BASE_URL}/calendar): Favorable dates from the Chinese almanac.
- [Palm Reading](${BASE_URL}/palm-reading): AI-powered palm line analysis.

## Guides
- [I Ching Beginner's Guide](${BASE_URL}/guide/iching-beginner)
- [Complete I Ching Guide](${BASE_URL}/guide/iching)
- [Five Elements](${BASE_URL}/guide/five-elements) · [Chinese Zodiac](${BASE_URL}/guide/chinese-zodiac)
- [Feng Shui](${BASE_URL}/guide/feng-shui) · [Face Reading](${BASE_URL}/guide/face-reading)
- [Dream Interpretation](${BASE_URL}/guide/dream-meaning) · [Lucky Numbers](${BASE_URL}/guide/lucky-numbers)

## Daily Content
- [Daily I Ching](${BASE_URL}/daily) · [World Cup Predictions](${BASE_URL}/world-cup)

## Languages
English, Russian, Japanese, Korean.

## About
Algorithmic cultural interpretations from classical Chinese texts (Zhouyi, Tong Shu). Entertainment purposes.
RSS: ${BASE_URL}/api/rss`;
    return new NextResponse(content, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  // Block known aggressive bots
  const ua = req.headers.get("user-agent");
  if (isBadBot(ua)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Rate limit + CSRF for API routes
  if (req.nextUrl.pathname.startsWith("/api/")) {
    const rateLimit = checkRateLimit(req);
    if (rateLimit) return rateLimit;

    const csrf = checkCsrf(req);
    if (csrf) return csrf;

    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!_next|_vercel|favicon.ico|fonts|.*\\..*).*)",
    "/api/(.*)",
  ],
};
