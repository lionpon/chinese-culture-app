/**
 * Canonical base URL for the site.
 * Priority:
 *  1. NEXT_PUBLIC_APP_URL env var (explicit override, set in Render dashboard)
 *  2. VERCEL_URL (auto-injected by Vercel at build time)
 *  3. RENDER_EXTERNAL_URL (auto-injected by Render at runtime, server-only)
 *  4. Hardcoded fallback
 */
export const BASE_URL: string = (() => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  if (typeof process !== "undefined" && process.env.RENDER_EXTERNAL_URL) {
    return process.env.RENDER_EXTERNAL_URL.replace(/\/$/, "");
  }
  return "https://www.culture-of-china.com";
})();

export const BASE_HOST = new URL(BASE_URL).hostname;
