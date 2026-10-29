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

// 双认证模式（2026-10-29 用户建议）:
//   A) 服务账号（首选, 用户的另一项目已验证路径）: GOOGLE_SERVICE_ACCOUNT_JSON（单行 JSON）
//   B) OAuth refresh token（备选）: GOOGLE_CLIENT_ID/SECRET/REFRESH_TOKEN
// 注意: GSC 官方文档对服务账号支持说法模糊, 需在 GSC 资源里把服务账号邮箱加为「完整权限」用户
export function gscEnabled(): boolean {
  return !!(process.env.GOOGLE_SERVICE_ACCOUNT_JSON ||
    (process.env.GOOGLE_REFRESH_TOKEN && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET));
}

export function gscMode(): "serviceAccount" | "oauth" | null {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) return "serviceAccount";
  if (process.env.GOOGLE_REFRESH_TOKEN) return "oauth";
  return null;
}

let cachedToken: { value: string; expiresAt: number } | null = null;

/** 服务账号 JWT 换取 access token（RSA 私钥签名, 走 oauth2.googleapis.com） */
async function getSaAccessToken(): Promise<string> {
  const sa = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "{}");
  if (!sa.client_email || !sa.private_key) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON 缺少 client_email/private_key");
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const b64 = (obj: object) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  const unsigned = b64(header) + "." + b64(claim);
  const crypto = await import("crypto");
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  const signature = signer.sign(sa.private_key, "base64url");
  const jwt = unsigned + "." + signature;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) throw new Error("SA token failed: " + res.status + " " + (await res.text()).slice(0, 200));
  const data = await res.json();
  return data.access_token;
}

async function getOAuthAccessToken(): Promise<string> {
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
  return data.access_token;
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60000) return cachedToken.value;
  const value = gscMode() === "serviceAccount" ? await getSaAccessToken() : await getOAuthAccessToken();
  cachedToken = { value, expiresAt: Date.now() + 3500 * 1000 };
  return value;
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
  if (!gscEnabled()) return { skipped: "no GSC credentials" };
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
