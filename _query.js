// 快速查数据库流量报表，保留在项目里方便日后使用
// 运行: node _query.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
(async () => {
  const [visits, purchases, freeTrials, reports, subs] = await Promise.all([
    prisma.visit.count(),
    prisma.purchase.count({ where: { status: "completed", paid: true } }),
    prisma.purchase.count({ where: { status: "completed", paid: false } }),
    prisma.dailyReport.findMany({ orderBy: { date: "desc" }, take: 14, select: { date: true, visits: true, revenue: true, uniqueCountries: true, details: true } }),
    prisma.subscriber.count(),
  ]);
  // Payment funnel events (last 7 days)
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const clicks = await prisma.visit.findMany({
    where: { page: { startsWith: "__click__:pay_" }, createdAt: { gte: weekAgo } },
    select: { page: true },
  });
  const funnel = {};
  clicks.forEach(v => {
    const event = v.page.slice(10);
    funnel[event] = (funnel[event] || 0) + 1;
  });

  console.log("=== TOTAL ===");
  console.log("Visits:", visits);
  console.log("Paid:", purchases);
  console.log("Free:", freeTrials);
  console.log("Subscribers:", subs);
  console.log("\n=== PAYMENT FUNNEL (7 days) ===");
  console.log("Pay clicks:", funnel["pay_click"] || 0);
  console.log("Landed on success:", funnel["pay_landed"] || 0);
  console.log("Completed:", funnel["pay_completed"] || 0);
  console.log("Timeout:", funnel["pay_timeout"] || 0);
  console.log("Failed:", funnel["pay_failed"] || 0);
  console.log("Dropoff after click:", (funnel["pay_click"] || 0) - (funnel["pay_landed"] || 0));
  console.log("\n=== LAST 14 DAYS ===");
  reports.forEach(r => {
    const d = JSON.parse(r.details);
    console.log(r.date, "| Visits:", r.visits, "| Countries:", r.uniqueCountries, "| Paid:", r.revenue, "| Free:", d.freeTrials || 0);
  });
  const latest = reports[0];
  if (latest) {
    const d = JSON.parse(latest.details);
    console.log("\n=== TOP PAGES (today) ===");
    const pages = Object.entries(d.pages || {}).sort((a,b) => b[1] - a[1]).slice(0, 10);
    pages.forEach(([k,v]) => console.log("  ", v, k));
    console.log("\n=== TOP COUNTRIES (today) ===");
    const countries = Object.entries(d.countries || {}).sort((a,b) => b[1] - a[1]).slice(0, 10);
    countries.forEach(([k,v]) => console.log("  ", v, k));
  }
  await prisma.$disconnect();
})().catch(e => { console.error(e); process.exit(1); });
