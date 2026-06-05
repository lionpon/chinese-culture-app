import type { Metadata } from "next";
import { performDivination } from "@/lib/divination";
import { generateHexagramArticle } from "@/lib/hexagram-article";
import { hexagramNameJa, hexagramNameRu } from "@/data/hexagram-names";
import { judgmentJa, judgmentRu, descriptionJa, descriptionRu, adviceJa, adviceRu } from "@/data/hexagram-content";
import { Link } from "@/navigation";
import { notFound } from "next/navigation";
import SpeakButton from "@/components/SpeakButton";
import { DailyArticleSchema, BreadcrumbListSchema } from "@/components/JsonLd";
import { BASE_URL } from "@/lib/config";

type Props = {
  params: { locale: string; date: string };
};

function getLocalizedName(id: number, locale: string): string {
  if (locale === "ja") return hexagramNameJa[id] || "";
  if (locale === "ru") return hexagramNameRu[id] || "";
  if (locale === "ko") return "";
  return "";
}

function getLocalizedContent(id: number, locale: string) {
  if (locale === "ja" || locale === "ko") return {
    judgment: judgmentJa[id] || "",
    description: descriptionJa[id] || "",
    advice: adviceJa[id] || "",
  };
  if (locale === "ru") return {
    judgment: judgmentRu[id] || "",
    description: descriptionRu[id] || "",
    advice: adviceRu[id] || "",
  };
  return null;
}

function getDateLocale(locale: string): string {
  if (locale === "ru") return "ru";
  if (locale === "ja") return "ja";
  if (locale === "ko") return "ko";
  return "en";
}

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
  const formatter = new Intl.DateTimeFormat(getDateLocale(params.locale), {
    year: "numeric", month: "long", day: "numeric",
  });
  const result = getHexagramForDate(params.date);
  if (!result) return { title: "Not Found" };

  const { mainHexagram: h } = result;
  const dateStr = formatter.format(new Date(params.date + "T00:00:00Z"));
  const displayName = getLocalizedName(h.id, params.locale) || h.nameEn;
  const localePrefix = params.locale === "en" ? "" : `/${params.locale}`;
  const title = params.locale === "ru"
    ? `И-Цзин дня ${dateStr}: ${h.nameZh} — ${displayName}`
    : params.locale === "ja"
    ? `今日の易経 ${dateStr}: ${h.nameZh} — ${displayName}`
    : params.locale === "ko"
    ? `오늘의 주역 ${dateStr}: ${h.nameZh} — ${displayName}`
    : `Daily I Ching ${dateStr}: ${h.nameZh} — ${displayName}`;
  const desc = h.advice.slice(0, 160);

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url: `${BASE_URL}${localePrefix}/daily/${params.date}`,
      images: [{ url: `${BASE_URL}/api/og?title=${encodeURIComponent(h.nameZh)}&sub=${encodeURIComponent(displayName)}&lang=${params.locale}`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description: desc },
    robots: "index, follow",
  };
}

