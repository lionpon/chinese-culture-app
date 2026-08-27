// 标准复核查询五件套 — 直查生产 Supabase
// 用法: node scripts/review-queries.cjs           (窗口默认 2026-08-21 起)
//       SINCE="2026-08-25T00:00:00+08:00" node scripts/review-queries.cjs
// 注意: createdAt = naive UTC; 北京 = + interval '8 hours'
const fs = require("fs");
const envRaw = fs.readFileSync("D:/chinese culture/project2/.env", "utf8");
process.env.DATABASE_URL = envRaw.match(/^DATABASE_URL=(.+)$/m)[1].trim();
const { PrismaClient } = require("D:/chinese culture/project2/node_modules/@prisma/client");
const prisma = new PrismaClient();

const SINCE = process.env.SINCE || "2026-08-21T00:00:00+08:00";
const sinceTs = new Date(SINCE);
const BJ = `("createdAt" + interval '8 hours')`;
const q = (sql) => prisma.$queryRawUnsafe(sql);

async function main() {
  console.log(`=== 复核窗口: 北京 ${sinceTs.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })} 起 ===\n`);

  console.log("── ① RU 每日写入 (配额=3/24h, 若生效应≤3) ──");
  const ru = await q(`
    SELECT to_char(${BJ},'YYYY-MM-DD') AS day, count(*)::int AS total,
           count(*) FILTER (WHERE "isDatacenter")::int AS dc
    FROM "Visit" WHERE country='RU' AND "createdAt" >= '${SINCE}'
    GROUP BY day ORDER BY day`);
  console.table(ru);

  console.log("── ② datecheck 用量 + 限流墙 ──");
  const dc = await q(`
    SELECT to_char(${BJ},'YYYY-MM-DD') AS day,
           count(*) FILTER (WHERE page='__click__:guide_tool_datecheck')::int AS uses,
           count(*) FILTER (WHERE page='__click__:guide_tool_datecheck_limit')::int AS limit_wall
    FROM "Visit" WHERE "createdAt" >= '${SINCE}'
    GROUP BY day ORDER BY day`);
  console.table(dc);

  console.log("── ③ 日历漏斗 (窗口内 / 全量) ──");
  for (const ev of ["guide_tool_cta_calendar", "preview_calendar", "form_submit_calendar", "form_submit_calendar_paid"]) {
    const a = await q(`SELECT count(*)::int n FROM "Visit" WHERE page='__click__:${ev}'`);
    const b = await q(`SELECT count(*)::int n FROM "Visit" WHERE page='__click__:${ev}' AND "createdAt" >= '${SINCE}'`);
    console.log(`  ${ev.padEnd(26)} 窗口 ${String(b[0].n).padStart(3)} | 全量 ${String(a[0].n).padStart(3)}`);
  }

  console.log("── ④ 关键转化事件 (窗口内) ──");
  for (const ev of ["form_submit_naming", "form_submit_naming_paid", "free_result_viewed", "pay_click", "pay_landed", "pay_completed", "paywall_unlock_click"]) {
    const b = await q(`SELECT count(*)::int n FROM "Visit" WHERE page='__click__:${ev}' AND "createdAt" >= '${SINCE}'`);
    console.log(`  ${ev.padEnd(26)} ${String(b[0].n).padStart(3)}`);
  }

  console.log("── ⑤ Referrer 外部来源 TOP ──");
  const ref = await q(`
    SELECT referrer, count(*)::int n FROM "Visit"
    WHERE referrer <> '' AND referrer NOT LIKE '%culture-of-china.com%'
      AND referrer NOT LIKE '%onrender.com%' AND "createdAt" >= '${SINCE}'
    GROUP BY referrer ORDER BY n DESC LIMIT 10`);
  console.table(ref.length ? ref : [{ referrer: "(无外部来源)", n: 0 }]);

  console.log("── ⑥ Purchase (窗口内) ──");
  const p = await prisma.purchase.findMany({
    where: { createdAt: { gte: sinceTs } },
    orderBy: { createdAt: "desc" },
    select: { id: true, type: true, status: true, paid: true, createdAt: true },
  });
  for (const r of p) {
    const bj = r.createdAt.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", hour12: false });
    console.log(`  ${bj}  ${r.type.padEnd(10)} ${r.status.padEnd(10)} paid=${r.paid}  ${r.id}`);
  }
  if (!p.length) console.log("  (无)");
  const paidN = await q(`SELECT count(*)::int n FROM "Purchase" WHERE paid=true`);
  console.log(`  全量 paid=true: ${paidN[0].n} (唯一一笔=8/13沙盒测试)`);
}

main().catch(e => { console.error("ERROR:", e.message); process.exit(1); }).finally(() => prisma.$disconnect());
