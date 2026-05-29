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
    <div className="text-center mb-4 rounded-xl px-4 py-3 text-sm font-medium" style={{ backgroundColor: "#F0F7F0", border: "1px solid rgba(91,123,107,0.2)", color: "#5B7B6B" }}>
      {remaining === 2 ? t("freeTier.two") : t("freeTier.one")}
    </div>
  );
}
