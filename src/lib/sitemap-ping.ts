import { BASE_URL, BASE_HOST } from "@/lib/config";

const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;
const INDEXNOW_KEY = "b8f3a2d1c7e4569f0a1234b5678c9d0e";
const HOST = BASE_HOST;

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
  {
    name: "Naver",
    url: `https://apis.naver.com/searchadvisor/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  },
  {
    name: "Yandex",
    url: `https://webmaster.yandex.ru/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  },
];

function buildIndexNowUrls(): string[] {
  const staticPaths = [
    "", "/naming", "/calendar", "/divination", "/palm-reading",
    "/guide/chinese-name", "/guide/chinese-name-boy", "/guide/chinese-name-girl",
    "/guide/iching", "/guide/iching-beginner", "/guide/auspicious-dates",
    "/guide/wedding-dates-2026", "/guide/chinese-zodiac", "/guide/five-elements",
    "/guide/chinese-new-year-2027", "/guide/lucky-numbers",
    "/world-cup", "/snake-2027",
    "/guide/feng-shui", "/guide/face-reading", "/guide/dream-meaning",
    "/tools/dream-ai", "/tools/zodiac-match", "/tools/daily-fortune", "/tools/name-preview",
  ];

  // Last 30 daily pages
  const dailyPaths: string[] = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dailyPaths.push(`/daily/${d.toISOString().slice(0, 10)}`);
  }

  // World Cup daily prediction pages (full tournament schedule)
  const wcPaths: string[] = [];
  const wcStart = new Date("2026-06-11");
  const wcEnd = new Date("2026-07-19");
  for (let d = new Date(wcStart); d <= wcEnd; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    wcPaths.push(`/daily/world-cup/${dateStr}`);
  }

  const allPaths = [...staticPaths, ...dailyPaths, ...wcPaths];
  const urls: string[] = [];
  for (const path of allPaths) {
    urls.push(`https://${HOST}${path}`);
    urls.push(`https://${HOST}/ru${path}`);
    urls.push(`https://${HOST}/ja${path}`);
    urls.push(`https://${HOST}/ko${path}`);
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
