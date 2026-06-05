import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { BreadcrumbListSchema } from "@/components/JsonLd";
import { BASE_URL } from "@/lib/config";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "about" });
  const path = params.locale === "en" ? "/about" : `/${params.locale}/about`;
  const ogLocales: Record<string, string> = { en: "en_US", ru: "ru_RU", ja: "ja_JP", ko: "ko_KR" };

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `${BASE_URL}${path}`,
      siteName: "Chinese Culture Studio",
      locale: ogLocales[params.locale] || "en_US",
      type: "website",
      images: [{ url: `${BASE_URL}/api/og?title=${encodeURIComponent(t("meta.title"))}&lang=${params.locale}`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: t("meta.title"), description: t("meta.description") },
    robots: "index, follow",
    alternates: {
      languages: {
        en: `${BASE_URL}/about`,
        ru: `${BASE_URL}/ru/about`,
        ja: `${BASE_URL}/ja/about`,
        ko: `${BASE_URL}/ko/about`,
      },
    },
  };
}

export default function AboutPage({ params }: Props) {
  const t = useTranslations("about");
  const path = params.locale === "en" ? "" : `/${params.locale}`;

  return (
    <div className="max-w-2xl mx-auto">
      <BreadcrumbListSchema
        items={[
          { name: "Chinese Culture Studio", url: `${BASE_URL}${path}` },
          { name: t("title"), url: `${BASE_URL}${path}/about` },
        ]}
      />
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8" style={{ color: "var(--accent)" }}>
        {t("title")}
      </h1>

      <section className="card-classic p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold text-stone-800 mb-3">{t("whoWeAre.heading")}</h2>
        <p className="text-sm text-stone-600 leading-relaxed">{t("whoWeAre.body")}</p>
      </section>

      <section className="card-classic p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold text-stone-800 mb-3">{t("sources.heading")}</h2>
        <p className="text-sm text-stone-600 leading-relaxed mb-3">{t("sources.body1")}</p>
        <p className="text-sm text-stone-600 leading-relaxed">{t("sources.body2")}</p>
      </section>

      <section className="card-classic p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold text-stone-800 mb-3">{t("expertise.heading")}</h2>
        <p className="text-sm text-stone-600 leading-relaxed">{t("expertise.body")}</p>
      </section>

      <section className="card-classic p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold text-stone-800 mb-3">{t("languages.heading")}</h2>
        <p className="text-sm text-stone-600 leading-relaxed">{t("languages.body")}</p>
      </section>

      <section className="card-classic p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold text-stone-800 mb-3">{t("technology.heading")}</h2>
        <p className="text-sm text-stone-600 leading-relaxed">{t("technology.body")}</p>
      </section>

      <section className="card-classic p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold text-stone-800 mb-3">{t("contact.heading")}</h2>
        <p className="text-sm text-stone-600 leading-relaxed">{t("contact.body")}</p>
      </section>
    </div>
  );
}
