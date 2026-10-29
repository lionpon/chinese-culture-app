// GSC 自动报表 — 取代手动 CSV 导出的复核脚本（2026-10-29）
// 用法: node scripts/gsc-report.cjs            (近 30 天页面维度 + 查询词 TOP + 低CTR标记 + insights 页状态)
//       node scripts/gsc-report.cjs --days 90  (自定义窗口)
const fs = require("fs");
const envRaw = fs.readFileSync("D:/chinese culture/project2/.env", "utf8");
let dbUrl = envRaw.match(/^DATABASE_URL=(.+)$/m)[1].trim();
if (!dbUrl.includes("sslmode=")) dbUrl += (dbUrl.includes("?") ? "&" : "?") + "sslmode=prefer&connection_limit=1";
process.env.DATABASE_URL = dbUrl;
const { PrismaClient } = require("D:/chinese culture/project2/node_modules/@prisma/client");
const prisma = new PrismaClient();
const q = (sql) => prisma.$queryRawUnsafe(sql);

const daysIdx = process.argv.indexOf("--days");
const DAYS = daysIdx > -1 ? parseInt(process.argv[daysIdx + 1]) : 30;

(async () => {
  const since = new Date(Date.now() - DAYS * 86400000).toISOString().slice(0, 10);
  console.log(`=== GSC 自动报表 (近 ${DAYS} 天, 数据源: GscPerformance 表) ===`);
  console.log("");

  const pages = await q(`
    SELECT "dimKey" page, sum(clicks)::float clicks, sum(impressions)::float impr, avg(ctr)::float ctr, avg(position)::float pos
    FROM "GscPerformance" WHERE "dimType"='page' AND "date" >= '${since}'
    GROUP BY "dimKey" ORDER BY impr DESC LIMIT 15`);
  console.log("── 页面 TOP15 (曝光) ──");
  if (!pages.length) console.log("  (无数据 — 需先完成 OAuth 激活, 或数据尚未入库)");
  console.table(pages.map(r => ({ ...r, path: String(r.page).replace(/^https?:\/\/[^/]+/, "").slice(0, 44) })));

  const lowCtr = await q(`
    SELECT "dimKey" page, avg(ctr)::float ctr, sum(impressions)::float impr
    FROM "GscPerformance" WHERE "dimType"='page' AND "date" >= '${since}'
    GROUP BY "dimKey" HAVING sum(impressions) >= 100 AND avg(ctr) < 1
    ORDER BY impr DESC LIMIT 15`);
  console.log(""); console.log(`── 低 CTR 优化候选 (曝光≥100 且 CTR<1%, ${lowCtr.length} 个) ──`);
  console.table(lowCtr.map(r => ({ path: String(r.page).replace(/^https?:\/\/[^/]+/, "").slice(0, 44), ctr: (r.ctr * 100).toFixed(2) + "%", impr: r.impr })));

  const queries = await q(`
    SELECT "dimKey" query, sum(clicks)::float clicks, sum(impressions)::float impr, avg(position)::float pos
    FROM "GscPerformance" WHERE "dimType"='query' AND "date" >= '${since}'
    GROUP BY "dimKey" ORDER BY impr DESC LIMIT 20`);
  console.log(""); console.log("── 查询词 TOP20 (曝光) ──");
  console.table(queries);

  console.log(""); console.log("── insights 程序化文章 GSC 状态 ──");
  const arts = await q(`
    SELECT a.slug, COALESCE(sum(g.impressions), 0)::float impr, COALESCE(sum(g.clicks), 0)::float clicks
    FROM "ProgrammaticArticle" a
    LEFT JOIN "GscPerformance" g ON g."dimType"='page' AND g."dimKey" LIKE '%/insights/' || a.slug AND g."date" >= '${since}'
    GROUP BY a.slug ORDER BY impr DESC LIMIT 10`);
  console.table(arts);

  console.log(""); console.log("── 数据覆盖检查 ──");
  const cov = await q(`
    SELECT count(DISTINCT "date")::int days, max("date") latest, min("date") earliest
    FROM "GscPerformance" WHERE "date" >= '${since}'`);
  console.table(cov);
  process.exit(0);
})().catch(e => { console.error("ERROR:", e.message); process.exit(1); });
