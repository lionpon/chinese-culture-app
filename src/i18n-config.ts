// Supported locales: English (default), Russian, Japanese, Korean, Ukrainian
// uk = 2026-11-05 起实验性 locale（仅 girl 页全量翻译，其余路由 en 回退——ko 模型）
export const locales: string[] = ["en", "ru", "ja", "ko", "uk"];
export type Locale = "en" | "ru" | "ja" | "ko" | "uk";
export const defaultLocale: Locale = "en";
