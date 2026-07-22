// 小六壬 (Xiao Liu Ren / Six Gates Divination)
// Also known as: 马前课 (Ma Qian Ke), 六壬时课 (Liu Ren Shi Ke)
// A folk divination method using lunar calendar time to get quick answers.

import { solarToLunar } from "./calendar";

// The 6 palaces (掌诀) in order — counting starts from 大安 (index 0)
const PALACES = [
  { id: 0, name: "大安", nameEn: "Great Peace", verdict: "stable" as const,
    en: {
      verdict: "Things are stable and favorable.",
      guidance: "The path ahead is clear. Go forward with confidence — the circumstances are in your favor. This is a good time to start new things or make decisions.",
      timing: "Morning hours (5 AM – 11 AM) are especially favorable. Results may come within 1, 5, or 7 days.",
    },
    number: [1, 5, 7], direction: "East", element: "Wood",
  },
  { id: 1, name: "留连", nameEn: "Lingering", verdict: "stuck" as const,
    en: {
      verdict: "Things are delayed or stuck right now.",
      guidance: "The timing isn't right yet. Don't force things — patience is your best strategy. Use this waiting period to gather more information before acting.",
      timing: "Wait at least 2-3 days before making a decision. Afternoon hours may bring more clarity.",
    },
    number: [2, 8, 10], direction: "South", element: "Water",
  },
  { id: 2, name: "速喜", nameEn: "Quick Joy", verdict: "favorable" as const,
    en: {
      verdict: "Good news and joy are coming — fast.",
      conclusion: "The answer is YES. This is a moment of swift, positive energy. Act now while the momentum is on your side — opportunities fade quickly under this sign.",
      timing: "Act within 3 days for best results. Numbers 3, 6, 9 are lucky. Favorable direction: South.",
    },
    number: [3, 6, 9], direction: "South", element: "Fire",
  },
  { id: 3, name: "赤口", nameEn: "Red Mouth", verdict: "caution" as const,
    en: {
      verdict: "Watch your words — there's risk of conflict or misunderstandings.",
      guidance: "Be extra diplomatic today. Arguments can escalate quickly under this sign. If you're in a negotiation or difficult conversation, choose silence over sharp words.",
      timing: "Wait 4 days before making major moves. Avoid confrontations in the afternoon.",
    },
    number: [4, 7, 9], direction: "West", element: "Metal",
  },
  { id: 4, name: "小吉", nameEn: "Small Blessings", verdict: "favorable" as const,
    en: {
      verdict: "Small but real blessings are on the way.",
      conclusion: "The answer leans toward YES — but in a modest form. Don't expect dramatic results. What comes will be enough, if you stay grateful and patient.",
      timing: "Good outcomes arrive within 1-5 days. East is a favorable direction.",
    },
    number: [1, 5, 7], direction: "East", element: "Wood",
  },
  { id: 5, name: "空亡", nameEn: "Emptiness", verdict: "unfavorable" as const,
    en: {
      verdict: "Plans may not materialize as expected.",
      guidance: "Something essential is missing. Reconsider your approach before committing — the foundation may not be solid. This is a sign to pause, reflect, and regroup, not to force ahead.",
      timing: "Wait at least 6 days. Avoid important decisions during late night hours (9 PM – 1 AM).",
    },
    number: [3, 6, 9], direction: "North", element: "Earth",
  },
];

// Convert hour (0-23) to traditional Chinese 时辰 (1-12)
function hourToShichen(hour: number): number {
  // 子时 23-0, 丑时 1-2, 寅时 3-4, 卯时 5-6, 辰时 7-8, 巳时 9-10
  // 午时 11-12, 未时 13-14, 申时 15-16, 酉时 17-18, 戌时 19-20, 亥时 21-22
  if (hour === 23 || hour === 0) return 1;   // 子
  if (hour === 1 || hour === 2) return 2;    // 丑
  if (hour === 3 || hour === 4) return 3;    // 寅
  if (hour === 5 || hour === 6) return 4;    // 卯
  if (hour === 7 || hour === 8) return 5;    // 辰
  if (hour === 9 || hour === 10) return 6;   // 巳
  if (hour === 11 || hour === 12) return 7;  // 午
  if (hour === 13 || hour === 14) return 8;  // 未
  if (hour === 15 || hour === 16) return 9;  // 申
  if (hour === 17 || hour === 18) return 10; // 酉
  if (hour === 19 || hour === 20) return 11; // 戌
  return 12; // 亥 (21-22)
}

const SHICHEN_NAMES = ["", "子 (Zi)", "丑 (Chou)", "寅 (Yin)", "卯 (Mao)", "辰 (Chen)", "巳 (Si)", "午 (Wu)", "未 (Wei)", "申 (Shen)", "酉 (You)", "戌 (Xu)", "亥 (Hai)"];

export interface XiaoLiuRenInput {
  question?: string;
  dateOverride?: string; // ISO date string for testing
}

export interface XiaoLiuRenResult {
  palace: typeof PALACES[0];
  lunarMonth: number;
  lunarDay: number;
  shichen: number;
  shichenName: string;
  steps: {
    month: { start: string; count: number; land: string };
    day: { start: string; count: number; land: string };
    hour: { start: string; count: number; land: string };
  };
  question?: string;
}

function circularIndex(start: number, steps: number): number {
  // Count from start position, starting count at 1 from start
  // So if start=0 and steps=1, result=0; if steps=2, result=1
  return (start + steps - 1) % 6;
}

export function performXiaoLiuRen(input: XiaoLiuRenInput = {}): XiaoLiuRenResult {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();

  if (input.dateOverride) {
    const d = new Date(input.dateOverride);
    year = d.getFullYear();
    month = d.getMonth() + 1;
    day = d.getDate();
    hour = d.getHours();
  }

  const lunar = solarToLunar(year, month, day);
  const shichen = hourToShichen(hour);

  // Step 1: Count from 大安(0) by lunar month
  const monthLand = circularIndex(0, lunar.lunarMonth);
  
  // Step 2: From monthLand, count by lunar day
  const dayLand = circularIndex(monthLand, lunar.lunarDay);
  
  // Step 3: From dayLand, count by shichen
  const finalLand = circularIndex(dayLand, shichen);

  const palace = PALACES[finalLand];

  return {
    palace,
    lunarMonth: lunar.lunarMonth,
    lunarDay: lunar.lunarDay,
    shichen,
    shichenName: SHICHEN_NAMES[shichen],
    steps: {
      month: { start: PALACES[0].nameEn, count: lunar.lunarMonth, land: PALACES[monthLand].nameEn },
      day: { start: PALACES[monthLand].nameEn, count: lunar.lunarDay, land: PALACES[dayLand].nameEn },
      hour: { start: PALACES[dayLand].nameEn, count: shichen, land: PALACES[finalLand].nameEn },
    },
    question: input.question,
  };
}

// Export for API
export { PALACES, hourToShichen, SHICHEN_NAMES };
