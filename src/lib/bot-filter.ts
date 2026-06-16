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
