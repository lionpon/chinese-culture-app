import { prisma } from "./db";

export interface ReportData {
  date: string;
  visits: number;
  uniqueCountries: number;
  revenue: number;
  countries: Record<string, number>;
  pages: Record<string, number>;
  byType: Record<string, { count: number; revenue: number }>;
  freeTrials: number;
  freeTrialsByType: Record<string, number>;
}

export async function generateReport(date: string): Promise<ReportData> {
  const dayStart = new Date(date + "T00:00:00.000Z");
  const dayEnd = new Date(date + "T23:59:59.999Z");

  const [visits, purchases, freePurchases] = await Promise.all([
    prisma.visit.findMany({
      where: { createdAt: { gte: dayStart, lte: dayEnd } },
    }),
    prisma.purchase.findMany({
      where: {
        createdAt: { gte: dayStart, lte: dayEnd },
        status: "completed",
        paid: true,
      },
    }),
    prisma.purchase.findMany({
      where: {
        createdAt: { gte: dayStart, lte: dayEnd },
        status: "completed",
        paid: false,
      },
    }),
  ]);

  const countries: Record<string, number> = {};
  const pages: Record<string, number> = {};
  for (const v of visits) {
    if (v.page.startsWith("/admin") || v.page.startsWith("/ru/admin")) continue;
    countries[v.country] = (countries[v.country] || 0) + 1;
    pages[v.page] = (pages[v.page] || 0) + 1;
  }

  const byType: Record<string, { count: number; revenue: number }> = {};
  for (const p of purchases) {
    if (!byType[p.type]) byType[p.type] = { count: 0, revenue: 0 };
    byType[p.type].count++;
    byType[p.type].revenue += 1;
  }

  const freeTrialsByType: Record<string, number> = {};
  for (const p of freePurchases) {
    freeTrialsByType[p.type] = (freeTrialsByType[p.type] || 0) + 1;
  }

  const freeTrials = freePurchases.length;
  const revenue = purchases.length;

  await prisma.dailyReport.upsert({
    where: { date },
    update: {
      visits: visits.length,
      uniqueCountries: Object.keys(countries).length,
      revenue,
      details: JSON.stringify({ countries, pages, byType, freeTrials, freeTrialsByType }),
    },
    create: {
      date,
      visits: visits.length,
      uniqueCountries: Object.keys(countries).length,
      revenue,
      details: JSON.stringify({ countries, pages, byType, freeTrials, freeTrialsByType }),
    },
  });

  return {
    date,
    visits: visits.length,
    uniqueCountries: Object.keys(countries).length,
    revenue,
    countries,
    pages,
    byType,
    freeTrials,
    freeTrialsByType,
  };
}

export async function getReports(days: number = 7): Promise<ReportData[]> {
  const reports = await prisma.dailyReport.findMany({
    orderBy: { date: "desc" },
    take: days,
  });

  return reports.map((r) => {
    const details = JSON.parse(r.details);
    return {
      date: r.date,
      visits: r.visits,
      uniqueCountries: r.uniqueCountries,
      revenue: r.revenue,
      freeTrials: details.freeTrials ?? Object.values(details.freeTrialsByType ?? {}).reduce((a: number, b) => a + (b as number), 0),
      freeTrialsByType: details.freeTrialsByType ?? {},
      ...details,
    };
  });
}
