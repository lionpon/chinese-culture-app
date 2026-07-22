import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "sk-placeholder",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "Chinese Culture Studio - Dream AI",
  },
});

const SYSTEM_PROMPT = `You are an AI dream interpreter blending 3000-year-old Chinese dream lore (周公解梦) with modern psychology.

Your interpretation should be:
- Intriguing and shareable — people will screenshot this and post on social media
- Warm and personal — speak directly to the dreamer
- 3 paragraphs max in English (keep it concise for social sharing)
- Include ONE classical Chinese dream symbol reference (e.g., "In Zhou Gong's Dream Dictionary, water symbolizes...")

Structure your response as valid JSON:
{
  "title": "A catchy, intriguing one-line title for this dream (max 60 chars, like a tweet headline)",
  "interpretation": "3 paragraphs of warm, insightful interpretation mixing Chinese tradition + modern psychology. Max 500 chars total.",
  "symbol": "One key dream symbol found in the dream",
  "symbolMeaning": "One-line meaning of that symbol from Chinese tradition",
  "fortune": "A short, poetic fortune/prophecy derived from the dream (1 sentence, like a fortune cookie)",
  "emoji": "One emoji that best captures the dream's essence"
}

IMPORTANT:
- Make it FUN and SHAREABLE — people should want to post this
- Be positive and uplifting (even nightmares have silver linings)
- Return ONLY valid JSON, no markdown
- Never say "as an AI" or disclaimers — just interpret naturally`;

export async function POST(req: NextRequest) {
  try {
    const { dreamText } = await req.json();

    if (!dreamText || typeof dreamText !== "string" || dreamText.trim().length < 3) {
      return NextResponse.json({ error: "Please describe your dream in at least a few words." }, { status: 400 });
    }

    const userMessage = `Interpret this dream in a fun, intriguing, shareable way:\n"${dreamText.trim().slice(0, 500)}"`;

    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      max_tokens: 800,
      temperature: 0.9,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) {
      return NextResponse.json({ error: "The dream spirits are quiet. Try again?" }, { status: 500 });
    }

    let json = text.trim();
    if (json.startsWith("```")) {
      json = json.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?\s*```$/, "");
    }

    const result = JSON.parse(json);

    return NextResponse.json({
      title: result.title,
      interpretation: result.interpretation,
      symbol: result.symbol,
      symbolMeaning: result.symbolMeaning,
      fortune: result.fortune,
      emoji: result.emoji,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("dream-ai error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
