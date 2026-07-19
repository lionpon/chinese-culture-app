import { NextRequest, NextResponse } from "next/server";
import { selectAuspiciousDays } from "@/lib/calendar";
import type { CalendarInput } from "@/types";

const EVENT_NAMES: Record<string, string> = {
  wedding: "Wedding", engagement: "Engagement", business: "Business Opening",
  travel: "Travel", moving: "Moving", contract: "Signing Contract",
  sacrifice: "Ancestral Ceremony", construction: "Construction",
  medical: "Medical", funeral: "Funeral", education: "Education",
  meeting: "Meeting", renovation: "Renovation",
};

const EVENT_JIANCHU_HINT: Record<string, string> = {
  wedding: "Best on 成 (Completion), 定 (Stability), 开 (Opening) days",
  business: "Best on 成 (Completion), 满 (Fullness), 开 (Opening) days",
  travel: "Best on 成 (Completion), 开 (Opening), 平 (Peace) days",
  moving: "Best on 成 (Completion), 平 (Peace), 定 (Stability) days",
  contract: "Best on 定 (Stability), 成 (Completion), 满 (Fullness) days",
  education: "Best on 成 (Completion), 开 (Opening), 定 (Stability) days",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { startDate, endDate, eventType } = body;

    if (!startDate || !endDate || !eventType) {
      return NextResponse.json({ error: "Date range and event type required" }, { status: 400 });
    }

    const result = selectAuspiciousDays({ startDate, endDate, eventType } as CalendarInput);
    const days = result.auspiciousDays;

    const topDay = days[0];
    const eventName = EVENT_NAMES[eventType] || eventType;
    const hint = EVENT_JIANCHU_HINT[eventType] || "";

    return NextResponse.json({
      totalDays: days.length,
      dateRange: { start: startDate, end: endDate },
      eventType: eventName,
      hint,
      // Partial top day info (date hidden, just show quality)
      bestScore: topDay?.score || 0,
      bestJianchu: topDay?.jianchu || "",
      bestConstellation: topDay?.constellation || "",
      bestSuitable: topDay?.suitable?.slice(0, 3) || [],
      bestSuitableEn: topDay?.suitableEn?.slice(0, 3) || [],
    });
  } catch (error) {
    console.error("Calendar preview error:", error);
    return NextResponse.json({ error: "Failed to generate preview" }, { status: 500 });
  }
}
