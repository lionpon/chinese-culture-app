const STORAGE_KEY = "cc-free-tier";
const MAX_FREE = 3;

interface FreeTier {
  remaining: number;
  used: number;
}

export function getFreeTier(): FreeTier {
  if (typeof window === "undefined") return { remaining: MAX_FREE, used: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed.remaining === "number" && typeof parsed.used === "number") {
        return parsed;
      }
    }
  } catch {
    // corrupted data — reset
  }
  return { remaining: MAX_FREE, used: 0 };
}

export function consumeFreeUse(): FreeTier {
  const current = getFreeTier();
  if (current.remaining <= 0) return current;
  const next: FreeTier = {
    remaining: current.remaining - 1,
    used: current.used + 1,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage full or unavailable — silently ignore
  }
  return next;
}

export function updateRemaining(n: number): void {
  if (typeof window === "undefined") return;
  const current = getFreeTier();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      remaining: Math.max(0, n),
      used: current.used,
    }));
  } catch { /* storage unavailable */ }
}

export function hasFreeUses(): boolean {
  return getFreeTier().remaining > 0;
}
