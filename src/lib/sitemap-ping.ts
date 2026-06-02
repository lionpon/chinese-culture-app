const SITEMAP_URL = "https://chinese-culture-app.onrender.com/sitemap.xml";
const INDEXNOW_KEY = "b8f3a2d1c7e4569f0a1234b5678c9d0e";
const HOST = "chinese-culture-app.onrender.com";

const ENGINES: { name: string; url: string; method?: string; body?: string }[] = [
  {
    name: "Google",
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  },
  {
    name: "Bing",
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  },
  {
    name: "IndexNow",
    method: "POST",
    url: "https://api.indexnow.org/indexnow",
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
      urlList: buildIndexNowUrls(),
    }),
  },
];

function buildIndexNowUrls(): string[] {
  const staticPaths = [
    "", "/naming", "/calendar", "/divination", "/palm-reading",
    "/guide/chinese-name", "/guide/chinese-name-boy", "/guide/chinese-name-girl",
    "/guide/iching", "/guide/iching-beginner", "/guide/auspicious-dates",
    "/guide/wedding-dates-2026", "/guide/chinese-zodiac", "/guide/five-elements",
    "/guide/chinese-new-year-2027",
  ];

  // Last 30 daily pages
  const dailyPaths: string[] = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dailyPaths.push(`/daily/${d.toISOString().slice(0, 10)}`);
  }

  const allPaths = [...staticPaths, ...dailyPaths];
  const urls: string[] = [];
  for (const path of allPaths) {
    urls.push(`https://${HOST}${path}`);
    urls.push(`https://${HOST}/ru${path}`);
    urls.push(`https://${HOST}/ja${path}`);
  }
  return urls;
}

export async function pingSitemaps() {
  const results = await Promise.allSettled(
    ENGINES.map(async (engine) => {
      try {
        const init: RequestInit = { signal: AbortSignal.timeout(10_000) };
        if (engine.method === "POST") {
          init.method = "POST";
          init.headers = { "Content-Type": "application/json" };
          init.body = engine.body;
        }
        const res = await fetch(engine.url, init);
        const ok = res.ok;
        console.log(`[sitemap-ping] ${engine.name}: ${res.status} ${ok ? "OK" : "FAIL"}`);
        return { name: engine.name, status: res.status, ok };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`[sitemap-ping] ${engine.name}: ${message}`);
        return { name: engine.name, status: 0, ok: false, error: message };
      }
    })
  );
  return results;
}
