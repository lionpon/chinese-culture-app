import { BASE_URL } from "@/lib/config";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

export async function sendTelegramMessage(text: string): Promise<boolean> {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log("[telegram] Bot not configured — skipping");
    return false;
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: false,
        }),
        signal: AbortSignal.timeout(10_000),
      }
    );
    const data = await res.json();
    if (data.ok) {
      console.log("[telegram] Message sent");
      return true;
    }
    console.error("[telegram] Failed:", data.description);
    return false;
  } catch (err) {
    console.error("[telegram] Error:", err instanceof Error ? err.message : String(err));
    return false;
  }
}

// buildDailyHexagramPost is intentionally a thin wrapper — actual post
// content is built in the API route which fetches live daily data.
export function buildDailyHexagramPost(): string {
  return "";
}

export function buildSitePromoPost(): string {
  const utm = "?utm_source=telegram&utm_medium=social&utm_campaign=site-promo&utm_content=en";
  return `<b>🏮 Chinese Culture Studio</b>

Discover the wisdom of ancient Chinese classics:

<b>🎋 Chinese Name</b> — Get your authentic name based on Five Elements
${BASE_URL}/naming${utm}

<b>☯️ I Ching Divination</b> — Consult the Book of Changes
${BASE_URL}/divination${utm}

<b>📅 Auspicious Dates</b> — Find the best dates for important events
${BASE_URL}/calendar${utm}

<b>✋ Palm Reading</b> — Classical palmistry analysis
${BASE_URL}/palm-reading${utm}

<i>Pay what you want (from $5.99). For cultural appreciation and entertainment purposes only.</i>`;
}
