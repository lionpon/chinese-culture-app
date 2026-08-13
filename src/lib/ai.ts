import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "sk-placeholder",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "Chinese Culture Studio",
  },
});

/**
 * Model fallback chains — payment loop resilience.
 *
 * If the primary model fails (region block, rate limit, outage), we try
 * the next model instead of failing the whole purchase. qwen/deepseek
 * are CN-friendly, which also keeps local dev working from mainland China.
 */
export const TEXT_MODEL_CHAIN = [
  "openai/gpt-4o-mini",
  "qwen/qwen-2.5-72b-instruct",
  "deepseek/deepseek-chat",
];

export const VISION_MODEL_CHAIN = [
  "qwen/qwen2.5-vl-72b-instruct",
  "openai/gpt-4o-mini",
  "google/gemini-2.0-flash-001",
];

type ChatMessage = { role: string; content: unknown };

export async function chatCompletionText(
  models: string[],
  messages: ChatMessage[],
  maxTokens = 4096
): Promise<string> {
  let lastError: unknown = null;
  for (const model of models) {
    try {
      const completion = await client.chat.completions.create({
        model,
        max_tokens: maxTokens,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        messages: messages as any,
      });
      const text = completion.choices[0]?.message?.content;
      if (text) return text;
      lastError = new Error(`Empty response from ${model}`);
    } catch (err) {
      lastError = err;
      console.warn(`[ai] model ${model} failed:`, (err as Error)?.message?.slice(0, 200));
    }
  }
  throw lastError instanceof Error ? lastError : new Error("All AI models failed");
}

/** Parse a model response that may be wrapped in ```json fences. */
export function parseJsonLoose<T>(text: string): T {
  let json = text.trim();
  if (json.startsWith("```")) {
    json = json.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?\s*```$/, "");
  }
  return JSON.parse(json) as T;
}
