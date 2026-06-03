// Generates a unique SEO article for each daily hexagram page
import type { DivinationResult } from "@/types";
import { judgmentJa, judgmentRu, descriptionJa, descriptionRu, adviceJa, adviceRu } from "@/data/hexagram-content";
import { hexagramNameJa, hexagramNameRu } from "@/data/hexagram-names";

const HEXAGRAM_GUIDE: Record<number, { theme: string; lifeAreas: string; practicalTip: string }> = {
  1: { theme: "creativity and initiative", lifeAreas: "career advancement, starting new projects, and taking leadership roles", practicalTip: "Today is ideal for launching initiatives. Write down your top 3 goals and commit to the first step before noon." },
  2: { theme: "receptivity and patience", lifeAreas: "teamwork, supporting others, and letting things unfold naturally", practicalTip: "Practice active listening today. Let others speak first — you'll learn more by receiving than by pushing." },
  3: { theme: "beginnings and overcoming initial chaos", lifeAreas: "new jobs, new relationships, and navigating uncertainty", practicalTip: "Break overwhelming tasks into tiny steps. Even 5 minutes of progress moves you past the initial hurdle." },
  4: { theme: "learning and seeking guidance", lifeAreas: "education, mentorship, and asking the right questions", practicalTip: "Reach out to someone more experienced today. A single well-framed question can save months of trial and error." },
  5: { theme: "patience and waiting for the right moment", lifeAreas: "timing, preparation, and gathering resources", practicalTip: "Use this waiting period to sharpen your skills. Read one chapter, watch one tutorial — small accumulations pay off." },
  6: { theme: "conflict and finding resolution", lifeAreas: "disputes, negotiations, and finding common ground", practicalTip: "Before escalating, ask yourself: what would a compromise that preserves the relationship look like? Seek that first." },
  7: { theme: "discipline and organized action", lifeAreas: "team leadership, military precision, and structured effort", practicalTip: "Create a simple checklist for your most important project. Order brings clarity — clarity brings results." },
  8: { theme: "unity and belonging", lifeAreas: "community, finding your tribe, and shared purpose", practicalTip: "Connect with one like-minded person today. The right alliance multiplies your strength." },
  9: { theme: "small obstacles and gentle persistence", lifeAreas: "minor setbacks, patience with delays, and refining details", practicalTip: "Don't force the big door — look for the small one. A slight course correction often bypasses the obstacle entirely." },
  10: { theme: "treading carefully and proper conduct", lifeAreas: "delicate situations, workplace etiquette, and navigating power dynamics", practicalTip: "Mind your manners today. In sensitive situations, correct behavior is your armor." },
  11: { theme: "harmony and prosperity", lifeAreas: "abundance, collaboration, and celebration", practicalTip: "Share your good fortune today — a compliment, a coffee, a connection. Prosperity deepens through generosity." },
  12: { theme: "stagnation and withdrawal", lifeAreas: "blocked progress, isolation, and inner reflection", practicalTip: "Stop pushing on locked doors. Turn inward: journal, meditate, or take a quiet walk. Clarity comes in stillness." },
  13: { theme: "fellowship and broad collaboration", lifeAreas: "networking, partnerships beyond your circle, and shared goals", practicalTip: "Reach beyond your usual group today. The person you need is outside your existing network." },
  14: { theme: "abundance and stewardship", lifeAreas: "wealth, resources, and wise distribution", practicalTip: "Count your blessings — literally. List 10 things you already have that you're grateful for. Abundance starts with awareness." },
  15: { theme: "modesty and humility", lifeAreas: "self-awareness, quiet confidence, and letting results speak", practicalTip: "Hold back from self-promotion today. Let your work speak — it's louder than any boast." },
  16: { theme: "enthusiasm and motivation", lifeAreas: "inspiration, rallying others, and joyful action", practicalTip: "Channel your excitement into one concrete action today. Enthusiasm without action fades — harness it now." },
  17: { theme: "adaptability and following the flow", lifeAreas: "flexibility, changing plans, and going with circumstances", practicalTip: "If plans change today, don't resist. Ask: what opportunity does this unexpected turn create?" },
  18: { theme: "repairing what is broken", lifeAreas: "fixing relationships, correcting mistakes, and cleanup work", practicalTip: "Name one thing you've been avoiding fixing. Take 10 minutes to start the repair today — momentum is everything." },
  19: { theme: "approaching good fortune", lifeAreas: "opportunity, welcoming change, and staying discerning", practicalTip: "Stay open but not naive. When opportunity knocks, verify before you invite it in." },
  20: { theme: "observation and contemplation", lifeAreas: "reflection, seeing the big picture, and patient awareness", practicalTip: "Before any important decision today, pause and observe for 5 full minutes. The right move will become clear." },
  21: { theme: "decisive action to remove obstacles", lifeAreas: "cutting through problems, justice, and firm resolution", practicalTip: "Identify one obstacle in your life. Address it directly today — polite but firm. Delay only feeds the problem." },
  22: { theme: "form and substance", lifeAreas: "appearance vs reality, aesthetics, and inner quality", practicalTip: "Polish your presentation, but don't forget the foundation. Today, spend equal time on what shows and what's underneath." },
  23: { theme: "collapse and renewal", lifeAreas: "ending cycles, letting go, and natural decline", practicalTip: "Let what's falling, fall. Clear the ground rather than propping up what's already crumbling. New growth needs space." },
  24: { theme: "return and fresh starts", lifeAreas: "recovery, new beginnings, and renewal", practicalTip: "Take one small step toward a fresh start today. The light is returning — don't underestimate a single step." },
  25: { theme: "innocence and sincerity", lifeAreas: "pure intentions, honest action, and simplicity", practicalTip: "Strip away complexity today. Ask: what would I do if I weren't trying to be clever? Do that." },
  26: { theme: "building inner strength", lifeAreas: "preparation, accumulation, and self-cultivation", practicalTip: "Invest in yourself today — read, exercise, learn. Your future power depends on what you accumulate now." },
  27: { theme: "nourishment and self-care", lifeAreas: "health, diet, mental wellness, and sustainable habits", practicalTip: "Audit what you consume today — food, media, company. Good inputs create good outcomes. Cut one toxic input." },
  28: { theme: "extreme pressure and bold action", lifeAreas: "crisis management, unconventional solutions, and breakthrough", practicalTip: "When the usual approach fails, try the opposite. Bold times call for bold moves — calculate the risk, then act." },
  29: { theme: "danger and inner calm", lifeAreas: "crisis, navigating deep water, and emotional resilience", practicalTip: "In chaos, focus on what you can control: your breathing, your next move, your response. Steady wins the deep water." },
  30: { theme: "clarity and illumination", lifeAreas: "insight, wisdom, and guiding others", practicalTip: "Shine your light on one dark corner today — a problem you've been avoiding. Clarity dissolves fear." },
  31: { theme: "attraction and connection", lifeAreas: "romance, friendship, and magnetic relationships", practicalTip: "Don't chase — attract. Be the person you want to meet. Genuine connection grows from authentic presence." },
  32: { theme: "endurance and commitment", lifeAreas: "marriage, long-term projects, and consistency", practicalTip: "Show up again today, even if it's small. The one who endures wins. Consistency beats intensity." },
  33: { theme: "strategic retreat", lifeAreas: "withdrawal, self-preservation, and choosing battles", practicalTip: "Not every hill is worth dying on. Step back from one draining situation today — you'll return with more strength." },
  34: { theme: "great power and restraint", lifeAreas: "authority, influence, and responsible leadership", practicalTip: "You hold more power than you realize. Wield it carefully today — one kind word can change someone's trajectory." },
  35: { theme: "steady progress and recognition", lifeAreas: "career advancement, visibility, and reward", practicalTip: "Keep moving forward steadily. The sun rises one degree at a time — your progress, though gradual, is real." },
  36: { theme: "darkness and protecting your light", lifeAreas: "adversity, hiding strength, and surviving difficulty", practicalTip: "In hostile environments, protect your inner fire. Stay low, stay sharp, and know that darkness always passes." },
  37: { theme: "family and home harmony", lifeAreas: "relationships, household, and inner circle", practicalTip: "Reach out to one family member today. Strong families are built one conversation at a time." },
  38: { theme: "opposition and bridging differences", lifeAreas: "disagreement, diversity, and finding small connections", practicalTip: "You don't need to agree on everything. Find one small point of connection — it can bridge a wide divide." },
  39: { theme: "obstacles and finding another way", lifeAreas: "roadblocks, detours, and seeking wise counsel", practicalTip: "Stop banging on the wall. Turn around, ask for directions, or find the path around. Stubbornness is not strength." },
  40: { theme: "liberation and release", lifeAreas: "letting go, forgiveness, and moving forward", practicalTip: "Forgive one grudge today — not for them, for you. Release the weight. You'll walk lighter immediately." },
  41: { theme: "decrease and simplification", lifeAreas: "minimalism, cutting costs, and essentialism", practicalTip: "Remove one unnecessary thing from your life today — a subscription, a commitment, a worry. Less is truly more." },
  42: { theme: "increase and growth", lifeAreas: "abundance, expansion, and seizing opportunity", practicalTip: "When the tide rises, launch. Say yes to one growth opportunity today — and share the gains when they arrive." },
  43: { theme: "decisive separation", lifeAreas: "breakups, quitting, and clean breaks", practicalTip: "Make the cut clean and dignified. State your truth directly but kindly. A clean break heals faster than a ragged one." },
  44: { theme: "unexpected encounters", lifeAreas: "new people, surprises, and cautious attraction", practicalTip: "A new person or idea may appear today. Welcome them, but don't rush in — assess character before commitment." },
  45: { theme: "gathering and community", lifeAreas: "events, teams, and collective purpose", practicalTip: "Bring people together today — even a small gathering around a shared goal creates unstoppable momentum." },
  46: { theme: "steady ascent", lifeAreas: "career growth, gradual improvement, and patience", practicalTip: "You're climbing higher than you realize. Each small step counts. Trust the slow, steady rise." },
  47: { theme: "exhaustion and limitation", lifeAreas: "burnout, feeling trapped, and resilience", practicalTip: "When you can't change the situation, change your response. Rest, breathe, and focus only on what you control." },
  48: { theme: "the well — enduring foundations", lifeAreas: "fundamentals, tradition, and what never changes", practicalTip: "Return to basics today. The fundamentals that worked before still work. Tend to your foundation." },
  49: { theme: "revolution and fundamental change", lifeAreas: "transformation, reform, and systemic change", practicalTip: "Surface tweaks won't cut it. Identify one area where deep change is needed — and take the first bold step." },
  50: { theme: "transformation and alchemy", lifeAreas: "personal growth, refinement, and becoming", practicalTip: "You're being refined. Trust the process — raw ingredients become nourishing food. What you're building will feed many." },
  51: { theme: "shock and awakening", lifeAreas: "surprise, wake-up calls, and course correction", practicalTip: "That disruption is a wake-up call, not a disaster. After the jolt, ask: what needs to change? Then fix it." },
  52: { theme: "stillness and meditation", lifeAreas: "rest, inner peace, and non-action", practicalTip: "Stop everything for 10 minutes today. Sit in silence. No phone, no music, no agenda. Stillness is productive." },
  53: { theme: "gradual progress", lifeAreas: "slow development, patience, and steady relationships", practicalTip: "Trust the slow pace. Like a courtship becoming marriage, lasting results take time. Don't rush what's growing steadily." },
  54: { theme: "unequal partnerships", lifeAreas: "imbalanced relationships, caution in commitments, and power dynamics", practicalTip: "Before entering a new partnership, check the power balance. If you're the weaker party, proceed with extreme care." },
  55: { theme: "peak abundance and clarity", lifeAreas: "celebration, peak moments, and savoring success", practicalTip: "You're at a high point — enjoy it fully. Celebrate today, knowing that all peaks pass and that's okay." },
  56: { theme: "the traveler — unfamiliar territory", lifeAreas: "travel, new environments, and being a guest", practicalTip: "In new territory, be humble and observant. Treat every interaction as if you're a guest — because in some sense, you are." },
  57: { theme: "gentle influence and persistence", lifeAreas: "persuasion, subtlety, and wind-like penetration", practicalTip: "Don't force — influence. Small, consistent nudges change minds more than one big push. Be the wind, not the hammer." },
  58: { theme: "joy and open communication", lifeAreas: "happiness, social connection, and sharing", practicalTip: "Share joy today — a genuine compliment, a laugh, a good story. Joy is contagious and costs nothing to spread." },
  59: { theme: "dissolution and reconnection", lifeAreas: "healing divisions, melting barriers, and reunion", practicalTip: "Reach out to someone you've been separated from. Old ice is melting — a simple message can rekindle what was frozen." },
  60: { theme: "limitation and boundaries", lifeAreas: "discipline, structure, and healthy limits", practicalTip: "Set one healthy boundary today. Saying no to what drains you is saying yes to what matters. Limits create freedom." },
  61: { theme: "inner truth and sincerity", lifeAreas: "authenticity, heartfelt communication, and integrity", practicalTip: "Speak from the heart today. Genuine truth, simply expressed, moves people more than the cleverest argument." },
  62: { theme: "smallness and humility", lifeAreas: "small acts, attention to detail, and modesty", practicalTip: "Small is powerful today. One thoughtful gesture, one detail done right — tiny ripples create big waves." },
  63: { theme: "completion and vigilance", lifeAreas: "finishing, achievement, and maintaining order", practicalTip: "You've reached a milestone — celebrate it. Then look ahead. Every completion is also a new beginning in disguise." },
  64: { theme: "before completion — the final stretch", lifeAreas: "near-success, finishing touches, and careful progress", practicalTip: "You're almost there. Don't rush the final 5%. Careful, deliberate steps across the finish line bring true completion." },
};

