"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { trackClick } from "@/lib/track";

type ToolType = "zodiac" | "dateCheck" | "elements" | "iching" | "dreamSearch";

function ZodiacTool() {
  const t = useTranslations("tools");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<{animal:string;element:string;compatible:string}|null>(null);
  const ZODIAC = ["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"];
  const ELEMENTS = ["Metal","Water","Wood","Fire","Earth"];
  function calc() {
    const y = parseInt(year); if (isNaN(y) || y < 1900) return;
    const idx = (y - 4) % 12; const elIdx = ((y - 4) % 10) / 2 | 0;
    setResult({ animal: ZODIAC[idx], element: ELEMENTS[elIdx], compatible: ZODIAC[(idx + 6) % 12] });
    trackClick("guide_tool_zodiac");
  }
  return (
    <div className="not-prose my-8 p-5 rounded-xl border" style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-surface)" }}>
      <p className="text-sm font-semibold mb-3" style={{ color: "var(--gold)" }}>🐉 {t("zodiacCalculator.title")}</p>
      <div className="flex gap-2 mb-3">
        <input type="number" value={year} onChange={e => setYear(e.target.value)} placeholder={t("zodiacCalculator.yearPlaceholder")}
          className="flex-1 px-3 py-2 text-sm rounded-lg border focus:outline-none"
          style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-deep)", color: "var(--text-primary)" }} />
        <button onClick={calc} className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          style={{ backgroundColor: "var(--gold)", color: "var(--bg-deep)" }}>{t("zodiacCalculator.submit")}</button>
      </div>
      {result && (
        <div className="rounded-lg p-3 mb-3" style={{ backgroundColor: "var(--bg-deep)" }}>
          <p className="text-sm">{t("zodiacCalculator.yourAnimal")}: <strong style={{ color: "var(--gold)" }}>{result.animal}</strong> · {t("zodiacCalculator.element")}: {result.element}</p>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{t("zodiacCalculator.compatible")}: {result.compatible}</p>
        </div>
      )}
      <Link href="/naming" onClick={() => trackClick("guide_tool_cta_zodiac")}
        className="block text-center text-xs font-medium py-2 rounded-lg transition-colors"
        style={{ backgroundColor: "var(--gold-subtle)", color: "var(--gold)" }}>{t("zodiacCalculator.ctaLink")} →</Link>
    </div>
  );
}

function DateCheckTool() {
  const t = useTranslations("calendar");
  const [date, setDate] = useState("");
  const [result, setResult] = useState<string|null>(null);
  function check() {
    if (!date) return;
    const d = new Date(date);
    const ji = (Math.floor((d.getTime() / 86400000)) % 12 + 12) % 12;
    const labels = ["Establish","Remove","Full","Balance","Stable","Initiate","Destroy","Danger","Success","Receive","Open","Close"];
    const auspicious = ["Success","Receive","Open","Balance","Stable"].includes(labels[ji]);
    setResult((auspicious ? "✅ " : "⚠️ ") + labels[ji] + " day" + (auspicious ? " — auspicious" : " — caution advised"));
    trackClick("guide_tool_datecheck");
  }
  return (
    <div className="not-prose my-8 p-5 rounded-xl border" style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-surface)" }}>
      <p className="text-sm font-semibold mb-3" style={{ color: "var(--gold)" }}>📅 Quick Date Check</p>
      <div className="flex gap-2 mb-3">
        <input type="date" value={date} onChange={e => setDate(e.target.value)}
          className="flex-1 px-3 py-2 text-sm rounded-lg border focus:outline-none"
          style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-deep)", color: "var(--text-primary)" }} />
        <button onClick={check} className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          style={{ backgroundColor: "var(--gold)", color: "var(--bg-deep)" }}>Check</button>
      </div>
      {result && <div className="rounded-lg p-3 mb-3" style={{ backgroundColor: "var(--bg-deep)" }}><p className="text-sm">{result}</p></div>}
      <Link href="/calendar" onClick={() => trackClick("guide_tool_cta_calendar")}
        className="block text-center text-xs font-medium py-2 rounded-lg transition-colors"
        style={{ backgroundColor: "var(--gold-subtle)", color: "var(--gold)" }}>{t("form.submit")} →</Link>
    </div>
  );
}

