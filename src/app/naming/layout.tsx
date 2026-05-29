import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Chinese Name | Chinese Culture Studio",
  description: "Generate an authentic Chinese name based on your birth date, gender, and the Five Elements (Wu Xing). AI-powered naming from classical Chinese texts. Pay what you want (min $1).",
  openGraph: {
    title: "Create Your Chinese Name | Chinese Culture Studio",
    description: "Generate an authentic Chinese name based on your birth date, gender, and the Five Elements (Wu Xing). Pay what you want.",
    url: "https://chinese-culture-app.onrender.com/naming",
    siteName: "Chinese Culture Studio",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://chinese-culture-app.onrender.com/api/og?title=Create+Your+Chinese+Name&sub=Five+Elements+%2B+AI+Naming", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Your Chinese Name | Chinese Culture Studio",
    description: "AI-powered Chinese name generation based on Five Elements. Pay what you want.",
    images: ["https://chinese-culture-app.onrender.com/api/og?title=Create+Your+Chinese+Name&sub=Five+Elements+%2B+AI+Naming"],
  },
};

export default function NamingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
