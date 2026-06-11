import { NextRequest, NextResponse } from "next/server";
import { setPalmImage } from "@/lib/palm-store";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64 } = await req.json();
    if (!imageBase64 || typeof imageBase64 !== "string") {
      return NextResponse.json({ error: "Missing image data" }, { status: 400 });
    }

    // Reject non-image MIME types (check data URI prefix)
    if (!imageBase64.startsWith("data:image/") && !imageBase64.startsWith("/9j/") && !imageBase64.startsWith("iVBOR")) {
      return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
    }

    // Reject very large images (> 10MB base64)
    if (imageBase64.length > 14_000_000) {
      return NextResponse.json({ error: "Image too large. Please use a smaller photo." }, { status: 400 });
    }

    const imageKey = crypto.randomUUID();
    setPalmImage(imageKey, imageBase64);

    return NextResponse.json({ imageKey });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
