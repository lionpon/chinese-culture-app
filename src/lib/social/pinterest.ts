// Pinterest posting (营销第 2 步 — 图钉流：卦象图 / 生肖运势图)
// Pinterest API v5: business account required. Create an app at
// developers.pinterest.com, request scopes boards:read / boards:write / pins:read / pins:write,
// then complete the OAuth 2.0 flow to obtain a long-lived access token.


export function pinterestConfigured(): boolean {
  return !!(process.env.PINTEREST_ACCESS_TOKEN && process.env.PINTEREST_BOARD_ID);
}

export interface PinResult {
  id?: string;
  error?: string;
}

/** Create a pin from a publicly reachable image URL. */
export async function createPin(opts: {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
}): Promise<PinResult> {
  const res = await fetch("https://api.pinterest.com/v5/pins", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PINTEREST_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      board_id: process.env.PINTEREST_BOARD_ID,
      title: opts.title.slice(0, 100),
      description: opts.description.slice(0, 500),
      link: opts.link,
      media_source: {
        source_type: "image_url",
        url: opts.imageUrl,
        content_type: "image/png",
      },
    }),
    signal: AbortSignal.timeout(20_000),
  });

  const data = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
  if (!res.ok) {
    return { error: `Pinterest HTTP ${res.status}: ${data.message || "unknown error"}` };
  }
  return { id: data.id };
}

