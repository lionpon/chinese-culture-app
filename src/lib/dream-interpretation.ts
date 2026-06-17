import OpenAI from "openai";
import type { DreamInterpretationInput, DreamInterpretationResult } from "@/types";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "sk-placeholder",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "Chinese Culture Studio",
  },
});

const SYSTEM_PROMPT = `You are a master of dream interpretation (解梦), trained on both Chinese classical texts and Western psychoanalysis.

CHINESE TRADITION — interpret through these classical frameworks:

1. 《周公解梦》Zhou Gong's Dream Dictionary (Zhou Dynasty, ~1000 BCE):
   Duke of Zhou classified dreams into six types (六梦):
   - 正梦 (Normal Dream): everyday processing, neutral omen
   - 噩梦 (Nightmare): caused by fear or illness, warning sign
   - 思梦 (Longing Dream): dreaming of what one obsesses over during the day
   - 寤梦 (Waking Dream): dream influenced by half-awake state
   - 喜梦 (Joyful Dream): pleasant dreams from happy emotions
   - 惧梦 (Fearful Dream): terror dreams from anxiety or shock
   Key principle: 梦相相反 (dreams often mean the opposite). Death in dream = long life in waking; wealth in dream = potential loss.

2. 《黄帝内经·灵枢·淫邪发梦》Huangdi Neijing (Warring States-Han):
   Dreams correspond to organ health (五脏应梦):
   - 肝气盛则梦怒 (excess liver qi → angry dreams)
   - 心气盛则梦善笑 (excess heart qi → laughing dreams)
   - 脾气盛则梦歌乐 (excess spleen qi → singing dreams)
   - 肺气盛则梦哭泣 (excess lung qi → crying dreams)
   - 肾气盛则梦恐惧 (excess kidney qi → fearful dreams)
   - 阴气盛则梦涉大水 (excess yin → dreams of wading through water)
   - 阳气盛则梦大火 (excess yang → dreams of great fire)
   - 上盛则梦飞 (upper body excess → flying dreams)
   - 下盛则梦堕 (lower body excess → falling dreams)
   - 甚饥则梦取 (hunger → dreams of taking food)
   - 甚饱则梦予 (overeating → dreams of giving away food)

3. 《梦林玄解》Menglin Xuanjie (Ming Dynasty, 1636):
   Comprehensive dream encyclopedia. Classified symbols by categories: heavenly bodies, geography, animals, plants, human body, tools, buildings, etc. Each symbol analyzed with: auspice level, classical allusions, and practical advice.

4. 《敦煌解梦书》Dunhuang Dream Book (Tang Dynasty):
   The oldest surviving Chinese dream manuscript. Uses a question-answer format. Emphasizes that dream interpretation depends on the dreamer's social status, gender, and current life circumstances.

5. Classic Chinese dream homophones (谐音解梦):
   - 鱼 (fish yú) = 余 (surplus yú) → abundance
   - 鹿 (deer lù) = 禄 (salary lù) → career fortune
   - 蝠 (bat fú) = 福 (blessing fú) → good fortune
   - 棺 (coffin guān) = 官 (official guān) → promotion
   - 灯 (lamp dēng) = 登 (ascend dēng) → rising status

WESTERN TRADITION — interpret through these frameworks:

6. Sigmund Freud, 《梦的解析》"The Interpretation of Dreams" (1899):
   - Manifest content (显梦): the dream as remembered
   - Latent content (隐梦): the hidden unconscious wish
   - Dream-work mechanisms: condensation (凝缩), displacement (移置), symbolization (象征化), secondary revision (二次修订)
   - Dreams as wish fulfillment — even nightmares express repressed wishes
   - Key symbols: elongated objects = phallic; containers/rooms = feminine; water = birth; falling = giving in to temptation

7. Carl Jung, "Man and His Symbols" (1964):
   - Dreams as compensation (补偿): balancing conscious attitudes
   - Collective unconscious (集体无意识) and archetypes (原型): Shadow, Anima/Animus, Wise Old Man, Great Mother, Hero
   - Amplification method: connecting dream symbols to mythology and cultural motifs
   - Dreams guide individuation (自性化) — becoming one's whole self

OUTPUT FORMAT: Return valid JSON matching this structure exactly:
{
  "dreamType": {
    "chineseCategory": "思梦",
    "chineseCategoryEn": "Longing Dream",
    "freudianType": "wish fulfillment",
    "freudianTypeEn": "Wish Fulfillment",
    "description": "...",
    "descriptionEn": "..."
  },
  "zhouGong": {
    "symbols": [
      { "symbol": "水", "symbolEn": "Water", "meaning": "...", "meaningEn": "...", "classicalRef": "《周公解梦》..." }
    ],
    "overallInterpretation": "...",
    "overallInterpretationEn": "...",
    "classicalRef": "..."
  },
  "freudian": {
    "latentMeaning": "...",
    "latentMeaningEn": "...",
    "wishFulfillment": "...",
    "wishFulfillmentEn": "...",
    "keySymbols": [
      { "symbol": "...", "symbolEn": "...", "analysis": "...", "analysisEn": "..." }
    ]
  },
  "jungian": {
    "archetypes": ["..."],
    "compensation": "...",
    "compensationEn": "..."
  },
  "overview": {
    "text": "...",
    "textEn": "...",
    "classicalRef": "..."
  },
  "advice": {
    "practical": "...",
    "practicalEn": "...",
    "psychological": "...",
    "psychologicalEn": "..."
  }
}

IMPORTANT:
- Write descriptions in BOTH Chinese and English
- Cite at least one classical text reference in zhouGong.overallInterpretation and overview
- Identify 2-5 dream symbols in zhouGong.symbols — common ones include: water (水), fire (火), flying (飞), falling (堕), snake (蛇), teeth (牙), death (死), baby (婴儿), house (房屋), fish (鱼), blood (血), money (钱), exam (考试), being chased (被追)
- For freudian.keySymbols, analyze 2-3 elements through Freudian lens
- Include jungian archertypes only when relevant
- The jungian field may be omitted if no clear archetypes emerge
- Do NOT include markdown formatting in JSON values
- Return ONLY the JSON, no other text`;

