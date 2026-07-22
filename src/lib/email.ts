import { BASE_URL } from "@/lib/config";
import { prisma } from "@/lib/db";
import { performDivination } from "@/lib/divination";
import { hexagramNameJa, hexagramNameRu } from "@/data/hexagram-names";
import {
  judgmentJa, judgmentRu,
  adviceJa, adviceRu,
} from "@/data/hexagram-content";

function getDailyHexagram() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const num1 = ((year + month + day) % 8) || 8;
  const num2 = ((year * month + day) % 8) || 8;
  const num3 = ((year + month * day) % 6) || 6;

  const result = performDivination({ method: "manual", numbers: [num1, num2, num3] });
  const id = result.mainHexagram.id;

  return {
    nameZh: result.mainHexagram.nameZh,
    nameEn: result.mainHexagram.nameEn,
    pinyin: result.mainHexagram.pinyin,
    nameJa: hexagramNameJa[id] || result.mainHexagram.nameEn,
    nameRu: hexagramNameRu[id] || result.mainHexagram.nameEn,
    judgmentEn: result.mainHexagram.judgmentEn,
    judgmentJa: judgmentJa[id] || "",
    judgmentRu: judgmentRu[id] || "",
    advice: result.mainHexagram.advice,
    adviceJa: adviceJa[id] || "",
    adviceRu: adviceRu[id] || "",
  };
}

/**
 * Sends a daily I Ching hexagram digest email via Resend to ALL subscribers.
 * Also CCs CONTACT_EMAIL as admin copy.
 */
export async function sendDailyHexagramEmail(): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[email] Resend not configured — skipping daily digest");
    return false;
  }

  try {
    // Query all subscribers
    let subscribers: { email: string }[] = [];
    try {
      subscribers = await prisma.subscriber.findMany({ select: { email: true } });
    } catch (dbErr) {
      console.error("[email] DB query failed:", String(dbErr));
      subscribers = [];
    }

    const adminEmail = process.env.CONTACT_EMAIL;
    const allRecipients = new Set<string>();
    if (adminEmail) allRecipients.add(adminEmail);
    for (const s of subscribers) allRecipients.add(s.email);

    if (allRecipients.size === 0) {
      console.log("[email] No recipients — skipping");
      return false;
    }

    const recipientList = Array.from(allRecipients);
    console.log(`[email] Sending to ${recipientList.length} subscriber(s)`);

    const h = getDailyHexagram();
    const dateStr = new Date().toISOString().slice(0, 10);

    const langLabels: Record<string, string> = {
      en: "English", ru: "Русский", ja: "日本語", ko: "한국어",
    };

    const langData: Record<string, { name: string; judgment: string; advice: string }> = {
      en: { name: h.nameEn, judgment: h.judgmentEn || "", advice: h.advice || "" },
      ru: { name: h.nameRu || h.nameEn, judgment: h.judgmentRu || h.judgmentEn || "", advice: h.adviceRu || h.advice || "" },
      ja: { name: h.nameJa || h.nameEn, judgment: h.judgmentJa || h.judgmentEn || "", advice: h.adviceJa || h.advice || "" },
      ko: { name: h.nameJa || h.nameEn, judgment: h.judgmentJa || h.judgmentEn || "", advice: h.adviceJa || h.advice || "" },
    };

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

    // AI tools promotion section
    const toolsHtml = `
<hr style="border:0;border-top:2px solid #c4a882;margin:20px 0">
<h2 style="color:#3d2b1f;text-align:center">🆕 Try Our Free AI Tools</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0">
  <tr>
    <td style="padding:8px;text-align:center;width:50%">
      <a href="${BASE_URL}/tools/zodiac-match" style="display:block;padding:12px 8px;background:#fff5f5;border-radius:12px;text-decoration:none;color:#9B4A3A;font-weight:bold;border:1px solid #fecaca">💕 Zodiac Love Match<br><span style="font-size:12px;font-weight:normal;color:#8b7355">Check compatibility</span></a>
    </td>
    <td style="padding:8px;text-align:center;width:50%">
      <a href="${BASE_URL}/tools/dream-ai" style="display:block;padding:12px 8px;background:#fefce8;border-radius:12px;text-decoration:none;color:#854d0e;font-weight:bold;border:1px solid #fde68a">🔮 AI Dream Decoder<br><span style="font-size:12px;font-weight:normal;color:#8b7355">Decode your dreams</span></a>
    </td>
  </tr>
  <tr>
    <td style="padding:8px;text-align:center;width:50%">
      <a href="${BASE_URL}/tools/daily-fortune" style="display:block;padding:12px 8px;background:#f5f3ff;border-radius:12px;text-decoration:none;color:#6d28d9;font-weight:bold;border:1px solid #ddd6fe">🔮 Daily Fortune<br><span style="font-size:12px;font-weight:normal;color:#8b7355">Today's prediction</span></a>
    </td>
    <td style="padding:8px;text-align:center;width:50%">
      <a href="${BASE_URL}/tools/name-preview" style="display:block;padding:12px 8px;background:#f0fdf4;border-radius:12px;text-decoration:none;color:#166534;font-weight:bold;border:1px solid #bbf7d0">✨ Chinese Name Preview<br><span style="font-size:12px;font-weight:normal;color:#8b7355">Find your name</span></a>
    </td>
  </tr>
</table>`;

    const html = `<!DOCTYPE html>
<html>
<body style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:20px;background:#faf7f2">
  <h2 style="color:#3d2b1f;text-align:center">☯️ Daily I Ching — ${dateStr}</h2>
  <p style="text-align:center;color:#8b7355">Today's hexagram from the Book of Changes</p>
  ${htmlLangSections}
  ${toolsHtml}
  <hr style="border:0;border-top:1px solid #e8d5b0;margin:16px 0">
  <p style="text-align:center;color:#8b7355;font-size:12px">
    <a href="${BASE_URL}" style="color:#5c3a28">Chinese Culture Studio</a> —
    <a href="${BASE_URL}/divination" style="color:#5c3a28">Cast your own hexagram</a> —
    <a href="${BASE_URL}/about" style="color:#5c3a28">Unsubscribe info</a>
  </p>
</body>
</html>`;

    const text = `☯️ Daily I Ching — ${dateStr}\n\nToday's hexagram: ${h.nameZh} — ${h.nameEn}\n"${h.judgmentEn?.slice(0, 200) || ""}"\n\n${h.advice?.slice(0, 300) || ""}...\n\n🆕 Free AI Tools:\n💕 Love Match: ${BASE_URL}/tools/zodiac-match\n🔮 Dream AI: ${BASE_URL}/tools/dream-ai\n🔮 Fortune: ${BASE_URL}/tools/daily-fortune\n✨ Names: ${BASE_URL}/tools/name-preview\n\n---\n${BASE_URL}`;

    // Resend allows batch send with `to` array (max 1000)
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Chinese Culture Studio <noreply@culture-of-china.com>",
        to: recipientList,
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

    console.log(`[email] Daily digest sent to ${recipientList.length} recipient(s)`);
    return true;
  } catch (err) {
    console.error("[email] Error:", err instanceof Error ? err.message : String(err));
    return false;
  }
}
