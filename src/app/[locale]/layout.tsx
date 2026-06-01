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

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "common" });
  const locale = params.locale;

  const localeMeta: Record<string, { tagline: string; desc: string; ogDesc: string; twitterDesc: string; ogLocale: string }> = {
    en: {
      tagline: "Chinese Name, Auspicious Dates, I Ching & Palm Reading",
      desc: "Discover your authentic Chinese name, find auspicious dates, consult the I Ching, or get a palm reading based on classical Chinese texts. Pay what you want (min $1).",
      ogDesc: "AI-powered Chinese cultural readings: names, auspicious dates, I Ching divination, and palm reading. Pay what you want (min $1).",
      twitterDesc: "AI-powered Chinese cultural readings from classical texts. Chinese naming, date selection, I Ching, palm reading. Pay what you want.",
      ogLocale: "en_US",
    },
    ru: {
      tagline: "Китайское Имя, Даты, И-Цзин и Хиромантия",
      desc: "Откройте для себя подлинное китайское имя, найдите благоприятные даты, обратитесь к И-Цзин или получите чтение ладони на основе классических китайских текстов. Платите сколько хотите (мин. $1).",
      ogDesc: "Культурные чтения с ИИ: китайские имена, благоприятные даты, гадание И-Цзин и хиромантия. Платите сколько хотите.",
      twitterDesc: "Культурные чтения с ИИ из классических китайских текстов. Именование, выбор дат, И-Цзин, хиромантия. Платите сколько хотите.",
      ogLocale: "ru_RU",
    },
    ja: {
      tagline: "中国名、吉日、易経、手相",
      desc: "本格的な中国名を見つけ、縁起の良い日を選び、易経に問いかけ、古典テキストに基づいた手相鑑定を受けましょう。お好きな金額で（最低$1）。",
      ogDesc: "AI搭載の中国文化リーディング：命名、吉日選択、易経占い、手相鑑定。お好きな金額で。",
      twitterDesc: "古典テキストからのAI中国文化リーディング。中国命名、日付選択、易経、手相。お好きな金額で。",
      ogLocale: "ja_JP",
    },
  };

  const meta = localeMeta[locale] || localeMeta.en;
  const urlPath = locale === "en" ? "" : `/${locale}`;

  return {
    title: `${t("siteName")} — ${meta.tagline}`,
    description: meta.desc,
    keywords: ["Chinese name", "I Ching", "divination", "auspicious date", "palm reading", "palmistry", "Chinese zodiac", "five elements", "feng shui", "Chinese culture", "Book of Changes", "Chinese naming"],
    openGraph: {
      title: `Chinese Culture Studio — ${meta.tagline}`,
      description: meta.ogDesc,
      url: `https://chinese-culture-app.onrender.com${urlPath}`,
      siteName: "Chinese Culture Studio",
      locale: meta.ogLocale,
      type: "website",
      images: [{ url: `https://chinese-culture-app.onrender.com/api/og?lang=${params.locale}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Chinese Culture Studio — ${meta.tagline}`,
      description: meta.twitterDesc,
      images: [`https://chinese-culture-app.onrender.com/api/og?lang=${locale}`],
    },
    robots: { index: true, follow: true },
    alternates: {
      languages: {
        en: "https://chinese-culture-app.onrender.com",
        ru: "https://chinese-culture-app.onrender.com/ru",
        ja: "https://chinese-culture-app.onrender.com/ja",
      },
      types: {
        "application/rss+xml": "https://chinese-culture-app.onrender.com/api/rss",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const messages = await getMessages();
  const t = await getTranslations({ locale: params.locale, namespace: "common" });

  const pathname = params.locale === "en" ? "" : `/${params.locale}`;

  const footerGuideLabels: Record<string, string[]> = {
    en: ["Chinese Name Guide", "Boy Names", "Girl Names", "I Ching Guide", "I Ching Beginner", "Auspicious Dates", "Wedding Dates 2026", "Chinese Zodiac", "Five Elements", "CNY 2027"],
    ru: ["Гид по Китайским Именам", "Мужские Имена", "Женские Имена", "Гид по И-Цзин", "И-Цзин для Начинающих", "Благоприятные Даты", "Свадебные Даты 2026", "Китайский Зодиак", "Пять Элементов", "КНГ 2027"],
    ja: ["中国名ガイド", "男性の名前", "女性の名前", "易経ガイド", "易経入門", "吉日", "2026年結婚日", "十二支", "五行", "旧正月2027"],
  };

  const guideSlugs = [
    "chinese-name", "chinese-name-boy", "chinese-name-girl", "iching", "iching-beginner",
    "auspicious-dates", "wedding-dates-2026", "chinese-zodiac", "five-elements", "chinese-new-year-2027",
  ];

  const labels = footerGuideLabels[params.locale] || footerGuideLabels.en;
  const footerGuides = guideSlugs.map((slug, i) => ({
    href: `/guide/${slug}`,
    label: labels[i],
  }));

  return (
    <html lang={params.locale}>
      <body className="min-h-screen text-stone-800 antialiased">
        <NextIntlClientProvider messages={messages} locale={params.locale}>
          <Suspense fallback={null}>
            <AutoDailyReport />
          </Suspense>
          <JsonLd />
          <AppProvider>
            <AnalyticsTracker />
            <header className="border-b border-stone-200/60 bg-white/70 backdrop-blur-md sticky top-0 z-50">
              <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
                <a href={`${pathname || ""}/`} className="text-lg font-bold tracking-tight text-accent">
                  Chinese Culture Studio
                </a>
                <nav className="hidden sm:flex gap-4 text-sm text-stone-500 items-center">
                  <a href={`${pathname}/naming`} className="hover:text-stone-800 transition-colors">{t("nav.name")}</a>
                  <a href={`${pathname}/calendar`} className="hover:text-stone-800 transition-colors">{t("nav.dates")}</a>
                  <a href={`${pathname}/divination`} className="hover:text-stone-800 transition-colors">{t("nav.iching")}</a>
                  <a href={`${pathname}/palm-reading`} className="hover:text-stone-800 transition-colors">{t("nav.palmReading")}</a>
                  <span className="text-stone-300 mx-1">|</span>
                  <LanguageSwitcher />
                </nav>
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="sm:hidden"><LanguageSwitcher /></span>
                  <ShareButton />
                  <NavMenu />
                </div>
              </div>
            </header>
            <main className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8">{children}</main>
            <footer className="border-t border-stone-200/60 py-6 sm:py-8 mt-12 sm:mt-16">
              <div className="max-w-5xl mx-auto px-4 text-center text-xs text-stone-400 space-y-2">
                <p>{t("footer.disclaimer")}</p>
                <p>{t("footer.paymentNote")}</p>
                <p className="flex justify-center gap-4 flex-wrap">
                  {footerGuides.map((g) => (
                    <a key={g.href} href={`${pathname}${g.href}`} className="hover:text-stone-500 underline">{g.label}</a>
                  ))}
                </p>
                <p className="flex justify-center gap-4 flex-wrap">
                  <a href={`${pathname}/terms`} className="hover:text-stone-500 underline">{t("footer.terms")}</a>
                  <a href={`${pathname}/privacy`} className="hover:text-stone-500 underline">{t("footer.privacy")}</a>
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
