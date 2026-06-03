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
    { path: "/privacy", priority: 0.3, changeFreq: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFreq: "yearly" as const },
  ];

  // Last 30 days of daily hexagram pages
  const dailyPages: { path: string; priority: number; changeFreq: "daily" | "weekly" | "monthly" | "yearly" }[] = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const priority = i === 0 ? 0.8 : i <= 7 ? 0.6 : 0.4;
    dailyPages.push({ path: `/daily/${dateStr}`, priority, changeFreq: "daily" as const });
  }

  const allPages = [...pages, ...dailyPages];

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
