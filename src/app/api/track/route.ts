import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

async function lookupGeo(ip: string): Promise<{ country: string; city: string; region: string }> {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode,city,regionName`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error("geo lookup failed");
    const data = await res.json();
    return {
      country: data.countryCode || "Unknown",
      city: data.city || "",
      region: data.regionName || "",
    };
  } catch {
    return { country: "Unknown", city: "", region: "" };
  }
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
