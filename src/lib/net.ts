/**
 * Optional outbound proxy bootstrap for local development in mainland China.
 *
 * Node's built-in fetch (undici) ignores system proxy settings, so PayPal
 * verification calls (verifyIPN/verifyPDT) and AI calls fail from CN.
 * When OUTBOUND_PROXY_ENABLED=1 and HTTPS_PROXY/HTTP_PROXY are set, we install
 * an EnvHttpProxyAgent globally — all outbound fetch calls route through the
 * proxy. Production (Render, US) never sets these env vars → no effect.
 */
async function bootstrapOutboundProxy(): Promise<void> {
  if (process.env.OUTBOUND_PROXY_ENABLED !== "1") return;
  try {
    const undici = await import("undici");
    const { EnvHttpProxyAgent, setGlobalDispatcher } = undici;
    setGlobalDispatcher(new EnvHttpProxyAgent());
    console.log("[net] outbound proxy enabled:", process.env.HTTPS_PROXY || process.env.HTTP_PROXY || "(env-only)");
  } catch (err) {
    console.warn("[net] failed to enable outbound proxy:", (err as Error)?.message);
  }
}

/** Await before outbound network calls (PayPal verify, AI) in node runtime. */
export const proxyReady: Promise<void> = bootstrapOutboundProxy();
