// GSC 全链路自动化 — 数据取数层（2026-10-29）
// 架构决策（用户授权 Claude 决定）: 取数跑在 Render（美国）直连 Google，不经过任何桥；
// 一次性 OAuth 授权在本地浏览器完成（用户 VPN/代理），token 存 Render 环境变量。
// 配额: Search Analytics ~100 请求/天/资源，本实现每日 2 请求（page + query 维度）。
import { prisma } from "@/lib/db";

const SITE_URL = "https://www.culture-of-china.com/";
const GSC_API = "https://www.googleapis.com/webmasters/v3/sites";

interface GscRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export function gscEnabled(): boolean {
  return !!(process.env.GOOGLE_REFRESH_TOKEN && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60000) return cachedToken.value;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN || "",
    }),
  });
  if (!res.ok) throw new Error("GSC token refresh failed: " + res.status);
  const data = await res.json();
  cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in || 3600) * 1000 };
  return cachedToken.value;
}

async function queryGsc(dimension: "page" | "query", startDate: string, endDate: string): Promise<GscRow[]> {
  const token = await getAccessToken();
  const res = await fetch(`${GSC_API}/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`, {
    method: "POST",
    headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({ startDate, endDate, dimensions: [dimension], rowLimit: 5000 }),
  });
  if (!res.ok) throw new Error("GSC query failed: " + res.status);
  const data = await res.json();
  return (data.rows || []) as GscRow[];
}

function isoDaysAgo(n: number): string {
  return new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);
}

/** 每日取数（数据滞后 ~3 天）：拉取 t-3 的 page + query 两维度并 upsert 入库 */
export async function fetchGscDaily() {
  if (!gscEnabled()) return { skipped: "no GOOGLE_REFRESH_TOKEN" };
  const day = isoDaysAgo(3);
  const results: Record<string, unknown> = { day };
  for (const dimType of ["page", "query"] as const) {
    try {
      const rows = await queryGsc(dimType, day, day);
      for (const r of rows) {
        await prisma.$executeRawUnsafe(
          `INSERT INTO "GscPerformance" ("id","date","dimType","dimKey","clicks","impressions","ctr","position")
           VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT ("date","dimType","dimKey") DO UPDATE SET clicks=EXCLUDED.clicks, impressions=EXCLUDED.impressions, ctr=EXCLUDED.ctr, position=EXCLUDED.position`,
          day, dimType, r.keys[0], r.clicks, r.impressions, r.ctr, r.position
        );
      }
      results[dimType] = rows.length;
    } catch (err) {
      results[dimType] = { error: String(err) };
    }
  }
  return results;
}

/** GSC 新查询词 → A 线内容管线候选（自家站点真实有曝光的词） */
export async function discoverGscQueryCandidates(): Promise<string[][]> {
  try {
    const rows = await prisma.$queryRawUnsafe<{ dimKey: string; impressions: number }[]>(
      `SELECT "dimKey", "impressions" FROM "GscPerformance"
       WHERE "dimType"='query' AND "date" >= to_char(now() - interval '10 days', 'YYYY-MM-DD')
         AND "impressions" >= 10
       ORDER BY "impressions" DESC LIMIT 200`
    );
    return rows.map(r => r.dimKey.toLowerCase().split(/\s+/).filter(t => t.length > 1));
  } catch {
    return [];
  }
}

/** 报表辅助：近 30 天页面维度汇总 */
export async function getGscPageSummary(days = 30) {
  try {
    return await prisma.$queryRawUnsafe<{ dimKey: string; clicks: number; impressions: number; ctr: number; position: number }[]>(
      `SELECT "dimKey", sum(clicks)::float clicks, sum(impressions)::float impressions,
              avg(ctr)::float ctr, avg(position)::float position
       FROM "GscPerformance" WHERE "dimType"='page' AND "date" >= to_char(now() - interval '${days} days', 'YYYY-MM-DD')
       GROUP BY "dimKey" ORDER BY impressions DESC LIMIT 50`
    );
  } catch {
    return [];
  }
}
