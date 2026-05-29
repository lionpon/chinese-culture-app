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
      urlList: [
        `https://${HOST}`,
        `https://${HOST}/`,
        `https://${HOST}/naming`,
        `https://${HOST}/calendar`,
        `https://${HOST}/divination`,
        `https://${HOST}/palm-reading`,
        `https://${HOST}/ru`,
        `https://${HOST}/ru/`,
        `https://${HOST}/ru/naming`,
        `https://${HOST}/ru/calendar`,
        `https://${HOST}/ru/divination`,
        `https://${HOST}/ru/palm-reading`,
      ],
    }),
  },
];

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
