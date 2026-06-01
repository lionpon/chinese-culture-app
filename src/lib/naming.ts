// Naming algorithm: combines Bazi analysis with classical text character selection
import { calculateBazi } from "./bazi";
import { analyzeWuxing } from "./wuxing";
import { characters, surnameMap, compoundSurnames } from "../data/characters";
import type { NamingInput, NameOption, NamingResult, BaziResult } from "../types";

export function generateNames(input: NamingInput, preview = false): NamingResult {
  const full = _generateNames(input);
  if (!preview) return full;
  return {
    options: full.options.slice(0, 1),
    baziAnalysis: {
      ...full.baziAnalysis,
      analysis: "",
      analysisEn: "Unlock full Bazi analysis with a contribution.",
    },
  };
}

function _generateNames(input: NamingInput): NamingResult {
  const rawLastName = input.lastName || input.surname || "";
  const rawFirstName = input.firstName || "";
  const { gender, birthYear, birthMonth, birthDay, birthHour, style } = input;

  // 1. Calculate Bazi
  const bazi = calculateBazi(birthYear, birthMonth, birthDay, birthHour);

  // 2. Analyze Wuxing to determine favorable elements
  const wuxing = analyzeWuxing(bazi.day.wuxing, bazi.elements);
  const favorable = wuxing.favorable;

  // 3. Select Chinese surname from last name
  const chineseSurname = selectSurname(rawLastName);

  // 4. Build phonetic bonus map from first name
  const phoneticScore = buildPhoneticScores(rawFirstName);

  // 5. Filter characters by favorable elements and gender
  const candidates = characters.filter(c => {
    const elementMatch = favorable.includes(c.element);
    const genderMatch = c.gender === gender || c.gender === "neutral";
    const styleMatch = !style || c.style === style || c.style === "neutral";
    return elementMatch && genderMatch && styleMatch;
  });

  // 6. Score — element match + phonetic similarity
  const scored = candidates.map(c => ({
    ...c,
    score:
      (favorable.includes(c.element) ? 3 : 0) +
      (c.element === favorable[0] ? 2 : 0) +
      (c.gender === gender ? 1 : 0) +
      (phoneticScore.get(c.char) || 0),
  })).sort((a, b) => b.score - a.score);

  // 7. Build candidate given-name characters (scored)
  const topCandidates = scored.slice(0, 30);

  // Helper: generate options for a given surname
  function buildOptions(surname: string, maxCount: number): NameOption[] {
    const results: NameOption[] = [];
    const usedPairs = new Set<string>();
    for (let i = 0; i < topCandidates.length; i++) {
      for (let j = i + 1; j < topCandidates.length; j++) {
        if (results.length >= maxCount) break;
        const a = topCandidates[i];
        const b = topCandidates[j];
        const pairKey = `${a.char}${b.char}`;
        if (usedPairs.has(pairKey)) continue;
        if (a.char === b.char) continue;
        const bothFavorable = favorable.includes(a.element) && favorable.includes(b.element);
        if (!bothFavorable && results.length >= Math.ceil(maxCount / 2)) continue;
        usedPairs.add(pairKey);
        const givenName = a.char + b.char;
        results.push({
          characters: surname + givenName,
          surname,
          givenName,
          pinyin: toPinyin(surname + givenName),
          meaning: `${a.meaning}; ${b.meaning}`,
          wuxing: `${a.element}${b.element}`,
          source: a.source || b.source,
          sourceText: [a.sourceText, b.sourceText].filter(Boolean).join(" | "),
        });
      }
      if (results.length >= maxCount) break;
    }
    return results;
  }

  // Generate regular 3-character names (single surname)
  const regularOptions = buildOptions(chineseSurname, 3);

  // Generate 4-character names with compound surnames (复姓)
  const scoredCompounds = compoundSurnames
    .map(cs => {
      const overlap = cs.elements.filter(e => favorable.includes(e)).length;
      return { ...cs, score: overlap };
    })
    .sort((a, b) => b.score - a.score);

  const compoundOptions: NameOption[] = [];
  for (const cs of scoredCompounds.slice(0, 2)) {
    const built = buildOptions(cs.surname, 1);
    compoundOptions.push(...built);
  }

  // Mix: regular first, then compound (total up to 5)
  const options = [...regularOptions, ...compoundOptions];

  // If not enough, add single-character given names
  if (options.length < 3) {
    for (const c of topCandidates.slice(0, 5)) {
      options.push({
        characters: chineseSurname + c.char,
        surname: chineseSurname,
        givenName: c.char,
        pinyin: toPinyin(chineseSurname + c.char),
        meaning: c.meaning,
        wuxing: c.element,
        source: c.source,
        sourceText: c.sourceText || "",
      });
    }
  }

  const baziResult: BaziResult = {
    year: bazi.year,
    month: bazi.month,
    day: bazi.day,
    hour: bazi.hour,
    elements: bazi.elements,
    analysis: bazi.analysis,
    analysisEn: wuxing.descriptionEn,
  };

  return { options: options.slice(0, 5), baziAnalysis: baziResult };
}

