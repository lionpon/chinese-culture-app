import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Link } from "@/navigation";
import { FAQSchema } from "@/components/JsonLd";
import GuideCTA from "@/components/GuideCTA";
import { BASE_URL } from "@/lib/config";

type Props = { params: { locale: string; slug: string } };

interface ArticleRow {
  slug: string; type: string; title: string; metaDesc: string;
  intro: string; sections: string; faqs: string; createdAt: Date;
}

async function getArticle(slug: string): Promise<ArticleRow | null> {
  const rows = await prisma.$queryRawUnsafe<ArticleRow[]>(
    `SELECT slug, type, title, "metaDesc", intro, sections, faqs, "createdAt"
     FROM "ProgrammaticArticle" WHERE slug = $1 AND status='published' LIMIT 1`,
    slug
  );
  return rows[0] || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await getArticle(params.slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.metaDesc,
    robots: "index, follow",
    alternates: { canonical: `${BASE_URL}/insights/${a.slug}` },
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const a = await getArticle(params.slug);
  if (!a) notFound();
  const sections = JSON.parse(a.sections) as { h: string; p: string[] }[];
  const faqs = JSON.parse(a.faqs) as { q: string; a: string }[];
  const introParas = a.intro.split(/\n\s*\n/).filter(Boolean);

  return (
    <article className="max-w-2xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold leading-snug mb-3">{a.title}</h1>
      {/* GEO 直接回答段：AI 引擎摘引用用，首屏可见 */}
      <div className="space-y-3 mb-6">
        {introParas.map((p, i) => (
          <p key={i} className="text-[15px] sm:text-base leading-relaxed text-stone-700">{p}</p>
        ))}
      </div>

      {sections.map((s, i) => (
        <section key={i} className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">{s.h}</h2>
          {s.p.map((p, j) => (
            <p key={j} className="text-[15px] sm:text-base leading-relaxed text-stone-700 mb-2">{p}</p>
          ))}
        </section>
      ))}

      {/* 内链 + 转化入口 */}
      <div className="not-prose my-6 p-4 rounded-xl" style={{ border: "1px solid var(--border-medium)", backgroundColor: "var(--bg-surface)" }}>
        <p className="text-sm font-semibold mb-2">Go deeper with the live tools</p>
        <ul className="space-y-1.5 text-sm list-disc list-inside">
          <li><Link href="/tools/lunar-calendar">Convert any date to the lunar calendar</Link></li>
          <li><Link href="/calendar">Check the auspicious rating of your chosen day</Link></li>
          <li><Link href="/naming">Get 5 personalized names from your birth chart</Link></li>
        </ul>
      </div>

      <details className="card-classic p-4 mb-6 cursor-pointer group">
        <summary className="text-sm font-semibold select-none">Frequently asked questions</summary>
        <div className="mt-3 space-y-3">
          {faqs.map((f, i) => (
            <div key={i}>
              <p className="text-sm font-medium">{f.q}</p>
              <p className="text-sm text-stone-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </details>

      <GuideCTA href="/calendar" service="calendar" />

      <p className="text-xs text-stone-400 mt-6">For entertainment purposes only. Dates and readings are computed from the traditional Chinese almanac and zodiac tradition.</p>
      <FAQSchema questions={faqs.map(f => ({ question: f.q, answer: f.a }))} />
    </article>
  );
}
