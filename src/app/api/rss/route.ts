import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { performDivination } from "@/lib/divination";
import { BASE_URL } from "@/lib/config";

// Don't prerender — requires live DB connection
export const dynamic = "force-dynamic";

export async function GET() {
  // Get the last 14 days of hexagram data
  const reports = await prisma.dailyReport.findMany({
    orderBy: { date: "desc" },
    take: 14,
  });

  const items: string[] = [];

  for (const report of reports) {
    if (report.visits === 0) continue;
    const date = report.date;
    const result = performDivination({
      method: "manual",
      numbers: [
        ((new Date(date + "T00:00:00Z").getFullYear() + new Date(date + "T00:00:00Z").getMonth() + 1 + new Date(date + "T00:00:00Z").getDate()) % 8) || 8,
        ((new Date(date + "T00:00:00Z").getFullYear() * (new Date(date + "T00:00:00Z").getMonth() + 1) + new Date(date + "T00:00:00Z").getDate()) % 8) || 8,
        ((new Date(date + "T00:00:00Z").getFullYear() + (new Date(date + "T00:00:00Z").getMonth() + 1) * new Date(date + "T00:00:00Z").getDate()) % 6) || 6,
      ],
    });
    const h = result.mainHexagram;

    items.push(`<item>
      <title>Daily I Ching ${date}: ${h.nameZh} — ${h.nameEn}</title>
      <link>${BASE_URL}/daily/${date}</link>
      <guid isPermaLink="true">${BASE_URL}/daily/${date}</guid>
      <pubDate>${new Date(date + "T08:00:00Z").toUTCString()}</pubDate>
      <description><![CDATA[<p>${h.judgmentEn}</p><p>${h.advice.slice(0, 300)}...</p>]]></description>
      <category>I Ching</category>
      <category>Daily Hexagram</category>
    </item>`);
  }

  // Always include today
  const today = new Date().toISOString().slice(0, 10);
  const todayResult = performDivination({
    method: "manual",
    numbers: [
      ((new Date(today + "T00:00:00Z").getFullYear() + new Date(today + "T00:00:00Z").getMonth() + 1 + new Date(today + "T00:00:00Z").getDate()) % 8) || 8,
      ((new Date(today + "T00:00:00Z").getFullYear() * (new Date(today + "T00:00:00Z").getMonth() + 1) + new Date(today + "T00:00:00Z").getDate()) % 8) || 8,
      ((new Date(today + "T00:00:00Z").getFullYear() + (new Date(today + "T00:00:00Z").getMonth() + 1) * new Date(today + "T00:00:00Z").getDate()) % 6) || 6,
    ],
  });
  const todayHexagram = todayResult.mainHexagram;

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Chinese Culture Studio — Daily I Ching</title>
    <link>${BASE_URL}</link>
    <description>Daily I Ching hexagram readings and Chinese cultural wisdom. A new hexagram every day with guidance, judgment, and interpretation from the ancient Book of Changes.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/api/rss" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/api/og?title=Daily+I+Ching&amp;sub=Chinese+Culture+Studio&amp;lang=en</url>
      <title>Chinese Culture Studio</title>
      <link>${BASE_URL}</link>
    </image>
    <item>
      <title>Today's I Ching: ${todayHexagram.nameZh} — ${todayHexagram.nameEn} (${new Date().toISOString().slice(0, 10)})</title>
      <link>${BASE_URL}/daily/${today}</link>
      <guid isPermaLink="true">${BASE_URL}/daily/${today}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description><![CDATA[<p><strong>Judgment:</strong> ${todayHexagram.judgmentEn}</p><p><strong>Advice:</strong> ${todayHexagram.advice.slice(0, 400)}</p><p><a href="${BASE_URL}/divination">Cast your own hexagram →</a></p>]]></description>
      <category>I Ching</category>
      <category>Daily Hexagram</category>
      <category>Chinese Wisdom</category>
    </item>
${items.join("\n")}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
