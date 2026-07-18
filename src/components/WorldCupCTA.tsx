"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/navigation";
import { trackClick } from "@/lib/track";

const WC_BANNER: Record<string, { hero: string; cta: string; ctaText: string; freeLabel: string; paidLabel: string }> = {
  en: { hero: "I Ching x World Cup 2026", cta: "Try I Ching Divination", ctaText: "Ask the I Ching your own question — about football or anything else.", freeLabel: "1 free reading", paidLabel: "Unlock full reading" },
  ru: { hero: "И-Цзин x ЧМ-2026", cta: "Гадание И-Цзин", ctaText: "Задайте И-Цзин свой вопрос.", freeLabel: "1 бесплатное гадание", paidLabel: "Полное гадание" },
  ja: { hero: "易経 x 2026 W杯", cta: "易経占いを試す", ctaText: "易経に質問してみてください。サッカーでも何でも。", freeLabel: "無料占い1回", paidLabel: "完全なリーディング" },
  ko: { hero: "주역 x 2026 월드컵", cta: "주역 점술 시도", ctaText: "주역에게 질문해보세요. 축구든 무엇이든.", freeLabel: "무료 점 1회", paidLabel: "전체 리딩 보기" },
};

export default function WorldCupCTA() {
  const locale = useLocale();
  const u = WC_BANNER[locale] || WC_BANNER.en;

  return (
    <div className="mb-6 rounded-2xl overflow-hidden shadow-lg"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
      {/* Top hero strip */}
      <div className="px-5 pt-5 pb-4 text-center">
        <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-1">⚽ {u.hero}</p>
        <p className="text-white/80 text-sm leading-relaxed max-w-md mx-auto">{u.ctaText}</p>
      </div>

      {/* Dual CTA buttons — free vs paid */}
      <div className="flex flex-col sm:flex-row gap-2 px-5 pb-5">
        <Link
          href="/divination"
          onClick={() => trackClick("wc_cta_free")}
          className="flex-1 py-3 rounded-xl text-sm font-bold text-center border-2 border-amber-400/50 text-amber-400 hover:bg-amber-400/10 transition-all"
        >
          ✨ {u.freeLabel} →
        </Link>
        <Link
          href="/divination"
          onClick={() => trackClick("wc_cta_paid")}
          className="flex-1 py-3 rounded-xl text-sm font-bold text-center bg-amber-400 text-[#1a1a2e] hover:bg-amber-300 transition-all shadow-md"
        >
          🔮 {u.paidLabel} →
        </Link>
      </div>
    </div>
  );
}
