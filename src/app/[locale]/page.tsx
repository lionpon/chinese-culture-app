"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import DailyHexagram from "@/components/DailyHexagram";
import FreeTierBadge from "@/components/FreeTierBadge";
import FeatureCard from "@/components/FeatureCard";
import ContactForm from "@/components/ContactForm";
import TrustSignals from "@/components/TrustSignals";
import { Link } from "@/navigation";

const WC_BANNER: Record<string, { text: string; cta: string }> = {
  en: { text: "I Ching x World Cup 2026", cta: "See today's match predictions →" },
  ru: { text: "И-Цзин x ЧМ-2026", cta: "Прогнозы на сегодняшние матчи →" },
  ja: { text: "易経 x 2026 W杯", cta: "本日の試合予想を見る →" },
  ko: { text: "주역 x 2026 월드컵", cta: "오늘의 경기 예측 보기 →" },
};

function showWorldCupBanner(): boolean {
  const now = new Date();
  const start = new Date("2026-06-11T00:00:00Z");
  const end = new Date("2026-07-20T00:00:00Z");
  return now >= start && now < end;
}

export default function HomePage() {
  const t = useTranslations("home");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const wc = WC_BANNER[locale] || WC_BANNER.en;

  return (
    <div>
      <section className="text-center py-12 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4">
          {t("title")}
        </h1>
        <p className="text-base sm:text-lg text-stone-500 max-w-lg mx-auto leading-relaxed">
          {t("subtitle")}
        </p>
      </section>

      <TrustSignals />

      {showWorldCupBanner() && (
        <div className="max-w-2xl mx-auto mb-6">
          <Link href="/world-cup" className="block">
            <div className="rounded-2xl p-4 sm:p-5 text-center transition-all hover:shadow-md"
              style={{ background: "linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, #f59e0b))" }}>
              <p className="text-white/90 text-xs sm:text-sm font-medium mb-1">⚽ {wc.text}</p>
              <p className="text-white font-bold text-sm sm:text-base">{wc.cta}</p>
            </div>
          </Link>
        </div>
      )}

      <div className="max-w-lg mx-auto mb-6">
        <FreeTierBadge />
      </div>

      <DailyHexagram />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
        <FeatureCard
          href="/naming"
          title={t("features.naming.title")}
          desc={t("features.naming.desc")}
        />
        <FeatureCard
          href="/calendar"
          title={t("features.calendar.title")}
          desc={t("features.calendar.desc")}
        />
        <FeatureCard
          href="/divination"
          title={t("features.divination.title")}
          desc={t("features.divination.desc")}
        />
        <FeatureCard
          href="/palm-reading"
          title={t("features.palm.title")}
          desc={t("features.palm.desc")}
          hideFree
        />
      </div>

      <ContactForm />

      <section className="mt-12 sm:mt-20 text-center">
        <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
          <Link href="/privacy" className="underline hover:text-stone-500">{t("privacy")}</Link>
          {" · "}
          <Link href="/terms" className="underline hover:text-stone-500">{t("terms")}</Link>
        </p>
      </section>
    </div>
  );
}