function selectSurname(englishSurname: string): string {
  // Simple mapping based on first letter/sound
  const first = englishSurname.charAt(0).toUpperCase();
  for (const [key, surname] of Object.entries(surnameMap)) {
    if (key.startsWith(first) || first.startsWith(key)) return surname;
  }
  return surnameMap["default"] || "李";
}

// Phonetic mapping: first-name sound clusters → Chinese characters with similar pronunciation
// Each syllable maps to characters that sound like it, with a score bonus
const phoneticMap: Record<string, string[]> = {
  // English / Western name sounds
  ma: ["玛", "马", "迈"], may: ["梅", "美"], mi: ["米", "密"], mo: ["莫", "墨"],
  mi_: ["米", "蜜"], ma_: ["玛", "马"],
  ke: ["克", "可", "科"], ka: ["卡", "凯"], ko: ["科", "柯"], ki: ["基", "琪"],
  re: ["瑞", "若"], ri: ["瑞", "日"], ra: ["拉", "然"], ro: ["若", "罗"], ru: ["如", "汝"],
  le: ["乐", "勒"], la: ["拉", "兰"], li: ["莉", "丽", "力", "理"], lo: ["洛", "罗"], lu: ["露", "路", "鲁"],
  an: ["安", "岸"], an_: ["安", "安"], en: ["恩", "恩"],
  na: ["娜", "纳"], ne: ["妮", "讷"], ni: ["妮", "尼"], no: ["诺", "娜"], ny: ["妮", "尼"],
  el: ["尔", "儿"], er: ["尔", "儿"], ar: ["尔", "雅"],
  ja: ["杰", "嘉"], je: ["杰", "捷"], ji: ["吉", "纪"], jo: ["乔", "娇"], ju: ["俊", "君"],
  da: ["达", "大"], de: ["德", "得"], di: ["迪", "蒂"], do: ["多", "朵"], du: ["杜", "都"],
  sa: ["萨", "飒"], se: ["思", "瑟"], si: ["思", "丝"], so: ["索", "苏"],
  be: ["贝", "蓓"], ba: ["巴", "芭"], bi: ["比", "碧"], bo: ["博", "波"], bu: ["布", "步"],
  pe: ["佩", "沛"], pa: ["帕", "派"], pi: ["皮", "匹"], po: ["珀", "坡"],
  te: ["特", "特"], ta: ["塔", "泰"], ti: ["蒂", "提"], to: ["托", "拓"],
  va: ["瓦", "娃"], ve: ["维", "薇"], vi: ["维", "薇"], vo: ["沃", "渥"],
  // Russian / Slavic name sounds (transliterated)
  bo_: ["博", "波"], va_: ["瓦", "娃"], ve_: ["维", "蔚"], vla: ["弗", "拉"],
  dmi: ["德", "米"], dm: ["德", "明"],
  i_: ["伊", "一"], i_van: ["伊", "凡"],
  ye: ["叶", "烨"], yo: ["约", "岳"],
  a_: ["阿", "雅"], alek: ["阿", "列"], alex: ["亚", "力"],
  an_na: ["安", "娜"], anas: ["安", "娜"],
  ek: ["叶", "卡"], kat: ["卡", "嘉"],
  ol: ["奥", "莉"], ol_ga: ["奥", "莉"],
  ir: ["伊", "琳"], ir_ina: ["伊", "琳"],
  ta_: ["塔", "泰"], taty: ["塔", "嘉"],
  ma_ria: ["玛", "丽"], ma_sha: ["玛", "莎"],
  nat: ["娜", "塔"], natasha: ["娜", "莎"],
  ser: ["谢", "尔"], sergei: ["谢", "尔"],
  nik: ["妮", "琪"], nikolai: ["尼", "柯"],
  an_drei: ["安", "德"], an_drey: ["安", "德"],
  mi_khail: ["米", "凯"], mi_xail: ["米", "凯"],
  el_ena: ["叶", "莲"], e_lena: ["叶", "莲"],
  sve: ["斯", "维"], svet: ["斯", "维"],
  ga: ["嘉", "加"], ga_lina: ["嘉", "琳"],
  yu: ["尤", "雨"], yu_liya: ["尤", "莉"],
  lyu: ["柳", "露"], lyu_dmila: ["柳", "德"],
  // Additional common sounds
  ch: ["琪", "琦"], chen: ["晨", "辰"], cheng: ["成", "程"],
  xin: ["欣", "馨"], xue: ["雪", "学"], xiao: ["晓", "小"],
  fei: ["菲", "飞"], fang: ["芳", "方"],
  mei: ["美", "玫"], ming: ["明", "铭"],
  ling: ["玲", "灵"], lin: ["琳", "林"],
  jing: ["静", "晶"], jian: ["健", "建"],
  yun: ["云", "韵"], yuan: ["远", "媛"],
  hua: ["华", "花"], hui: ["慧", "辉"],
  long: ["龙", "隆"], feng: ["凤", "峰"],
  wei: ["伟", "薇"], wen: ["文", "雯"],
  lan: ["兰", "蓝"], lei: ["磊", "蕾"],
  xiang: ["翔", "香"], qiang: ["强", "蔷"],
  tian: ["天", "甜"], hai: ["海", "涵"],
  shan: ["山", "珊"], shui: ["水", "睡"],
  guang: ["光", "广"], yong: ["勇", "永"],
};

