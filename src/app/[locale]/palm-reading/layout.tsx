import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "palm" });
  const base = "https://chinese-culture-app.onrender.com";
  const path = params.locale === "ru" ? "/ru/palm-reading" : "/palm-reading";

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      url: `${base}${path}`,
      siteName: "Chinese Culture Studio",
      locale: params.locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
      images: [{ url: `${base}/api/og?title=${encodeURIComponent(t("meta.ogSub"))}&lang=${params.locale}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.twitterTitle"),
      description: t("meta.twitterDescription"),
      images: [`${base}/api/og?title=${encodeURIComponent(t("meta.ogSub"))}&lang=${params.locale}`],
    },
  };
}

export default function PalmReadingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
