import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale, type Locale } from "@/i18n-config";

export { locales, defaultLocale, type Locale };

// ko 降级为 URL 兼容层（2026-10-27 定案）：ko.json 缺失的键在加载时自动用 en 值回退，
// 保证 /ko/* 永不渲染原始键路径；现有 ko 文案优先保留。ja 不做回退——翻译缺口必须显性暴露。
function deepMerge(base: Record<string, unknown>, over: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(over)) {
    if (
      v && typeof v === "object" && !Array.isArray(v) &&
      base[k] && typeof base[k] === "object" && !Array.isArray(base[k])
    ) {
      out[k] = deepMerge(base[k] as Record<string, unknown>, v as Record<string, unknown>);
    } else {
      out[k] = v;
    }
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale)) {
    locale = defaultLocale;
  }
  let messages = (await import(`../messages/${locale}.json`)).default;
  if (locale === "ko") {
    const en = (await import(`../messages/en.json`)).default;
    messages = deepMerge(en, messages);
  }
  return {
    locale,
    messages,
  };
});
