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
  const { surname, gender, birthYear, birthMonth, birthDay, birthHour, style } = input;

  // 1. Calculate Bazi
  const bazi = calculateBazi(birthYear, birthMonth, birthDay, birthHour);

  // 2. Analyze Wuxing to determine favorable elements
  const wuxing = analyzeWuxing(bazi.day.wuxing, bazi.elements);
  const favorable = wuxing.favorable;

  // 3. Select Chinese surname
  const chineseSurname = selectSurname(surname);

  // 4. Filter characters by favorable elements and gender
  const candidates = characters.filter(c => {
    const elementMatch = favorable.includes(c.element);
    const genderMatch = c.gender === gender || c.gender === "neutral";
    const styleMatch = !style || c.style === style || c.style === "neutral";
    return elementMatch && genderMatch && styleMatch;
  });

  // 5. Score and select best characters
  const scored = candidates.map(c => ({
    ...c,
    score: (favorable.includes(c.element) ? 3 : 0) + (c.element === favorable[0] ? 2 : 0) + (c.gender === gender ? 1 : 0),
  })).sort((a, b) => b.score - a.score);

  // 6. Build candidate given-name characters (scored)
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
