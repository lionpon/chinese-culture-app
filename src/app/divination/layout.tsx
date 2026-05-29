import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I Ching Divination | Chinese Culture Studio",
  description: "Consult the ancient Book of Changes (I Ching) for guidance and insight. Three casting methods: time-based, random, or manual coin toss. Pay what you want (min $1).",
  openGraph: {
    title: "I Ching Divination | Chinese Culture Studio",
    description: "Consult the ancient Book of Changes. Three casting methods available. Pay what you want.",
    url: "https://chinese-culture-app.onrender.com/divination",
    siteName: "Chinese Culture Studio",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://chinese-culture-app.onrender.com/api/og?title=I+Ching+Divination&sub=Consult+the+Book+of+Changes", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "I Ching Divination | Chinese Culture Studio",
    description: "Consult the I Ching — three divination methods, instant results. Pay what you want.",
    images: ["https://chinese-culture-app.onrender.com/api/og?title=I+Ching+Divination&sub=Consult+the+Book+of+Changes"],
  },
};

export default function DivinationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
