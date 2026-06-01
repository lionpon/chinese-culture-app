export const locales = ["en", "ru", "ja"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
