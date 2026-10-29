import { NextRequest, NextResponse } from "next/server";
import { generateReport } from "@/lib/report";
import { pingSitemaps } from "@/lib/sitemap-ping";
import { sendDailyHexagramEmail } from "@/lib/email";
import { runPurchaseRecovery } from "@/lib/purchase-recovery";
import { syncNflResultsFromEspn } from "@/lib/nfl-espn";
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

  // 1e. GSC 全链路自动化: 每日取数入库（Render 直连 Google; 无凭证静默跳过）
  try {
    const { fetchGscDaily } = await import("@/lib/gsc");
    results.gsc = await fetchGscDaily();
  } catch (err) {
    results.gsc = { error: String(err) };
  }

  // 1d. 续费 watchdog（RENEWAL_LEDGER.md）: 域名到期 ≤14 天自动邮件提醒
  try {
    const DOMAIN_EXPIRY = new Date("2027-06-11T13:04:21Z");
    const daysLeft = Math.ceil((DOMAIN_EXPIRY.getTime() - Date.now()) / 86400000);
    results.renewalWatchdog = daysLeft > 0 ? `${daysLeft} days until domain expiry` : "DOMAIN EXPIRED";
    if (daysLeft >= 0 && daysLeft <= 14) {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        const mailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({
            from: "Chinese Culture Studio <noreply@culture-of-china.com>",
            to: ["22728717@qq.com"],
            subject: `[续费提醒] culture-of-china.com 域名 ${daysLeft} 天后到期`,
            text: `域名 culture-of-china.com 将于 2027-06-11 到期（注册商 Dynadot），剩余 ${daysLeft} 天。请及时续费，避免整站不可访问。详情见 RENEWAL_LEDGER.md。`,
          }),
        });
        results.renewalWatchdog = { daysLeft, emailSent: mailRes.ok };
      } else {
        results.renewalWatchdog = { daysLeft, emailSent: false, note: "RESEND_API_KEY missing" };
      }
    }
  } catch (err) {
    results.renewalWatchdog = { error: String(err) };
  }

  // 1c. 程序化内容管线（A线, 2026-10-28）: 竞品热词 → 引擎生成 → 入库 → IndexNow
  try {
    const { runDailyContentPipeline } = await import("@/lib/programmatic-content");
    results.contentPipeline = await runDailyContentPipeline();
  } catch (err) {
    results.contentPipeline = { error: String(err) };
  }

  // 1b. Purchase recovery — conversion safety net:
  //     • unpaid pending >24h → abandoned (zombie cleanup)
  //     • paid=true pending without result → retry generation
  try {
    results.purchaseRecovery = await runPurchaseRecovery();
  } catch (err) {
    results.purchaseRecovery = { error: String(err) };
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
    results.email = emailOk ? "sent" : "skipped";
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

  // 6. Warm all pages (home, world-cup, nfl, snake-2027, AI tools)
  const warmResults: Record<string, string> = {};
  const pages = [
    "",
    "/world-cup",
    "/nfl",
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

  // 7. Sync NFL featured-game results from ESPN → Supabase "NflResult"
  //    (每周赛果自动更新：ESPN scoreboard API，幂等 upsert；页面读 DB 展示)
  try {
    results.nflSync = await syncNflResultsFromEspn();
  } catch (err) {
    results.nflSync = { error: String(err) };
  }

  return NextResponse.json(results);
}
