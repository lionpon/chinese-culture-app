import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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
    const { page } = await req.json();

    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "";

    const countryHeader =
      req.headers.get("cf-ipcountry") ||
      req.headers.get("x-vercel-ip-country") ||
      "";

    let country = countryHeader || "Unknown";
    let city = "";
    let region = "";

    // cf-ipcountry alone doesn't give city; use ip-api for city detail
    if (ip && ip !== "127.0.0.1" && ip !== "::1") {
      const geo = await lookupGeo(ip);
      country = geo.country || country;
      city = geo.city;
      region = geo.region;
    }

    const referrer = req.headers.get("referer") || "";

    await prisma.visit.create({
      data: { page, country, city, region, referrer },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
