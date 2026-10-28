import { NextRequest, NextResponse } from "next/server";
import { calculateBazi } from "@/lib/bazi";
import { analyzeWuxing, ELEMENT_EN } from "@/lib/wuxing";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { birthYear, birthMonth, birthDay, birthHour } = body;

    if (!birthYear || !birthMonth) {
      return NextResponse.json({ error: "Birth year and month required" }, { status: 400 });
    }

    const bazi = calculateBazi(birthYear, birthMonth, birthDay, birthHour);
    const wuxing = analyzeWuxing(bazi.day.wuxing, bazi.elements);

    const elementsList = Object.entries(bazi.elements)
      .sort((a, b) => b[1] - a[1])
      .map(([el, count]) => ({
        element: el,
        elementEn: ELEMENT_EN[el] || el,
        count,
      }));

    const maxCount = elementsList[0]?.count || 1;

    return NextResponse.json({
      dayMaster: {
        wuxing: bazi.day.wuxing,
        element: bazi.day.element,
        heavenlyStem: bazi.day.heavenlyStem,
      },
      // 四柱（命盘图表/分享卡片用, 2026-10-28）
      pillars: [
        { label: "year", stem: bazi.year.heavenlyStem, branch: bazi.year.earthlyBranch, wuxing: bazi.year.wuxing, element: bazi.year.element },
        { label: "month", stem: bazi.month.heavenlyStem, branch: bazi.month.earthlyBranch, wuxing: bazi.month.wuxing, element: bazi.month.element },
        { label: "day", stem: bazi.day.heavenlyStem, branch: bazi.day.earthlyBranch, wuxing: bazi.day.wuxing, element: bazi.day.element },
        { label: "hour", stem: bazi.hour.heavenlyStem, branch: bazi.hour.earthlyBranch, wuxing: bazi.hour.wuxing, element: bazi.hour.element },
      ],
      elements: elementsList,
      maxCount,
      analysis: bazi.analysis,
      favorable: wuxing.favorable.map(e => ({
        element: e,
        elementEn: ELEMENT_EN[e] || e,
      })),
      unfavorable: wuxing.unfavorable.map(e => ({
        element: e,
        elementEn: ELEMENT_EN[e] || e,
      })),
      balanced: wuxing.balanced,
      strongest: {
        element: wuxing.strongest,
        elementEn: ELEMENT_EN[wuxing.strongest] || wuxing.strongest,
      },
      weakest: {
        element: wuxing.weakest,
        elementEn: ELEMENT_EN[wuxing.weakest] || wuxing.weakest,
      },
    });
  } catch (error) {
    console.error("Preview error:", error);
    return NextResponse.json({ error: "Failed to generate preview" }, { status: 500 });
  }
}
