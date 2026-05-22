import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "@/components/AppProvider";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Chinese Culture Studio — Create a Chinese Name, Auspicious Date Selection & I Ching Divination",
  description: "Discover your Chinese name, find auspicious dates, and consult the I Ching. Traditional Chinese culture experiences based on classical texts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-stone-800 antialiased">
        <AppProvider>
        <AnalyticsTracker />
        <header className="border-b border-stone-200/60 bg-white/70 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="text-lg font-bold tracking-tight" style={{ color: "var(--accent)" }}>
              Chinese Culture Studio
            </a>
            <nav className="flex gap-5 text-sm text-stone-500">
              <a href="/naming" className="hover:text-stone-800 transition-colors">Create a Chinese Name</a>
              <a href="/calendar" className="hover:text-stone-800 transition-colors">Auspicious Date Selection</a>
              <a href="/divination" className="hover:text-stone-800 transition-colors">I Ching Divination</a>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <footer className="border-t border-stone-200/60 py-8 mt-16">
          <div className="max-w-5xl mx-auto px-4 text-center text-xs text-stone-400 space-y-2">
            <p>For entertainment and cultural appreciation only. Not professional advice.</p>
            <p>Payments are voluntary contributions for app maintenance — not a purchase of services.</p>
            <p className="flex justify-center gap-4">
              <a href="/terms" className="hover:text-stone-500 underline">Terms of Service</a>
              <a href="/privacy" className="hover:text-stone-500 underline">Privacy Policy</a>
            </p>
            <p>2026 Chinese Culture Studio</p>
          </div>
        </footer>
        </AppProvider>
      </body>
    </html>
  );
}
