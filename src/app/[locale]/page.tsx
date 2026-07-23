"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import DailyHexagram from "@/components/DailyHexagram";
import FreeTierBadge from "@/components/FreeTierBadge";
import FeatureCard from "@/components/FeatureCard";
import ContactForm from "@/components/ContactForm";
import { Link } from "@/navigation";
import { trackClick } from "@/lib/track";

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

// ---- Product Hunt Launch Banner (2026-07-23 ~ 2026-07-31) ----
const PH_BANNER: Record<string, { text: string; cta: string }> = {
  en: { text: "🚀 We're live on Product Hunt!", cta: "Support us with a vote →" },
  ru: { text: "🚀 Мы на Product Hunt!", cta: "Поддержите нас голосом →" },
  ja: { text: "🚀 Product Hunt に登場しました！", cta: "投票で応援 →" },
  ko: { text: "🚀 Product Hunt 출시!", cta: "투표로 응원하기 →" },
};
const PH_URL = "https://www.producthunt.com/posts/chinese-culture-studio";

function showPHBanner(): boolean {
  const now = new Date();
  const start = new Date("2026-07-23T00:00:00Z");
  const end = new Date("2026-07-31T00:00:00Z");
  return now >= start && now < end;
}

function WeeklyFortuneSignup() {
  const t = useTranslations("home");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setStatus("loading");
    trackClick("subscribe_weekly");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "homepage" }),
      });
      if (res.ok) { setStatus("success"); setEmail(""); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  if (status === "success") {
    return (
      <div className="max-w-md mx-auto mb-8 p-5 rounded-xl text-center" style={{ backgroundColor: "rgba(91,154,123,0.12)", border: "1px solid rgba(91,154,123,0.25)" }}>
        <p className="text-sm" style={{ color: "var(--jade)" }}>{t("weeklyFortune.success")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mb-10">
      <div className="rounded-2xl p-5 sm:p-6 text-center" style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-medium)" }}>
        <p className="text-base font-semibold mb-1" style={{ color: "var(--gold)" }}>{t("weeklyFortune.title")}</p>
        <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>{t("weeklyFortune.subtitle")}</p>
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={t("weeklyFortune.placeholder")}
            className="flex-1 px-3 py-2.5 text-sm rounded-xl focus:outline-none"
            style={{ backgroundColor: "var(--bg-deep)", border: "1px solid var(--border-medium)", color: "var(--text-primary)" }}
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-5 py-2.5 text-sm font-medium rounded-xl transition-colors disabled:opacity-60"
            style={{ backgroundColor: "var(--gold)", color: "var(--bg-deep)" }}
          >
            {status === "loading" ? "..." : t("weeklyFortune.cta")}
          </button>
        </form>
        <p className="text-xs mt-3" style={{ color: "var(--text-dim)" }}>{t("weeklyFortune.privacy")}</p>
        {status === "error" && <p className="text-red-400 text-xs mt-2">{t("weeklyFortune.error")}</p>}
      </div>
    </div>
  );
}

export default function HomePage() {
  const t = useTranslations("home");
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const wc = WC_BANNER[locale] || WC_BANNER.en;
  const ph = PH_BANNER[locale] || PH_BANNER.en;

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-12 sm:py-20 relative">
        {/* Decorative glow behind hero */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(201, 169, 110, 0.12) 0%, transparent 70%)",
        }} />
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 relative" style={{ color: "var(--text-primary)" }}>
          {t("title")}
        </h1>
        <p className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed relative" style={{ color: "var(--text-muted)" }}>
          {t("subtitle")}
        </p>

        {/* Quick links */}
        <div className="flex justify-center gap-3 mt-8 flex-wrap relative">
          <Link href="/naming" onClick={() => trackClick("quick_naming")} className="group flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium quick-link">
            <span className="text-lg">名</span>
            {t("quickStart.naming")}
          </Link>
          <Link href="/divination" onClick={() => trackClick("quick_divination")} className="group flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium quick-link">
            <span className="text-lg">卦</span>
            {t("quickStart.divination")}
          </Link>
          <Link href="/calendar" onClick={() => trackClick("quick_calendar")} className="group flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium quick-link">
            <span className="text-lg">曆</span>
            {t("quickStart.calendar")}
          </Link>
        </div>
      </section>

      {/* Hero CTA — primary conversion driver */}
      <div className="max-w-md mx-auto mb-8 px-4">
        <div className="rounded-2xl p-6 text-center relative overflow-hidden" style={{
          background: "linear-gradient(135deg, rgba(201,169,110,0.15) 0%, rgba(201,169,110,0.05) 100%)",
          border: "1px solid var(--border-medium)",
        }}>
          <p className="text-sm font-bold mb-1" style={{ color: "var(--gold)" }}>✨ {t("quickStart.naming")} — Free</p>
          <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>Find a meaningful Chinese name in 30 seconds</p>
          <Link
            href="/naming"
            onClick={() => trackClick("hero_cta_naming")}
            className="inline-block px-6 py-3 rounded-xl text-sm font-bold btn-primary"
          >
            {t("quickStart.naming")} →
          </Link>
        </div>
      </div>

      {showWorldCupBanner() && (
        <div className="max-w-2xl mx-auto mb-6 animate-pulse">
          <Link href="/world-cup" onClick={() => trackClick("banner_worldcup")} className="block">
            <div className="rounded-2xl p-4 sm:p-5 text-center transition-all hover:shadow-md hover:scale-[1.02] active:scale-95" style={{ background: "linear-gradient(135deg, var(--vermilion), #8b1a1a)" }}>
              <p className="text-white/90 text-xs sm:text-sm font-medium mb-1">⚽ {wc.text}</p>
              <p className="text-white font-bold text-sm sm:text-base">{wc.cta}</p>
            </div>
          </Link>
        </div>
      )}

      {showPHBanner() && (
        <div className="max-w-2xl mx-auto mb-6">
          <a href={PH_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackClick("banner_producthunt")} className="block">
            <div className="rounded-2xl p-4 sm:p-5 text-center transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95" style={{ background: "linear-gradient(135deg, #DA552F, #B83A1A)" }}>
              <p className="text-white/90 text-xs sm:text-sm font-medium mb-1">🐱 {ph.text}</p>
              <p className="text-white font-bold text-sm sm:text-base">{ph.cta}</p>
            </div>
          </a>
        </div>
      )}

      <div className="max-w-lg mx-auto mb-6">
        <FreeTierBadge />
      </div>

      <DailyHexagram />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
        <FeatureCard
          href="/naming"
          title={t("features.naming.title")}
          desc={t("features.naming.desc")}
          onClick={() => trackClick("feature_naming")}
        />
        <FeatureCard
          href="/calendar"
          title={t("features.calendar.title")}
          desc={t("features.calendar.desc")}
          onClick={() => trackClick("feature_calendar")}
        />
        <FeatureCard
          href="/divination"
          title={t("features.divination.title")}
          desc={t("features.divination.desc")}
          onClick={() => trackClick("feature_divination")}
        />
        <FeatureCard
          href="/palm-reading"
          title={t("features.palm.title")}
          desc={t("features.palm.desc")}
          hideFree
          onClick={() => trackClick("feature_palm")}
        />
        <FeatureCard
          href="/dream-interpretation"
          title={t("features.dream.title")}
          desc={t("features.dream.desc")}
          onClick={() => trackClick("feature_dream")}
        />
        <FeatureCard
          href="/tools/quick-oracle"
          title={t("features.quickOracle.title")}
          desc={t("features.quickOracle.desc")}
          onClick={() => trackClick("feature_quick_oracle")}
        />
      </div>

      <section className="max-w-4xl mx-auto mt-12 sm:mt-16 mb-10">
        <h2 className="text-lg font-semibold text-center mb-6" style={{ color: "var(--text-primary)" }}>
          {t("guides.heading")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          {([
            { key: "iching", href: "/guide/iching-beginner" },
            { key: "fiveElements", href: "/guide/five-elements" },
            { key: "snake2027", href: "/snake-2027" },
            { key: "zodiac", href: "/guide/chinese-zodiac" },
            { key: "lucky", href: "/guide/lucky-numbers" },
            { key: "fengshui", href: "/guide/feng-shui" },
            { key: "dreams", href: "/guide/dream-meaning" },
            { key: "names", href: "/guide/chinese-name" },
          ] as const).map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => trackClick(`guide_${key}`)}
              className="block px-3 py-2.5 rounded-lg text-sm transition-colors text-center guide-link"
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {t(`guides.${key}` as any)}
            </Link>
          ))}
        </div>
      </section>

      <WeeklyFortuneSignup />

      <ContactForm />

      <section className="mt-12 sm:mt-20 text-center">
        <p className="text-xs max-w-md mx-auto leading-relaxed" style={{ color: "var(--text-dim)" }}>
          <Link href="/privacy" className="underline footer-link">{t("privacy")}</Link>
          {" · "}
          <Link href="/terms" className="underline footer-link">{t("terms")}</Link>
        </p>
      </section>
    </div>
  );
}
