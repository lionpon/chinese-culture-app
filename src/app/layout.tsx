import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import AppProvider from "@/components/AppProvider";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import AutoDailyReport from "@/components/AutoDailyReport";
import JsonLd from "@/components/JsonLd";
import NavMenu from "@/components/NavMenu";
import CookieConsent from "@/components/CookieConsent";
import ShareButton from "@/components/ShareButton";

export const metadata: Metadata = {
  title: "Chinese Culture Studio — Chinese Name, Auspicious Dates, I Ching & Palm Reading",
  description: "Discover your authentic Chinese name, find auspicious dates, consult the I Ching, or get a palm reading based on classical Chinese texts. Pay what you want (min $1).",
  keywords: ["Chinese name", "I Ching", "divination", "auspicious date", "palm reading", "palmistry", "Chinese zodiac", "five elements", "feng shui", "Chinese culture", "Book of Changes", "Chinese naming"],
  openGraph: {
    title: "Chinese Culture Studio — Chinese Name, Dates, I Ching & Palm Reading",
    description: "AI-powered Chinese cultural readings: names, auspicious dates, I Ching divination, and palm reading. Pay what you want (min $1).",
    url: "https://chinese-culture-app.onrender.com",
    siteName: "Chinese Culture Studio",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://chinese-culture-app.onrender.com/api/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinese Culture Studio — Names, Dates, I Ching & Palm Reading",
    description: "AI-powered Chinese cultural readings from classical texts. Chinese naming, date selection, I Ching, palm reading. Pay what you want.",
    images: ["https://chinese-culture-app.onrender.com/api/og"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-stone-800 antialiased">
        <Suspense fallback={null}>
          <AutoDailyReport />
        </Suspense>
        <JsonLd />
        <AppProvider>
        <AnalyticsTracker />
        <header className="border-b border-stone-200/60 bg-white/70 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="text-lg font-bold tracking-tight text-accent">
              Chinese Culture Studio
            </a>
            <nav className="hidden sm:flex gap-4 text-sm text-stone-500">
              <a href="/naming" className="hover:text-stone-800 transition-colors">Name</a>
              <a href="/calendar" className="hover:text-stone-800 transition-colors">Dates</a>
              <a href="/divination" className="hover:text-stone-800 transition-colors">I Ching</a>
              <a href="/palm-reading" className="hover:text-stone-800 transition-colors">Palm Reading</a>
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
              <a href="/guide/chinese-name" className="hover:text-stone-500 underline">Chinese Name Guide</a>
              <a href="/guide/iching" className="hover:text-stone-500 underline">I Ching Guide</a>
              <a href="/guide/auspicious-dates" className="hover:text-stone-500 underline">Auspicious Dates Guide</a>
            </p>
            <p className="flex justify-center gap-4">
              <a href="/terms" className="hover:text-stone-500 underline">Terms of Service</a>
              <a href="/privacy" className="hover:text-stone-500 underline">Privacy Policy</a>
            </p>
            <p>2026 Chinese Culture Studio</p>
          </div>
        </footer>
        <CookieConsent />
        </AppProvider>
      </body>
    </html>
  );
}
