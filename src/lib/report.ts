import { prisma } from "./db";

export interface ReportData {
  date: string;
  visits: number;
  uniqueCountries: number;
  revenue: number;
  countries: Record<string, number>;
  cities: Record<string, number>;
  pages: Record<string, number>;
  byType: Record<string, { count: number; revenue: number }>;
  freeTrials: number;
  freeTrialsByType: Record<string, number>;
  subscribers: number;
  subscribersBySource: Record<string, number>;
}

export async function generateReport(date: string, locale?: string): Promise<ReportData> {
  const dayStart = new Date(date + "T00:00:00.000Z");
  const dayEnd = new Date(date + "T23:59:59.999Z");

  const [visits, purchases, freePurchases, subscribers] = await Promise.all([
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
    prisma.subscriber.findMany({
      where: { createdAt: { gte: dayStart, lte: dayEnd } },
    }),
  ]);

  // Filter by locale
  let filtered = visits;
  if (locale === "ru") filtered = visits.filter(v => v.page.startsWith("/ru/") || v.page === "/ru");
  else if (locale === "ja") filtered = visits.filter(v => v.page.startsWith("/ja/") || v.page === "/ja");
  else if (locale === "ko") filtered = visits.filter(v => v.page.startsWith("/ko/") || v.page === "/ko");
  else if (locale === "en") filtered = visits.filter(v =>
    !v.page.startsWith("/ru/") && v.page !== "/ru" &&
    !v.page.startsWith("/ja/") && v.page !== "/ja" &&
    !v.page.startsWith("/ko/") && v.page !== "/ko"
  );

  // Exclude admin pages from all counts (all locales)
  filtered = filtered.filter(v => !v.page.includes("/admin"));

  const countries: Record<string, number> = {};
  const cities: Record<string, number> = {};
  const pages: Record<string, number> = {};
  for (const v of filtered) {
    countries[v.country] = (countries[v.country] || 0) + 1;
    const cityKey = [v.city, v.region, v.country].filter(Boolean).join(", ");
    if (cityKey !== "Unknown") {
      cities[cityKey] = (cities[cityKey] || 0) + 1;
    }
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

  const subscribersBySource: Record<string, number> = {};
  for (const s of subscribers) {
    subscribersBySource[s.source] = (subscribersBySource[s.source] || 0) + 1;
  }

  await prisma.dailyReport.upsert({
    where: { date },
    update: {
      visits: filtered.length,
      uniqueCountries: Object.keys(countries).length,
      revenue,
      details: JSON.stringify({ countries, cities, pages, byType, freeTrials, freeTrialsByType, subscribers: subscribers.length, subscribersBySource }),
    },
    create: {
      date,
      visits: filtered.length,
      uniqueCountries: Object.keys(countries).length,
      revenue,
      details: JSON.stringify({ countries, cities, pages, byType, freeTrials, freeTrialsByType, subscribers: subscribers.length, subscribersBySource }),
    },
  });

  return {
    date,
    visits: filtered.length,
    uniqueCountries: Object.keys(countries).length,
    revenue,
    countries,
    cities,
    pages,
    byType,
    freeTrials,
    freeTrialsByType,
    subscribers: subscribers.length,
    subscribersBySource,
  };
}

export async function getReports(days: number = 7, locale?: string): Promise<ReportData[]> {
  // When locale filter is active, generate on-the-fly per day (bypasses cache)
  if (locale) {
    const results: ReportData[] = [];
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const date = d.toISOString().slice(0, 10);
      results.push(await generateReport(date, locale));
    }
    return results;
  }

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
      subscribers: details.subscribers ?? 0,
      subscribersBySource: details.subscribersBySource ?? {},
      ...details,
    };
  });
}
