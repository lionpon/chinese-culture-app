// Bazi (八字) calculation engine
// Computes Four Pillars of Destiny based on birth date/time

const HEAVENLY_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const STEM_ELEMENTS: Record<string, string> = {
  甲: "木", 乙: "木", 丙: "火", 丁: "火",
  戊: "土", 己: "土", 庚: "金", 辛: "金",
  壬: "水", 癸: "水",
};

const BRANCH_ELEMENTS: Record<string, string> = {
  子: "水", 丑: "土", 寅: "木", 卯: "木",
  辰: "土", 巳: "火", 午: "火", 未: "土",
  申: "金", 酉: "金", 戌: "土", 亥: "水",
};

const ELEMENT_NAMES_EN: Record<string, string> = {
  木: "Wood",
  火: "Fire",
  土: "Earth",
  金: "Metal",
  水: "Water",
};

interface PillarInfo {
  stem: string;
  branch: string;
  element: string;
}

function getYearPillar(year: number): PillarInfo {
  // Year pillar: (year - 4) % 60 cycle
  // The stem-branch cycle starts from 甲子 (year 4 CE)
  const baseYear = year - 4;
  const stemIndex = baseYear % 10;
  const branchIndex = baseYear % 12;
  const stem = HEAVENLY_STEMS[stemIndex < 0 ? stemIndex + 10 : stemIndex];
  const branch = EARTHLY_BRANCHES[branchIndex < 0 ? branchIndex + 12 : branchIndex];
  return { stem, branch, element: STEM_ELEMENTS[stem] };
}

function getMonthPillar(year: number, month: number): PillarInfo {
  // Month pillar is determined by solar terms, not lunar months
  // Approximate: month 1 (Feb 4 - Mar 5) = 寅, month 2 = 卯, etc.
  // Month stem: (yearStemIndex * 2 + monthIndex) % 10
  const yearStem = getYearPillar(year).stem;
  const yearStemIndex = HEAVENLY_STEMS.indexOf(yearStem);

  // Map Gregorian month to Chinese month pillar index
  // Feb=寅(1), Mar=卯(2), Apr=辰(3), May=巳(4), Jun=午(5),
  // Jul=未(6), Aug=申(7), Sep=酉(8), Oct=戌(9), Nov=亥(10), Dec=子(11), Jan=丑(0)
  const monthPillarIndex = month === 1 ? 0 : month - 1;

  // Month stem formula: (yearStemIndex * 2 + monthIndex) % 10
  // But each year stem starts with a different month stem
  // 甲/己年 → 正月丙寅, 乙/庚年 → 正月戊寅, 丙/辛年 → 正月庚寅, 丁/壬年 → 正月壬寅, 戊/癸年 → 正月甲寅
  const monthStemStartMap: Record<number, number> = { 0: 2, 1: 4, 2: 6, 3: 8, 4: 0, 5: 2, 6: 4, 7: 6, 8: 8, 9: 0 };
  const startStem = monthStemStartMap[yearStemIndex];
  const stemIndex = (startStem + monthPillarIndex) % 10;
  const branchIndex = monthPillarIndex;

  const stem = HEAVENLY_STEMS[stemIndex];
  const branch = EARTHLY_BRANCHES[(branchIndex + 2) % 12]; // 正月=寅(index 2)
  return { stem, branch, element: STEM_ELEMENTS[stem] };
}

function getDayPillar(year: number, month: number, day: number): PillarInfo {
  // Day pillar calculation: compute days since a known reference point
  // Reference: Jan 1, 1900 = 甲戌日 (stem index 0, branch index 10)
  const refYear = 1900;
  const refStemIdx = 0;
  const refBranchIdx = 10;

  let days = 0;
  for (let y = refYear; y < year; y++) {
    days += isLeapYear(y) ? 366 : 365;
  }

  const monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (let m = 1; m < month; m++) {
    days += monthDays[m];
    if (m === 2 && isLeapYear(year)) days++;
  }
  days += day - 1;

  const stemIndex = (refStemIdx + days) % 10;
  const branchIndex = (refBranchIdx + days) % 12;

  return {
    stem: HEAVENLY_STEMS[stemIndex < 0 ? stemIndex + 10 : stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex < 0 ? branchIndex + 12 : branchIndex],
    element: STEM_ELEMENTS[HEAVENLY_STEMS[stemIndex < 0 ? stemIndex + 10 : stemIndex]],
  };
}

function getHourPillar(dayStem: string, hour: number): PillarInfo {
  // Hour pillar: 2-hour blocks (时辰)
  // 子时 23-1, 丑时 1-3, ..., 亥时 21-23
  const branchIndex = Math.floor((hour + 1) / 2) % 12;

  // Hour stem formula based on day stem
  // 甲/己日 → 子时甲子, 乙/庚日 → 子时丙子, 丙/辛日 → 子时戊子, 丁/壬日 → 子时庚子, 戊/癸日 → 子时壬子
  const dayStemIdx = HEAVENLY_STEMS.indexOf(dayStem);
  const hourStemStartMap: Record<number, number> = { 0: 0, 1: 2, 2: 4, 3: 6, 4: 8, 5: 0, 6: 2, 7: 4, 8: 6, 9: 8 };
  const startStem = hourStemStartMap[dayStemIdx];
  const stemIndex = (startStem + branchIndex) % 10;

  return {
    stem: HEAVENLY_STEMS[stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex],
    element: STEM_ELEMENTS[HEAVENLY_STEMS[stemIndex]],
  };
}

