const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
(async () => {
  const clicks = await prisma.visit.findMany({
    where: { page: { startsWith: "__click__:" } },
    orderBy: { createdAt: "desc" },
    take: 30,
    select: { page: true, createdAt: true, country: true },
  });
  console.log("=== ALL CLICK EVENTS (last 30) ===");
  clicks.forEach(c => console.log(c.createdAt.toISOString().slice(0,16), c.page, "|", c.country));
  console.log("Total click events:", clicks.length);

  // Summary
  const summary = {};
  clicks.forEach(c => {
    const event = c.page.slice(10);
    summary[event] = (summary[event] || 0) + 1;
  });
  console.log("\n=== SUMMARY ===");
  for (const [k, v] of Object.entries(summary)) {
    console.log("  " + k + ": " + v);
  }

  await prisma.$disconnect();
})().catch(e => { console.error(e); process.exit(1); });
