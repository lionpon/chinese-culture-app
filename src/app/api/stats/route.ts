import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

let cached: { countries: number; readings: number; ts: number } | null = null;
const TTL = 300_000; // 5 min

export async function GET() {
  try {
    if (cached && Date.now() - cached.ts < TTL) {
      return NextResponse.json(
        { countries: cached.countries, readings: cached.readings },
        { headers: { "Cache-Control": "public, max-age=300, s-maxage=300" } }
      );
    }

    const [countryRows, readings] = await Promise.all([
      prisma.visit.findMany({ distinct: ["country"], select: { country: true } }),
      prisma.purchase.count({ where: { status: "completed" } }),
    ]);

    const countries = countryRows.filter((r) => r.country !== "Unknown" && r.country !== "").length;

    cached = { countries, readings, ts: Date.now() };

    return NextResponse.json(
      { countries, readings },
      { headers: { "Cache-Control": "public, max-age=300, s-maxage=300" } }
    );
  } catch {
    return NextResponse.json(
      { countries: cached?.countries ?? 0, readings: cached?.readings ?? 0 },
      { headers: { "Cache-Control": "public, max-age=30" } }
    );
  }
}