function isLeapYear(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

// Hidden stems in earthly branches (藏干)
const HIDDEN_STEMS: Record<string, string[]> = {
  子: ["癸"],
  丑: ["己", "癸", "辛"],
  寅: ["甲", "丙", "戊"],
  卯: ["乙"],
  辰: ["戊", "乙", "癸"],
  巳: ["丙", "戊", "庚"],
  午: ["丁", "己"],
  未: ["己", "丁", "乙"],
  申: ["庚", "壬", "戊"],
  酉: ["辛"],
  戌: ["戊", "辛", "丁"],
  亥: ["壬", "甲"],
};

export function calculateBazi(year?: number, month?: number, day?: number, hour?: number) {
  // Fallback to current date if birth info is missing
  const now = new Date();
  const y = year ?? now.getFullYear();
  const m = month ?? (now.getMonth() + 1);
  const d = day ?? now.getDate();
  const h = hour ?? 12;

  const yearPillar = getYearPillar(y);
  const monthPillar = getMonthPillar(y, m);
  const dayPillar = getDayPillar(y, m, d);
  const hourPillar = getHourPillar(dayPillar.stem, h);

  // Count all elements (including hidden stems)
  const allStems = [
    yearPillar.stem, monthPillar.stem, dayPillar.stem, hourPillar.stem,
    ...HIDDEN_STEMS[yearPillar.branch],
    ...HIDDEN_STEMS[monthPillar.branch],
    ...HIDDEN_STEMS[dayPillar.branch],
    ...HIDDEN_STEMS[hourPillar.branch],
  ];

  const elements: Record<string, number> = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  allStems.forEach(s => { elements[STEM_ELEMENTS[s]]++; });

  return {
    year: { heavenlyStem: yearPillar.stem, earthlyBranch: yearPillar.branch, wuxing: yearPillar.element, element: ELEMENT_NAMES_EN[yearPillar.element] },
    month: { heavenlyStem: monthPillar.stem, earthlyBranch: monthPillar.branch, wuxing: monthPillar.element, element: ELEMENT_NAMES_EN[monthPillar.element] },
    day: { heavenlyStem: dayPillar.stem, earthlyBranch: dayPillar.branch, wuxing: dayPillar.element, element: ELEMENT_NAMES_EN[dayPillar.element] },
    hour: { heavenlyStem: hourPillar.stem, earthlyBranch: hourPillar.branch, wuxing: hourPillar.element, element: ELEMENT_NAMES_EN[hourPillar.element] },
    elements: {
      木: elements["木"],
      火: elements["火"],
      土: elements["土"],
      金: elements["金"],
      水: elements["水"],
    },
    analysis: analyzeBazi(yearPillar, monthPillar, dayPillar, hourPillar, elements),
  };
}

function analyzeBazi(year: PillarInfo, month: PillarInfo, day: PillarInfo, hour: PillarInfo, elements: Record<string, number>): string {
  const dayStem = day.stem;
  const dayElement = STEM_ELEMENTS[dayStem]; // 日主五行

  // Find weakest and strongest elements
  const sorted = Object.entries(elements).sort((a, b) => b[1] - a[1]);
  const strongest = sorted[0][0];
  const weakest = sorted[4][0];

  const parts: string[] = [];
  parts.push(`日主${dayElement}命`);

  if (elements[strongest] >= 4) {
    parts.push(`${strongest}旺`);
  }
  if (elements[weakest] <= 1) {
    parts.push(`${weakest}弱`);
  }

  // Determine favorable element (喜用神)
  const favorable = getFavorableElement(dayElement, strongest, weakest);
  parts.push(`喜${favorable}`);

  return parts.join("，");
}

function getFavorableElement(dayElement: string, strongest: string, weakest: string): string {
  // Sheng cycle: 木生火生土生金生水生木
  // Ke cycle:  木克土克水克火克金克木
  const shengMap: Record<string, string> = { 木: "火", 火: "土", 土: "金", 金: "水", 水: "木" };
  const keMap: Record<string, string> = { 木: "土", 土: "水", 水: "火", 火: "金", 金: "木" };

  // If day element is weak, nourish it with its producer
  if (weakest === dayElement) {
    for (const [producer, product] of Object.entries(shengMap)) {
      if (product === dayElement) return producer;
    }
  }

  // If the strongest element overcomes day element, strengthen day element
  if (keMap[strongest] === dayElement) {
    return dayElement;
  }

  // Default: return element that produces the day element
  for (const [producer, product] of Object.entries(shengMap)) {
    if (product === dayElement) return producer;
  }

  return "木";
}

export function getElementNameEn(element: string): string {
  return ELEMENT_NAMES_EN[element] || element;
}

export const HEAVENLY_STEMS_LIST = HEAVENLY_STEMS;
export const EARTHLY_BRANCHES_LIST = EARTHLY_BRANCHES;
export const STEM_ELEMENTS_MAP = STEM_ELEMENTS;
export const BRANCH_ELEMENTS_MAP = BRANCH_ELEMENTS;

export { calculateBazi as analyzeBazi };
export { getDayPillar };
export { getMonthPillar };
export { isLeapYear };
