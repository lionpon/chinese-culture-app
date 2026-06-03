"use client";

import { useTranslations } from "next-intl";
import DailyHexagram from "@/components/DailyHexagram";
import FreeTierBadge from "@/components/FreeTierBadge";
import FeatureCard from "@/components/FeatureCard";
import ContactForm from "@/components/ContactForm";
import { Link } from "@/navigation";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div>
      <section className="text-center py-12 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4">
          {t("title")}
        </h1>
        <p className="text-base sm:text-lg text-stone-500 max-w-lg mx-auto leading-relaxed">
          {t("subtitle")}
        </p>
      </section>

      <div className="max-w-lg mx-auto mb-6">
        <FreeTierBadge />
      </div>

      <DailyHexagram />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
        <FeatureCard
          href="/naming"
          title={t("features.naming.title")}
          desc={t("features.naming.desc")}
        />
        <FeatureCard
          href="/calendar"
          title={t("features.calendar.title")}
          desc={t("features.calendar.desc")}
        />
        <FeatureCard
          href="/divination"
          title={t("features.divination.title")}
          desc={t("features.divination.desc")}
        />
        <FeatureCard
          href="/palm-reading"
          title={t("features.palm.title")}
          desc={t("features.palm.desc")}
          hideFree
        />
      </div>

      <ContactForm />

      <section className="mt-12 sm:mt-20 text-center">
        <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
          <Link href="/privacy" className="underline hover:text-stone-500">{t("privacy")}</Link>
          {" · "}
          <Link href="/terms" className="underline hover:text-stone-500">{t("terms")}</Link>
        </p>
      </section>
    </div>
  );
}
