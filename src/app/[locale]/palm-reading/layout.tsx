import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BASE_URL } from "@/lib/config";
import { BreadcrumbListSchema } from "@/components/JsonLd";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "palm" });
  const base = BASE_URL;
  const path = params.locale === "en" ? "/palm-reading" : `/${params.locale}/palm-reading`;
  const ogLocales: Record<string, string> = { en: "en_US", ru: "ru_RU", ja: "ja_JP", ko: "ko_KR" };

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      url: `${base}${path}`,
      siteName: "Chinese Culture Studio",
      locale: ogLocales[params.locale] || "en_US",
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
  return (
    <>
      <BreadcrumbListSchema
        items={[
          { name: "Chinese Culture Studio", url: BASE_URL },
          { name: "Palm Reading", url: `${BASE_URL}/palm-reading` },
        ]}
      />
      {children}
    </>
  );
}
