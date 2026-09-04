// Unified daily social content for the whole social matrix (营销第 2 步)
// Single source of truth: /api/daily-social, /api/twitter-post, /api/pinterest-post,
// /api/reddit-post and /api/cron all consume getDailySocialPosts().
// Compliance: every link carries UTM params; every post carries the
// "for entertainment purposes only" disclaimer.

import { performDivination } from "@/lib/divination";
import { hexagramNameJa, hexagramNameRu } from "@/data/hexagram-names";
import { judgmentJa, judgmentRu, adviceJa, adviceRu } from "@/data/hexagram-content";
import { BASE_URL } from "@/lib/config";

const SITE_URL = BASE_URL;

export const HASHTAGS_EN = "#IChing #DailyHexagram #ChineseWisdom #BookOfChanges #Divination";
export const HASHTAGS_RU = "#ИЦзин #КнигаПеремен #КитайскаяМудрость #Гадание #ГексаграммаДня";
export const HASHTAGS_JA = "#易経 #今日の卦 #中国の知恵 #易占い #陰陽五行";
export const HASHTAGS_KO = "#주역 #오늘의괘 #중국의지혜 #역경 #점술";

const DISCLAIMER_EN = "For entertainment purposes only.";
const DISCLAIMER_RU = "Только в развлекательных целях.";
const DISCLAIMER_JA = "娯楽目的のみのコンテンツです。";
const DISCLAIMER_KO = "오락 목적으로만 제공됩니다.";

export type SocialPlatform = "twitter" | "telegram" | "reddit" | "pinterest";

/** UTM-tagged link back to the site for a given platform + locale. */
export function utmLink(platform: SocialPlatform, path: string, lang: string): string {
  const localePath = lang === "en" ? path : `/${lang}${path}`;
  return `${SITE_URL}${localePath}?utm_source=${platform}&utm_medium=social&utm_campaign=daily-hexagram&utm_content=${lang}`;
}

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max - 3).replace(/\s+\S*$/, "") + "..." : text;
}

export interface DailySocialHexagram {
  id: number;
  nameZh: string;
  nameEn: string;
  pinyin: string;
  judgmentEn: string;
  advice: string;
  nameJa?: string;
  nameRu?: string;
  judgmentJa?: string;
  judgmentRu?: string;
  adviceJa?: string;
  adviceRu?: string;
  changed?: {
    id: number;
    nameZh: string;
    nameEn: string;
    judgmentEn: string;
    nameJa?: string;
    nameRu?: string;
    judgmentJa?: string;
    judgmentRu?: string;
  } | null;
}

export interface SocialPostTexts {
  twitter: string;
  telegram: string;
  reddit: string;
  pinterest: { title: string; description: string };
}

export interface DailySocialPosts {
  date: string;
  hexagram: DailySocialHexagram;
  posts: { en: SocialPostTexts; ru: SocialPostTexts; ja: SocialPostTexts; ko: SocialPostTexts };
}