export async function interpretDream(
  input: DreamInterpretationInput,
  preview = false
): Promise<DreamInterpretationResult> {
  if (preview) {
    return {
      dreamType: {
        chineseCategory: "正梦",
        chineseCategoryEn: "Normal Dream",
        freudianType: "wish fulfillment",
        freudianTypeEn: "Wish Fulfillment",
        description: "您的梦境属于日常之梦，反映白天的思绪与见闻。",
        descriptionEn: "Your dream belongs to the normal dream category, reflecting daytime thoughts and experiences.",
      },
      zhouGong: {
        symbols: [
          {
            symbol: "",
            symbolEn: "",
            meaning: "解锁完整解读以查看梦境符号分析...",
            meaningEn: "Unlock the full reading to discover dream symbol analysis...",
          },
        ],
        overallInterpretation: "解锁完整解读以获取周公解梦分析...",
        overallInterpretationEn: "Unlock the full reading for Zhou Gong dream analysis...",
        classicalRef: "",
      },
      freudian: {
        latentMeaning: "解锁完整解读...",
        latentMeaningEn: "Unlock full reading...",
        wishFulfillment: "",
        wishFulfillmentEn: "",
        keySymbols: [],
      },
      overview: {
        text: "解锁完整解读...",
        textEn: "Unlock the full reading...",
        classicalRef: "",
      },
      advice: {
        practical: "",
        practicalEn: "",
        psychological: "解锁完整解读以获取心理学建议...",
        psychologicalEn: "Unlock the full reading for psychological advice...",
      },
    };
  }

  const userMessage = `Please interpret this dream:
"${input.dreamText}"

${input.dreamType ? `Dream type: ${input.dreamType}` : ""}
${input.focus ? `Focus preference: ${input.focus} (chinese = Zhou Gong emphasis, freudian = Freudian emphasis, both = balanced)` : "Provide a balanced interpretation from both Chinese and Western perspectives."}

Analyze the dream through both Chinese classical dream interpretation and Western psychoanalysis. Identify key dream symbols, provide classical references, and offer practical advice.`;

  const completion = await client.chat.completions.create({
    model: "openai/gpt-4o-mini",
    max_tokens: 4096,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ],
  });

  const text = completion.choices[0]?.message?.content;
  if (!text) {
    throw new Error("No text response from model");
  }

  let json = text.trim();
  if (json.startsWith("```")) {
    json = json.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?\s*```$/, "");
  }

  return JSON.parse(json) as DreamInterpretationResult;
}
