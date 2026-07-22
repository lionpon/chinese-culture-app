import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "sk-placeholder",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "Chinese Culture Studio — Daily Fortune",
  },
});

const ZODIAC = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];

const SYSTEM_PROMPT = `You are a daily fortune teller blending I Ching wisdom with Chinese zodiac knowledge.

Create a personalized daily fortune. Structure as valid JSON:
{
  "title": "Catchy one-line fortune headline (max 60 chars)",
  "hexagram": "An I Ching hexagram name relevant today, e.g. \"Qian - The Creative\"",
  "hexagramNum": 15,
  "fortune": "Your daily fortune reading — 2-3 sentences, warm and inspiring",
  "luckyColor": "One lucky color for today",
  "luckyNumber": "A number between 1-99",
  "mood": "One word like \"Radiant\" or \"Contemplative\"",
  "advice": "One sentence of practical advice for today",
  "emoji": "One emoji for today's vibe"
}

IMPORTANT:
- Be POSITIVE and INSPIRING — people should feel good reading this
- Make it feel personal and specific, not generic
- Reference I Ching hexagram name and number
- Return ONLY valid JSON`;

export async function POST(req: NextRequest) {
  try {
    const { sign } = await req.json();
    if (!sign || !ZODIAC.includes(sign)) {
      return NextResponse.json({ error: "Please select a valid zodiac sign." }, { status: 400 });
    }
    const today = new Date().toISOString().slice(0, 10);
    const completion = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      max_tokens: 500,
      temperature: 1.0,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Generate a daily fortune for a ${sign} on ${today}.` },
      ],
    });
    const text = completion.choices[0]?.message?.content || "";
    let json = text.trim();
    if (json.startsWith("```")) json = json.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?\s*```$/, "");
    return NextResponse.json({ ...JSON.parse(json), sign, date: today });
  } catch {
    return NextResponse.json({ error: "The cosmos is quiet. Try again?" }, { status: 500 });
  }
}
