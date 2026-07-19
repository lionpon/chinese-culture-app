import { NextRequest, NextResponse } from "next/server";
import { performDivination } from "@/lib/divination";
import type { DivinationInput, DivinationMethod } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { method, numbers } = body as { method: DivinationMethod; numbers?: [number, number, number] };

    if (!method || !["random", "time", "manual"].includes(method)) {
      return NextResponse.json({ error: "Valid method required" }, { status: 400 });
    }

    const input: DivinationInput = {
      method,
      numbers: method === "manual" ? numbers : undefined,
    };

    const result = performDivination(input, true); // preview mode

    return NextResponse.json({
      hexagramId: result.mainHexagram.id,
      nameZh: result.mainHexagram.nameZh,
      nameEn: result.mainHexagram.nameEn,
      pinyin: result.mainHexagram.pinyin,
      judgment: result.mainHexagram.judgment,
      judgmentEn: result.mainHexagram.judgmentEn,
      advice: result.mainHexagram.advice,
    });
  } catch (error) {
    console.error("Divination preview error:", error);
    return NextResponse.json({ error: "Failed to generate preview" }, { status: 500 });
  }
}