// Locale-specific article framing — keeps non-English articles fully localized
const FRAME: Record<string, {
  opening: (nameZh: string, pinyin: string, displayName: string, desc: string) => string;
  judgment: (localJudgment: string) => string;
  judgmentNoLocale: (judgmentEn: string) => string;
  interpretation: (displayName: string, desc: string, advice: string) => string;
  changingLine: (nameZh: string, displayName: string, changedDesc: string, linePos: string) => string;
  mutual: (nameZh: string, localName: string) => string;
  advice: (adviceRaw: string) => string;
  closing: (desc: string) => string;
}> = {
  ja: {
    opening: (nameZh, pinyin, displayName, desc) =>
      `今日の易経の卦は${nameZh}（${pinyin}）、邦訳では「${displayName}」として知られています。${desc}`,
    judgment: (localJudgment) =>
      `この卦の古の卦辞にはこうあります：「${localJudgment}」この数千年にわたって受け継がれてきた知恵は、天と地の理が私たちの日常にも映し出されていることを教えてくれます。`,
    judgmentNoLocale: (judgmentEn) =>
      `この卦の古の卦辞にはこうあります：「${judgmentEn}」`,
    interpretation: (displayName, desc, advice) =>
      `実際的な意味では、${displayName}は私たちに深い内省を促しています。${desc} 今日の実践のヒント：${advice}`,
    changingLine: (nameZh, displayName, changedDesc, linePos) =>
      `${linePos}爻が変化しており、この読みを${nameZh}（${displayName}）へと変容させます。これは状況が次の方向へと移り変わりつつあることを示しています：${changedDesc} この変化爻は決定的な瞬間を表しています——今、どう応答するかで物事の方向性が決まります。`,
    mutual: (nameZh, localName) =>
      `互卦は${nameZh}（${localName}）で、表面的な状況の背後に働いている内的な力関係を明らかにしています。これらの隠れた力を理解することで、目に見える課題をより深い知恵で乗り越えることができます。`,
    advice: (adviceRaw) =>
      `今日の易経の助言は明らかです：${adviceRaw.replace(/^[⚖️☀️⚠️]+\s*Verdict: [^—]+—\s*/, "")}`,
    closing: (desc) =>
      `${desc} 古代中国の賢者は、天と地と人が一つのつながったシステムを形成していると信じていました——あなたの今日の選択もこの網の目を通じて波及していきます。この読みを地図ではなく鏡として使ってください。それはあなたの現在の状況を映し出し、最も賢い進むべき道を示唆しますが、そこに踏み出す一歩はあなた自身のものです。`,
  },
  ru: {
    opening: (nameZh, pinyin, displayName, desc) =>
      `Сегодняшняя гексаграмма И-Цзин — ${nameZh} (${pinyin}), известная как «${displayName}». ${desc}`,
    judgment: (localJudgment) =>
      `Древнее суждение этой гексаграммы гласит: «${localJudgment}» Эта мудрость, передаваемая на протяжении тысячелетий, напоминает, что закономерности неба и земли отражаются в наших повседневных делах.`,
    judgmentNoLocale: (judgmentEn) =>
      `Древнее суждение этой гексаграммы гласит: «${judgmentEn}»`,
    interpretation: (displayName, desc, advice) =>
      `В практическом смысле, ${displayName} призывает нас задуматься. ${desc} Практический совет на сегодня: ${advice}`,
    changingLine: (nameZh, displayName, changedDesc, linePos) =>
      `${linePos} линия меняется, трансформируя чтение в ${nameZh} (${displayName}). Это указывает на то, что ситуация сдвигается в направлении: ${changedDesc} Меняющаяся линия раскрывает поворотный момент — направление событий зависит от того, как вы отреагируете прямо сейчас.`,
    mutual: (nameZh, localName) =>
      `Взаимная гексаграмма (互卦) — ${nameZh} (${localName}), которая раскрывает внутреннюю динамику, действующую за поверхностной ситуацией. Понимание этих скрытых сил помогает вам преодолевать видимые трудности с более глубокой мудростью.`,
    advice: (adviceRaw) =>
      `Совет И-Цзин на сегодня ясен: ${adviceRaw.replace(/^[⚖️☀️⚠️]+\s*Verdict: [^—]+—\s*/, "")}`,
    closing: (desc) =>
      `${desc} Древние китайцы верили, что небо, земля и человечество образуют единую взаимосвязанную систему — ваш сегодняшний выбор отражается в этой сети. Используйте это чтение как зеркало, а не карту. Оно отражает вашу текущую ситуацию и предлагает мудрейший путь вперёд, но шаги, которые вы делаете — только ваши.`,
  },
  ko: {
    opening: (nameZh, pinyin, displayName, desc) =>
      `오늘의 주역 괘는 ${nameZh}(${pinyin}), 한국어로는 "${displayName}"(으)로 알려져 있습니다. ${desc}`,
    judgment: (localJudgment) =>
      `이 괘의 고대 괘사는 이렇게 말합니다: "${localJudgment}" 수천 년 동안 전해져 온 이 지혜는 하늘과 땅의 이치가 우리의 일상 속에도 반영되어 있음을 가르쳐 줍니다.`,
    judgmentNoLocale: (judgmentEn) =>
      `이 괘의 고대 괘사는 이렇게 말합니다: "${judgmentEn}"`,
    interpretation: (displayName, desc, advice) =>
      `실제적인 의미에서, ${displayName}은(는) 우리에게 깊은 성찰을 촉구합니다. ${desc} 오늘의 실천 팁: ${advice}`,
    changingLine: (nameZh, displayName, changedDesc, linePos) =>
      `${linePos}효가 변화하여, 이 해석을 ${nameZh}(${displayName})(으)로 변환시킵니다. 이는 상황이 다음 방향으로 옮겨가고 있음을 보여줍니다: ${changedDesc} 이 변화효는 결정적인 순간을 나타냅니다 — 지금 어떻게 응답하느냐에 따라 일의 방향이 결정됩니다.`,
    mutual: (nameZh, localName) =>
      `호괘는 ${nameZh}(${localName})(으)로, 표면적 상황 뒤에 작용하는 내적 역학을 드러냅니다. 이 숨겨진 힘을 이해함으로써 눈에 보이는 과제를 더 깊은 지혜로 극복할 수 있습니다.`,
    advice: (adviceRaw) =>
      `오늘의 주역 조언은 분명합니다: ${adviceRaw.replace(/^[⚖️☀️⚠️]+\s*Verdict: [^—]+—\s*/, "")}`,
    closing: (desc) =>
      `${desc} 고대 중국의 선현들은 하늘과 땅과 사람이 하나로 연결된 시스템을 형성한다고 믿었습니다 — 오늘의 당신의 선택도 이 그물망을 통해 파급됩니다. 이 해석을 지도가 아닌 거울로 사용하세요. 그것은 당신의 현재 상황을 비추고 가장 현명한 나아갈 길을 제시하지만, 그 길로 내딛는 한 걸음은 오직 당신의 것입니다.`,
  },
};

