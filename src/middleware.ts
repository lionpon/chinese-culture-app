import createMiddleware from "next-intl/middleware";
import { defaultLocale } from "@/i18n-config";
import { NextRequest, NextResponse } from "next/server";
import { isBadBot, checkRateLimit, checkCsrf } from "@/lib/security";

const intlMiddleware = createMiddleware({
  locales: ["en", "ru", "ja", "ko"],
  defaultLocale,
  localePrefix: "as-needed",
});

export default function middleware(req: NextRequest) {
  // Skip static file requests (llms.txt, robots.txt, sitemap.xml, etc.)
  if (/\.(txt|ico|png|svg|xml|json)$/.test(req.nextUrl.pathname)) {
    return NextResponse.next();
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
