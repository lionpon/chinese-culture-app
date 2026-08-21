const DC_PREFIXES = [
  // AWS
  "3.0.0.0/9", "18.0.0.0/8", "34.0.0.0/8", "35.0.0.0/8",
  // GCP
  "34.0.0.0/8", "35.0.0.0/8",
  // Azure
  "13.64.0.0/11", "40.64.0.0/10",
  // DigitalOcean
  "104.16.0.0/12", "159.89.0.0/16",
  // Linode
  "45.33.0.0/16", "45.79.0.0/16",
  // Vultr
  "45.32.0.0/16",
  // Hetzner (major scraper host)
  "5.9.0.0/16", "88.198.0.0/16", "136.243.0.0/16", "148.251.0.0/16",
  // OVH (EU scraper host)
  "51.38.0.0/16", "54.36.0.0/16", "87.98.0.0/16",
  // Russian hosting: Selectel / DataLine / Rostelecom DC ranges
  "5.8.16.0/21", "5.101.0.0/16", "80.78.240.0/20", "82.146.32.0/19",
  "91.215.152.0/22", "92.53.96.0/19", "185.71.76.0/22",
  // Ukrainian hosting
  "91.200.12.0/22", "193.106.172.0/22",
];

// Countries where high-volume traffic is almost always DC scraping (not real users)
const DC_COUNTRIES_HIGH_ALERT = new Set([
  "RU", // Russia: known SEO scraper/content scraper hub
  "UA", // Ukraine: secondary scraper origin
]);

// Cities dominated by data centers (negligible residential population relative to DC traffic)
const DC_CITIES = new Set([
  "ashburn",       // AWS us-east-1 — 70% of global internet traffic
  "council bluffs", // Google DC hub
  "boardman",      // Amazon DC, pop ~3k
  "the dalles",    // Google DC, pop ~16k
  "boydton",       // Microsoft DC, pop ~500
  "lenoir",        // Google DC, pop ~18k
  "prineville",    // Facebook DC, pop ~10k
  "moscow",        // Russian crawler hub — known SEO spider / content scraper origin
  "saint petersburg", // RU scraper secondary hub
  "frankfurt am main", // DE major DC hub (Equinix, Interxion, DE-CIX)
  "amsterdam",     // NL major DC hub (AMS-IX)
  "dublin",        // IE AWS/Google DC hub
  "hemel hempstead", // UK DC cluster
  "slough",        // UK DC corridor
  "sterling",      // US AWS us-east-1 spillover
  "herndon",       // US Equinix DC cluster
  "reston",        // US AWS/Google DC
  "santa clara",   // US Silicon Valley DC hub (Equinix SV1-SV10)
  "san jose",      // US DC cluster
  "newark",        // US NY metro DC
  "secaucus",      // US NY metro DC
  "piscataway",    // US NY metro DC
  "kyiv",          // UA hosting/scraper hub
  "kharkiv",       // UA secondary
]);

const DC_REGIONS = new Set([
  "iowa",          // Council Bluffs cluster
  "oregon",        // Boardman / The Dalles / Prineville cluster
  "north holland", // Amsterdam DC cluster
  "hessen",        // Frankfurt DC cluster
  "leinster",      // Dublin DC cluster
]);

function ipToInt(ip: string): number {
  return ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct, 10), 0) >>> 0;
}

export function isDatacenterIp(ip: string): boolean {
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip === "unknown") return false;

  const parts = ip.split(".");
  if (parts.length !== 4) return false;

  const ipInt = ipToInt(ip);

  for (const cidr of DC_PREFIXES) {
    const [prefix, bits] = cidr.split("/");
    const prefixInt = ipToInt(prefix);
    const mask = ~(2 ** (32 - parseInt(bits)) - 1) >>> 0;
    if ((ipInt & mask) === (prefixInt & mask)) return true;
  }

  return false;
}

export function isDatacenterCity(city: string, region: string): boolean {
  const c = city.toLowerCase().trim();
  const r = region.toLowerCase().trim();
  if (DC_CITIES.has(c)) return true;
  if (DC_REGIONS.has(r)) return true;
  // Ashburn in Virginia: dead giveaway (AWS us-east-1)
  if (c === "ashburn" && r === "virginia") return true;
  // Santa Clara + California = Silicon Valley DC
  if (c === "santa clara" && r === "california") return true;
  // Moscow + Moscow region = almost certainly DC scraper
  if (c === "moscow" && (r === "moscow" || r === "moscow city" || r === "moscow oblast")) return true;
  return false;
}

/**
 * Check if a given country code is a known high-risk origin for scraping.
 * Traffic from these countries should be scrutinized more aggressively.
 */
export function isHighRiskScraperCountry(country: string): boolean {
  return DC_COUNTRIES_HIGH_ALERT.has(country?.toUpperCase() || "");
}

/**
 * Country-scoped rate limiter: if many requests come from the same high-risk country
 * in rapid succession, treat them as probable DC traffic.
 *
 * Strategy for RU/UA scraper countries:
 *   Tier 1 (burst):  >5 visits in 1 minute → skip (fast bot)  [in-memory]
 *   Tier 2 (hourly): >10 visits in 1 hour → skip (medium crawler) [in-memory]
 *   Tier 3 (daily):  >COUNTRY_DAILY_MAX in 24 hours → skip (slow-but-steady crawler)
 *                    [DB-backed — see /api/track route; in-memory Map was defeated
 *                     by Render restarts: 8/13 deploy day = 14 RU writes]
 *
 * The daily quota is intentionally low: real users from RU/UA on an
 * English-language Chinese culture site are near-zero. Any sustained
 * traffic pattern from these countries is virtually always scraping.
 */
const countryRateMap = new Map<string, number[]>();
const COUNTRY_BURST_WINDOW_MS = 60_000;     // 1 minute
const COUNTRY_BURST_MAX = 5;                 // >5/min = burst bot
const COUNTRY_HOURLY_WINDOW_MS = 3_600_000;  // 1 hour
const COUNTRY_HOURLY_MAX = 10;               // >10/hr = medium crawler
export const COUNTRY_DAILY_WINDOW_MS = 86_400_000;  // 24 hours
export const COUNTRY_DAILY_MAX = 3;          // >3/day = slow crawler (5 — 8/7; 3 — 8/21 review: DB-backed, restart-proof)

export function isCountryRateSaturated(country: string): boolean {
  if (!isHighRiskScraperCountry(country)) return false;
  const now = Date.now();
  const key = country.toUpperCase();
  const timestamps = countryRateMap.get(key) || [];

  // Tier 1: burst detection (fast bot)
  const recentMinute = timestamps.filter(t => now - t < COUNTRY_BURST_WINDOW_MS);
  if (recentMinute.length >= COUNTRY_BURST_MAX) return true;

  // Tier 2: hourly quota (medium crawler)
  const recentHour = timestamps.filter(t => now - t < COUNTRY_HOURLY_WINDOW_MS);
  if (recentHour.length >= COUNTRY_HOURLY_MAX) return true;

  // Tier 3 (daily) is DB-backed in /api/track — restart-proof.
  countryRateMap.set(key, [...recentHour, now]);

  // Prune entries older than 1 hour to prevent memory leak
  if (timestamps.length > 500) {
    const pruned = timestamps.filter(t => now - t < COUNTRY_HOURLY_WINDOW_MS);
    if (pruned.length === 0) countryRateMap.delete(key);
    else countryRateMap.set(key, pruned);
  }

  return false;
}
