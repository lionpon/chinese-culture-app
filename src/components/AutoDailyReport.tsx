import { generateReport } from "@/lib/report";
import { pingSitemaps } from "@/lib/sitemap-ping";
import { prisma } from "@/lib/db";

export default async function AutoDailyReport() {
  const today = new Date().toISOString().slice(0, 10);

  const existed = await prisma.dailyReport.findUnique({ where: { date: today } });

  await generateReport(today);

  // Only ping sitemaps once per day — on first report generation
  if (!existed) {
    pingSitemaps().catch(() => {});
  }

  return null;
}
