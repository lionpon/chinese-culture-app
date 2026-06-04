import { NextRequest, NextResponse } from "next/server";

// ── In-memory rate limiter (per-IP, resets on restart) ──

const rateMap = new Map<string, { count: number; resetAt: number }>();

const LIMITS: Record<string, { max: number; windowSec: number }> = {
  "/api/checkout": { max: 10, windowSec: 60 },
  "/api/webhook": { max: 30, windowSec: 60 },
  "/api/track": { max: 60, windowSec: 60 },
  "/api/report": { max: 5, windowSec: 60 },
  default: { max: 100, windowSec: 60 },
};

export function checkRateLimit(req: NextRequest): NextResponse | null {
  const path = req.nextUrl.pathname;
  const ip =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "127.0.0.1";

  const key = `${ip}:${path}`;
  const limit = LIMITS[path] ?? LIMITS.default;
  const now = Date.now();

  const entry = rateMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + limit.windowSec * 1000 });
    return null;
  }

  entry.count++;
  if (entry.count > limit.max) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  return null;
}

// ── CSRF check for mutation endpoints ──

const SAFE_METHODS = ["GET", "HEAD", "OPTIONS"];

export function checkCsrf(req: NextRequest): NextResponse | null {
  if (SAFE_METHODS.includes(req.method)) return null;

  const origin = req.headers.get("origin");
  if (!origin) return null; // same-origin requests or non-browser clients

  const allowedHosts = [
    "chinese-culture.app",
    "chinese-culture-app.onrender.com",
    "localhost:3000",
  ];

  let originHost: string;
  try {
    originHost = new URL(origin).hostname;
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const isAllowed = allowedHosts.some((h) => originHost === h);
  if (!isAllowed) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}

// ── Bot / crawler detection ──

const BOT_PATTERNS = [
  /bytespider/i,        // ByteDance / Toutiao
  /petalbot/i,          // Huawei
  /sogou/i,             // Sogou
  /yisouspider/i,       // Shenma
  /claudebot/i,         // Anthropic Claude
  /gptbot/i,            // OpenAI GPT
  /ccbot/i,             // Common Crawl (too aggressive)
  /ahrefsbot/i,         // Ahrefs SEO
  /semrushbot/i,        // Semrush
  /mj12bot/i,           // Majestic
  /dotbot/i,            // Moz
  /anthropic-ai/i,      // Anthropic AI training
  /cohere-ai/i,         // Cohere AI training
  /perplexity/i,        // Perplexity AI
  /amazonbot/i,         // Amazon crawler
  /googleother/i,       // Google non-search crawler
  /blexbot/i,           // WebMeUp crawler
];

export function isBadBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return BOT_PATTERNS.some((p) => p.test(userAgent));
}
