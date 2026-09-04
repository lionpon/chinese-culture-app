// Reddit posting (营销第 2 步 — 高意图社区参与导流, e.g. r/iching)
// OAuth2 "script" app + password grant. Create the app at
// https://www.reddit.com/prefs/apps (type: script), then set the four env vars.
// ⚠️ Engagement rule: post a substantive self-post (the daily reading itself) and let
// the comments drive traffic — never spam bare links. Respect each subreddit's rules.


const USER_AGENT = "chinese-culture-studio/1.0 (daily I Ching posting; contact: webmaster@culture-of-china.com)";

export function redditConfigured(): boolean {
  return !!(
    process.env.REDDIT_CLIENT_ID &&
    process.env.REDDIT_CLIENT_SECRET &&
    process.env.REDDIT_USERNAME &&
    process.env.REDDIT_PASSWORD &&
    process.env.REDDIT_SUBREDDIT
  );
}

let _tokenCache: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (_tokenCache && Date.now() < _tokenCache.expiresAt - 60_000) {
    return _tokenCache.token;
  }
  const res = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": USER_AGENT,
    },
    body: new URLSearchParams({
      grant_type: "password",
      username: process.env.REDDIT_USERNAME!,
      password: process.env.REDDIT_PASSWORD!,
    }),
    signal: AbortSignal.timeout(15_000),
  });
  const data = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
  };
  if (!res.ok || !data.access_token) {
    throw new Error(`Reddit auth failed: HTTP ${res.status} ${data.error || ""}`);
  }
  _tokenCache = { token: data.access_token, expiresAt: Date.now() + (data.expires_in || 3600) * 1000 };
  return _tokenCache.token;
}

export interface SubmitResult {
  id?: string;
  url?: string;
  error?: string;
}

/** Submit a self-post (text post) to the configured subreddit. */
export async function submitSelfPost(opts: {
  title: string;
  text: string;
}): Promise<SubmitResult> {
  const token = await getAccessToken();
  const res = await fetch("https://oauth.reddit.com/api/submit", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "User-Agent": USER_AGENT,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      sr: process.env.REDDIT_SUBREDDIT!,
      kind: "self",
      title: opts.title.slice(0, 300),
      text: opts.text,
    }),
    signal: AbortSignal.timeout(20_000),
  });
  const data = (await res.json().catch(() => ({}))) as {
    json?: { data?: { id?: string; url?: string } };
    error?: unknown;
  };
  if (!res.ok || !data.json?.data?.id) {
    return { error: `Reddit submit failed: HTTP ${res.status} ${JSON.stringify(data.error || data)}`.slice(0, 300) };
  }
  return { id: data.json.data.id, url: data.json.data.url };
}