export function getDailySocialPosts(date = new Date()): DailySocialPosts {
  // Deterministic daily hexagram: same algorithm as the site's /api/daily
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const hex: [number, number, number] = [
    ((y + m + d) % 8) || 8,
    ((y * m + d) % 8) || 8,
    ((y + m * d) % 6) || 6,
  ];
  const result = performDivination({ method: "manual", numbers: hex });

  const id = result.mainHexagram.id;
  const h: DailySocialHexagram = {
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
    h.changed = {
      ...result.changedHexagram,
      nameJa: hexagramNameJa[cid] || result.changedHexagram.nameEn,
      nameRu: hexagramNameRu[cid] || result.changedHexagram.nameEn,
      judgmentJa: judgmentJa[cid] || "",
      judgmentRu: judgmentRu[cid] || "",
    };
  }

  const ch = h.changed;
  const adviceBriefEn = truncate(h.advice, 300);
  const adviceBriefRu = truncate(h.adviceRu || h.advice, 300);
  const adviceBriefJa = truncate(h.adviceJa || h.advice, 300);
  const adviceBriefKo = truncate(h.adviceJa || h.advice, 300);

  // ── English ──────────────────────────────────────────────────────────────
  const en: SocialPostTexts = {
    twitter:
      "Today's I Ching: " + h.nameZh + " (" + h.pinyin + ") — " + h.nameEn + "\n\n" +
      adviceBriefEn + "\n\n" +
      "Cast your own hexagram: " + utmLink("twitter", "/divination", "en") + "\n\n" +
      HASHTAGS_EN + "\n\n" + DISCLAIMER_EN,
    telegram:
      "☯️ Today's I Ching: " + h.nameZh + " — " + h.nameEn + " (" + h.pinyin + ")\n\n" +
      h.judgmentEn + "\n\n" + adviceBriefEn + "\n\n" +
      (ch && ch.id !== h.id ? "The hexagram is evolving toward: " + ch.nameZh + " — " + ch.nameEn + "\n\n" : "") +
      "Cast your own hexagram: " + utmLink("telegram", "/divination", "en") + "\n\n" +
      HASHTAGS_EN + "\n\n" + DISCLAIMER_EN,
    reddit:
      "☯️ Daily I Ching — " + h.nameZh + " (" + h.nameEn + ")\n\n" +
      "**Judgment:** " + h.judgmentEn + "\n\n" +
      "**Advice:** " + adviceBriefEn + "\n\n" +
      (ch && ch.id !== h.id ? "**Evolving toward:** " + ch.nameZh + " — " + ch.nameEn + "\n\n" : "") +
      "---\n\n" +
      "The daily hexagram comes from the Chinese Culture Studio's I Ching tool. " +
      "Cast your own reading with your own question: " + utmLink("reddit", "/divination", "en") + "\n\n" +
      "How does today's hexagram speak to your situation? Share in the comments.\n\n" +
      "*" + DISCLAIMER_EN + "*",
    pinterest: {
      title: "Daily I Ching: " + h.nameZh + " (" + h.pinyin + ") — " + h.nameEn,
      description: h.judgmentEn + " " + adviceBriefEn + " " + DISCLAIMER_EN + " " + utmLink("pinterest", "/divination", "en"),
    },
  };

  // ── Russian ──────────────────────────────────────────────────────────────
  const ru: SocialPostTexts = {
    twitter:
      "И-Цзин дня: " + h.nameZh + " (" + h.pinyin + ") — " + (h.nameRu || h.nameEn) + "\n\n" +
      adviceBriefRu + "\n\n" +
      "Попробуйте сами: " + utmLink("twitter", "/divination", "ru") + "\n\n" +
      HASHTAGS_RU,
    telegram:
      "☯️ И-Цзин дня: " + h.nameZh + " — " + (h.nameRu || h.nameEn) + " (" + h.pinyin + ")\n\n" +
      (h.judgmentRu || h.judgmentEn) + "\n\n" + adviceBriefRu + "\n\n" +
      (ch && ch.id !== h.id ? "Гексаграмма развивается в: " + ch.nameZh + " — " + (ch.nameRu || ch.nameEn) + "\n\n" : "") +
      "Задайте свой вопрос И-Цзин: " + utmLink("telegram", "/divination", "ru") + "\n\n" +
      HASHTAGS_RU + "\n\n" + DISCLAIMER_RU,
    reddit:
      "☯️ И-Цзин дня — " + h.nameZh + " (" + (h.nameRu || h.nameEn) + ")\n\n" +
      "**Суждение:** " + (h.judgmentRu || h.judgmentEn) + "\n\n" +
      "**Совет:** " + adviceBriefRu + "\n\n" +
      (ch && ch.id !== h.id ? "**Развитие к:** " + ch.nameZh + " — " + (ch.nameRu || ch.nameEn) + "\n\n" : "") +
      "---\n\n" +
      "Ежедневная гексаграмма от Chinese Culture Studio. Задайте свой вопрос: " + utmLink("reddit", "/divination", "ru") + "\n\n" +
      "*" + DISCLAIMER_RU + "*",
    pinterest: {
      title: "И-Цзин дня: " + h.nameZh + " (" + h.pinyin + ") — " + (h.nameRu || h.nameEn),
      description: (h.judgmentRu || h.judgmentEn) + " " + adviceBriefRu + " " + DISCLAIMER_RU + " " + utmLink("pinterest", "/divination", "ru"),
    },
  };

  // ── Japanese ─────────────────────────────────────────────────────────────
  const ja: SocialPostTexts = {
    twitter:
      "今日の易経: " + h.nameZh + " (" + h.pinyin + ") — " + (h.nameJa || h.nameEn) + "\n\n" +
      adviceBriefJa + "\n\n" +
      "あなたも占ってみる: " + utmLink("twitter", "/divination", "ja") + "\n\n" +
      HASHTAGS_JA,
    telegram:
      "☯️ 今日の易経: " + h.nameZh + " — " + (h.nameJa || h.nameEn) + " (" + h.pinyin + ")\n\n" +
      (h.judgmentJa || h.judgmentEn) + "\n\n" + adviceBriefJa + "\n\n" +
      (ch && ch.id !== h.id ? "卦は次のように変化しています: " + ch.nameZh + " — " + (ch.nameJa || ch.nameEn) + "\n\n" : "") +
      "あなたの卦を立てる: " + utmLink("telegram", "/divination", "ja") + "\n\n" +
      HASHTAGS_JA + "\n\n" + DISCLAIMER_JA,
    reddit:
      "☯️ 今日の易経 — " + h.nameZh + " (" + (h.nameJa || h.nameEn) + ")\n\n" +
      "**判断:** " + (h.judgmentJa || h.judgmentEn) + "\n\n" +
      "**アドバイス:** " + adviceBriefJa + "\n\n" +
      (ch && ch.id !== h.id ? "**変化:** " + ch.nameZh + " — " + (ch.nameJa || ch.nameEn) + "\n\n" : "") +
      "---\n\n" +
      "今日の卦は Chinese Culture Studio の易経占いツールからお届けします。あなた自身の質問で試してみてください: " + utmLink("reddit", "/divination", "ja") + "\n\n" +
      "今日の卦はあなたの状況にどう響きますか？コメントで共有してください。\n\n" +
      "*" + DISCLAIMER_JA + "*",
    pinterest: {
      title: "今日の易経: " + h.nameZh + " (" + h.pinyin + ") — " + (h.nameJa || h.nameEn),
      description: (h.judgmentJa || h.judgmentEn) + " " + adviceBriefJa + " " + DISCLAIMER_JA + " " + utmLink("pinterest", "/divination", "ja"),
    },
  };

  // ── Korean (uses ja content as source — no independent ko hexagram data) ─
  const ko: SocialPostTexts = {
    twitter:
      "오늘의 주역: " + h.nameZh + " (" + h.pinyin + ") — " + (h.nameJa || h.nameEn) + "\n\n" +
      adviceBriefKo + "\n\n" +
      "당신도 점쳐보기: " + utmLink("twitter", "/divination", "ko") + "\n\n" +
      HASHTAGS_KO,
    telegram:
      "☯️ 오늘의 주역: " + h.nameZh + " — " + (h.nameJa || h.nameEn) + " (" + h.pinyin + ")\n\n" +
      (h.judgmentJa || h.judgmentEn) + "\n\n" + adviceBriefKo + "\n\n" +
      (ch && ch.id !== h.id ? "괘가 다음으로 변화하고 있습니다: " + ch.nameZh + " — " + (ch.nameJa || ch.nameEn) + "\n\n" : "") +
      "당신의 괘를 세우기: " + utmLink("telegram", "/divination", "ko") + "\n\n" +
      HASHTAGS_KO + "\n\n" + DISCLAIMER_KO,
    reddit:
      "☯️ 오늘의 주역 — " + h.nameZh + " (" + (h.nameJa || h.nameEn) + ")\n\n" +
      "**판단:** " + (h.judgmentJa || h.judgmentEn) + "\n\n" +
      "**조언:** " + adviceBriefKo + "\n\n" +
      (ch && ch.id !== h.id ? "**변화:** " + ch.nameZh + " — " + (ch.nameJa || ch.nameEn) + "\n\n" : "") +
      "---\n\n" +
      "오늘의 괘는 Chinese Culture Studio 의 주역 점술 도구에서 제공합니다. 당신의 질문으로 직접 시도해 보세요: " + utmLink("reddit", "/divination", "ko") + "\n\n" +
      "오늘의 괘가 당신의 상황에 어떻게 다가옵니까? 댓글로 공유해 주세요.\n\n" +
      "*" + DISCLAIMER_KO + "*",
    pinterest: {
      title: "오늘의 주역: " + h.nameZh + " (" + h.pinyin + ") — " + (h.nameJa || h.nameEn),
      description: (h.judgmentJa || h.judgmentEn) + " " + adviceBriefKo + " " + DISCLAIMER_KO + " " + utmLink("pinterest", "/divination", "ko"),
    },
  };

  return { date: date.toISOString().slice(0, 10), hexagram: h, posts: { en, ru, ja, ko } };
}

