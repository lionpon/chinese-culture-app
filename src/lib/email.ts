import { BASE_URL } from "@/lib/config";

/**
 * Sends a daily I Ching hexagram digest email via Resend.
 * One email contains all 4 locale summaries and links.
 * Falls back silently if RESEND_API_KEY or CONTACT_EMAIL is not configured.
 */
export async function sendDailyHexagramEmail(): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !to) {
    console.log("[email] Resend not configured — skipping daily digest");
    return false;
  }

  try {
    const dailyRes = await fetch(`${BASE_URL}/api/daily`);
    const daily = await dailyRes.json();
    const h = daily.mainHexagram;
    const dateStr = new Date().toISOString().slice(0, 10);

    const langLabels: Record<string, string> = {
      en: "English",
      ru: "Русский",
      ja: "日本語",
      ko: "한국어",
    };

    const langData: Record<string, { name: string; judgment: string; advice: string }> = {
      en: {
        name: h.nameEn || h.nameZh,
        judgment: h.judgmentEn || "",
        advice: h.advice || "",
      },
      ru: {
        name: h.nameRu || h.nameEn || h.nameZh,
        judgment: h.judgmentRu || h.judgmentEn || "",
        advice: h.adviceRu || h.advice || "",
      },
      ja: {
        name: h.nameJa || h.nameEn || h.nameZh,
        judgment: h.judgmentJa || h.judgmentEn || "",
        advice: h.adviceJa || h.advice || "",
      },
      ko: {
        name: h.nameJa || h.nameEn || h.nameZh,
        judgment: h.judgmentJa || h.judgmentEn || "",
        advice: h.adviceJa || h.advice || "",
      },
    };

    const langSections = ["en", "ru", "ja", "ko"]
      .map((lang) => {
        const d = langData[lang];
        const path = lang === "en" ? "" : `/${lang}`;
        return [
          `${langLabels[lang]}: ${h.nameZh} — ${d.name}`,
          `"${d.judgment.slice(0, 200)}"`,
          `${d.advice.slice(0, 300)}...`,
          `Full reading: ${BASE_URL}${path}/daily/${dateStr}`,
        ].join("\n");
      })
      .join("\n\n---\n\n");

    const htmlLangSections = ["en", "ru", "ja", "ko"]
      .map((lang) => {
        const d = langData[lang];
        const path = lang === "en" ? "" : `/${lang}`;
        return [
          `<h3 style="margin:16px 0 8px;color:#5c3a28">${langLabels[lang]}: ${h.nameZh} — ${d.name}</h3>`,
          `<p style="margin:4px 0;color:#8b7355;font-style:italic">"${d.judgment.slice(0, 200)}"</p>`,
          `<p style="margin:4px 0;color:#3d2b1f">${d.advice.slice(0, 300)}...</p>`,
          `<p style="margin:8px 0"><a href="${BASE_URL}${path}/daily/${dateStr}" style="color:#5c3a28">Full reading →</a></p>`,
        ].join("\n");
      })
      .join('\n<hr style="border:0;border-top:1px solid #e8d5b0;margin:16px 0">\n');

    const html = `<!DOCTYPE html>
<html>
<body style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:20px;background:#faf7f2">
  <h2 style="color:#3d2b1f;text-align:center">☯️ Daily I Ching — ${dateStr}</h2>
  <p style="text-align:center;color:#8b7355">Today's hexagram from the Book of Changes</p>
  ${htmlLangSections}
  <hr style="border:0;border-top:1px solid #e8d5b0;margin:16px 0">
  <p style="text-align:center;color:#8b7355;font-size:12px">
    <a href="${BASE_URL}" style="color:#5c3a28">Chinese Culture Studio</a> —
    <a href="${BASE_URL}/divination" style="color:#5c3a28">Cast your own hexagram</a>
  </p>
</body>
</html>`;

    const text = `☯️ Daily I Ching — ${dateStr}\n\nToday's hexagram from the Book of Changes\n\n${langSections}\n\n---\nChinese Culture Studio\n${BASE_URL}\nCast your own: ${BASE_URL}/divination`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Chinese Culture Studio <onboarding@resend.dev>",
        to: [to],
        subject: `☯️ Daily I Ching: ${h.nameZh} — ${h.nameEn} (${dateStr})`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[email] Resend API error:", err);
      return false;
    }

    console.log("[email] Daily digest sent");
    return true;
  } catch (err) {
    console.error("[email] Error:", err instanceof Error ? err.message : String(err));
    return false;
  }
}
