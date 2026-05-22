// Auspicious Date Selection (择吉) algorithm
// Based on traditional Chinese almanac principles
// References: 《协纪辩方书》《玉匣子》《鳌头通书》

import type { CalendarInput, AuspiciousDay, CalendarResult, HourInfo } from "../types";

const HEAVENLY_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

// 十二建除 (Twelve Jianchu stars)
const JIANCHU = ["建", "除", "满", "平", "定", "执", "破", "危", "成", "收", "开", "闭"];

// 二十八宿 (28 Lunar Mansions)
const CONSTELLATIONS = [
  "角木蛟", "亢金龙", "氐土貉", "房日兔", "心月狐", "尾火虎", "箕水豹",
  "斗木獬", "牛金牛", "女土蝠", "虚日鼠", "危月燕", "室火猪", "壁水貐",
  "奎木狼", "娄金狗", "胃土雉", "昴日鸡", "毕月乌", "觜火猴", "参水猿",
  "井木犴", "鬼金羊", "柳土獐", "星日马", "张月鹿", "翼火蛇", "轸水蚓",
];

// Auspicious gods (吉神)
const AUSPICIOUS_GODS = [
  "天德", "月德", "天喜", "天赦", "天恩", "月恩", "天福",
  "天贵", "阳德", "阴德", "福星", "禄星", "驿马", "天成",
];

// Suitability rules by event type
const EVENT_SUITABLE: Record<string, string[]> = {
  wedding: ["成", "定", "开"],    // 宜嫁娶
  business: ["成", "满", "开"],   // 宜开市
  travel: ["成", "开", "平"],     // 宜出行
  moving: ["成", "平", "定"],     // 宜搬家
  contract: ["定", "成", "满"],   // 宜签约
  sacrifice: ["成", "定", "开"],
  engagement: ["成", "定", "开"],
  construction: ["成", "满", "开"],
  medical: ["成", "开", "平"],
  funeral: ["成", "定", "闭"],
  education: ["成", "开", "定"],
  meeting: ["成", "开", "满"],
  renovation: ["成", "定", "满"],
};

const EVENT_UNSUITABLE: Record<string, string[]> = {
  wedding: ["破", "闭", "执"],
  business: ["破", "闭", "收"],
  travel: ["破", "危", "闭"],
  moving: ["破", "执", "闭"],
  contract: ["破", "闭", "执"],
  sacrifice: ["破", "闭", "危"],
  engagement: ["破", "闭", "执"],
  construction: ["破", "危", "闭"],
  medical: ["破", "执", "危"],
  funeral: ["破", "危", "执"],
  education: ["破", "闭", "危"],
  meeting: ["破", "闭", "危"],
  renovation: ["破", "危", "收"],
};

