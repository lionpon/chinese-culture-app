import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://chineseculture.studio";

  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin", "/success?*"] },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
