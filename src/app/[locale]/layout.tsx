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

  return {
    title: `${t("siteName")} — ${params.locale === "ru" ? "Китайское Имя, Даты, И-Цзин и Хиромантия" : "Chinese Name, Auspicious Dates, I Ching & Palm Reading"}`,
    description: params.locale === "ru"
      ? "Откройте для себя подлинное китайское имя, найдите благоприятные даты, обратитесь к И-Цзин или получите чтение ладони на основе классических китайских текстов. Платите сколько хотите (мин. $1)."
      : "Discover your authentic Chinese name, find auspicious dates, consult the I Ching, or get a palm reading based on classical Chinese texts. Pay what you want (min $1).",
    keywords: ["Chinese name", "I Ching", "divination", "auspicious date", "palm reading", "palmistry", "Chinese zodiac", "five elements", "feng shui", "Chinese culture", "Book of Changes", "Chinese naming"],
    openGraph: {
      title: `Chinese Culture Studio — ${params.locale === "ru" ? "Имя, Даты, И-Цзин и Хиромантия" : "Chinese Name, Dates, I Ching & Palm Reading"}`,
      description: params.locale === "ru"
        ? "Культурные чтения с ИИ: китайские имена, благоприятные даты, гадание И-Цзин и хиромантия. Платите сколько хотите."
        : "AI-powered Chinese cultural readings: names, auspicious dates, I Ching divination, and palm reading. Pay what you want (min $1).",
      url: `https://chinese-culture-app.onrender.com${params.locale === "en" ? "" : "/ru"}`,
      siteName: "Chinese Culture Studio",
      locale: params.locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
      images: [{ url: `https://chinese-culture-app.onrender.com/api/og?lang=${params.locale}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Chinese Culture Studio — ${params.locale === "ru" ? "Имена, Даты, И-Цзин и Хиромантия" : "Names, Dates, I Ching & Palm Reading"}`,
      description: params.locale === "ru"
        ? "Культурные чтения с ИИ из классических китайских текстов. Именование, выбор дат, И-Цзин, хиромантия. Платите сколько хотите."
        : "AI-powered Chinese cultural readings from classical texts. Chinese naming, date selection, I Ching, palm reading. Pay what you want.",
      images: [`https://chinese-culture-app.onrender.com/api/og?lang=${params.locale}`],
    },
    robots: { index: true, follow: true },
    alternates: {
      languages: {
        en: "https://chinese-culture-app.onrender.com",
        ru: "https://chinese-culture-app.onrender.com/ru",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const messages = await getMessages();

  const pathname = params.locale === "ru" ? "/ru" : "";

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
                  <a href={`${pathname}/naming`} className="hover:text-stone-800 transition-colors">Name</a>
                  <a href={`${pathname}/calendar`} className="hover:text-stone-800 transition-colors">Dates</a>
                  <a href={`${pathname}/divination`} className="hover:text-stone-800 transition-colors">I Ching</a>
                  <a href={`${pathname}/palm-reading`} className="hover:text-stone-800 transition-colors">Palm Reading</a>
                  <span className="text-stone-300 mx-1">|</span>
                  <LanguageSwitcher />
                </nav>
                <div className="flex items-center gap-2 sm:gap-4">
                  <ShareButton />
                  <NavMenu />
                </div>
              </div>
            </header>
            <main className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8">{children}</main>
            <footer className="border-t border-stone-200/60 py-6 sm:py-8 mt-12 sm:mt-16">
              <div className="max-w-5xl mx-auto px-4 text-center text-xs text-stone-400 space-y-2">
                <p>For entertainment and cultural appreciation only. Not professional advice.</p>
                <p>Payments are voluntary contributions for app maintenance — not a purchase of services.</p>
                <p className="flex justify-center gap-4 flex-wrap">
                  <a href={`${pathname}/guide/chinese-name`} className="hover:text-stone-500 underline">Chinese Name Guide</a>
                  <a href={`${pathname}/guide/iching`} className="hover:text-stone-500 underline">I Ching Guide</a>
                  <a href={`${pathname}/guide/auspicious-dates`} className="hover:text-stone-500 underline">Auspicious Dates Guide</a>
                </p>
                <p className="flex justify-center gap-4">
                  <a href={`${pathname}/terms`} className="hover:text-stone-500 underline">Terms of Service</a>
                  <a href={`${pathname}/privacy`} className="hover:text-stone-500 underline">Privacy Policy</a>
                </p>
                <p>2026 Chinese Culture Studio</p>
              </div>
            </footer>
            <CookieConsent />
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
