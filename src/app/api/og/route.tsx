import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Chinese Culture Studio";
  const sub = searchParams.get("sub") || "Chinese Name • Auspicious Dates • I Ching • Palm Reading";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1a1208 0%, #3d2b1f 40%, #5c3a28 100%)",
        fontFamily: "serif",
        padding: 80,
      }}
    >
      <div
        style={{
          fontSize: 60,
          fontWeight: 700,
          color: "#e8d5b0",
          textAlign: "center",
          marginBottom: 24,
          letterSpacing: 2,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 28,
          color: "#c4a882",
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        {sub}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 48,
          fontSize: 20,
          color: "#8b7355",
        }}
      >
        chinese-culture-app.onrender.com
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
