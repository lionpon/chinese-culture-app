import { NextRequest, NextResponse } from "next/server";
import { generateReport } from "@/lib/report";
import { pingSitemaps } from "@/lib/sitemap-ping";
import { sendDailyHexagramEmail } from "@/lib/email";
import { BASE_URL } from "@/lib/config";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const today = new Date().toISOString().slice(0, 10);
  const results: Record<string, unknown> = { date: today };

  // 1. Generate daily report (idempotent, safe)
  try {
    await generateReport(today);
    results.report = "ok";
  } catch (err) {
    results.report = { error: String(err) };
  }

  // 2. Ping sitemaps to all search engines
  try {
    const sitemapResults = await pingSitemaps();
    results.sitemaps = sitemapResults;
  } catch (err) {
    results.sitemaps = { error: String(err) };
  }

  // 3. Send daily email digest via Resend
  try {
    const emailOk = await sendDailyHexagramEmail();
    results.email = emailOk ? "sent" : "skipped (not configured)";
  } catch (err) {
    results.email = { error: String(err) };
  }

  // 4. Telegram push (needs auth via token)
  const token = req.nextUrl.searchParams.get("token");
  const expected = process.env.ADMIN_TOKEN || process.env.CRON_SECRET || "";
  const telegramResults: Record<string, string> = {};
  const secret = process.env.TELEGRAM_POST_SECRET;

  if (token && token === expected && secret) {
    for (const lang of ["en", "ru", "ja", "ko"]) {
      try {
        const res = await fetch(`${BASE_URL}/api/telegram-post?token=${secret}&lang=${lang}`);
        const body = await res.json().catch(() => ({}));
        telegramResults[lang] = (body as Record<string, unknown>).ok ? "ok" : `status: ${res.status}`;
      } catch (err) {
        telegramResults[lang] = `error: ${String(err)}`;
      }
    }
    results.telegram = telegramResults;
  } else if (!secret) {
    results.telegram = "skipped (no TELEGRAM_POST_SECRET)";
  } else {
    results.telegram = "skipped (no auth token)";
  }

  // 5. Warm all 4 locale homepages + world-cup
  const warmResults: Record<string, string> = {};
  for (const lang of ["", "ru", "ja", "ko"]) {
    const path = lang ? `/${lang}` : "";
    try {
      const res = await fetch(`${BASE_URL}${path}`, { signal: AbortSignal.timeout(15_000) });
      warmResults[lang || "en"] = `HTTP ${res.status}`;
    } catch (err) {
      warmResults[lang || "en"] = `error: ${String(err)}`;
    }
  }
  // Warm world-cup page (high-traffic during tournament)
  for (const lang of ["", "ru", "ja", "ko"]) {
    const path = lang ? `/${lang}/world-cup` : "/world-cup";
    try {
      const res = await fetch(`${BASE_URL}${path}`, { signal: AbortSignal.timeout(15_000) });
      warmResults[`wc/${lang || "en"}`] = `HTTP ${res.status}`;
    } catch (err) {
      warmResults[`wc/${lang || "en"}`] = `error: ${String(err)}`;
    }
  }
  results.warmup = warmResults;

  return NextResponse.json(results);
}
