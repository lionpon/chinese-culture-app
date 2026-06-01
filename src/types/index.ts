// Naming types
export interface NamingInput {
  firstName?: string;    // user's given name (for phonetic matching)
  lastName?: string;     // user's family name (for surname mapping)
  surname?: string;      // legacy — kept for backward compat, prefer lastName
  gender: "male" | "female";
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour: number;     // 0-23
  style: "elegant" | "grand" | "fresh"; // 典雅/大气/清新
}

export interface NameOption {
  characters: string;    // Chinese name (surname + given)
  surname: string;       // Chinese surname
  givenName: string;     // Chinese given name
  pinyin: string;        // full pinyin with tones
  meaning: string;       // English meaning
  wuxing: string;        // five elements breakdown
  source: string;        // classical text source
  sourceText: string;    // original text quote
}

export interface NamingResult {
  options: NameOption[];
  baziAnalysis: BaziResult;
}

// Calendar types
export type EventType = "wedding" | "engagement" | "business" | "travel" | "moving" | "contract" | "sacrifice" | "construction" | "medical" | "funeral" | "education" | "meeting" | "renovation";

export interface CalendarInput {
  startDate: string;
  endDate: string;
  eventType: EventType;
}

export interface HourInfo {
  branch: string;
  time: string;
  label: string;
  labelEn: string;
  auspicious: boolean;
}

export interface AuspiciousDay {
  date: string;
  lunarDate: string;
  ganzhi: {
    year: string;
    month: string;
    day: string;
  };
  suitable: string[];
  suitableEn: string[];
  unsuitable: string[];
  unsuitableEn: string[];
  gods: string[];
  score: number;
  jianchu: string;
  constellation: string;
  hours: HourInfo[];
}

export interface CalendarResult {
  auspiciousDays: AuspiciousDay[];
}

// Divination types
export type DivinationMethod = "random" | "time" | "manual";

export interface DivinationInput {
  question?: string;
  method: DivinationMethod;
  numbers?: [number, number, number]; // for manual method
}

export interface HexagramData {
  id: number;
  nameZh: string;
  nameEn: string;
  upperTrigram: string;
  lowerTrigram: string;
  judgment: string;     // 卦辞 (Chinese)
  judgmentEn: string;   // English translation
  lines: LineData[];
  description: string;
  descriptionEn: string;
}

export interface LineData {
  position: number;
  text: string;         // 爻辞 (Chinese)
  textEn: string;       // English
  isYang: boolean;
}

export interface DivinationResult {
  mainHexagram: {
    id: number;
    nameZh: string;
    nameEn: string;
    pinyin: string;
    judgment: string;
    judgmentEn: string;
    description: string;
    descriptionEn: string;
    advice: string;
  };
  changedHexagram?: {
    id: number;
    nameZh: string;
    nameEn: string;
    pinyin: string;
    judgment: string;
    judgmentEn: string;
    description: string;
    descriptionEn: string;
  };
  mutualHexagram?: {
    id: number;
    nameZh: string;
    nameEn: string;
    pinyin: string;
  };
  changingLine?: {
    position: number;
    text: string;
    textEn: string;
  };
}

// Palm Reading types
export interface PalmReadingInput {
  imageKey: string;
  gender?: "male" | "female";
  ageRange?: string;
  handSide: "left" | "right";
  question?: string;
}

export interface LineAnalysis {
  quality: "excellent" | "good" | "fair" | "poor";
  description: string;
  descriptionEn: string;
  classicalRef?: string;
}

export interface MountAnalysis {
  name: string;
  nameEn: string;
  condition: string;
  meaning: string;
  meaningEn: string;
}

export interface PalmReadingResult {
  handType: {
    element: string;
    elementEn: string;
    description: string;
    descriptionEn: string;
  };
  threeLines: {
    lifeLine: LineAnalysis;
    headLine: LineAnalysis;
    heartLine: LineAnalysis;
  };
  auxiliaryLines: {
    fateLine?: LineAnalysis;
    marriageLine?: LineAnalysis;
    sunLine?: LineAnalysis;
    healthLine?: LineAnalysis;
  };
  mounts: MountAnalysis[];
  overallJudgment: {
    text: string;
    textEn: string;
    classicalRef: string;
  };
  advice: {
    career: string;
    careerEn: string;
    love: string;
    loveEn: string;
    health: string;
    healthEn: string;
  };
}

// Bazi types
export interface BaziPillar {
  heavenlyStem: string;
  earthlyBranch: string;
  wuxing: string;
  element: string;
}

export interface BaziResult {
  year: BaziPillar;
  month: BaziPillar;
  day: BaziPillar;
  hour: BaziPillar;
  elements: Record<string, number>; // element counts
  analysis: string;
  analysisEn: string;
}
