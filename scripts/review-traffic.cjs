// 流量+埋点全景复核 — 直查生产 Supabase（只读）
// 用法: SINCE="2026-09-28T00:00:00+08:00" node scripts/review-traffic.cjs
const fs = require("fs");
const envRaw = fs.readFileSync("D:/chinese culture/project2/.env", "utf8");
let dbUrl = envRaw.match(/^DATABASE_URL=(.+)$/m)[1].trim();
if (!dbUrl.includes("sslmode=")) dbUrl += (dbUrl.includes("?") ? "&" : "?") + "sslmode=prefer&connection_limit=1";
process.env.DATABASE_URL = dbUrl;
const { PrismaClient } = require("D:/chinese culture/project2/node_modules/@prisma/client");
const prisma = new PrismaClient();

const SINCE = process.env.SINCE || "2026-09-28T00:00:00+08:00";
const sinceTs = new Date(SINCE);
const BJ = `("createdAt" + interval '8 hours')`;
const q = (sql) => prisma.$queryRawUnsafe(sql);

async function main() {
  console.log(`=== 全景窗口: 北京 ${sinceTs.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })} 起 ===\n`);

  console.log("── ① 每日访问: 总 / 真实 / DC ──");
  const daily = await q(`SELECT to_char(${BJ},'YYYY-MM-DD') AS day, count(*)::int AS total,
    count(*) FILTER (WHERE NOT "isDatacenter")::int AS real,
    count(*) FILTER (WHERE "isDatacenter")::int AS dc
    FROM "Visit" WHERE "createdAt" >= '${SINCE}' GROUP BY day ORDER BY day`);
  console.table(daily);

  console.log("── ② 国家分布 (真实用户) ──");
  const ctry = await q(`SELECT country, count(*)::int AS n FROM "Visit"
    WHERE NOT "isDatacenter" AND "createdAt" >= '${SINCE}'
    GROUP BY country ORDER BY n DESC LIMIT 15`);
  console.table(ctry);

  console.log("── ③ TOP 页面 (真实用户, 排除埋点) ──");
  const pages = await q(`SELECT page, count(*)::int AS n FROM "Visit"
    WHERE NOT "isDatacenter" AND page NOT LIKE '__click__:%' AND "createdAt" >= '${SINCE}'
    GROUP BY page ORDER BY n DESC LIMIT 18`);
  console.table(pages);

  console.log("── ④ 全部埋点事件 (窗口内) ──");
  const evs = await q(`SELECT page AS event, count(*)::int AS n FROM "Visit"
    WHERE page LIKE '__click__:%' AND "createdAt" >= '${SINCE}'
    GROUP BY page ORDER BY n DESC LIMIT 30`);
  console.table(evs.length ? evs : [{ event: "(无事件)", n: 0 }]);

  console.log("── ⑤ RU 明细 (城市/DC) ──");
  const ru = await q(`SELECT to_char(${BJ},'YYYY-MM-DD HH24:MI') AS bj, city, region, "isDatacenter" AS dc, page
    FROM "Visit" WHERE country='RU' AND "createdAt" >= '${SINCE}' ORDER BY "createdAt"`);
  for (const r of ru) console.log(`  ${r.bj}  ${r.dc ? 'DC' : '真实'}  ${r.city}/${r.region}  ${r.page}`);
  if (!ru.length) console.log("  (无)");

  console.log("── ⑥ Purchase 窗口内 (含 email/input 摘要) ──");
  const p = await prisma.purchase.findMany({ where: { createdAt: { gte: sinceTs } }, orderBy: { createdAt: "desc" } });
  for (const r of p) {
    const bj = r.createdAt.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", hour12: false });
    let email = "(无邮箱)";
    try {
      const inp = JSON.parse(r.input || "{}");
      if (inp.email) email = inp.email;
    } catch {}
    console.log(`  ${bj}  ${r.type.padEnd(10)} ${r.status.padEnd(10)} paid=${r.paid}  email=${email}  ${r.id}`);
  }
  if (!p.length) console.log("  (无)");
}

main().catch(e => { console.error("ERROR:", e.message); process.exit(1); }).finally(() => prisma.$disconnect());
