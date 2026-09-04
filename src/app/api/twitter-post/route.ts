// GET /api/twitter-post?token=...&lang=en — post today's daily hexagram to X/Twitter
// (营销第 2 步 — 每日一卦自动化, replaces the old world-cup placeholder)
// POST /api/twitter-post?token=... { text } — post an arbitrary tweet

import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedPost } from "@/lib/social/auth";
import { getDailySocialPosts, type SocialPostTexts } from "@/lib/social/content";
import { postTweet, twitterConfigured } from "@/lib/social/twitter";
import { renderHexagramCardPng } from "@/lib/social/images";
import { allHexagrams } from "@/data/hexagrams";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!isAuthorizedPost(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!twitterConfigured()) {
    return NextResponse.json({
      ok: false,
      reason: "Twitter not configured. Set TWITTER_API_KEY / TWITTER_API_SECRET / TWITTER_ACCESS_TOKEN / TWITTER_ACCESS_SECRET.",
    });
  }

  const lang = (req.nextUrl.searchParams.get("lang") || "en") as "en" | "ru" | "ja" | "ko";
  const withImage = req.nextUrl.searchParams.get("image") !== "0"; // default: attach card image

  try {
    const social = getDailySocialPosts();
    const posts = social.posts;
    const texts: SocialPostTexts = posts[lang] || posts.en;
    const hex = allHexagrams.find((x) => x.id === social.hexagram.id);

    let media: Buffer | undefined;
    if (withImage && hex) {
      media = await renderHexagramCardPng(hex, social.date);
    }

    const { id } = await postTweet(texts.twitter, media);
    return NextResponse.json({ ok: true, tweetId: id, lang, withImage: Boolean(media) });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedPost(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!twitterConfigured()) {
    return NextResponse.json({ ok: false, reason: "Twitter not configured." });
  }
  try {
    const body = (await req.json()) as { text?: string };
    if (!body.text || typeof body.text !== "string") {
      return NextResponse.json({ error: "Text required" }, { status: 400 });
    }
    const { id } = await postTweet(body.text);
    return NextResponse.json({ ok: true, tweetId: id });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

