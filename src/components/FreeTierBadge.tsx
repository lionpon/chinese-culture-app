"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { getFreeTier } from "@/lib/free-tier";

export default function FreeTierBadge() {
  const t = useTranslations("common");
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    setRemaining(getFreeTier().remaining);
  }, []);

  if (remaining <= 0) return null;

  return (
    <div className="text-center mb-4 rounded-xl px-4 py-3 text-sm font-medium" style={{ backgroundColor: "rgba(91, 154, 123, 0.12)", border: "1px solid rgba(91, 154, 123, 0.25)", color: "var(--jade)" }}>
      {remaining >= 3 ? t("freeTier.three") : remaining === 2 ? t("freeTier.two") : t("freeTier.one")}
    </div>
  );
}