// Full event types with Chinese + English suitable/unsuitable items
const EVENT_DATA: Record<string, {
  suitable: { zh: string; en: string }[];
  unsuitable: { zh: string; en: string }[];
  eventName: { zh: string; en: string };
}> = {
  wedding: {
    eventName: { zh: "嫁娶", en: "Wedding & Marriage" },
    suitable: [
      { zh: "嫁娶", en: "Wedding ceremony" },
      { zh: "纳采", en: "Marriage proposal" },
      { zh: "订婚", en: "Engagement" },
      { zh: "会友", en: "Gathering with friends" },
    ],
    unsuitable: [
      { zh: "词讼", en: "Lawsuits & litigation" },
      { zh: "安葬", en: "Funeral & burial" },
      { zh: "动土", en: "Breaking ground" },
    ],
  },
  engagement: {
    eventName: { zh: "订婚", en: "Engagement" },
    suitable: [
      { zh: "订婚", en: "Engagement ceremony" },
      { zh: "纳采", en: "Formal proposal" },
      { zh: "会友", en: "Meeting with families" },
      { zh: "祈福", en: "Seeking blessings" },
    ],
    unsuitable: [
      { zh: "词讼", en: "Lawsuits & litigation" },
      { zh: "安葬", en: "Funeral & burial" },
      { zh: "出行", en: "Long-distance travel" },
    ],
  },
  business: {
    eventName: { zh: "开市", en: "Business Opening" },
    suitable: [
      { zh: "开市", en: "Open for business" },
      { zh: "交易", en: "Trading & transactions" },
      { zh: "立契", en: "Signing agreements" },
      { zh: "纳财", en: "Collecting payments" },
      { zh: "开业", en: "Grand opening" },
    ],
    unsuitable: [
      { zh: "嫁娶", en: "Wedding & marriage" },
      { zh: "安葬", en: "Funeral & burial" },
      { zh: "搬家", en: "Moving house" },
    ],
  },
  travel: {
    eventName: { zh: "出行", en: "Travel & Journey" },
    suitable: [
      { zh: "出行", en: "Setting out on a journey" },
      { zh: "旅游", en: "Sightseeing & tourism" },
      { zh: "会友", en: "Visiting friends" },
      { zh: "移徙", en: "Relocation" },
    ],
    unsuitable: [
      { zh: "嫁娶", en: "Wedding & marriage" },
      { zh: "动土", en: "Breaking ground" },
      { zh: "开市", en: "Business opening" },
    ],
  },
  moving: {
    eventName: { zh: "搬家", en: "Moving House" },
    suitable: [
      { zh: "搬家", en: "Moving residence" },
      { zh: "入宅", en: "Moving into new home" },
      { zh: "安床", en: "Setting up the bed" },
      { zh: "移徙", en: "Relocation" },
    ],
    unsuitable: [
      { zh: "开市", en: "Business opening" },
      { zh: "嫁娶", en: "Wedding & marriage" },
      { zh: "出行", en: "Long-distance travel" },
    ],
  },
  contract: {
    eventName: { zh: "签约", en: "Signing Contracts" },
    suitable: [
      { zh: "签约", en: "Signing contracts" },
      { zh: "立券", en: "Establishing deeds" },
      { zh: "交易", en: "Business transactions" },
      { zh: "开市", en: "Opening for business" },
    ],
    unsuitable: [
      { zh: "出行", en: "Long-distance travel" },
      { zh: "动土", en: "Breaking ground" },
      { zh: "词讼", en: "Lawsuits & litigation" },
    ],
  },
  sacrifice: {
    eventName: { zh: "祭祀", en: "Ancestral Ceremony" },
    suitable: [
      { zh: "祭祀", en: "Ritual offerings" },
      { zh: "祈福", en: "Praying for blessings" },
      { zh: "斋醮", en: "Purification ceremony" },
      { zh: "扫舍", en: "Cleaning the home" },
    ],
    unsuitable: [
      { zh: "嫁娶", en: "Wedding & marriage" },
      { zh: "开市", en: "Business opening" },
      { zh: "行丧", en: "Funeral procession" },
    ],
  },
  construction: {
    eventName: { zh: "修造", en: "Construction & Building" },
    suitable: [
      { zh: "修造", en: "Construction work" },
      { zh: "动土", en: "Breaking ground" },
      { zh: "上梁", en: "Raising the beam" },
      { zh: "安门", en: "Installing doors" },
      { zh: "筑堤", en: "Building foundations" },
    ],
    unsuitable: [
      { zh: "嫁娶", en: "Wedding & marriage" },
      { zh: "出行", en: "Long-distance travel" },
      { zh: "安葬", en: "Funeral & burial" },
    ],
  },
  medical: {
    eventName: { zh: "求医", en: "Medical Treatment" },
    suitable: [
      { zh: "求医", en: "Seeking medical care" },
      { zh: "治病", en: "Starting treatment" },
      { zh: "服药", en: "Taking medicine" },
      { zh: "祈福", en: "Praying for health" },
    ],
    unsuitable: [
      { zh: "嫁娶", en: "Wedding & marriage" },
      { zh: "会友", en: "Visiting friends" },
      { zh: "出行", en: "Long-distance travel" },
    ],
  },
  funeral: {
    eventName: { zh: "安葬", en: "Funeral & Burial" },
    suitable: [
      { zh: "安葬", en: "Burial ceremony" },
      { zh: "行丧", en: "Funeral procession" },
      { zh: "祭祀", en: "Memorial ritual" },
    ],
    unsuitable: [
      { zh: "嫁娶", en: "Wedding & marriage" },
      { zh: "开市", en: "Business opening" },
      { zh: "会友", en: "Social gatherings" },
      { zh: "出行", en: "Long-distance travel" },
    ],
  },
  education: {
    eventName: { zh: "入学", en: "Education & Study" },
    suitable: [
      { zh: "入学", en: "Starting school" },
      { zh: "习艺", en: "Learning new skills" },
      { zh: "祈福", en: "Seeking academic blessings" },
      { zh: "会友", en: "Study with friends" },
    ],
    unsuitable: [
      { zh: "嫁娶", en: "Wedding & marriage" },
      { zh: "安葬", en: "Funeral & burial" },
      { zh: "出行", en: "Long-distance travel" },
    ],
  },
  meeting: {
    eventName: { zh: "会友", en: "Meeting & Gathering" },
    suitable: [
      { zh: "会友", en: "Meeting friends" },
      { zh: "订盟", en: "Making alliances" },
      { zh: "出行", en: "Going out" },
      { zh: "交易", en: "Business discussions" },
    ],
    unsuitable: [
      { zh: "安葬", en: "Funeral & burial" },
      { zh: "词讼", en: "Lawsuits & litigation" },
      { zh: "行丧", en: "Funeral matters" },
    ],
  },
  renovation: {
    eventName: { zh: "装修", en: "Renovation & Decoration" },
    suitable: [
      { zh: "修造", en: "Repair & renovation" },
      { zh: "安门", en: "Installing doors" },
      { zh: "安床", en: "Setting up furniture" },
      { zh: "扫舍", en: "Cleaning the house" },
    ],
    unsuitable: [
      { zh: "嫁娶", en: "Wedding & marriage" },
      { zh: "出行", en: "Long-distance travel" },
      { zh: "开市", en: "Business opening" },
    ],
  },
};

