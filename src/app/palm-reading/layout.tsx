import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Palm Reading | Chinese Culture Studio",
  description: "Upload a photo of your palm and receive an AI-powered analysis based on classical Chinese palmistry. Your image is processed in memory and never stored. Pay what you want (min $1).",
  openGraph: {
    title: "Palm Reading | Chinese Culture Studio",
    description: "AI-powered palm reading based on classical Chinese palmistry. Privacy-first — images never stored. Pay what you want.",
    url: "https://chinese-culture-app.onrender.com/palm-reading",
    siteName: "Chinese Culture Studio",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://chinese-culture-app.onrender.com/api/og?title=Palm+Reading&sub=Classical+Chinese+Palmistry+%2B+AI", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Palm Reading | Chinese Culture Studio",
    description: "AI palm reading from classical Chinese texts. Zero persistence, full privacy. Pay what you want.",
    images: ["https://chinese-culture-app.onrender.com/api/og?title=Palm+Reading&sub=Classical+Chinese+Palmistry+%2B+AI"],
  },
};

export default function PalmReadingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
