import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "sk-placeholder",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "Chinese Culture Studio — Zodiac Match",
  },
});

const ZODIAC = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];

const SYSTEM_PROMPT = `You are a Chinese zodiac compatibility expert. Given two zodiac signs, create a fun, insightful, and highly shareable compatibility reading.

Structure your response as valid JSON:
{
  "title": "A catchy one-line headline about these two signs (max 70 chars, like a viral tweet)",
  "score": 85,
  "scoreLabel": "label for the score like \"Fire Match\" or \"Cosmic Harmony\" (2-4 words)",
  "love": "Romantic compatibility insight (1-2 sentences, fun and positive)",
  "friendship": "Friendship compatibility insight (1-2 sentences)",
  "career": "Work/business compatibility insight (1-2 sentences)",
  "secret": "One surprising/quirky fact about this pair (1 sentence, highly shareable)",
  "advice": "One sentence of relationship advice for this pair",
  "emoji": "One emoji that captures their dynamic"
}

IMPORTANT:
- Make it FUN, positive, and SHAREABLE — people will screenshot this
- Score should be between 30-98 (never 100, leave room for mystery)
- Be creative and witty, not generic
- Return ONLY valid JSON, no other text`;

export async function POST(req: NextRequest) {
  try {
    const { sign1, sign2 } = await req.json();
    if (!sign1 || !sign2 || !ZODIAC.includes(sign1) || !ZODIAC.includes(sign2)) {
      return NextResponse.json({ error: "Please select two valid zodiac signs." }, { status: 400 });
    }
    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      max_tokens: 600,
      temperature: 0.95,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Analyze compatibility between ${sign1} and ${sign2} in the Chinese zodiac.` },
      ],
    });
    const text = completion.choices[0]?.message?.content || "";
    let json = text.trim();
    if (json.startsWith("```")) json = json.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?\s*```$/, "");
    return NextResponse.json(JSON.parse(json));
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("zodiac-match error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