export default async function DailyHexagramPage({ params }: Props) {
  const result = getHexagramForDate(params.date);
  if (!result) notFound();

  const { mainHexagram: h, changedHexagram: ch, changingLine: cl } = result;

  const formatter = new Intl.DateTimeFormat(getDateLocale(params.locale), {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const mainName = getLocalizedName(h.id, params.locale) || h.nameEn;
  const changedName = ch && ch.id !== h.id ? (getLocalizedName(ch.id, params.locale) || ch.nameEn) : null;
  const localizedContent = getLocalizedContent(h.id, params.locale);
  const localizedChanged = ch ? getLocalizedContent(ch.id, params.locale) : null;

  const judgmentText = localizedContent?.judgment || h.judgmentEn;
  const adviceText = localizedContent?.advice || h.advice;
  const changedJudgment = localizedChanged?.judgment || (ch?.judgmentEn || "");

  const localePrefix = params.locale === "en" ? "" : `/${params.locale}`;
  const pageUrl = `${BASE_URL}${localePrefix}/daily/${params.date}`;

  return (
    <div className="max-w-2xl mx-auto">
      <DailyArticleSchema
        title={params.locale === "ru"
          ? `И-Цзин дня: ${h.nameZh} — ${mainName}`
          : params.locale === "ja"
          ? `今日の易経: ${h.nameZh} — ${mainName}`
          : `Daily I Ching: ${h.nameZh} — ${mainName}`}
        description={h.descriptionEn}
        date={params.date}
        url={pageUrl}
        hexagramId={h.id}
      />
      <BreadcrumbListSchema
        items={[
          { name: "Chinese Culture Studio", url: `${BASE_URL}${localePrefix}` },
          { name: params.locale === "ru" ? "И-Цзин дня" : params.locale === "ja" ? "今日の易経" : params.locale === "ko" ? "오늘의 주역" : "Daily I Ching", url: pageUrl },
        ]}
      />
      <p className="text-center text-xs text-stone-400 mb-2">
        {formatter.format(new Date(params.date + "T00:00:00Z"))}
      </p>
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2" style={{ color: "var(--accent)" }}>
        {h.nameZh}
      </h1>
      <div className="flex items-center justify-center gap-2 mb-6">
        <p className="text-sm text-stone-500">
          {h.pinyin} — {mainName}
        </p>
        <SpeakButton text={h.nameZh} />
      </div>

      {/* Judgment */}
      <section className="card-classic p-4 sm:p-6 mb-6">
        <h2 className="text-sm font-semibold text-stone-600 mb-2">
          {params.locale === "ru" ? "Суждение" : params.locale === "ja" ? "卦辞" : params.locale === "ko" ? "괘사" : "Judgment"}
        </h2>
        <p className="text-stone-700 leading-relaxed">{judgmentText}</p>
        {h.judgment && h.judgment !== judgmentText && (
          <p className="text-stone-500 text-sm mt-2 italic">{h.judgment}</p>
        )}
      </section>

      {/* Advice */}
      <section className="card-classic p-4 sm:p-6 mb-6">
        <h2 className="text-sm font-semibold text-stone-600 mb-2">
          {params.locale === "ru" ? "Совет" : params.locale === "ja" ? "助言" : params.locale === "ko" ? "조언" : "Advice"}
        </h2>
        <p className="text-stone-700 leading-relaxed">{adviceText}</p>
      </section>

      {/* Changing Line */}
      {cl && cl.textEn && (
        <section className="card-classic p-4 sm:p-6 mb-6">
          <h2 className="text-sm font-semibold text-stone-600 mb-2">
            {params.locale === "ru" ? "Меняющаяся линия" : params.locale === "ja" ? "変爻" : params.locale === "ko" ? "변효" : "Changing Line"} #{cl.position}
          </h2>
          <p className="text-stone-700 leading-relaxed">{cl.textEn}</p>
        </section>
      )}

      {/* Changed Hexagram */}
      {ch && ch.id !== h.id && (
        <section className="card-classic p-4 sm:p-6 mb-6">
          <h2 className="text-sm font-semibold text-stone-600 mb-3">
            {params.locale === "ru" ? "Развитие ситуации" : params.locale === "ja" ? "展開" : params.locale === "ko" ? "전개 방향" : "Where This Is Heading"}
          </h2>
          <p className="text-xl font-bold mb-1" style={{ color: "var(--accent)" }}>{ch.nameZh}</p>
          <div className="flex items-center gap-2 mb-3">
            <p className="text-sm text-stone-500">{ch.pinyin} — {changedName}</p>
            <SpeakButton text={ch.nameZh} />
          </div>
          <p className="text-stone-700 leading-relaxed">{changedJudgment}</p>
        </section>
      )}

      {/* Article */}
      <section className="card-classic p-4 sm:p-6 mb-6 prose prose-sm max-w-none">
        <h2 className="text-lg font-semibold text-stone-700 mb-4">
          {params.locale === "ru" ? "Толкование дня" : params.locale === "ja" ? "今日の解釈" : params.locale === "ko" ? "오늘의 주역 해석" : "Today's I Ching Interpretation"}
        </h2>
        {generateHexagramArticle(result, params.locale).split("\n\n").map((p, i) => (
          <p key={i} className="text-stone-600 leading-relaxed mb-3 text-sm">{p}</p>
        ))}
      </section>

      {/* CTA */}
      <div className="text-center mt-8 mb-12">
        <Link
          href="/divination"
          className="inline-block px-6 py-3 rounded-xl font-medium btn-primary"
        >
          {params.locale === "ru" ? "Задайте свой вопрос И-Цзин" : params.locale === "ja" ? "易経に問いかける" : params.locale === "ko" ? "주역에게 질문하기" : "Ask I Ching Your Own Question"}
        </Link>
      </div>

      {/* Link back to today */}
      <p className="text-center text-xs text-stone-400">
        <Link href="/" className="hover:text-stone-600 underline">
          {params.locale === "ru" ? "← Сегодняшняя гексаграмма" : params.locale === "ja" ? "← 今日の卦" : params.locale === "ko" ? "← 오늘의 괘" : "← Today's hexagram"}
        </Link>
      </p>
    </div>
  );
}
