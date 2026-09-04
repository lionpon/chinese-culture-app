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

  // 5. Social matrix (营销第 2 步): Twitter / Pinterest / Reddit — each gated by env config.
  //    Twitter & Reddit default to en (Reddit target sub is r/iching, English-only).
  //    Pinterest pins cards for all 4 languages.
  const socialLangs = (process.env.SOCIAL_LANGS || "en,ru,ja,ko").split(",").map((s) => s.trim()).filter(Boolean);

  // Twitter
  if (process.env.TWITTER_API_KEY) {
    const twitterResults: Record<string, string> = {};
    for (const lang of socialLangs) {
      try {
        const res = await fetch(`${BASE_URL}/api/twitter-post?token=${secret || expected}&lang=${lang}`);
        const body = await res.json().catch(() => ({}));
        twitterResults[lang] = body.ok ? `ok (id ${body.tweetId})` : `failed: ${body.reason || body.error || res.status}`;
      } catch (err) {
        twitterResults[lang] = `error: ${String(err)}`;
      }
    }
    results.twitter = twitterResults;
  } else {
    results.twitter = "skipped (no TWITTER_API_KEY)";
  }

  // Pinterest — card images served from /api/social/card
  if (process.env.PINTEREST_ACCESS_TOKEN) {
    const pinterestResults: Record<string, string> = {};
    for (const lang of socialLangs) {
      try {
        const res = await fetch(`${BASE_URL}/api/pinterest-post?token=${secret || expected}&lang=${lang}`);
        const body = await res.json().catch(() => ({}));
        pinterestResults[lang] = body.ok ? `ok (id ${body.pinId})` : `failed: ${body.reason || body.error || res.status}`;
      } catch (err) {
        pinterestResults[lang] = `error: ${String(err)}`;
      }
    }
    results.pinterest = pinterestResults;
  } else {
    results.pinterest = "skipped (no PINTEREST_ACCESS_TOKEN)";
  }

  // Reddit — en only (r/iching)
  if (process.env.REDDIT_CLIENT_ID) {
    try {
      const res = await fetch(`${BASE_URL}/api/reddit-post?token=${secret || expected}&lang=en`);
      const body = await res.json().catch(() => ({}));
      results.reddit = body.ok ? `ok (id ${body.postId})` : `failed: ${body.reason || body.error || res.status}`;
    } catch (err) {
      results.reddit = `error: ${String(err)}`;
    }
  } else {
    results.reddit = "skipped (no REDDIT_CLIENT_ID)";
  }

  // 6. Warm all pages (home, world-cup, snake-2027, AI tools)
  const warmResults: Record<string, string> = {};
  const pages = [
    "",
    "/world-cup",
    "/snake-2027",
    "/tools/dream-ai",
    "/tools/zodiac-match",
    "/tools/daily-fortune",
    "/tools/name-preview",
    "/tools/quick-oracle",
    "/tools/zodiac-calculator",
    "/tools/five-elements-test",
  ];
  for (const lang of ["", "ru", "ja", "ko"]) {
    for (const page of pages) {
      const path = lang ? `/${lang}${page}` : page || "/";
      const key = `${lang || "en"}${page || "/"}`;
      try {
        const res = await fetch(`${BASE_URL}${path}`, { signal: AbortSignal.timeout(15_000) });
        warmResults[key] = `HTTP ${res.status}`;
      } catch (err) {
        warmResults[key] = `error: ${String(err)}`;
      }
    }
  }
  results.warmup = warmResults;

  return NextResponse.json(results);
}
