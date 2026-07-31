import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "sk-placeholder",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "Chinese Culture Studio - Name Preview",
  },
});

const SYSTEM_PROMPT = `You create beautiful Chinese names. Given an English name, generate ONLY ONE Chinese name option that phonetically matches.

Structure as valid JSON:
{
  "originalName": "Sarah",
  "names": [
    {
      "chinese": "思然",
      "pinyin": "Sī Rán",
      "meaning": "A brief, poetic glimpse — just enough to spark curiosity"
    }
  ],
  "headline": "A teaser headline (max 60 chars) hinting that their Bazi reveals much more"
}

IMPORTANT:
- Only ONE name (single entry in array) — never more
- Names should be 2 characters (given name) — phonetically match the English name
- Meaning should be BRIEF and deliberately incomplete (one line) — leave the reader hungry
- DO NOT include elements or style — these require birth chart analysis
- Headline must create curiosity — suggest that without birth date, they're only seeing a fraction
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
      max_tokens: 500,
      temperature: 0.9,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Create ONLY ONE Chinese name option for "${name.trim()}" (${genderHint} style). Remember: just one name, brief meaning, no elements or style fields.` },
      ],
    });
    const text = completion.choices[0]?.message?.content || "";
    let json = text.trim();
    if (json.startsWith("```")) json = json.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?\s*```$/, "");
    return NextResponse.json(JSON.parse(json));
  } catch (err: unknown) {
    console.error("name-preview error:", err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: "The name spirits are resting. Try again?" }, { status: 500 });
  }
}
