import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "sk-placeholder",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "Chinese Culture Studio — Name Preview",
  },
});

const SYSTEM_PROMPT = `You create beautiful Chinese names. Given an English name, generate 3 Chinese name options that phonetically match while carrying deep, beautiful meanings.

Structure as valid JSON:
{
  "originalName": "Sarah",
  "names": [
    {
      "chinese": "思然",
      "pinyin": "Sī Rán",
      "meaning": "Thoughtful and natural — like a flowing stream of clear thoughts",
      "elements": "Wood + Water",
      "style": "Elegant"
    }
  ],
  "headline": "A catchy one-line headline about these names (max 60 chars)"
}

IMPORTANT:
- Names should be 2 characters (given name) — phonetically match the English name
- Each meaning should be poetic, unique, and beautiful (1 sentence)
- Elements should match the characters' actual Wu Xing associations
- Style: one of "Elegant", "Bold", "Gentle", "Artistic", "Classic"
- Return ONLY valid JSON`;

export async function POST(req: NextRequest) {
  try {
    const { name, gender } = await req.json();
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
    }
    const genderHint = gender === "male" ? "masculine" : gender === "female" ? "feminine" : "gender-neutral";
    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      max_tokens: 800,
      temperature: 0.9,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Create 3 Chinese name options for the name "${name.trim()}" (${genderHint} style).` },
      ],
    });
    const text = completion.choices[0]?.message?.content || "";
    let json = text.trim();
    if (json.startsWith("```")) json = json.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?\s*```$/, "");
    return NextResponse.json(JSON.parse(json));
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("name-preview error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
