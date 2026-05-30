import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";

// POST /api/telegram-post — send a custom message to Telegram
// GET /api/telegram-post — send today's daily hexagram automatically
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (token !== process.env.TELEGRAM_POST_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const lang = req.nextUrl.searchParams.get("lang") || "en";
  const isRu = lang === "ru";

  try {
    // Fetch today's hexagram
    const dailyRes = await fetch("https://chinese-culture-app.onrender.com/api/daily");
    const daily = await dailyRes.json();
    const h = daily.mainHexagram;

    const baseUrl = "https://chinese-culture-app.onrender.com";
    const path = isRu ? "/ru" : "";

    const text = isRu
      ? `<b>☯️ И-Цзин дня</b>: ${h.nameZh} — ${h.nameEn} (${h.pinyin})\n\n<i>${h.judgmentEn.slice(0, 200)}</i>\n\n<b>Совет:</b> ${h.advice.slice(0, 300)}...\n\n🔮 <a href="${baseUrl}${path}/divination">Задайте свой вопрос И-Цзин</a>\n📖 <a href="${baseUrl}${path}/daily/${new Date().toISOString().slice(0, 10)}">Полное толкование дня</a>\n\n#ИЦзин #КнигаПеремен`
      : `<b>☯️ Daily I Ching</b>: ${h.nameZh} — ${h.nameEn} (${h.pinyin})\n\n<i>${h.judgmentEn.slice(0, 200)}</i>\n\n<b>Advice:</b> ${h.advice.slice(0, 300)}...\n\n🔮 <a href="${baseUrl}/divination">Cast your own hexagram</a>\n📖 <a href="${baseUrl}/daily/${new Date().toISOString().slice(0, 10)}">Full daily reading</a>\n\n#IChing #DailyHexagram #ChineseWisdom`;

    const ok = await sendTelegramMessage(text);
    return NextResponse.json({ ok });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (token !== process.env.TELEGRAM_POST_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { text } = body as { text: string };
    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text required" }, { status: 400 });
    }

    const ok = await sendTelegramMessage(text);
    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
