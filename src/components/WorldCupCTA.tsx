"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/navigation";
import { trackClick } from "@/lib/track";

const WC_BANNER: Record<string, { hero: string; cta: string; ctaText: string }> = {
  en: { hero: "I Ching x World Cup 2026", cta: "Try I Ching Divination", ctaText: "Ask the I Ching your own question — about football or anything else." },
  ru: { hero: "И-Цзин x ЧМ-2026", cta: "Гадание И-Цзин", ctaText: "Задайте И-Цзин свой вопрос." },
  ja: { hero: "易経 x 2026 W杯", cta: "易経占い", ctaText: "易経に質問してみてください。" },
  ko: { hero: "주역 x 2026 월드컵", cta: "주역 점술", ctaText: "주역에게 질문해보세요." },
};

export default function WorldCupCTA() {
  const locale = useLocale();
  const u = WC_BANNER[locale] || WC_BANNER.en;

  return (
    <div className="mb-6 p-4 rounded-2xl text-center"
      style={{ background: "linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 60%, #f59e0b))" }}>
      <p className="text-white/90 text-sm font-medium mb-2">⚽ {u.hero}</p>
      <Link
        href="/divination"
        onClick={() => trackClick("wc_top_cta")}
        className="inline-block px-5 py-2.5 rounded-xl text-sm font-bold bg-white text-accent hover:bg-stone-50 transition-colors shadow-sm"
      >
        {u.cta} →
      </Link>
      <p className="text-white/60 text-xs mt-2">{u.ctaText}</p>
    </div>
  );
}
