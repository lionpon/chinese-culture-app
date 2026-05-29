const SITEMAP_URL = "https://chinese-culture-app.onrender.com/sitemap.xml";

const ENGINES: { name: string; url: string }[] = [
  {
    name: "Google",
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  },
  {
    name: "Bing",
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  },
];

export async function pingSitemaps() {
  const results = await Promise.allSettled(
    ENGINES.map(async (engine) => {
      try {
        const res = await fetch(engine.url, { method: "GET", signal: AbortSignal.timeout(10_000) });
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
