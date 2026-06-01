import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { page } = await req.json();
    const country =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      "Unknown";
    const city = req.headers.get("cf-ipcity") || "";
    const region = req.headers.get("cf-ipregion") || "";
    const referrer = req.headers.get("referer") || "";

    await prisma.visit.create({
      data: { page, country, city, region, referrer },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
