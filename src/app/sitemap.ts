import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BASE_URL;

  const pages = [
    { path: "", priority: 1, changeFreq: "weekly" as const },
    { path: "/naming", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/calendar", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/divination", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/palm-reading", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/dream-interpretation", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/guide/chinese-name", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/guide/chinese-name-boy", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/guide/chinese-name-girl", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/guide/iching", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/guide/iching-beginner", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/guide/auspicious-dates", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/guide/wedding-dates-2026", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/guide/chinese-zodiac", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/guide/five-elements", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/guide/chinese-new-year-2027", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/guide/lucky-numbers", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/guide/feng-shui", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/guide/face-reading", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/guide/dream-meaning", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/tools/zodiac-calculator", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/tools/five-elements-test", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/world-cup", priority: 0.9, changeFreq: "daily" as const },
    { path: "/snake-2027", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/snake-2027/rat", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/snake-2027/ox", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/snake-2027/tiger", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/snake-2027/rabbit", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/snake-2027/dragon", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/snake-2027/snake", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/snake-2027/horse", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/snake-2027/goat", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/snake-2027/monkey", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/snake-2027/rooster", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/snake-2027/dog", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/snake-2027/pig", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/about", priority: 0.5, changeFreq: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFreq: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFreq: "yearly" as const },
  ];

  // Daily hexagram & World Cup pages EXCLUDED from sitemap
  // These are thin-content pages (one hexagram/match per page).
  // Including them in sitemap caused 368 "Discovered - not indexed" flags
  // which dragged down overall domain quality score in Google Search Console.
  // Pages remain accessible but Google discovers them via internal links instead.

  const allPages = pages;

  // English URLs
  const enEntries = allPages.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
    alternates: {
      languages: {
        en: `${baseUrl}${path}`,
        ru: `${baseUrl}/ru${path}`,
        ja: `${baseUrl}/ja${path}`,
        ko: `${baseUrl}/ko${path}`,
      },
    },
  }));

  // Russian URLs
  const ruEntries = allPages.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}/ru${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority: path === "" ? 0.9 : priority - 0.1,
    alternates: {
      languages: {
        en: `${baseUrl}${path}`,
        ru: `${baseUrl}/ru${path}`,
        ja: `${baseUrl}/ja${path}`,
        ko: `${baseUrl}/ko${path}`,
      },
    },
  }));

  // Japanese URLs
  const jaEntries = allPages.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}/ja${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority: path === "" ? 0.9 : priority - 0.1,
    alternates: {
      languages: {
        en: `${baseUrl}${path}`,
        ru: `${baseUrl}/ru${path}`,
        ja: `${baseUrl}/ja${path}`,
      },
    },
  }));

  // Korean URLs
  const koEntries = allPages.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}/ko${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority: path === "" ? 0.9 : priority - 0.1,
    alternates: {
      languages: {
        en: `${baseUrl}${path}`,
        ru: `${baseUrl}/ru${path}`,
        ja: `${baseUrl}/ja${path}`,
        ko: `${baseUrl}/ko${path}`,
      },
    },
  }));

  return [...enEntries, ...ruEntries, ...jaEntries, ...koEntries];
}
