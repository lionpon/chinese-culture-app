import { performDivination } from "@/lib/divination";
import { hexagramNameJa, hexagramNameRu } from "@/data/hexagram-names";
import {
  judgmentJa, judgmentRu,
  adviceJa, adviceRu,
} from "@/data/hexagram-content";

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
const HASHTAGS_JA = "#易経 #今日の卦 #中国の知恵 #易占い #陰陽五行";
const HASHTAGS_KO = "#주역 #오늘의괘 #중국의지혜 #역경 #점술";

function truncate(text: string, max: number): string {
  return text.length > max
    ? text.slice(0, max - 3).replace(/\s+\S*$/, "") + "..."
    : text;
}

export async function GET() {
  const hex = getTodayNumbers();
  const result = performDivination({ method: "manual", numbers: hex });

  // Enrich with localized content
  const id = result.mainHexagram.id;
  result.mainHexagram = {
    ...result.mainHexagram,
    nameJa: hexagramNameJa[id] || result.mainHexagram.nameEn,
    nameRu: hexagramNameRu[id] || result.mainHexagram.nameEn,
    judgmentJa: judgmentJa[id] || "",
    judgmentRu: judgmentRu[id] || "",
    adviceJa: adviceJa[id] || "",
    adviceRu: adviceRu[id] || "",
  };

  if (result.changedHexagram) {
    const cid = result.changedHexagram.id;
    result.changedHexagram = {
      ...result.changedHexagram,
      nameJa: hexagramNameJa[cid] || result.changedHexagram.nameEn,
      nameRu: hexagramNameRu[cid] || result.changedHexagram.nameEn,
      judgmentJa: judgmentJa[cid] || "",
      judgmentRu: judgmentRu[cid] || "",
    };
  }

  const h = result.mainHexagram;
  const ch = result.changedHexagram;

  const adviceBriefEn = truncate(h.advice, 300);
  const adviceBriefRu = truncate(h.adviceRu || h.advice, 300);
  const adviceBriefJa = truncate(h.adviceJa || h.advice, 300);

  const en = {
    twitter: `Today's I Ching: ${h.nameZh} (${h.pinyin}) — ${h.nameEn}\n\n${adviceBriefEn}\n\nRead your own: ${SITE_URL}/divination\n\n${HASHTAGS_EN}`,
    telegram: `☯️ Today's I Ching: ${h.nameZh} — ${h.nameEn} (${h.pinyin})\n\n${h.judgmentEn}\n\n${adviceBriefEn}\n\n${
      ch && ch.id !== h.id
        ? `The hexagram is evolving toward: ${ch.nameZh} — ${ch.nameEn}\n\n`
        : ""
    }Cast your own hexagram: ${SITE_URL}/divination\n\n${HASHTAGS_EN}`,
    reddit: `☯️ Daily I Ching — ${h.nameZh} (${h.nameEn}) [r/iching]\n\n**Judgment:** ${h.judgmentEn}\n\n**Advice:** ${adviceBriefEn}\n\n${
      ch && ch.id !== h.id
        ? `**Evolving toward:** ${ch.nameZh} — ${ch.nameEn}\n\n`
        : ""
    }---\n\nThe daily hexagram is drawn from the Chinese Culture Studio's I Ching divination tool. Try it yourself with your own question: ${SITE_URL}/divination\n\nHow does today's hexagram speak to your situation? Share in the comments.`,
  };

  const ru = {
    twitter: `И-Цзин дня: ${h.nameZh} (${h.pinyin}) — ${h.nameRu || h.nameEn}\n\n${adviceBriefRu}\n\nПопробуйте сами: ${SITE_URL}/ru/divination\n\n${HASHTAGS_RU}`,
    telegram: `☯️ И-Цзин дня: ${h.nameZh} — ${h.nameRu || h.nameEn} (${h.pinyin})\n\n${h.judgmentRu || h.judgmentEn}\n\n${adviceBriefRu}\n\n${
      ch && ch.id !== h.id
        ? `Гексаграмма развивается в: ${ch.nameZh} — ${ch.nameRu || ch.nameEn}\n\n`
        : ""
    }Задайте свой вопрос И-Цзин: ${SITE_URL}/ru/divination\n\n${HASHTAGS_RU}`,
    reddit: `☯️ И-Цзин дня — ${h.nameZh} (${h.nameRu || h.nameEn})\n\n**Суждение:** ${h.judgmentRu || h.judgmentEn}\n\n**Совет:** ${adviceBriefRu}\n\n${
      ch && ch.id !== h.id
        ? `**Развитие к:** ${ch.nameZh} — ${ch.nameRu || ch.nameEn}\n\n`
        : ""
    }---\n\nЕжедневная гексаграмма от Chinese Culture Studio. Задайте свой вопрос: ${SITE_URL}/ru/divination`,
  };

  const ja = {
    twitter: `今日の易経: ${h.nameZh} (${h.pinyin}) — ${h.nameJa || h.nameEn}\n\n${adviceBriefJa}\n\nあなたも占ってみる: ${SITE_URL}/ja/divination\n\n${HASHTAGS_JA}`,
    telegram: `☯️ 今日の易経: ${h.nameZh} — ${h.nameJa || h.nameEn} (${h.pinyin})\n\n${h.judgmentJa || h.judgmentEn}\n\n${adviceBriefJa}\n\n${
      ch && ch.id !== h.id
        ? `卦は次のように変化しています: ${ch.nameZh} — ${ch.nameJa || ch.nameEn}\n\n`
        : ""
    }あなたの卦を立てる: ${SITE_URL}/ja/divination\n\n${HASHTAGS_JA}`,
    reddit: `☯️ 今日の易経 — ${h.nameZh} (${h.nameJa || h.nameEn}) [r/iching]\n\n**判断:** ${h.judgmentJa || h.judgmentEn}\n\n**アドバイス:** ${adviceBriefJa}\n\n${
      ch && ch.id !== h.id
        ? `**変化:** ${ch.nameZh} — ${ch.nameJa || ch.nameEn}\n\n`
        : ""
    }---\n\n今日の卦は Chinese Culture Studio の易経占いツールからお届けします。あなた自身の質問で試してみてください: ${SITE_URL}/ja/divination\n\n今日の卦はあなたの状況にどう響きますか？コメントで共有してください。`,
  };

  // ko uses ja data as content source (no independent Korean hexagram data)
  const ko = {
    twitter: `오늘의 주역: ${h.nameZh} (${h.pinyin}) — ${h.nameJa || h.nameEn}\n\n${adviceBriefJa}\n\n당신도 점쳐보기: ${SITE_URL}/ko/divination\n\n${HASHTAGS_KO}`,
    telegram: `☯️ 오늘의 주역: ${h.nameZh} — ${h.nameJa || h.nameEn} (${h.pinyin})\n\n${h.judgmentJa || h.judgmentEn}\n\n${adviceBriefJa}\n\n${
      ch && ch.id !== h.id
        ? `괘가 다음으로 변화하고 있습니다: ${ch.nameZh} — ${ch.nameJa || ch.nameEn}\n\n`
        : ""
    }당신의 괘를 세우기: ${SITE_URL}/ko/divination\n\n${HASHTAGS_KO}`,
    reddit: `☯️ 오늘의 주역 — ${h.nameZh} (${h.nameJa || h.nameEn}) [r/iching]\n\n**판단:** ${h.judgmentJa || h.judgmentEn}\n\n**조언:** ${adviceBriefJa}\n\n${
      ch && ch.id !== h.id
        ? `**변화:** ${ch.nameZh} — ${ch.nameJa || ch.nameEn}\n\n`
        : ""
    }---\n\n오늘의 괘는 Chinese Culture Studio 의 주역 점술 도구에서 제공합니다. 당신의 질문으로 직접 시도해 보세요: ${SITE_URL}/ko/divination\n\n오늘의 괘가 당신의 상황에 어떻게 다가옵니까? 댓글로 공유해 주세요.`,
  };

  return Response.json(
    { date: new Date().toISOString().slice(0, 10), hexagram: result, posts: { en, ru, ja, ko } },
    { headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" } }
  );
}
