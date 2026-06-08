import { NextResponse } from "next/server";
import { getDailyPredictions } from "@/lib/world-cup";

// Twitter post API — ready but gated behind TWITTER_ENABLED env var.
// When user gets a Twitter account and API key, set TWITTER_ENABLED=true
// and configure the Twitter API credentials.

export async function GET() {
  const enabled = process.env.TWITTER_ENABLED === "true";

  if (!enabled) {
    return NextResponse.json({
      ok: false,
      reason: "Twitter integration not enabled. Set TWITTER_ENABLED=true to activate.",
    });
  }

  const predictions = getDailyPredictions();
  if (predictions.length === 0) {
    return NextResponse.json({ ok: true, message: "No matches today.", predictions: [] });
  }

  // Build tweet text for today's matches
  const tweets = predictions.map((p) => {
    const hex = p.hexagram;
    const text = `⚽ ${p.match.home} vs ${p.match.away}
🔮 I Ching Hexagram ${hex.id}: ${hex.nameEn} (${hex.nameZh})
📜 "${hex.judgmentEn}"
💭 ${p.footballInterpretation}

#WorldCup2026 #IChing #${p.match.home.replace(/\s+/g, "")} #${p.match.away.replace(/\s+/g, "")}`;

    return { matchId: p.match.id, text: text.slice(0, 280) };
  });

  // TODO: When Twitter API credentials are configured, post tweets here
  // const Twitter = require("twitter-api-v2");
  // const client = new Twitter.TwitterApi({ ... });
  // for (const t of tweets) { await client.v2.tweet(t.text); }

  return NextResponse.json({
    ok: true,
    message: `Generated ${tweets.length} tweets (not posted — TWITTER_ENABLED is true but API client not yet implemented).`,
    tweets,
  });
}
