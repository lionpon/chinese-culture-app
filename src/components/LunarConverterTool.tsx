"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/navigation";
import { solarToLunar, CNY_DATES, LUNAR_MONTHS, LUNAR_DAYS } from "@/lib/calendar";
import { getZodiacInfo } from "@/data/zodiac-data";
import { HEAVENLY_STEMS_LIST, EARTHLY_BRANCHES_LIST } from "@/lib/bazi";
import { trackClick } from "@/lib/track";

/**
 * 农历转换器 — 2026-10-28 竞品调研交付①（预注册 WORK_LOG_2026-10-28 §⑦）
 * 公历日期 → 农历(月/日名)、干支年、生肖、距春节天数；CTA 深链 /calendar 查吉日。
 * 事件: lunar_convert（每次换算）/ lunar_convert_cta（CTA 点击）
 */
export default function LunarConverterTool() {
  const t = useTranslations("tools");
  const locale = useLocale();
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [result, setResult] = useState<{
    lunarYear: number; lunarMonth: number; lunarDay: number; isLeapMonth: boolean;
    stem: string; branch: string; zodiac: string; zhMonth: string; zhDay: string;
    daysToCny: number | null; cnyYear: number | null; isCny: boolean;
  } | null>(null);

  function convert() {
    if (!date) return;
    const [y, m, d] = date.split("-").map(Number);
    if (!y || !m || !d) return;
    const lunar = solarToLunar(y, m, d);
    const stem = HEAVENLY_STEMS_LIST[((lunar.lunarYear - 4) % 10 + 10) % 10];
    const branch = EARTHLY_BRANCHES_LIST[((lunar.lunarYear - 4) % 12 + 12) % 12];
    const zodiac = getZodiacInfo(lunar.lunarYear, locale).animal;
    const nextCny = CNY_DATES[lunar.lunarYear + 1] || null;
    let daysToCny: number | null = null;
    let isCny = false;
    if (nextCny) {
      const target = new Date(y, m - 1, d);
      const cnyDate = new Date(lunar.lunarYear + 1, nextCny[0] - 1, nextCny[1]);
      const diff = Math.round((cnyDate.getTime() - target.getTime()) / 86400000);
      if (diff === 0) isCny = true;
      else daysToCny = diff;
    }
    setResult({
      lunarYear: lunar.lunarYear,
      lunarMonth: lunar.lunarMonth,
      lunarDay: lunar.lunarDay,
      isLeapMonth: lunar.isLeapMonth,
      stem, branch, zodiac,
      zhMonth: LUNAR_MONTHS[lunar.lunarMonth - 1] || "",
      zhDay: LUNAR_DAYS[lunar.lunarDay - 1] || "",
      daysToCny, cnyYear: nextCny ? lunar.lunarYear + 1 : null, isCny,
    });
    trackClick("lunar_convert");
  }

  return (
    <div className="not-prose my-8 p-5 rounded-xl border" style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-surface)" }}>
      <p className="text-sm font-semibold mb-1" style={{ color: "var(--gold)" }}>🌙 {t("lunarConverter.title")}</p>
      <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>{t("lunarConverter.subtitle")}</p>
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <input
          type="date"
          value={date}
          max="2030-02-03"
          min="2024-02-10"
          onChange={(e) => setDate(e.target.value)}
          className="w-full sm:flex-1 px-3 py-2.5 text-sm rounded-lg border focus:outline-none"
          style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-deep)", color: "var(--text-primary)", minHeight: "2.5rem" }}
        />
        <button onClick={convert} className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium rounded-lg transition-colors"
          style={{ backgroundColor: "var(--gold)", color: "var(--bg-deep)", minHeight: "2.5rem" }}>
          {t("lunarConverter.convert")}
        </button>
      </div>

      {result && (
        <div className="rounded-lg p-4 mb-3 text-center" style={{ backgroundColor: "var(--bg-deep)" }}>
          <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{t("lunarConverter.lunarDate")}{result.isLeapMonth ? " " + t("lunarConverter.leapNote") : ""}</p>
          <p className="text-2xl font-bold mb-1" style={{ color: "var(--gold)" }}>
            {result.zhMonth}{result.zhDay}
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {t("lunarConverter.lunarMonthDay", { month: result.lunarMonth, day: result.lunarDay })}
          </p>
          <p className="text-sm mt-2" style={{ color: "var(--text-body)" }}>
            {t("lunarConverter.stemBranchYear")}: <strong>{result.stem}{result.branch}</strong>
            {" · "}{t("lunarConverter.zodiacYear")}: <strong>{result.zodiac}</strong>
          </p>
          {result.isCny && (
            <p className="text-sm mt-2 font-medium" style={{ color: "var(--gold)" }}>🎉 {t("lunarConverter.isCny")}</p>
          )}
          {!result.isCny && result.daysToCny !== null && result.cnyYear && (
            <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
              {t("lunarConverter.daysToCny", { n: result.daysToCny, year: result.cnyYear })}
            </p>
          )}
        </div>
      )}

      <Link
        href={date ? `/calendar?date=${date}` : "/calendar"}
        onClick={() => trackClick("lunar_convert_cta")}
        className="block text-center text-xs font-medium py-2 rounded-lg transition-colors"
        style={{ backgroundColor: "var(--gold-subtle)", color: "var(--gold)" }}
      >
        {t("lunarConverter.cta")}
      </Link>
    </div>
  );
}
