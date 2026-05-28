interface PalmImageEntry {
  imageBase64: string;
  expiresAt: number;
}

const store = new Map<string, PalmImageEntry>();

// Clean up expired entries every 5 minutes
if (typeof globalThis !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    store.forEach((entry, key) => {
      if (now > entry.expiresAt) store.delete(key);
    });
  }, 5 * 60 * 1000);
}

export function setPalmImage(key: string, imageBase64: string): void {
  store.set(key, { imageBase64, expiresAt: Date.now() + 5 * 60 * 1000 });
}

export function getPalmImage(key: string): string | null {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.imageBase64;
}

export function deletePalmImage(key: string): void {
  store.delete(key);
}
