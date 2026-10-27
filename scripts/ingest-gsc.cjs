// GSC 效果数据 CSV 消费管线 — 2026-10-27 接入（所有权自动验证通过，无 token）
// 用法: node scripts/ingest-gsc.cjs <csv文件路径> [--since 2026-10-27]
//   GSC「成效/效果」页 → 匯出 CSV（查询维度 或 网页维度 均可）→ 放桌面 → 本脚本解析并与 Visit 表 join
// 说明: GSC CSV 不含日期列（聚合所选区间），Visit join 默认取近 28 天；区间不符用 --since 指定
const fs = require("fs");

const csvPath = process.argv[2];
const sinceIdx = process.argv.indexOf("--since");
const sinceStr = sinceIdx > -1 ? process.argv[sinceIdx + 1] : null;

if (!csvPath) {
  console.log("用法: node scripts/ingest-gsc.cjs <gsc导出的csv> [--since 2026-10-27]");
  process.exit(1);
}

const raw = fs.readFileSync(csvPath, "utf8").replace(/^\uFEFF/, ""); // 去 BOM
const lines = raw.split(/\r?\n/).filter(l => l.trim() !== "");
if (lines.length < 2) { console.error("CSV 为空或只有表头"); process.exit(1); }

// 简单 CSV 解析（GSC 导出无引号内逗号问题，够用）
const parseRow = (l) => l.split(",").map(s => s.trim());
const header = parseRow(lines[0]);
const rows = lines.slice(1).map(parseRow);

// 表头语言自适应（zh-CN / zh-TW / en）
function findCol(...names) {
  const i = header.findIndex(h => names.some(n => h.toLowerCase().includes(n.toLowerCase())));
  return i;
}
const queryCol = findCol("查詢", "查询", "queries");
const pageCol = findCol("網頁", "网页", "pages");
const clickCol = findCol("點擊", "点击", "clicks");
const imprCol = findCol("曝光", "展示", "impressions");
const ctrCol = findCol("點閱率", "点击率", "ctr");
const posCol = findCol("排名", "position");

if (clickCol === -1 || imprCol === -1) {
  console.error("未识别 GSC CSV 表头。当前表头:", header.join(","));
  console.error("预期包含: 查询/网页 + 点击次数 + 曝光次数 + 点击率 + 排名");
  process.exit(1);
}
const dimension = queryCol > -1 ? "query" : pageCol > -1 ? "page" : null;
if (!dimension) { console.error("缺少维度列(查询/网页)"); process.exit(1); }
const dimCol = queryCol > -1 ? queryCol : pageCol;

const num = (s) => { const n = parseFloat(String(s).replace(/,/g, "").replace(/%/g, "")); return isNaN(n) ? 0 : n; };
const data = rows.map(r => ({
  dim: r[dimCol],
  clicks: num(r[clickCol]),
  impressions: num(r[imprCol]),
  ctr: r[ctrCol] || "",
  position: num(r[posCol]),
})).filter(r => r.dim && r.impressions >= 0);

const sum = (f) => data.reduce((a, r) => a + f(r), 0);
console.log(`=== GSC CSV 解析 (${dimension === "query" ? "查询" : "网页"}维度, ${data.length} 行) ===`);
console.log(`合计: 点击 ${sum(r => r.clicks)} / 曝光 ${sum(r => r.impressions)} / 平均排名 ${(sum(r => r.position * r.impressions) / Math.max(1, sum(r => r.impressions))).toFixed(1)}\n`);

// 标记低 CTR 高曝光行（title/meta 优化候选）
const flagged = data.filter(r => r.impressions >= 100 && num((r.ctr || "0").replace(/%/g, "")) < 1).length;
console.table(data.slice(0, 30).map(r => ({ ...r })));
if (flagged > 0) console.log(`\n⚠ ${flagged} 行曝光≥100 但 CTR<1% —— title/meta 优化候选（查完整列表导出全量）`);

// 网页维度 → 与 Visit 表 join（按路径）
async function joinVisits() {
  const envRaw = fs.readFileSync("D:/chinese culture/project2/.env", "utf8");
  let dbUrl = envRaw.match(/^DATABASE_URL=(.+)$/m)[1].trim();
  if (!dbUrl.includes("sslmode=")) dbUrl += (dbUrl.includes("?") ? "&" : "?") + "sslmode=prefer&connection_limit=1";
  process.env.DATABASE_URL = dbUrl;
  const { PrismaClient } = require("D:/chinese culture/project2/node_modules/@prisma/client");
  const prisma = new PrismaClient();
  const q = (sql) => prisma.$queryRawUnsafe(sql);

  const since = sinceStr || new Date(Date.now() - 28 * 86400e3).toISOString().slice(0, 10);
  const visitRows = await q(`
    SELECT page, count(*)::int pvs, count(*) FILTER (WHERE NOT "isDatacenter")::int real
    FROM "Visit" WHERE "createdAt" >= '${since}' AND page NOT LIKE '\_\_click\_\_:%'
    GROUP BY page`);
  const visitMap = new Map(visitRows.map(r => [r.page, r]));

  console.log(`\n=== 网页维度 × Visit 表 join (Visit 窗口: ${since} 起) ===`);
  const out = data.slice(0, 40).map(r => {
    const path = r.dim.replace(/^https?:\/\/[^/]+/, "") || "/";
    const v = visitMap.get(path);
    return {
      page: path.length > 48 ? path.slice(0, 45) + "..." : path,
      gscClicks: r.clicks,
      gscImpr: r.impressions,
      pos: r.position,
      visitPV: v ? v.pvs : 0,
      visitReal: v ? v.real : 0,
      flag: v ? "" : "⚠ Visit 无记录(埋点/路径问题)",
    };
  });
  console.table(out);
  const noVisit = out.filter(r => r.flag).length;
  if (noVisit) console.log(`⚠ ${noVisit} 个 URL 有 GSC 点击但 Visit 表无对应 PV —— 检查埋点或 URL 变体`);
  await prisma.$disconnect();
}

if (dimension === "page") {
  joinVisits().then(() => process.exit(0)).catch(e => { console.error("join 失败:", e.message); process.exit(1); });
} else {
  console.log("\n提示: 查询维度导出时若在 GSC 里按「网页」过滤了具体 URL，本表 = 该页面的真实搜索词");
}
