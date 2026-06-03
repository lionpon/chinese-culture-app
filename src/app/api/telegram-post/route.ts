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

  try {
    const dailyRes = await fetch("https://chinese-culture-app.onrender.com/api/daily");
    const daily = await dailyRes.json();
    const h = daily.mainHexagram;

    const baseUrl = "https://chinese-culture-app.onrender.com";
    const dateStr = new Date().toISOString().slice(0, 10);
    const path = lang === "en" ? "" : `/${lang}`;
    const advice = (lang === "ja" || lang === "ko" ? h.adviceJa : lang === "ru" ? h.adviceRu : h.advice) || h.advice;
    const judgment = (lang === "ja" || lang === "ko" ? h.judgmentJa : lang === "ru" ? h.judgmentRu : h.judgmentEn) || h.judgmentEn;
    const name = (lang === "ja" || lang === "ko" ? h.nameJa : lang === "ru" ? h.nameRu : h.nameEn) || h.nameEn;

    const templates: Record<string, { title: string; adviceLabel: string; cta: string; fullReading: string; hashtags: string }> = {
      en: { title: "☯️ Daily I Ching", adviceLabel: "Advice", cta: "Cast your own hexagram", fullReading: "Full daily reading", hashtags: "#IChing #DailyHexagram #ChineseWisdom" },
      ru: { title: "☯️ И-Цзин дня", adviceLabel: "Совет", cta: "Задайте свой вопрос И-Цзин", fullReading: "Полное толкование дня", hashtags: "#ИЦзин #КнигаПеремен" },
      ja: { title: "☯️ 今日の易経", adviceLabel: "アドバイス", cta: "あなたの卦を立てる", fullReading: "今日の詳しい解釈", hashtags: "#易経 #今日の卦 #中国の知恵" },
      ko: { title: "☯️ 오늘의 주역", adviceLabel: "조언", cta: "당신의 괘를 세우기", fullReading: "오늘의 상세 해석", hashtags: "#주역 #오늘의괘 #중국의지혜" },
    };

    const t = templates[lang] || templates.en;

    const text = `<b>${t.title}</b>: ${h.nameZh} — ${name} (${h.pinyin})\n\n<i>${judgment.slice(0, 200)}</i>\n\n<b>${t.adviceLabel}:</b> ${advice.slice(0, 300)}...\n\n🔮 <a href="${baseUrl}${path}/divination">${t.cta}</a>\n📖 <a href="${baseUrl}${path}/daily/${dateStr}">${t.fullReading}</a>\n\n${t.hashtags}`;

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
