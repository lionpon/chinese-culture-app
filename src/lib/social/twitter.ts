// X / Twitter posting (营销第 2 步 — 每日一卦自动化)
// OAuth 1.0a user-context client via twitter-api-v2.
// Credentials: developer portal (https://developer.x.com) → create app with
// Read and Write permissions → generate API Key / API Secret / Access Token / Access Secret.

import { TwitterApi } from "twitter-api-v2";

export function twitterConfigured(): boolean {
  return !!(
    process.env.TWITTER_API_KEY &&
    process.env.TWITTER_API_SECRET &&
    process.env.TWITTER_ACCESS_TOKEN &&
    process.env.TWITTER_ACCESS_SECRET
  );
}

function client(): TwitterApi {
  return new TwitterApi({
    appKey: process.env.TWITTER_API_KEY!,
    appSecret: process.env.TWITTER_API_SECRET!,
    accessToken: process.env.TWITTER_ACCESS_TOKEN!,
    accessSecret: process.env.TWITTER_ACCESS_SECRET!,
  });
}

export interface TweetResult {
  id: string;
}

/** Post a tweet, optionally with one PNG image attached. Returns tweet id. */
export async function postTweet(text: string, mediaPng?: Buffer): Promise<TweetResult> {
  const c = client();
  let mediaId: string | undefined;
  if (mediaPng) {
    mediaId = await c.v1.uploadMedia(mediaPng, { mimeType: "image/png" });
  }
  const res = await c.v2.tweet({
    text,
    ...(mediaId ? { media: { media_ids: [mediaId] } } : {}),
  });
  return { id: res.data.id };
}

