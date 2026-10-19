// GET /api/reddit-promo?token=...&variant=girls|boys[&dry=1]
// 产品轨引流帖 — 人工触发(营销第 2 步,2026-10-19 新增)
// 门控:REDDIT_PROMO_ENABLED=1 + redditConfigured() 双开关;dry=1 只预览不发帖。

import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedPost } from "@/lib/social/auth";
import { redditConfigured, submitSelfPost } from "@/lib/social/reddit";
import { getNamingPromoPost } from "@/lib/social/naming-promo";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!isAuthorizedPost(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const variant = req.nextUrl.searchParams.get("variant") || undefined;
  const dry = req.nextUrl.searchParams.get("dry") === "1";
  const post = getNamingPromoPost(variant);

  // dry=1 只预览文案 — 不依赖凭证,发帖前人工审核用
  if (dry) {
    return NextResponse.json({ ok: true, dry: true, variant: post.variant, title: post.title, text: post.text });
  }

  if (!redditConfigured()) {
    return NextResponse.json({
      ok: false,
      reason: "Reddit not configured. Set REDDIT_CLIENT_ID / REDDIT_CLIENT_SECRET / REDDIT_USERNAME / REDDIT_PASSWORD / REDDIT_SUBREDDIT.",
    });
  }
  if (process.env.REDDIT_PROMO_ENABLED !== "1") {
    return NextResponse.json({ ok: false, reason: "REDDIT_PROMO_ENABLED != 1 — promo track is off" });
  }

  try {
    const result = await submitSelfPost({ title: post.title, text: post.text.replace("{LINK}", post.link) });
    if (result.error) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
    }
    return NextResponse.json({ ok: true, postId: result.id, url: result.url, variant: post.variant });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
