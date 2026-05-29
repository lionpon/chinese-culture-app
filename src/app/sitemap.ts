import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://chinese-culture-app.onrender.com";

  const pages = [
    { path: "", priority: 1, changeFreq: "weekly" as const },
    { path: "/naming", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/calendar", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/divination", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/palm-reading", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/guide/chinese-name", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/guide/iching", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/guide/auspicious-dates", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFreq: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFreq: "yearly" as const },
  ];

  // English URLs
  const enEntries = pages.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
    alternates: {
      languages: {
        en: `${baseUrl}${path}`,
        ru: `${baseUrl}/ru${path}`,
      },
    },
  }));

  // Russian URLs
  const ruEntries = pages.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}/ru${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority: path === "" ? 0.9 : priority - 0.1,
    alternates: {
      languages: {
        en: `${baseUrl}${path}`,
        ru: `${baseUrl}/ru${path}`,
      },
    },
  }));

  return [...enEntries, ...ruEntries];
}
