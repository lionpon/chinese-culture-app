import { BASE_URL } from "@/lib/config";

const LLMS_TXT = `# Chinese Culture Studio
> Discover ancient Chinese wisdom — I Ching divination, Chinese name creation, auspicious date selection, and palm reading. Algorithmically generated cultural interpretations based on classical Chinese texts including the Zhouyi (Book of Changes), traditional naming conventions, and the Chinese calendar system.

## Core Tools
- [I Ching Divination](${BASE_URL}/divination): Traditional 3-coin method divination with hexagram interpretations drawn from the Zhouyi (周易), Tuan Zhuan (彖传), and Xiang Zhuan (象传) commentaries.
- [Chinese Name Creation](${BASE_URL}/naming): Generate authentic Chinese names based on Bazi (八字) and Five Elements (五行) theory.
- [Auspicious Date Selection](${BASE_URL}/calendar): Select favorable dates based on the Chinese almanac (通书/Tong Shu) tradition.
- [Palm Reading](${BASE_URL}/palm-reading): AI-powered palm line analysis for career, love, health, and wealth.

## Educational Guides
- [I Ching Beginner's Guide](${BASE_URL}/guide/iching-beginner)
- [Complete I Ching Guide](${BASE_URL}/guide/iching)
- [Five Elements (Wu Xing)](${BASE_URL}/guide/five-elements)
- [Chinese Zodiac](${BASE_URL}/guide/chinese-zodiac)
- [Chinese Name Guide](${BASE_URL}/guide/chinese-name)
- [Feng Shui Basics](${BASE_URL}/guide/feng-shui)
- [Face Reading (Mian Xiang)](${BASE_URL}/guide/face-reading)
- [Dream Interpretation](${BASE_URL}/guide/dream-meaning)
- [Lucky Numbers](${BASE_URL}/guide/lucky-numbers)
- [Auspicious Wedding Dates 2026](${BASE_URL}/guide/wedding-dates-2026)
- [Chinese New Year 2027 Guide](${BASE_URL}/guide/chinese-new-year-2027)

## Daily Content
- [Daily I Ching Reading](${BASE_URL}/daily): Fresh hexagram reading every day.
- [World Cup 2026 Predictions](${BASE_URL}/world-cup): I Ching match predictions (June 11 – July 26, 2026).

## Languages
Available in English, Russian, Japanese, and Korean.

## About
Chinese Culture Studio combines classical Chinese texts with algorithmic generation. All interpretations are for entertainment purposes. Sources: Zhouyi (Book of Changes, ca. 1000 BCE), Tong Shu (Chinese Almanac), traditional naming and physiognomy manuals.

## Technical
- Framework: Next.js 14
- Structured data: JSON-LD (Organization, WebSite, WebApplication, Article, BreadcrumbList, FAQPage)
- Sitemap: Auto-generated with hreflang for all 4 languages
- RSS: ${BASE_URL}/api/rss
`;

export async function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
