import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const yesterday = "2026-07-14";

  const report = await prisma.dailyReport.findUnique({
    where: { date: yesterday }
  });

  if (!report) {
    console.log(`No DailyReport found for ${yesterday}`);
    // Try to get all available reports
    const all = await prisma.dailyReport.findMany({ orderBy: { date: "desc" }, take: 7 });
    if (all.length > 0) {
      console.log("Available reports:", all.map(r => r.date).join(", "));
    } else {
      console.log("No reports in database at all.");
    }
    return;
  }

  console.log("=== 日报数据：2026-07-14 ===");
  console.log(JSON.stringify({
    date: report.date,
    visits: report.visits,
    uniqueCountries: report.uniqueCountries,
    revenue: report.revenue,
    details: JSON.parse(report.details),
  }, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
