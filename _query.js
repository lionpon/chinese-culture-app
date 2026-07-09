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
  console.log("=== TOTAL ===");
  console.log("Visits:", visits);
  console.log("Paid:", purchases);
  console.log("Free:", freeTrials);
  console.log("Subscribers:", subs);
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
