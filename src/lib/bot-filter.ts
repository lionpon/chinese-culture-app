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
];

// Cities dominated by data centers (negligible residential population relative to DC traffic)
const DC_CITIES = new Set([
  "ashburn",       // AWS us-east-1 — 70% of global internet traffic
  "council bluffs", // Google DC hub
  "boardman",      // Amazon DC, pop ~3k
  "the dalles",    // Google DC, pop ~16k
  "boydton",       // Microsoft DC, pop ~500
  "lenoir",        // Google DC, pop ~18k
  "prineville",    // Facebook DC, pop ~10k
]);

const DC_REGIONS = new Set([
  "iowa",          // Council Bluffs cluster
  "oregon",        // Boardman / The Dalles / Prineville cluster
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
  return false;
}