function ElementsTool() {
  const t = useTranslations("tools");
  const [step, setStep] = useState<"start"|"q1"|"q2"|"result">("start");
  const [ans, setAns] = useState<number[]>([]);
  const EL = ["Wood","Fire","Earth","Metal","Water"];
  const Q = [
    {q:"What describes you best?", o:["🌳 Creative & Flexible","🔥 Passionate & Bold","🏔️ Stable & Reliable","⚜️ Organized & Precise","💧 Wise & Adaptable"]},
    {q:"What do you value most?", o:["Growth & Learning","Recognition & Fame","Security & Family","Structure & Order","Freedom & Wisdom"]}
  ];
  function answer(i:number) {
    const na = [...ans, i]; setAns(na);
    if (na.length === 1) setStep("q2");
    else if (na.length === 2) { setStep("result"); trackClick("guide_tool_elements"); }
  }
  if (step === "result") {
    const r = EL[(ans[0]+ans[1])%5];
    return (
      <div className="not-prose my-8 p-5 rounded-xl border" style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-surface)" }}>
        <p className="text-sm font-semibold mb-3" style={{ color: "var(--gold)" }}>{t("fiveElements.title")}</p>
        <div className="rounded-lg p-4 mb-3 text-center" style={{ backgroundColor: "var(--bg-deep)" }}>
          <p className="text-3xl mb-1 font-bold">{r}</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t("fiveElements.yourElement")} — {r}</p>
        </div>
        <Link href="/divination" onClick={() => trackClick("guide_tool_cta_elements")}
          className="block text-center text-xs font-medium py-2 rounded-lg transition-colors"
          style={{ backgroundColor: "var(--gold-subtle)", color: "var(--gold)" }}>{t("fiveElements.ctaDivination")} →</Link>
      </div>
    );
  }
  return (
    <div className="not-prose my-8 p-5 rounded-xl border" style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-surface)" }}>
      <p className="text-sm font-semibold mb-3" style={{ color: "var(--gold)" }}>{t("fiveElements.title")}</p>
      {step === "start" && <button onClick={() => setStep("q1")} className="w-full py-3 text-sm font-medium rounded-lg transition-colors"
        style={{ backgroundColor: "var(--gold)", color: "var(--bg-deep)" }}>{t("fiveElements.seeResult")}</button>}
      {(step === "q1" || step === "q2") && (
        <div>
          <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>{t("fiveElements.question")} {step === "q1" ? "1" : "2"}/{t("of")} 2</p>
          <p className="text-sm mb-3" style={{ color: "var(--text-body)" }}>{Q[step === "q1" ? 0 : 1].q}</p>
          <div className="space-y-1.5">
            {Q[step === "q1" ? 0 : 1].o.map((o,i) => (
              <button key={i} onClick={() => answer(i)} className="w-full text-left px-3 py-2 text-xs rounded-lg border transition-colors hover:bg-white/5"
                style={{ borderColor: "var(--border-medium)", color: "var(--text-body)" }}>{o}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function IChingTool() {
  const t = useTranslations("home");
  const [data, setData] = useState<{nameZh:string;nameEn:string;pinyin:string;advice:string}|null>(null);
  useEffect(() => {
    fetch("/api/daily").then(r => r.json()).then(d => setData(d.mainHexagram)).catch(() => {});
  }, []);
  if (!data) return null;
  return (
    <div className="not-prose my-8 p-5 rounded-xl border" style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-surface)" }}>
      <p className="text-sm font-semibold mb-3" style={{ color: "var(--gold)" }}>☯ {t("dailyHexagram.heading")}</p>
      <div className="rounded-lg p-4 mb-3 text-center" style={{ backgroundColor: "var(--bg-deep)" }}>
        <p className="text-2xl font-bold mb-1" style={{ color: "var(--gold)" }}>{data.nameZh}</p>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{data.pinyin} — {data.nameEn}</p>
        <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--text-body)" }}>{(data.advice||"").slice(0,120)}...</p>
      </div>
      <Link href="/divination" onClick={() => trackClick("guide_tool_cta_iching")}
        className="block text-center text-xs font-medium py-2 rounded-lg transition-colors"
        style={{ backgroundColor: "var(--gold-subtle)", color: "var(--gold)" }}>{t("dailyHexagram.cta")}</Link>
    </div>
  );
}

function DreamSearchTool() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<{symbol:string;keyword:string;meaning:string;type:string}[]>([]);
  const [searched, setSearched] = useState(false);

  // Embedded dream symbol dictionary (mirrors dream-meaning page symbols)
  const DREAM_SYMBOLS: Record<string, {symbol:string;keyword:string;meaning:string;type:string}[]> = {
    en: [
      { symbol:"💧 Water", keyword:"Wealth & Emotion", meaning:"Clear water = fortune. Murky water = confusion. Drinking water = absorbing wisdom.", type:"auspicious" },
      { symbol:"🐍 Snake", keyword:"Transformation", meaning:"In house = windfall or pregnancy. Being chased = hidden fear. Killing = overcoming obstacles.", type:"mixed" },
      { symbol:"🦷 Falling Teeth", keyword:"Anxiety & Change", meaning:"Worries about aging parents or regrettable words. Also signals a life transition.", type:"warning" },
      { symbol:"🕊️ Flying", keyword:"Freedom & Ambition", meaning:"Soaring high = career breakthrough. Struggling = obstacles. With others = collaborative success.", type:"auspicious" },
      { symbol:"💀 Death", keyword:"Transformation", meaning:"Someone else's = they will live long. Your own = rebirth. Rarely predicts actual death.", type:"neutral" },
      { symbol:"🐟 Fish", keyword:"Abundance", meaning:"Fish = surplus (鱼 yú=余 yú). Catching = seizing opportunity. Jumping fish = exceptional luck.", type:"auspicious" },
      { symbol:"👶 Baby", keyword:"New Beginnings", meaning:"New project or phase being born. May foretell pregnancy. Inner child seeking attention.", type:"auspicious" },
      { symbol:"🔥 Fire", keyword:"Passion & Danger", meaning:"Controlled fire = vitality. Uncontrolled = anger or crisis. Fireworks = celebration ahead.", type:"mixed" },
      { symbol:"🏠 House", keyword:"Self & Security", meaning:"New house = new life phase. Crumbling = insecurity. Cleaning = resolving past issues.", type:"neutral" },
      { symbol:"🏃 Being Chased", keyword:"Anxiety & Avoidance", meaning:"Running from a problem. Unknown pursuer = unnamed fear. Turning to face = readiness to confront.", type:"warning" },
      { symbol:"⬇️ Falling", keyword:"Loss of Control", meaning:"Losing grip on a situation. From height = fear of failure. Landing safely = reassurance.", type:"warning" },
      { symbol:"👤 Naked in Public", keyword:"Vulnerability", meaning:"Feeling exposed. Others not noticing = fear is internal. Comfortable = self-acceptance.", type:"warning" },
      { symbol:"📝 Exam", keyword:"Self-Evaluation", meaning:"Feeling judged. Unprepared = imposter syndrome. Passing = confidence and readiness.", type:"warning" },
      { symbol:"🗺️ Lost", keyword:"Direction & Purpose", meaning:"Uncertainty about life direction. Finding a path = clarity emerging. In a city = identity search.", type:"neutral" },
      { symbol:"🩸 Blood", keyword:"Life Force & Pain", meaning:"Vital energy or emotional wounding. Bleeding = losing life force. Menstrual = feminine power.", type:"mixed" },
      { symbol:"💰 Money", keyword:"Self-Worth", meaning:"Finding money = discovering hidden talents. Losing = fear of loss. Counterfeit = feeling deceived.", type:"mixed" },
      { symbol:"💒 Wedding", keyword:"Union & Commitment", meaning:"Your own = new commitment. Disaster = anxiety about commitment. Marrying stranger = integrating unknown self.", type:"mixed" },
      { symbol:"👻 Ghost", keyword:"Unresolved Past", meaning:"Seeing a ghost = unresolved guilt. Friendly = comforting memory. Being haunted = past trauma.", type:"mixed" },
      { symbol:"🌊 Flood", keyword:"Overwhelming Emotion", meaning:"Emotions overwhelming control. Surviving = emotional resilience. Home destroyed = life upheaval.", type:"warning" },
      { symbol:"🚗 Car", keyword:"Life Direction", meaning:"Driving = control over life. Someone else driving = others steering decisions. Crash = sudden disruption.", type:"neutral" },
      { symbol:"🕷️ Spider", keyword:"Patience & Creativity", meaning:"Patience and creative weaving of destiny. Web = feeling trapped. Killing = rejecting creative energy.", type:"mixed" },
      { symbol:"🐕 Dog", keyword:"Loyalty & Protection", meaning:"Friendly dog = loyal friendship. Aggressive = feeling threatened. Lost dog = losing trusted companion.", type:"auspicious" },
      { symbol:"🐈 Cat", keyword:"Independence & Intuition", meaning:"Independence and feminine mystery. Aggressive = hidden betrayal. Black cat = intuition of danger.", type:"mixed" },
      { symbol:"🤰 Pregnancy", keyword:"Creation & New Beginnings", meaning:"Birthing new idea or project. Giving birth = creative breakthrough. Difficult birth = creative struggle.", type:"auspicious" },
      { symbol:"🏊 Swimming", keyword:"Emotional Navigation", meaning:"Swimming easily = navigating emotions gracefully. Struggling = overwhelm. Against current = fighting circumstances.", type:"neutral" },
      { symbol:"🧗 Climbing", keyword:"Ambition & Struggle", meaning:"Going up = career progress. Falling while climbing = setback. Reaching summit = major milestone.", type:"auspicious" },
      { symbol:"🚪 Door", keyword:"Opportunity & Transition", meaning:"Open door = new opportunity. Closed = obstacle. Locked = feeling blocked. Many doors = multiple choices.", type:"auspicious" },
      { symbol:"🪞 Mirror", keyword:"Self-Reflection", meaning:"Honest self-assessment. Broken = shattered self-image. Distorted reflection = self-deception.", type:"neutral" },
      { symbol:"🌧️ Rain", keyword:"Cleansing & Sadness", meaning:"Gentle rain = emotional cleansing. Heavy storm = turmoil. Rainbow after rain = hope after difficulty.", type:"mixed" },
      { symbol:"🌍 Earthquake", keyword:"Upheaval", meaning:"Fundamental life change. Surviving = resilience. Ground opening = fear of unknown. Aftershocks = lingering trauma.", type:"warning" },
      { symbol:"🏫 School", keyword:"Learning & Insecurity", meaning:"Back in school = facing a life lesson. Lost in school = searching for purpose. Failing = fear of inadequacy.", type:"neutral" },
      { symbol:"🚂 Train", keyword:"Life Path & Destiny", meaning:"Boarding = embarking on new path. Missing = fear of missed opportunity. Derailing = plans falling apart.", type:"neutral" },
      { symbol:"✈️ Airplane", keyword:"Aspiration & Escape", meaning:"Taking off = launching new endeavor. Smooth flight = life on plan. Turbulence = instability.", type:"auspicious" },
      { symbol:"🌉 Bridge", keyword:"Transition & Connection", meaning:"Crossing = moving into new phase. Broken = severed connection. Building = creating new opportunities.", type:"auspicious" },
      { symbol:"⛰️ Mountain", keyword:"Obstacle & Achievement", meaning:"Climbing = overcoming challenge. Standing on top = clarity. Crumbling = impossible obstacle dissolving.", type:"auspicious" },
      { symbol:"🌳 Tree", keyword:"Growth & Roots", meaning:"Flourishing = personal growth. Dead = stagnation. Deep roots = connection to heritage and family.", type:"auspicious" },
      { symbol:"🌸 Flowers", keyword:"Beauty & Transience", meaning:"Blooming = new love. Wilting = missed opportunity. Receiving = feeling appreciated. Planting = investing in happiness.", type:"auspicious" },
      { symbol:"🍽️ Food", keyword:"Nourishment & Desire", meaning:"Delicious = satisfaction. Unable to eat = unmet needs. Spoiled = toxic situation. Sharing = connection.", type:"neutral" },
      { symbol:"💇 Hair Falling", keyword:"Identity & Change", meaning:"Hair loss = fear of aging. Cutting own hair = desiring change. Someone else cutting = loss of control.", type:"warning" },
      { symbol:"😢 Crying", keyword:"Release & Healing", meaning:"Crying alone = pent-up emotions. In public = fear of weakness. Unable to cry = suppressed emotions.", type:"neutral" },
      { symbol:"🌊 Drowning", keyword:"Overwhelm", meaning:"Overwhelmed by emotions. Being rescued = help available. Surviving = emotional rebirth and second chance.", type:"warning" },
      { symbol:"⏰ Being Late", keyword:"Anxiety", meaning:"Fear of missing out. Rushing but can't move = feeling stuck. Missing event = fear of exclusion.", type:"warning" },
      { symbol:"👊 Fighting", keyword:"Inner Struggle", meaning:"Internal conflict surfacing. Being attacked = feeling victimized. Winning = overcoming inner demons.", type:"mixed" },
    ],
  };

  const symbols = DREAM_SYMBOLS.en;

  function search() {
    if (!keyword.trim()) return;
    const q = keyword.toLowerCase().trim();
    const found = symbols.filter(s =>
      s.symbol.toLowerCase().includes(q) ||
      s.keyword.toLowerCase().includes(q) ||
      s.meaning.toLowerCase().includes(q)
    ).slice(0, 3);
    setResults(found);
    setSearched(true);
    trackClick("guide_tool_dream_search");
  }

  const typeStyle: Record<string, {border:string;bg:string;label:string}> = {
    auspicious: {border:"border-l-green-400",bg:"bg-green-50/10",label:"🟢 Auspicious"},
    mixed: {border:"border-l-purple-400",bg:"bg-purple-50/10",label:"🟣 Mixed"},
    warning: {border:"border-l-orange-400",bg:"bg-orange-50/10",label:"🟠 Warning"},
    neutral: {border:"border-l-stone-300",bg:"bg-stone-50/10",label:"⚪ Neutral"},
  };

  return (
    <div className="not-prose my-8 p-5 rounded-xl border" style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-surface)" }}>
      <p className="text-sm font-semibold mb-1" style={{ color: "var(--gold)" }}>🌙 Quick Dream Search</p>
      <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>Type a dream symbol — snake, water, teeth, flying, death, baby...</p>
      <div className="flex gap-2 mb-3">
        <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && search()}
          placeholder="e.g. snake, water, teeth..."
          className="flex-1 px-3 py-2 text-sm rounded-lg border focus:outline-none"
          style={{ borderColor: "var(--border-medium)", backgroundColor: "var(--bg-deep)", color: "var(--text-primary)" }} />
        <button onClick={search} className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          style={{ backgroundColor: "var(--gold)", color: "var(--bg-deep)" }}>Search</button>
      </div>

      {searched && results.length === 0 && (
        <div className="rounded-lg p-3 mb-3" style={{ backgroundColor: "var(--bg-deep)" }}>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>No matching symbols found. Try a different keyword, or get a full AI interpretation below.</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-2 mb-3">
          {results.map((r, i) => {
            const ts = typeStyle[r.type] || typeStyle.neutral;
            const emoji = r.symbol.split(" ")[0];
            const name = r.symbol.split(" ").slice(1).join(" ");
            return (
              <div key={i} className={`rounded-lg p-3 border-l-2 ${ts.border}`} style={{ backgroundColor: "var(--bg-deep)" }}>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-base">{emoji}</span>
                  <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "var(--text-dim)" }}>{r.keyword}</span>
                  <span className="text-[10px] ml-auto" style={{ color: "var(--text-dim)" }}>{ts.label}</span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{r.meaning.slice(0, 100)}{r.meaning.length > 100 ? "..." : ""}</p>
              </div>
            );
          })}
        </div>
      )}

      <Link href="/dream-interpretation" onClick={() => trackClick("guide_tool_cta_dream_search")}
        className="block text-center text-xs font-medium py-2 rounded-lg transition-colors"
        style={{ backgroundColor: "var(--gold-subtle)", color: "var(--gold)" }}>
        Get a Full AI Dream Interpretation →
      </Link>
    </div>
  );
}

export default function GuideToolEmbed({ tool }: { tool: ToolType }) {
  if (tool === "zodiac") return <ZodiacTool />;
  if (tool === "dateCheck") return <DateCheckTool />;
  if (tool === "elements") return <ElementsTool />;
  if (tool === "iching") return <IChingTool />;
  if (tool === "dreamSearch") return <DreamSearchTool />;
  return null;
}
