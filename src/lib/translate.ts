import OpenAI from "openai";

const ai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "sk-placeholder",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "Chinese Culture Studio",
  },
});

const LOCALE_NAMES: Record<string, string> = {
  ru: "Russian",
  ja: "Japanese",
  ko: "Korean",
};

export async function translateBatch(texts: string[], locale: string): Promise<string[]> {
  if (locale === "en" || !LOCALE_NAMES[locale] || texts.length === 0) return texts;

  const langName = LOCALE_NAMES[locale];
  const toTranslate = texts.map((t, i) => ({ i, t })).filter(x => x.t && x.t.length > 5);
  if (toTranslate.length === 0) return texts;

  const items = toTranslate.map((x, j) => `[${j}] ${x.t}`).join("\n\n---\n\n");

  const prompt = `You are a professional literary translator specializing in ${langName}.

Translate the following English texts into natural, fluent ${langName}. Rules:
- Preserve warmth, personality, and emotional tone — sound like a native ${langName} speaker wrote it
- Keep cultural terms (I Ching, Bazi, Zhou Gong, etc.) as-is or use standard ${langName} equivalents
- Never sound robotic or machine-translated
- Maintain paragraph structure and flow

Return ONLY a JSON array of strings in the exact same order:
["translated text 1", "translated text 2", ...]

Texts to translate:

${items}`;

  try {
    const completion = await ai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      max_tokens: 4096,
      temperature: 0.4,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = completion.choices[0]?.message?.content?.trim() || "";
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return texts;

    const translated: string[] = JSON.parse(jsonMatch[0]);
    const result = [...texts];
    for (const { i } of toTranslate) {
      const idx = toTranslate.findIndex(x => x.i === i);
      if (idx >= 0 && translated[idx]) {
        result[i] = translated[idx];
      }
    }
    return result;
  } catch {
    return texts;
  }
}

export async function translateText(text: string, locale: string): Promise<string> {
  const results = await translateBatch([text], locale);
  return results[0] || text;
}

/**
 * Recursively translate all *En string fields in a result object.
 * Walks objects/arrays, finds keys ending in "En" (e.g. descriptionEn, textEn),
 * collects their values, batch-translates them, and writes back.
 * Mutates the object in place.
 */
export async function translateResultEnFields(result: unknown, locale: string): Promise<void> {
  if (locale === "en" || !result) return;

  // Collect all *En string paths + narrative + advice
  const paths: { path: string[]; value: string }[] = [];
  function walk(obj: unknown, path: string[]) {
    if (!obj || typeof obj !== "object") return;
    if (Array.isArray(obj)) {
      obj.forEach((item, i) => walk(item, [...path, String(i)]));
      return;
    }
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      const isEnField = key.endsWith("En") || key === "narrative" || key === "advice";
      if (typeof value === "string" && isEnField && value.length > 5) {
        paths.push({ path: [...path, key], value });
      } else if (typeof value === "object" && value !== null) {
        walk(value, [...path, key]);
      }
    }
  }
  walk(result, []);

  if (paths.length === 0) return;

  // Batch translate
  const texts = paths.map(p => p.value);
  const translated = await translateBatch(texts, locale);

  // Write back
  for (let i = 0; i < paths.length; i++) {
    let obj = result as Record<string, unknown>;
    const { path } = paths[i];
    for (let j = 0; j < path.length - 1; j++) {
      const key = path[j];
      if (/^\d+$/.test(key)) {
        obj = (obj as unknown as unknown[])[parseInt(key)] as Record<string, unknown>;
      } else {
        obj = obj[key] as Record<string, unknown>;
      }
      if (!obj) break;
    }
    if (obj) {
      const lastKey = path[path.length - 1];
      obj[lastKey] = translated[i];
    }
  }
}