function ordinal(n: number): string {
  if (n === 1) return "first";
  if (n === 2) return "second";
  if (n === 3) return "third";
  if (n === 4) return "fourth";
  if (n === 5) return "fifth";
  return "sixth";
}

function ordinalLocal(n: number, locale: string): string {
  if (locale === "ru") {
    return ["первая", "вторая", "третья", "четвёртая", "пятая", "шестая"][n - 1] || "шестая";
  }
  if (locale === "ko") {
    return ["첫째", "둘째", "셋째", "넷째", "다섯째", "여섯째"][n - 1] || "여섯째";
  }
  return ordinal(n);
}

export function generateHexagramArticle(r: DivinationResult, locale = "en"): string {
  const main = r.mainHexagram;
  const id = main.id;

  const localizedName = locale === "ja" || locale === "ko" ? hexagramNameJa[id] : locale === "ru" ? hexagramNameRu[id] : main.nameEn;
  const displayName = localizedName || main.nameEn;
  const localJudgment = locale === "ja" || locale === "ko" ? judgmentJa[id] : locale === "ru" ? judgmentRu[id] : main.judgmentEn;
  const localAdvice = locale === "ja" || locale === "ko" ? adviceJa[id] : locale === "ru" ? adviceRu[id] : main.advice;
  const localDesc = locale === "ja" || locale === "ko" ? descriptionJa[id] : locale === "ru" ? descriptionRu[id] : main.descriptionEn;

  const changedId = r.changedHexagram?.id;
  const changedLocalName = changedId ? (locale === "ja" || locale === "ko" ? hexagramNameJa[changedId] : locale === "ru" ? hexagramNameRu[changedId] : r.changedHexagram?.nameEn) : undefined;
  const changedDisplayName = changedLocalName || r.changedHexagram?.nameEn;
  const changedLocalDesc = changedId ? (locale === "ja" || locale === "ko" ? descriptionJa[changedId] : locale === "ru" ? descriptionRu[changedId] : r.changedHexagram?.descriptionEn) : undefined;

  const mutualId = r.mutualHexagram?.id;
  const mutualLocalName = mutualId ? (locale === "ja" || locale === "ko" ? hexagramNameJa[mutualId] : locale === "ru" ? hexagramNameRu[mutualId] : r.mutualHexagram?.nameEn) : undefined;

  const parts: string[] = [];

  if (locale === "ja" || locale === "ru" || locale === "ko") {
    const f = FRAME[locale];

    // Opening — use translated description for context
    parts.push(f.opening(main.nameZh, main.pinyin, displayName, localDesc));

    // Judgment
    if (localJudgment) {
      parts.push(f.judgment(localJudgment));
    } else {
      parts.push(f.judgmentNoLocale(main.judgmentEn));
    }

    // Practical interpretation — use description + advice snippet
    const shortAdvice = (localAdvice || main.advice).replace(/^[⚖️☀️⚠️]+\s*Verdict:\s*[^—]+—\s*/, "").trim();
    parts.push(f.interpretation(displayName, localDesc, shortAdvice));

    // Changing line
    if (r.changingLine && r.changingLine.textEn && r.changedHexagram) {
      const linePos = ordinalLocal(r.changingLine.position, locale);
      parts.push(f.changingLine(
        r.changedHexagram.nameZh,
        changedDisplayName || r.changedHexagram.nameEn,
        changedLocalDesc || r.changedHexagram.descriptionEn || "",
        linePos,
      ));
    }

    // Mutual
    if (r.mutualHexagram) {
      parts.push(f.mutual(r.mutualHexagram.nameZh, mutualLocalName || r.mutualHexagram.nameEn));
    }

    // Advice
    const adviceRaw = localAdvice || main.advice;
    parts.push(f.advice(adviceRaw));

    // Closing
    parts.push(f.closing(localDesc));
  } else {
    // English — keep original pattern with HEXAGRAM_GUIDE
    const guide = HEXAGRAM_GUIDE[main.id] || { theme: "self-reflection", lifeAreas: "personal growth and awareness", practicalTip: "Take a moment to reflect on your current path. Clarity comes from quiet contemplation." };

    parts.push(`Today's I Ching hexagram is ${main.nameZh} (${main.pinyin}), known as "${displayName}". This hexagram speaks to ${guide.theme}, offering guidance for those seeking clarity in ${guide.lifeAreas}.`);

    parts.push(`The ancient judgment for this hexagram reads: "${localJudgment || main.judgmentEn}" This wisdom, passed down through millennia, reminds us that the patterns of heaven and earth are reflected in our daily affairs.`);

    parts.push(`In practical terms, ${displayName} appears when we are being called to focus on ${guide.theme}. ${guide.practicalTip} The hexagram's energy is particularly relevant for matters of ${guide.lifeAreas}.`);

    if (r.changingLine && r.changingLine.textEn && r.changedHexagram) {
      parts.push(`The ${ordinal(r.changingLine.position)} line is changing, which transforms the reading into ${r.changedHexagram?.nameZh} (${changedDisplayName}). This indicates that the situation is shifting toward ${(changedLocalDesc || r.changedHexagram?.descriptionEn || "").toLowerCase()} The changing line reveals a pivotal moment — the direction of events hinges on how you respond right now.`);
    }

    if (r.mutualHexagram) {
      parts.push(`The mutual hexagram (互卦) is ${r.mutualHexagram.nameZh} (${mutualLocalName || r.mutualHexagram.nameEn}), which reveals the inner dynamics at play behind the surface situation. Understanding these hidden forces helps you navigate the visible challenges with deeper wisdom.`);
    }

    const adviceRaw = localAdvice || main.advice;
    parts.push(`The I Ching's counsel for today is clear: ${adviceRaw.replace(/^[⚖️☀️⚠️]+\s*Verdict: [^—]+—\s*/, "")}`);

    parts.push(`Whether you are facing decisions about ${guide.lifeAreas}, or simply seeking daily guidance, this hexagram invites you to embody ${guide.theme} in your thoughts and actions. The ancient Chinese believed that heaven, earth, and humanity form a single interconnected system — your choices today ripple through this web. Use this reading as a mirror, not a map. It reflects your current situation and suggests the wisest path forward, but the steps you take are yours alone.`);
  }

  return parts.join("\n\n");
}