// Lunar month names
const LUNAR_MONTHS = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月"];
const LUNAR_DAYS = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
  "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
  "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];

// Simple lunar calendar approximation
function solarToLunar(year: number, month: number, day: number): { lunarYear: number; lunarMonth: number; lunarDay: number; isLeapMonth: boolean } {
  // Simplified lunar conversion using a lookup approach
  // This is an approximation - a full lunar calendar requires detailed ephemeris data
  // For production, consider using a library like lunar-javascript or lunar-typescript

  // Lunar New Year dates (approx) for 2024-2030
  const LUNAR_NEW_YEAR: Record<number, [number, number]> = {
    2024: [2, 10], 2025: [1, 29], 2026: [2, 17], 2027: [2, 6],
    2028: [1, 26], 2029: [2, 13], 2030: [2, 3],
  };

  const [lnyMonth, lnyDay] = LUNAR_NEW_YEAR[year] || [2, 10];

  // Calculate day offset from Lunar New Year
  const targetDate = new Date(year, month - 1, day);
  const lnyDate = new Date(year, lnyMonth - 1, lnyDay);

  let diffDays = Math.floor((targetDate.getTime() - lnyDate.getTime()) / (1000 * 60 * 60 * 24));

  let lunarYear = year;
  if (diffDays < 0) {
    // Before Lunar New Year - belongs to previous lunar year
    lunarYear = year - 1;
    const prevLny = LUNAR_NEW_YEAR[lunarYear] || [2, 10];
    const prevLnyDate = new Date(lunarYear, prevLny[0] - 1, prevLny[1]);
    diffDays = Math.floor((targetDate.getTime() - prevLnyDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  // Approximate lunar month (29 or 30 days)
  let remainingDays = diffDays;
  let lunarMonth = 1;
  let lunarDay = 1;

  const months = [30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30];
  for (let i = 0; i < 12 && remainingDays >= months[i]; i++) {
    remainingDays -= months[i];
    lunarMonth++;
  }
  lunarDay = remainingDays + 1;

  return { lunarYear, lunarMonth: Math.min(lunarMonth, 12), lunarDay: Math.min(lunarDay, 30), isLeapMonth: false };
}

function getDayGanzhi(year: number, month: number, day: number): { stem: string; branch: string } {
  // Same day pillar calculation as in bazi.ts
  const refYear = 1900;
  let days = 0;
  for (let y = refYear; y < year; y++) days += (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 366 : 365;
  const monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (let m = 1; m < month; m++) {
    days += monthDays[m];
    if (m === 2 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) days++;
  }
  days += day;

  return {
    stem: HEAVENLY_STEMS[(5 + days) % 10],
    branch: EARTHLY_BRANCHES[(9 + days) % 12],
  };
}

function getYearGanzhi(year: number): string {
  const stem = HEAVENLY_STEMS[(year - 4) % 10];
  const branch = EARTHLY_BRANCHES[(year - 4) % 12];
  return stem + branch;
}

function getMonthGanzhi(year: number, month: number): string {
  const yearStemIndex = (year - 4) % 10;
  const monthStemStartMap = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
  const monthIndex = month === 1 ? 0 : month - 1;
  const stem = HEAVENLY_STEMS[(monthStemStartMap[yearStemIndex] + monthIndex) % 10];
  const branch = EARTHLY_BRANCHES[(monthIndex + 2) % 12];
  return stem + branch;
}

function getJianchu(dayBranchIndex: number, monthBranchIndex: number): string {
  // Jianchu is based on the month's earthly branch
  const startIndex = (monthBranchIndex + 1) % 12;
  const diff = (dayBranchIndex - startIndex + 12) % 12;
  return JIANCHU[diff];
}

// 十二时辰 (12 two-hour periods)
const SHICHEN: { branch: string; time: string; label: string; labelEn: string }[] = [
  { branch: "子", time: "23:00–01:00", label: "子时", labelEn: "Rat (Midnight)" },
  { branch: "丑", time: "01:00–03:00", label: "丑时", labelEn: "Ox (Late Night)" },
  { branch: "寅", time: "03:00–05:00", label: "寅时", labelEn: "Tiger (Dawn)" },
  { branch: "卯", time: "05:00–07:00", label: "卯时", labelEn: "Rabbit (Sunrise)" },
  { branch: "辰", time: "07:00–09:00", label: "辰时", labelEn: "Dragon (Morning)" },
  { branch: "巳", time: "09:00–11:00", label: "巳时", labelEn: "Snake (Mid-morning)" },
  { branch: "午", time: "11:00–13:00", label: "午时", labelEn: "Horse (Noon)" },
  { branch: "未", time: "13:00–15:00", label: "未时", labelEn: "Goat (Afternoon)" },
  { branch: "申", time: "15:00–17:00", label: "申时", labelEn: "Monkey (Late Afternoon)" },
  { branch: "酉", time: "17:00–19:00", label: "酉时", labelEn: "Rooster (Sunset)" },
  { branch: "戌", time: "19:00–21:00", label: "戌时", labelEn: "Dog (Evening)" },
  { branch: "亥", time: "21:00–23:00", label: "亥时", labelEn: "Pig (Night)" },
];

// Auspicious hours based on day stem (日干起黄道吉时)
const AUSPICIOUS_HOURS_BY_STEM: Record<string, string[]> = {
  "甲": ["丑", "辰", "午", "未", "戌", "亥"],
  "乙": ["子", "寅", "卯", "午", "申", "酉"],
  "丙": ["寅", "卯", "巳", "未", "酉", "亥"],
  "丁": ["丑", "辰", "巳", "申", "戌", "亥"],
  "戊": ["子", "寅", "卯", "午", "申", "酉"],
  "己": ["丑", "辰", "午", "未", "戌", "亥"],
  "庚": ["子", "寅", "卯", "午", "申", "酉"],
  "辛": ["寅", "卯", "巳", "未", "酉", "亥"],
  "壬": ["丑", "辰", "巳", "申", "戌", "亥"],
  "癸": ["子", "寅", "卯", "午", "申", "酉"],
};

function getAuspiciousHours(dayStem: string): HourInfo[] {
  const auspiciousBranches = AUSPICIOUS_HOURS_BY_STEM[dayStem] || [];
  return SHICHEN.map(h => ({
    branch: h.branch,
    time: h.time,
    label: h.label,
    labelEn: h.labelEn,
    auspicious: auspiciousBranches.includes(h.branch),
  }));
}

export function selectAuspiciousDays(input: CalendarInput): CalendarResult {
  const { startDate, endDate, eventType } = input;
  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T00:00:00");
  const results: AuspiciousDay[] = [];

  const suitableJianchu = EVENT_SUITABLE[eventType] || [];
  const unsuitableJianchu = EVENT_UNSUITABLE[eventType] || [];

  const current = new Date(start);
  while (current <= end) {
    const y = current.getFullYear();
    const m = current.getMonth() + 1;
    const d = current.getDate();

    const { stem, branch } = getDayGanzhi(y, m, d);
    const branchIndex = EARTHLY_BRANCHES.indexOf(branch);
    const monthBranchIndex = (m + 1) % 12;
    const jianchu = getJianchu(branchIndex, monthBranchIndex);

    // Score calculation
    let score = 50; // baseline
    if (suitableJianchu.includes(jianchu)) score += 30;
    if (unsuitableJianchu.includes(jianchu)) score -= 40;

    // Lucky gods
    const constellation = CONSTELLATIONS[branchIndex % 28];
    const lunar = solarToLunar(y, m, d);

    // Select auspicious gods based on day
    const gods: string[] = [];
    const dayIndex = (y * 365 + m * 30 + d) % AUSPICIOUS_GODS.length;
    gods.push(AUSPICIOUS_GODS[dayIndex % AUSPICIOUS_GODS.length]);
    gods.push(AUSPICIOUS_GODS[(dayIndex + 3) % AUSPICIOUS_GODS.length]);

    // Event-specific suitability
    const eventData = EVENT_DATA[eventType];
    const suitable = eventData ? eventData.suitable.map(s => s.zh) : [];
    const suitableEn = eventData ? eventData.suitable.map(s => s.en) : [];
    const unsuitable = eventData ? eventData.unsuitable.map(u => u.zh) : [];
    const unsuitableEn = eventData ? eventData.unsuitable.map(u => u.en) : [];

    // Only include days with score > 20
    if (score > 20) {
      results.push({
        date: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
        lunarDate: `农历${LUNAR_MONTHS[lunar.lunarMonth - 1]}${LUNAR_DAYS[lunar.lunarDay - 1]}`,
        ganzhi: {
          year: getYearGanzhi(y) + "年",
          month: getMonthGanzhi(y, m) + "月",
          day: stem + branch + "日",
        },
        suitable,
        suitableEn,
        unsuitable,
        unsuitableEn,
        gods,
        score: Math.min(100, Math.max(0, score)),
        jianchu,
        constellation,
        hours: getAuspiciousHours(stem),
      });
    }

    current.setDate(current.getDate() + 1);
  }

  // Sort by score descending, return top 3
  results.sort((a, b) => b.score - a.score);

  return { auspiciousDays: results.slice(0, 3) };
}
