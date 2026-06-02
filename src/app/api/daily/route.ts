import { performDivination } from "@/lib/divination";
import { hexagramNameJa, hexagramNameRu } from "@/data/hexagram-names";

// Deterministic daily I Ching hexagram — changes only with the date, not the hour.
// Cached for 60 minutes on the CDN since the result is the same all day.

export async function GET() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const num1 = ((year + month + day) % 8) || 8;
  const num2 = ((year * month + day) % 8) || 8;
  const num3 = ((year + month * day) % 6) || 6;

  const result = performDivination({
    method: "manual",
    numbers: [num1, num2, num3],
  });

  const id = result.mainHexagram.id;
  result.mainHexagram = {
    ...result.mainHexagram,
    nameJa: hexagramNameJa[id] || result.mainHexagram.nameEn,
    nameRu: hexagramNameRu[id] || result.mainHexagram.nameEn,
  };

  return Response.json(result, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" },
  });
}
