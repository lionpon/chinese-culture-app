import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auspicious Date Selection | Chinese Culture Studio",
  description: "Find the most favorable dates for weddings, business openings, travel, and more based on the traditional Chinese almanac (Tong Shu). Pay what you want (min $1).",
  openGraph: {
    title: "Auspicious Date Selection | Chinese Culture Studio",
    description: "Find the most favorable dates based on the traditional Chinese almanac. Pay what you want.",
    url: "https://chinese-culture-app.onrender.com/calendar",
    siteName: "Chinese Culture Studio",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://chinese-culture-app.onrender.com/api/og?title=Auspicious+Date+Selection&sub=Traditional+Chinese+Almanac", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Auspicious Date Selection | Chinese Culture Studio",
    description: "Traditional Chinese almanac date selection for important life events. Pay what you want.",
    images: ["https://chinese-culture-app.onrender.com/api/og?title=Auspicious+Date+Selection&sub=Traditional+Chinese+Almanac"],
  },
};

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
