// Fire-and-forget client-side event tracking — never blocks the UI
export function trackClick(event: string): void {
  const url = "/api/track";
  const body = JSON.stringify({ page: window.location.pathname, event });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
  } else {
    fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body }).catch(() => {});
  }
}
