import { performDivination } from "@/lib/divination";

const SITE_URL = "https://chinese-culture-app.onrender.com";

function getTodayNumbers(): [number, number, number] {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  return [
    ((y + m + d) % 8) || 8,
    ((y * m + d) % 8) || 8,
    ((y + m * d) % 6) || 6,
  ];
}

const HASHTAGS_EN = "#IChing #DailyHexagram #ChineseWisdom #BookOfChanges #Divination";
const HASHTAGS_RU = "#ИЦзин #КнигаПеремен #КитайскаяМудрость #Гадание #ГексаграммаДня";

export async function GET() {
  const hex = getTodayNumbers();
  const result = performDivination({ method: "manual", numbers: hex });
  const { mainHexagram: h, changedHexagram: ch } = result;

  const adviceBrief = h.advice.length > 300
    ? h.advice.slice(0, 297).replace(/\s+\S*$/, "") + "..."
    : h.advice;

  const en = {
    twitter: `Today's I Ching: ${h.nameZh} (${h.pinyin}) — ${h.nameEn}\n\n${adviceBrief}\n\nRead your own: ${SITE_URL}/divination\n\n${HASHTAGS_EN}`,
    telegram: `☯️ Today's I Ching: ${h.nameZh} — ${h.nameEn} (${h.pinyin})\n\n${h.judgmentEn}\n\n${adviceBrief}\n\n${
      ch && ch.id !== h.id
        ? `The hexagram is evolving toward: ${ch.nameZh} — ${ch.nameEn}\n\n`
        : ""
    }Cast your own hexagram: ${SITE_URL}/divination\n\n${HASHTAGS_EN}`,
    reddit: `☯️ Daily I Ching — ${h.nameZh} (${h.nameEn}) [r/iching]\n\n**Judgment:** ${h.judgmentEn}\n\n**Advice:** ${adviceBrief}\n\n${
      ch && ch.id !== h.id
        ? `**Evolving toward:** ${ch.nameZh} — ${ch.nameEn}\n\n`
        : ""
    }---\n\nThe daily hexagram is drawn from the Chinese Culture Studio's I Ching divination tool. Try it yourself with your own question: ${SITE_URL}/divination\n\nHow does today's hexagram speak to your situation? Share in the comments.`,
  };

  const ru = {
    twitter: `И-Цзин дня: ${h.nameZh} (${h.pinyin}) — ${h.nameEn}\n\n${adviceBrief}\n\nПопробуйте сами: ${SITE_URL}/ru/divination\n\n${HASHTAGS_RU}`,
    telegram: `☯️ И-Цзин дня: ${h.nameZh} — ${h.nameEn} (${h.pinyin})\n\n${h.judgmentEn}\n\n${adviceBrief}\n\n${
      ch && ch.id !== h.id
        ? `Гексаграмма развивается в: ${ch.nameZh} — ${ch.nameEn}\n\n`
        : ""
    }Задайте свой вопрос И-Цзин: ${SITE_URL}/ru/divination\n\n${HASHTAGS_RU}`,
    reddit: `☯️ И-Цзин дня — ${h.nameZh} (${h.nameEn})\n\n**Суждение:** ${h.judgmentEn}\n\n**Совет:** ${adviceBrief}\n\n${
      ch && ch.id !== h.id
        ? `**Развитие к:** ${ch.nameZh} — ${ch.nameEn}\n\n`
        : ""
    }---\n\nЕжедневная гексаграмма от Chinese Culture Studio. Задайте свой вопрос: ${SITE_URL}/ru/divination`,
  };

  return Response.json(
    { date: new Date().toISOString().slice(0, 10), hexagram: result, posts: { en, ru } },
    { headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" } }
  );
}
