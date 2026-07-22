import type { Metadata } from "next";
import { Suspense } from "react";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import "../globals.css";
import AppProvider from "@/components/AppProvider";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import AutoDailyReport from "@/components/AutoDailyReport";
import JsonLd from "@/components/JsonLd";
import NavMenu from "@/components/NavMenu";
import CookieConsent from "@/components/CookieConsent";
import ShareButton from "@/components/ShareButton";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { BASE_URL } from "@/lib/config";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "common" });
  const locale = params.locale;

  const localeMeta: Record<string, { tagline: string; desc: string; ogDesc: string; twitterDesc: string; ogLocale: string }> = {
    en: {
      tagline: "Chinese Name, Auspicious Dates, I Ching, Palm & Dream Reading",
      desc: "Discover your authentic Chinese name, consult the I Ching oracle, find auspicious wedding dates, get AI palm reading & decode your dreams. 5 ancient wisdom tools — try free, pay $1 to unlock. Trusted by 42+ countries.",
      ogDesc: "5 ancient Chinese wisdom tools: Chinese naming, I Ching divination, auspicious dates, palm reading & dream interpretation. Try free, unlock full results for $1. Used in 42+ countries.",
      twitterDesc: "5 ancient Chinese wisdom tools — naming, I Ching, auspicious dates, palm reading, dream interpretation. Try free, pay $1. Used in 42+ countries.",
      ogLocale: "en_US",
    },
    ru: {
      tagline: "Китайское Имя, Даты, И-Цзин, Хиромантия и Толкование снов",
      desc: "Откройте для себя подлинное китайское имя, найдите благоприятные даты, обратитесь к И-Цзин, получите чтение ладони или толкование сна на основе классических китайских текстов. Платите сколько хотите (мин. $1).",
      ogDesc: "Культурные чтения с ИИ: китайские имена, благоприятные даты, гадание И-Цзин, хиромантия и толкование снов. Платите сколько хотите.",
      twitterDesc: "Культурные чтения с ИИ из классических китайских текстов. Именование, выбор дат, И-Цзин, хиромантия, толкование снов. Платите сколько хотите.",
      ogLocale: "ru_RU",
    },
    ja: {
      tagline: "中国名、吉日、易経、手相、夢占い",
      desc: "本格的な中国名を見つけ、縁起の良い日を選び、易経に問いかけ、古典テキストに基づいた手相鑑定や夢占いを受けましょう。お好きな金額で（最低$1）。",
      ogDesc: "AI搭載の中国文化リーディング：命名、吉日選択、易経占い、手相鑑定、夢占い。お好きな金額で。",
      twitterDesc: "古典テキストからのAI中国文化リーディング。中国命名、日付選択、易経、手相、夢占い。お好きな金額で。",
      ogLocale: "ja_JP",
    },
    ko: {
      tagline: "중국식 이름, 길일, 주역, 수상 & 꿈 해몽",
      desc: "정통 중국식 이름을 발견하고, 길일을 찾고, 주역에 질문하거나, 고전 문헌에 기반한 수상 분석과 꿈 해몽을 받아보세요. 원하는 만큼 후원하세요 (최소 $1).",
      ogDesc: "AI 기반 중국 문화 리딩: 작명, 길일 선택, 주역 점술, 수상, 꿈 해몽. 원하는 만큼 후원하세요.",
      twitterDesc: "고전 문헌에 기반한 AI 중국 문화 리딩. 작명, 날짜 선택, 주역, 수상, 꿈 해몽. 원하는 만큼 후원하세요.",
      ogLocale: "ko_KR",
    },
  };

  const meta = localeMeta[locale] || localeMeta.en;
  const urlPath = locale === "en" ? "" : `/${locale}`;

  return {
    title: `${t("siteName")} — ${meta.tagline}`,
    description: meta.desc,
    keywords: {
      en: ["Chinese name", "Chinese female names", "Chinese girl names", "Chinese boy names", "I Ching", "divination", "auspicious date", "wedding dates 2026", "palm reading", "palmistry", "Chinese zodiac", "five elements", "feng shui", "Chinese culture", "Book of Changes", "Chinese naming", "dream interpretation", "dream meaning"],
      ru: ["И-Цзин", "Книга Перемен", "китайское имя", "гадание", "благоприятные даты", "хиромантия", "китайский календарь", "фэн-шуй", "китайская культура", "выбор дат"],
      ja: ["易経", "占い", "中国名", "吉日", "手相", "夢占い", "陰陽五行", "風水", "中国の知恵", "命名"],
      ko: ["주역", "점술", "중국식 이름", "길일", "수상", "꿈 해몽", "오행", "풍수", "중국 문화", "작명"],
    }[locale] || ["Chinese name", "I Ching", "divination", "auspicious date", "palm reading", "palmistry", "Chinese zodiac", "five elements", "feng shui", "Chinese culture", "Book of Changes", "Chinese naming"],
    openGraph: {
      title: `Chinese Culture Studio — ${meta.tagline}`,
      description: meta.ogDesc,
      url: `${BASE_URL}${urlPath}`,
      siteName: "Chinese Culture Studio",
      locale: meta.ogLocale,
      type: "website",
      images: [{ url: `${BASE_URL}/api/og?lang=${params.locale}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Chinese Culture Studio — ${meta.tagline}`,
      description: meta.twitterDesc,
      images: [`${BASE_URL}/api/og?lang=${locale}`],
    },
    robots: { index: true, follow: true },
    alternates: {
      languages: {
        en: `${BASE_URL}`,
        ru: `${BASE_URL}/ru`,
        ja: `${BASE_URL}/ja`,
        ko: `${BASE_URL}/ko`,
      },
      types: {
        "application/rss+xml": `${BASE_URL}/api/rss`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const messages = await getMessages();
  const t = await getTranslations({ locale: params.locale, namespace: "common" });

  const pathname = params.locale === "en" ? "" : `/${params.locale}`;

  const footerGuideLabels: Record<string, string[]> = {
    en: ["Chinese Name Guide", "Boy Names", "Girl Names", "I Ching Guide", "I Ching Beginner", "Auspicious Dates", "Wedding Dates 2026", "Chinese Zodiac", "Five Elements", "CNY 2027", "Lucky Numbers", "Feng Shui", "Face Reading", "Dream Meaning", "Free Zodiac Calculator", "Five Elements Test", "AI Dream Decoder", "Love Match", "Daily Fortune", "Name Preview"],
    ru: ["Гид по Китайским Именам", "Мужские Имена", "Женские Имена", "Гид по И-Цзин", "И-Цзин для Начинающих", "Благоприятные Даты", "Свадебные Даты 2026", "Китайский Зодиак", "Пять Элементов", "КНГ 2027", "Счастливые числа", "Фэн-шуй", "Чтение лица", "Толкование снов", "Калькулятор Зодиака", "Тест Пяти Элементов", "AI Расшифровка Снов", "Совместимость", "Предсказание", "Превью Имён"],
    ja: ["中国名ガイド", "男性の名前", "女性の名前", "易経ガイド", "易経入門", "吉日", "2026年結婚日", "十二支", "五行", "旧正月2027", "縁起の良い数字", "風水", "人相学", "夢占い", "無料十二支計算", "五行診断", "AI夢解読", "相性診断", "今日の運勢", "名前プレビュー"],
    ko: ["중국식 이름 가이드", "남자 이름", "여자 이름", "주역 가이드", "주역 입문", "길일", "2026 결혼 날짜", "십이지", "오행", "2027 춘절", "행운의 숫자", "풍수", "관상", "꿈 해몽", "무료 띠 계산기", "오행 테스트", "AI 꿈 해몽", "궁합 진단", "오늘의 운세", "이름 미리보기"],
  };

  const guideSlugs = [
    "chinese-name", "chinese-name-boy", "chinese-name-girl", "iching", "iching-beginner",
    "auspicious-dates", "wedding-dates-2026", "chinese-zodiac", "five-elements", "chinese-new-year-2027",
    "lucky-numbers", "feng-shui", "face-reading", "dream-meaning",
  ];

  const toolSlugs = ["zodiac-calculator", "five-elements-test", "dream-ai", "zodiac-match", "daily-fortune", "name-preview"];

  const allLabels = footerGuideLabels[params.locale] || footerGuideLabels.en;
  const guideLabels = allLabels.slice(0, 14);
  const toolLabels = allLabels.slice(14);

  const footerGuides = guideSlugs.map((slug, i) => ({
    href: `/guide/${slug}`,
    label: guideLabels[i],
  }));

  const footerTools = toolSlugs.map((slug, i) => ({
    href: `/tools/${slug}`,
    label: toolLabels[i],
  }));

  return (
    <html lang={params.locale}>
      <body className="min-h-screen antialiased" style={{ backgroundColor: "var(--bg-deep)", color: "var(--text-body)" }}>
        <NextIntlClientProvider messages={messages} locale={params.locale}>
          <Suspense fallback={null}>
            <AutoDailyReport />
          </Suspense>
          <JsonLd />
          <AppProvider>
            <AnalyticsTracker />
            <header className="sticky top-0 z-50" style={{ borderBottom: "1px solid var(--border-subtle)", backgroundColor: "rgba(15, 15, 26, 0.85)", backdropFilter: "blur(12px)" }}>
              <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
                <a href={`${pathname || ""}/`} className="text-lg font-bold tracking-tight" style={{ color: "var(--gold)" }}>
                  Chinese Culture Studio
                </a>
                <nav className="hidden sm:flex gap-3 text-sm items-center">
                  <a href={`${pathname}/world-cup`} className="font-semibold hover:opacity-80 transition-opacity" style={{ color: "var(--vermilion)" }}>⚽ WC</a>
                  <a href={`${pathname}/naming`} className="nav-link">{t("nav.name")}</a>
                  <a href={`${pathname}/calendar`} className="nav-link">{t("nav.dates")}</a>
                  <a href={`${pathname}/divination`} className="nav-link">{t("nav.iching")}</a>
                  <a href={`${pathname}/daily/${new Date().toISOString().slice(0, 10)}`} className="nav-link" style={{ color: "var(--gold)" }}>✦ {t("nav.daily")}</a>
                  {/* Free Tools dropdown */}
                  <div className="relative group">
                    <button className="nav-link flex items-center gap-0.5">
                      {t("nav.freeTools")}
                      <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <div className="absolute top-full right-0 mt-1 py-2 w-48 rounded-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border-medium)", boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }}>
                      <a href={`${pathname}/palm-reading`} className="block px-4 py-2 text-sm hover:bg-white/5 transition-colors">{t("nav.palmMenu")}</a>
                      <a href={`${pathname}/dream-interpretation`} className="block px-4 py-2 text-sm hover:bg-white/5 transition-colors">{t("nav.dreamMenu")}</a>
                      <div className="my-1 mx-3" style={{ borderTop: "1px solid var(--border-subtle)" }} />
                      <a href={`${pathname}/tools/zodiac-calculator`} className="block px-4 py-2 text-sm hover:bg-white/5 transition-colors">{t("nav.zodiacCalc")}</a>
                      <a href={`${pathname}/tools/five-elements-test`} className="block px-4 py-2 text-sm hover:bg-white/5 transition-colors">{t("nav.fiveElementsTest")}</a>
                      <div className="my-1 mx-3" style={{ borderTop: "1px solid var(--border-subtle)" }} />
                      <a href={`${pathname}/tools/dream-ai`} className="block px-4 py-2 text-sm hover:bg-white/5 transition-colors" style={{ color: "var(--gold)" }}>✦ {t("nav.dreamAi")}</a>
                      <div className="my-1 mx-3" style={{ borderTop: "1px solid var(--border-subtle)" }} />
                      <a href={`${pathname}/tools/zodiac-match`} className="block px-4 py-2 text-sm hover:bg-white/5 transition-colors">💕 {t("nav.zodiacMatch")}</a>
                      <a href={`${pathname}/tools/daily-fortune`} className="block px-4 py-2 text-sm hover:bg-white/5 transition-colors">🔮 {t("nav.dailyFortune")}</a>
                      <a href={`${pathname}/tools/name-preview`} className="block px-4 py-2 text-sm hover:bg-white/5 transition-colors">✨ {t("nav.namePreview")}</a>
                    </div>
                  </div>
                  <span style={{ color: "var(--border-medium)" }} className="mx-0.5">|</span>
                  <LanguageSwitcher />
                </nav>
                <div className="flex items-center gap-2 sm:gap-4">
                  <a href={`${pathname}/world-cup`} className="sm:hidden text-xs font-bold px-2.5 py-1 rounded-full animate-pulse" style={{ backgroundColor: "var(--vermilion)", color: "#fff" }}>
                    ⚽ WC
                  </a>
                  <span className="sm:hidden"><LanguageSwitcher /></span>
                  <ShareButton />
                  <NavMenu />
                </div>
              </div>
            </header>
            <main className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8 relative z-10">{children}</main>
            <footer className="py-6 sm:py-8 mt-12 sm:mt-16" style={{ borderTop: "1px solid var(--border-subtle)" }}>
              <div className="max-w-5xl mx-auto px-4 text-center text-xs space-y-2" style={{ color: "var(--text-dim)" }}>
                <p>{t("footer.disclaimer")}</p>
                <p>{t("footer.paymentNote")}</p>
                <p className="flex justify-center gap-4 flex-wrap">
                  {footerGuides.map((g) => (
                    <a key={g.href} href={`${pathname}${g.href}`} className="underline footer-link">{g.label}</a>
                  ))}
                </p>
                <p className="flex justify-center gap-4 flex-wrap font-medium">
                  {footerTools.map((g) => (
                    <a key={g.href} href={`${pathname}${g.href}`} className="underline footer-link">{g.label}</a>
                  ))}
                </p>
                <p className="flex justify-center gap-4 flex-wrap">
                  <a href={`${pathname}/about`} className="underline footer-link">{t("footer.about")}</a>
                  <a href={`${pathname}/terms`} className="underline footer-link">{t("footer.terms")}</a>
                  <a href={`${pathname}/privacy`} className="underline footer-link">{t("footer.privacy")}</a>
                </p>
                <p>{t("footer.copyright")}</p>
              </div>
            </footer>
            <CookieConsent />
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