function buildPhoneticScores(firstName: string): Map<string, number> {
  const scores = new Map<string, number>();
  if (!firstName) return scores;

  const lower = firstName.toLowerCase().replace(/[^a-zа-яё]/g, "");

  // Transliterate Cyrillic to Latin for matching
  const latin = transliterateCyrillic(lower);
  const combined = lower + latin; // match against both

  // Try multi-syllable matches first (greedy), then single syllables
  for (const [key, chars] of Object.entries(phoneticMap)) {
    const cleanKey = key.replace(/_/g, "");
    let bonus = 2; // default bonus

    // Longer keys get higher bonus (more specific match)
    if (cleanKey.length >= 4) bonus = 4;
    else if (cleanKey.length >= 3) bonus = 3;

    // Check if the name contains this sound
    if (combined.includes(cleanKey)) {
      for (const char of chars) {
        const existing = scores.get(char) || 0;
        scores.set(char, Math.max(existing, bonus));
      }
    }
  }

  return scores;
}

// Transliterate Cyrillic → Latin for phonetic matching
function transliterateCyrillic(text: string): string {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "ye", ё: "yo", ж: "zh",
    з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
    ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };
  let result = "";
  for (const ch of text) {
    result += map[ch] || ch;
  }
  return result;
}

function toPinyin(chars: string): string {
  const pinyinMap: Record<string, string> = {
    // Wood (木)
    林: "lín", 柏: "bǎi", 松: "sōng", 桐: "tóng", 梓: "zǐ",
    兰: "lán", 芷: "zhǐ", 芳: "fāng", 薇: "wēi", 莲: "lián",
    桂: "guì", 梅: "méi", 桃: "táo", 柳: "liǔ", 柔: "róu",
    栋: "dòng", 楷: "kǎi", 楚: "chǔ", 荣: "róng", 栩: "xǔ",
    棋: "qí", 筠: "yún", 茵: "yīn", 萱: "xuān", 菁: "jīng",
    蔚: "wèi", 艺: "yì", 若: "ruò", 彦: "yàn", 康: "kāng",
    // Fire (火)
    明: "míng", 昭: "zhāo", 显: "xiǎn", 德: "dé", 伦: "lún",
    俊: "jùn", 杰: "jié", 智: "zhì", 慧: "huì", 灵: "líng",
    旭: "xù", 昂: "áng", 炎: "yán", 焕: "huàn", 煜: "yù",
    炜: "wěi", 灿: "càn", 哲: "zhé", 达: "dá", 逸: "yì",
    // Earth (土)
    安: "ān", 宁: "níng", 婉: "wǎn", 娴: "xián", 雅: "yǎ",
    维: "wéi", 坤: "kūn", 圣: "shèng", 坚: "jiān", 培: "péi",
    垚: "yáo", 瑜: "yú", 瑾: "jǐn", 琳: "lín", 瑶: "yáo",
    琪: "qí", 玮: "wěi", 佳: "jiā", 怡: "yí", 岚: "lán",
    谦: "qiān", 远: "yuǎn", 轩: "xuān", 仪: "yí",
    // Metal (金)
    瑞: "ruì", 恩: "ēn", 诚: "chéng", 信: "xìn", 善: "shàn",
    仁: "rén", 义: "yì", 书: "shū", 诗: "shī", 铭: "míng",
    锦: "jǐn", 钧: "jūn", 铠: "kǎi", 铮: "zhēng", 锐: "ruì",
    钰: "yù", 志: "zhì", 毅: "yì",
    // Water (水)
    清: "qīng", 涵: "hán", 泽: "zé", 渊: "yuān", 博: "bó",
    浩: "hào", 瀚: "hàn", 鸿: "hóng", 沛: "pèi", 澜: "lán",
    雪: "xuě", 露: "lù", 雯: "wén", 熙: "xī", 然: "rán",
    汝: "rǔ", 泠: "líng", 溪: "xī", 沁: "qìn", 淑: "shū",
    静: "jìng", 淼: "miǎo", 思: "sī", 悠: "yōu", 润: "rùn",
    恒: "héng", 弘: "hóng", 泰: "tài", 云: "yún", 文: "wén",
    // Surnames
    白: "bái", 陈: "chén", 杜: "dù", 袁: "yuán", 冯: "féng",
    郭: "guō", 黄: "huáng", 易: "yì", 蒋: "jiǎng", 李: "lǐ",
    马: "mǎ", 倪: "ní", 欧: "ōu", 潘: "pān", 秦: "qín",
    任: "rén", 沈: "shěn", 唐: "táng", 吴: "wú", 范: "fàn",
    王: "wáng", 许: "xǔ", 杨: "yáng", 张: "zhāng",
    // Legacy entries (characters/surnames from prior versions)
    子: "zǐ", 宇: "yǔ", 玉: "yù", 雨: "yǔ", 天: "tiān",
    嘉: "jiā", 和: "hé", 平: "píng", 礼: "lǐ", 健: "jiàn",
    伟: "wěi", 强: "qiáng", 森: "sēn", 菲: "fēi",
    刘: "liú", 赵: "zhào", 周: "zhōu", 郑: "zhèng", 韩: "hán",
    朱: "zhū", 何: "hé", 吕: "lǚ", 施: "shī", 孙: "sūn",
    // Compound surname characters (复姓)
    阳: "yáng", 上: "shàng", 官: "guān", 司: "sī",
    诸: "zhū", 葛: "gě", 慕: "mù", 容: "róng", 令: "líng",
    狐: "hú", 端: "duān", 木: "mù", 皇: "huáng", 甫: "fǔ",
    长: "zhǎng",
  };

  let result = "";
  for (const char of chars) {
    result += (pinyinMap[char] || char) + " ";
  }
  return result.trim();
}

export { toPinyin };
