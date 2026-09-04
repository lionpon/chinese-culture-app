// GET /api/pinterest-post?token=...&lang=en — pin today's daily hexagram card (卦象图)
// GET /api/pinterest-post?token=...&lang=en&kind=zodiac — pin today's zodiac fortune card (生肖运势图)
// (营销第 2 步 — Pinterest 图钉流自动化)

import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedPost } from "@/lib/social/auth";
import { getDailySocialPosts, type SocialPostTexts } from "@/lib/social/content";
import { createPin, pinterestConfigured } from "@/lib/social/pinterest";
import { BASE_URL } from "@/lib/config";
import { getZodiacInfo } from "@/data/zodiac-data";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!isAuthorizedPost(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!pinterestConfigured()) {
    return NextResponse.json({
      ok: false,
      reason: "Pinterest not configured. Set PINTEREST_ACCESS_TOKEN and PINTEREST_BOARD_ID.",
    });
  }

  const lang = (req.nextUrl.searchParams.get("lang") || "en") as "en" | "ru" | "ja" | "ko";
  const kind = req.nextUrl.searchParams.get("kind") === "zodiac" ? "zodiac" : "hexagram";

  try {
    const social = getDailySocialPosts();
    const texts: SocialPostTexts = social.posts[lang] || social.posts.en;

    let pin: { title: string; description: string };
    let imageUrl: string;

    if (kind === "zodiac") {
      // Zodiac fortune of the current lunar year
      const zodiac = getZodiacInfo(new Date().getFullYear(), "en");
      pin = {
        title: `${zodiac.animal} Zodiac Fortune — ${social.date}`,
        description: `${zodiac.personality.join(", ")}. Lucky numbers ${zodiac.luckyNumbers}. ${BASE_URL}/tools/zodiac-match`,
      };
      imageUrl = `${BASE_URL}/api/social/card?kind=zodiac&date=${social.date}`;
    } else {
      pin = texts.pinterest;
      imageUrl = `${BASE_URL}/api/social/card?kind=hexagram&date=${social.date}`;
    }

    const result = await createPin({
      title: pin.title,
      description: pin.description,
      link: `${BASE_URL}${lang === "en" ? "" : `/${lang}`}/divination?utm_source=pinterest&utm_medium=social&utm_campaign=daily-hexagram&utm_content=${lang}`,
      imageUrl,
    });

    if (result.error) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
    }
    return NextResponse.json({ ok: true, pinId: result.id, kind, lang });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

