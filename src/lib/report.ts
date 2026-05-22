import { prisma } from "./db";

export interface ReportData {
  date: string;
  visits: number;
  uniqueCountries: number;
  revenue: number;
  countries: Record<string, number>;
  pages: Record<string, number>;
  byType: Record<string, { count: number; revenue: number }>;
}

export async function generateReport(date: string): Promise<ReportData> {
  const dayStart = new Date(date + "T00:00:00.000Z");
  const dayEnd = new Date(date + "T23:59:59.999Z");

  const [visits, purchases] = await Promise.all([
    prisma.visit.findMany({
      where: { createdAt: { gte: dayStart, lte: dayEnd } },
    }),
    prisma.purchase.findMany({
      where: {
        createdAt: { gte: dayStart, lte: dayEnd },
        status: "completed",
      },
    }),
  ]);

  const countries: Record<string, number> = {};
  const pages: Record<string, number> = {};
  for (const v of visits) {
    countries[v.country] = (countries[v.country] || 0) + 1;
    pages[v.page] = (pages[v.page] || 0) + 1;
  }

  const byType: Record<string, { count: number; revenue: number }> = {};
  for (const p of purchases) {
    if (!byType[p.type]) byType[p.type] = { count: 0, revenue: 0 };
    byType[p.type].count++;
    byType[p.type].revenue += 1;
  }

  const revenue = purchases.length;

  await prisma.dailyReport.upsert({
    where: { date },
    update: {
      visits: visits.length,
      uniqueCountries: Object.keys(countries).length,
      revenue,
      details: JSON.stringify({ countries, pages, byType }),
    },
    create: {
      date,
      visits: visits.length,
      uniqueCountries: Object.keys(countries).length,
      revenue,
      details: JSON.stringify({ countries, pages, byType }),
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
  };
}

export async function getReports(days: number = 7): Promise<ReportData[]> {
  const reports = await prisma.dailyReport.findMany({
    orderBy: { date: "desc" },
    take: days,
  });

  return reports.map((r) => ({
    date: r.date,
    visits: r.visits,
    uniqueCountries: r.uniqueCountries,
    revenue: r.revenue,
    ...JSON.parse(r.details),
  }));
}
