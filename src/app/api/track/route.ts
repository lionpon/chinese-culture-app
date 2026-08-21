import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isDatacenterIp, isDatacenterCity, isCountryRateSaturated, isHighRiskScraperCountry, COUNTRY_DAILY_MAX, COUNTRY_DAILY_WINDOW_MS } from "@/lib/bot-filter";

// Rate limiter: block IPs making > 5 requests in 10 seconds (crawler signature)
const rateMap = new Map<string, number[]>();
const RATE_WINDOW_MS = 10_000;
const RATE_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateMap.get(ip) || [];
  const recent = timestamps.filter(t => now - t < RATE_WINDOW_MS);
  recent.push(now);
  rateMap.set(ip, recent);
  if (recent.length > 200) rateMap.delete(ip); // cleanup stale entries
  return recent.length > RATE_MAX;
}

async function lookupGeo(ip: string): Promise<{ country: string; city: string; region: string }> {
  // Primary: ipapi.co (HTTPS, 1000/day free, no key required)
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: AbortSignal.timeout(3000),
      headers: { "User-Agent": "ChineseCultureStudio/1.0" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.country_code && !data.error) {
        return {
          country: data.country_code || "Unknown",
          city: data.city || "",
          region: data.region || "",
        };
      }
    }
  } catch { /* fall through to backup */ }

  // Backup: ip-api.com (HTTP only on free tier, may be blocked by some hosts)
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode,city,regionName`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.countryCode) {
        return {
          country: data.countryCode,
          city: data.city || "",
          region: data.regionName || "",
        };
      }
    }
  } catch { /* fall through */ }

  return { country: "Unknown", city: "", region: "" };
}

export async function POST(req: NextRequest) {
  try {
    // ── Skip tracking when test mode cookie is set ──
    const testMode = req.cookies.get("cc_test_mode")?.value;
    if (testMode === "1") {
      return NextResponse.json({ ok: true, skipped: "test" });
    }

    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "";

    // ── Rate limit: block crawlers making rapid-fire requests ──
    if (ip && isRateLimited(ip)) {
      return NextResponse.json({ ok: true, skipped: "rate_limit" });
    }

    const { page, event, referrer: payloadReferrer } = await req.json();

    const countryHeader =
      req.headers.get("cf-ipcountry") ||
      req.headers.get("x-vercel-ip-country") ||
      "";

    let country = countryHeader || "Unknown";

    // ── Country-level rate limit: throttle high-risk scraper countries ──
    if (isCountryRateSaturated(country)) {
      return NextResponse.json({ ok: true, skipped: "country_rate_limit" });
    }

    // ── Country daily quota (DB-backed, restart-proof) ──
    // In-memory Map was reset by Render deploys/restarts (8/13 deploy day = 14 RU
    // writes vs quota 5). Counting existing rows in DB survives restarts.
    if (isHighRiskScraperCountry(country)) {
      const dayAgo = new Date(Date.now() - COUNTRY_DAILY_WINDOW_MS);
      const dailyWrites = await prisma.visit.count({
        where: { country, createdAt: { gte: dayAgo } },
      });
      if (dailyWrites >= COUNTRY_DAILY_MAX) {
        return NextResponse.json({ ok: true, skipped: "country_daily_quota" });
      }
    }

    let city = "";
    let region = "";

    // cf-ipcountry alone doesn't give city; use ip-api for city detail
    if (ip && ip !== "127.0.0.1" && ip !== "::1") {
      const geo = await lookupGeo(ip);
      country = geo.country || country;
      city = geo.city;
      region = geo.region;
    }

    // Attribution: prefer the client-sent document.referrer (the request's own
    // Referer header is always our own page URL, useless for acquisition).
    // Internal navigation and direct visits are stored as "".
    const OWN_DOMAINS = ["culture-of-china.com", "localhost", "127.0.0.1"];
    const isOwn = (ref: string) => OWN_DOMAINS.some((d) => ref.includes(d));
    let referrer = typeof payloadReferrer === "string" ? payloadReferrer.trim() : "";
    if (referrer && isOwn(referrer)) referrer = "";
    if (!referrer) {
      const headerRef = req.headers.get("referer") || "";
      if (headerRef && !isOwn(headerRef)) referrer = headerRef;
    }

    // Click events use __click__: prefix so report can separate them from page views
    const storedPage = event ? `__click__:${event}` : page;

    const isDC = isDatacenterIp(ip) || isDatacenterCity(city, region) || (isHighRiskScraperCountry(country) && !city);

    await prisma.visit.create({
      data: { page: storedPage, country, city, region, referrer, isDatacenter: isDC },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
