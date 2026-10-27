// girl/boy 页名字预览工具实验复核 — 2026-10-27 预注册口径（存档 §⑧）
// 用法: node scripts/review-name-preview.cjs            (默认 10/28 00:00 北京起, 7 天窗口)
//       SINCE="2026-10-28T00:00:00+08:00" node scripts/review-name-preview.cjs
// 输出按预注册阈值自动判定: 支持 / 证伪 / 继续观察 / 数据不足
const fs = require("fs");
const envRaw = fs.readFileSync("D:/chinese culture/project2/.env", "utf8");
let dbUrl = envRaw.match(/^DATABASE_URL=(.+)$/m)[1].trim();
if (!dbUrl.includes("sslmode=")) dbUrl += (dbUrl.includes("?") ? "&" : "?") + "sslmode=prefer&connection_limit=1";
process.env.DATABASE_URL = dbUrl;
const { PrismaClient } = require("D:/chinese culture/project2/node_modules/@prisma/client");
const prisma = new PrismaClient();
const q = (sql) => prisma.$queryRawUnsafe(sql);

const SINCE = process.env.SINCE || "2026-10-28T00:00:00+08:00";
const DAYS = 7;
const BJ = `("createdAt" + interval '8 hours')`;

async function counts(sql) { const r = await q(sql); return Number(r[0].n); }

async function main() {
  console.log(`=== girl/boy 页预览工具实验复核 (SINCE=${SINCE}, ${DAYS}天) ===\n`);

  const girlPV = await counts(`SELECT count(*)::int n FROM "Visit" WHERE "createdAt" >= '${SINCE}' AND page LIKE '%chinese-name-girl' AND NOT "isDatacenter"`);
  const boyPV = await counts(`SELECT count(*)::int n FROM "Visit" WHERE "createdAt" >= '${SINCE}' AND page LIKE '%chinese-name-boy' AND NOT "isDatacenter"`);
  const uses = await counts(`SELECT count(*)::int n FROM "Visit" WHERE "createdAt" >= '${SINCE}' AND page='__click__:guide_tool_name_preview'`);
  const cta = await counts(`SELECT count(*)::int n FROM "Visit" WHERE "createdAt" >= '${SINCE}' AND page='__click__:guide_tool_name_preview_cta'`);
  const limitWalls = await counts(`SELECT count(*)::int n FROM "Visit" WHERE "createdAt" >= '${SINCE}' AND page='__click__:guide_tool_name_preview_limit'`);
  const namingPV = await counts(`SELECT count(*)::int n FROM "Visit" WHERE "createdAt" >= '${SINCE}' AND page IN ('/naming','/ru/naming') AND NOT "isDatacenter"`);
  const formSubmit = await counts(`SELECT count(*)::int n FROM "Visit" WHERE "createdAt" >= '${SINCE}' AND page='__click__:form_submit_naming'`);
  const unlocks = await counts(`SELECT count(*)::int n FROM "Visit" WHERE "createdAt" >= '${SINCE}' AND page='__click__:paywall_unlock_click'`);

  const targetPV = girlPV + boyPV;
  const rate = targetPV > 0 ? (uses / targetPV * 100) : 0;
  const ctaRate = uses > 0 ? (cta / uses * 100) : 0;

  console.log("── 原始数据 ──");
  console.table([
    { metric: "girl 页真实PV", value: girlPV },
    { metric: "boy 页真实PV", value: boyPV },
    { metric: "工具使用 guide_tool_name_preview", value: uses },
    { metric: "CTA 点击 guide_tool_name_preview_cta", value: cta },
    { metric: "限流墙展示 _limit", value: limitWalls },
    { metric: "naming PV (/naming + /ru/naming)", value: namingPV },
    { metric: "form_submit_naming", value: formSubmit },
    { metric: "paywall_unlock_click", value: unlocks },
  ]);

  console.log("── 指标 vs 预注册阈值 ──");
  // 小样本守卫: PV<30 时所有判定降级为「数据不足」，防止零样本误判证伪
  const insufficient = targetPV < 30;
  const v = (support, falsify) => insufficient ? "数据不足" : support ? "支持" : falsify ? "证伪" : "继续观察";
  const rows = [
    { metric: `参与率 ${uses}/${targetPV}`, value: rate.toFixed(1) + "%", baseline: "datecheck 149%(含一人多次)", support: "≥30%", falsify: "<10%", verdict: v(rate >= 30, rate < 10) },
    { metric: `CTA 率 ${cta}/${uses}`, value: ctaRate.toFixed(1) + "%", baseline: "datecheck 模式 ~15%", support: "≥10%", falsify: "<3%", verdict: insufficient || uses === 0 ? "数据不足" : v(ctaRate >= 10, ctaRate < 3) },
    { metric: "form_submit_naming 日均", value: (formSubmit / DAYS).toFixed(1), baseline: "0.9/天", support: "≥1.5/天", falsify: "<0.5/天", verdict: v(formSubmit / DAYS >= 1.5, formSubmit / DAYS < 0.5) },
    { metric: "naming PV 日均", value: (namingPV / DAYS).toFixed(1), baseline: "4.4/天", support: "≥6/天", falsify: "无变化", verdict: v(namingPV / DAYS >= 6, false) },
  ];
  console.table(rows);

  // 小样本置信区间提示
  if (targetPV < 100) console.log(`\n⚠ 样本仅 ${targetPV} PV (<100)，参与率点估计置信区间宽，按预注册口径只登记不单独下结论`);
  if (uses === 0 && targetPV > 0) console.log("⚠ 工具 0 使用 → 先查渲染 bug（对照生产页 HTML 是否含 Free Name Preview），不归因意图");

  console.log("\n── 混淆因素声明（预注册 §⑧）──");
  console.log("同日上线 $1→$5.99 清理 + 布局 meta 改版：指标上升时无法分离工具效应与价格一致性效应，按共同效应登记");
}
main().catch(e => { console.error("ERROR:", e.message); process.exit(1); }).finally(() => prisma.$disconnect());
