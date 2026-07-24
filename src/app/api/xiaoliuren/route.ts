import { NextRequest, NextResponse } from "next/server";
import { performXiaoLiuRen } from "@/lib/xiaoliuren";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const question = typeof body.question === "string" ? body.question.trim() : "";

    const result = performXiaoLiuRen({ question: question || undefined });

    return NextResponse.json({
      palace: {
        name: result.palace.name,
        nameEn: result.palace.nameEn,
        verdict: result.palace.verdict,
        shortAnswer: result.palace.en.shortAnswer,
        verdictText: result.palace.en.verdict,
        guidance: "guidance" in result.palace.en ? result.palace.en.guidance : "",
        conclusion: "conclusion" in result.palace.en ? (result.palace.en as { conclusion: string }).conclusion : "",
        timing: result.palace.en.timing,
        element: result.palace.element,
        direction: result.palace.direction,
      },
      question: result.question || "",
      calculation: {
        lunarMonth: result.lunarMonth,
        lunarDay: result.lunarDay,
        shichen: result.shichen,
        shichenName: result.shichenName,
        steps: result.steps,
      },
    });
  } catch (err: unknown) {
    console.error("xiaoliuren error:", err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: "The oracle is silent. Try again?" }, { status: 500 });
  }
}
