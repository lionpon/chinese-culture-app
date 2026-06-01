import type { Metadata } from "next";
import { performDivination } from "@/lib/divination";
import { generateHexagramArticle } from "@/lib/hexagram-article";
import { Link } from "@/navigation";
import { notFound } from "next/navigation";
import SpeakButton from "@/components/SpeakButton";

type Props = {
  params: { locale: string; date: string };
};

function getHexagramForDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00Z");
  if (isNaN(d.getTime())) return null;
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return performDivination({
    method: "manual",
    numbers: [
      ((y + m + day) % 8) || 8,
      ((y * m + day) % 8) || 8,
      ((y + m * day) % 6) || 6,
    ],
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const formatter = new Intl.DateTimeFormat(params.locale === "ru" ? "ru" : "en", {
    year: "numeric", month: "long", day: "numeric",
  });
  const result = getHexagramForDate(params.date);
  if (!result) return { title: "Not Found" };

  const { mainHexagram: h } = result;
  const dateStr = formatter.format(new Date(params.date + "T00:00:00Z"));
  const title = params.locale === "ru"
    ? `И-Цзин дня ${dateStr}: ${h.nameZh} — ${h.nameEn}`
    : `Daily I Ching ${dateStr}: ${h.nameZh} — ${h.nameEn}`;
  const desc = h.advice.slice(0, 160);

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url: `https://chinese-culture-app.onrender.com${params.locale === "ru" ? "/ru" : ""}/daily/${params.date}`,
      images: [{ url: `https://chinese-culture-app.onrender.com/api/og?title=${encodeURIComponent(h.nameZh)}&sub=${encodeURIComponent(h.nameEn)}&lang=${params.locale}`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description: desc },
    robots: "index, follow",
  };
}

export default async function DailyHexagramPage({ params }: Props) {
  const result = getHexagramForDate(params.date);
  if (!result) notFound();

  const { mainHexagram: h, changedHexagram: ch, changingLine: cl } = result;

  const formatter = new Intl.DateTimeFormat(params.locale === "ru" ? "ru" : "en", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-center text-xs text-stone-400 mb-2">
        {formatter.format(new Date(params.date + "T00:00:00Z"))}
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2" style={{ color: "var(--accent)" }}>
        {h.nameZh}
      </h1>
      <div className="flex items-center justify-center gap-2 mb-6">
        <p className="text-sm text-stone-500">
          {h.pinyin} — {h.nameEn}
        </p>
        <SpeakButton text={h.nameZh} />
      </div>

      {/* Judgment */}
      <section className="card-classic p-4 sm:p-6 mb-6">
        <h2 className="text-sm font-semibold text-stone-600 mb-2">
          {params.locale === "ru" ? "Суждение" : "Judgment"}
        </h2>
        <p className="text-stone-700 leading-relaxed">{h.judgmentEn}</p>
        {h.judgment && h.judgment !== h.judgmentEn && (
          <p className="text-stone-500 text-sm mt-2 italic">{h.judgment}</p>
        )}
      </section>

      {/* Advice */}
      <section className="card-classic p-4 sm:p-6 mb-6">
        <h2 className="text-sm font-semibold text-stone-600 mb-2">
          {params.locale === "ru" ? "Совет" : "Advice"}
        </h2>
        <p className="text-stone-700 leading-relaxed">{h.advice}</p>
      </section>

      {/* Changing Line */}
      {cl && cl.textEn && (
        <section className="card-classic p-4 sm:p-6 mb-6">
          <h2 className="text-sm font-semibold text-stone-600 mb-2">
            {params.locale === "ru" ? "Меняющаяся линия" : "Changing Line"} #{cl.position}
          </h2>
          <p className="text-stone-700 leading-relaxed">{cl.textEn}</p>
        </section>
      )}

      {/* Changed Hexagram */}
      {ch && ch.id !== h.id && (
        <section className="card-classic p-4 sm:p-6 mb-6">
          <h2 className="text-sm font-semibold text-stone-600 mb-3">
            {params.locale === "ru" ? "Развитие ситуации" : "Where This Is Heading"}
          </h2>
          <p className="text-xl font-bold mb-1" style={{ color: "var(--accent)" }}>{ch.nameZh}</p>
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm text-stone-500">{ch.pinyin} — {ch.nameEn}</p>
            <SpeakButton text={ch.nameZh} />
          </div>
          <p className="text-stone-700 leading-relaxed">{ch.judgmentEn}</p>
        </section>
      )}

      {/* Article */}
      <section className="card-classic p-4 sm:p-6 mb-6 prose prose-sm max-w-none">
        <h2 className="text-lg font-semibold text-stone-700 mb-4">
          {params.locale === "ru" ? "Толкование дня" : "Today's I Ching Interpretation"}
        </h2>
        {generateHexagramArticle(result).split("\n\n").map((p, i) => (
          <p key={i} className="text-stone-600 leading-relaxed mb-3 text-sm">{p}</p>
        ))}
      </section>

      {/* CTA */}
      <div className="text-center mt-8 mb-12">
        <Link
          href="/divination"
          className="inline-block px-6 py-3 rounded-xl font-medium btn-primary"
        >
          {params.locale === "ru" ? "Задайте свой вопрос И-Цзин" : "Ask I Ching Your Own Question"}
        </Link>
      </div>

      {/* Link back to today */}
      <p className="text-center text-xs text-stone-400">
        <Link href="/" className="hover:text-stone-600 underline">
          {params.locale === "ru" ? "← Сегодняшняя гексаграмма" : "← Today's hexagram"}
        </Link>
      </p>
    </div>
  );
}
