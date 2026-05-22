import { NextRequest, NextResponse } from "next/server";
import { generateNames } from "@/lib/naming";
import { selectAuspiciousDays } from "@/lib/calendar";
import { performDivination } from "@/lib/divination";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, input } = body;

    if (!["naming", "calendar", "divination"].includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    let result;
    switch (type) {
      case "naming":
        result = generateNames(input);
        break;
      case "calendar":
        result = selectAuspiciousDays(input);
        break;
      case "divination":
        result = performDivination(input);
        break;
    }

    return NextResponse.json({ status: "completed", type, result });
  } catch (error) {
    console.error("Test API error:", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
