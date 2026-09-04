// GET /api/reddit-post?token=...&lang=en — submit the daily hexagram as a self-post
// to the configured subreddit (e.g. r/iching) — 高意图社区参与导流
// (营销第 2 步 — Reddit 自动化)

import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedPost } from "@/lib/social/auth";
import { getDailySocialPosts, type SocialPostTexts } from "@/lib/social/content";
import { redditConfigured, submitSelfPost } from "@/lib/social/reddit";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!isAuthorizedPost(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!redditConfigured()) {
    return NextResponse.json({
      ok: false,
      reason: "Reddit not configured. Set REDDIT_CLIENT_ID / REDDIT_CLIENT_SECRET / REDDIT_USERNAME / REDDIT_PASSWORD / REDDIT_SUBREDDIT.",
    });
  }

  const lang = (req.nextUrl.searchParams.get("lang") || "en") as "en" | "ru" | "ja" | "ko";

  try {
    const social = getDailySocialPosts();
    const texts: SocialPostTexts = social.posts[lang] || social.posts.en;
    const { nameZh, nameEn, pinyin } = social.hexagram;

    const title =
      lang === "en"
        ? `Daily I Ching: ${nameZh} (${nameEn}) — ${social.date}`
        : `${nameZh} (${nameEn}, ${pinyin}) — ${social.date}`;

    const result = await submitSelfPost({ title, text: texts.reddit });

    if (result.error) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
    }
    return NextResponse.json({ ok: true, postId: result.id, url: result.url, lang });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

