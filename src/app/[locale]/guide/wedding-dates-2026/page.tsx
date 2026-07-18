import type { Metadata } from "next";
import GuideFaq from "@/components/GuideFaq";
import GuideCTA from "@/components/GuideCTA";

type Props = { params: { locale: string } };

type Month = { name: string; days: string[] };

const MONTHS: Record<string, Month[]> = {
  en: [
    { name: "January 2026", days: ["3rd (Sat) — Good for travel", "9th (Fri) — Good for weddings", "16th (Fri) — Auspicious for business", "22nd (Thu) — Favorable for moving"] },
    { name: "February 2026", days: ["1st (Sun) — Chinese New Year week, mixed", "14th (Sat) — Good for engagements", "20th (Fri) — Good for weddings", "26th (Thu) — Auspicious for travel"] },
    { name: "March 2026", days: ["7th (Sat) — Good for weddings & business", "15th (Sun) — Auspicious for all events", "21st (Sat) — Good for moving & construction", "28th (Sat) — Good for celebrations"] },
    { name: "April 2026", days: ["5th (Sun) — Qingming, avoid major events", "11th (Sat) — Good for weddings", "18th (Sat) — Good for business openings", "25th (Sat) — Favorable for travel"] },
    { name: "May 2026", days: ["2nd (Sat) — Good for weddings", "9th (Sat) — Auspicious for business", "16th (Sat) — Good for engagements", "23rd (Sat) — Good for moving & travel"] },
    { name: "June 2026", days: ["6th (Sat) — Good for weddings", "13th (Sat) — Auspicious for business", "20th (Sat) — Good for moving", "27th (Sat) — Good for travel"] },
    { name: "July 2026", days: ["4th (Sat) — Good for weddings", "11th (Sat) — Auspicious for business openings", "18th (Sat) — Good for engagements", "25th (Sat) — Favorable for travel"] },
    { name: "August 2026", days: ["1st (Sat) — Good for weddings", "8th (Sat) — Auspicious for travel & moving", "15th (Sat) — Mid-Autumn preparation, mixed", "22nd (Sat) — Good for weddings & business"] },
  ],
  ru: [
    { name: "Январь 2026", days: ["3 (сб) — Хорошо для путешествий", "9 (пт) — Хорошо для свадеб", "16 (пт) — Благоприятно для бизнеса", "22 (чт) — Благоприятно для переезда"] },
    { name: "Февраль 2026", days: ["1 (вс) — Неделя КНГ, смешанно", "14 (сб) — Хорошо для помолвок", "20 (пт) — Хорошо для свадеб", "26 (чт) — Благоприятно для путешествий"] },
    { name: "Март 2026", days: ["7 (сб) — Хорошо для свадеб и бизнеса", "15 (вс) — Благоприятно для всех событий", "21 (сб) — Хорошо для переезда и строительства", "28 (сб) — Хорошо для празднований"] },
    { name: "Апрель 2026", days: ["5 (вс) — Цинмин, избегайте важных событий", "11 (сб) — Хорошо для свадеб", "18 (сб) — Хорошо для открытия бизнеса", "25 (сб) — Благоприятно для путешествий"] },
    { name: "Май 2026", days: ["2 (сб) — Хорошо для свадеб", "9 (сб) — Благоприятно для бизнеса", "16 (сб) — Хорошо для помолвок", "23 (сб) — Хорошо для переезда и путешествий"] },
    { name: "Июнь 2026", days: ["6 (сб) — Хорошо для свадеб", "13 (сб) — Благоприятно для бизнеса", "20 (сб) — Хорошо для переезда", "27 (сб) — Хорошо для путешествий"] },
    { name: "Июль 2026", days: ["4 (сб) — Хорошо для свадеб", "11 (сб) — Благоприятно для открытия бизнеса", "18 (сб) — Хорошо для помолвок", "25 (сб) — Благоприятно для путешествий"] },
    { name: "Август 2026", days: ["1 (сб) — Хорошо для свадеб", "8 (сб) — Благоприятно для путешествий и переезда", "15 (сб) — Подготовка к Празднику Середины Осени, смешанно", "22 (сб) — Хорошо для свадеб и бизнеса"] },
  ],
  ja: [
    { name: "2026年1月", days: ["3日（土）— 旅行に良い", "9日（金）— 結婚に良い", "16日（金）— ビジネスに吉", "22日（木）— 引越しに吉"] },
    { name: "2026年2月", days: ["1日（日）— 旧正月週、混合", "14日（土）— 婚約に良い", "20日（金）— 結婚に良い", "26日（木）— 旅行に吉"] },
    { name: "2026年3月", days: ["7日（土）— 結婚・ビジネスに良い", "15日（日）— すべての行事に吉", "21日（土）— 引越し・建築に良い", "28日（土）— 祝い事に良い"] },
    { name: "2026年4月", days: ["5日（日）— 清明節、重要な行事は避ける", "11日（土）— 結婚に良い", "18日（土）— 開業に良い", "25日（土）— 旅行に吉"] },
    { name: "2026年5月", days: ["2日（土）— 結婚に良い", "9日（土）— ビジネスに吉", "16日（土）— 婚約に良い", "23日（土）— 引越し・旅行に良い"] },
    { name: "2026年6月", days: ["6日（土）— 結婚に良い", "13日（土）— ビジネスに吉", "20日（土）— 引越しに良い", "27日（土）— 旅行に良い"] },
    { name: "2026年7月", days: ["4日（土）— 結婚に良い", "11日（土）— 開業に吉", "18日（土）— 婚約に良い", "25日（土）— 旅行に吉"] },
    { name: "2026年8月", days: ["1日（土）— 結婚に良い", "8日（土）— 旅行・引越しに吉", "15日（土）— 中秋の準備、混合", "22日（土）— 結婚・ビジネスに良い"] },
  ],
};

const CONTENT: Record<string, { title: string; desc: string; ogTitle: string; ogDesc: string; heading: string; subtitle: string; introTitle: string; introBody: string; avoidTitle: string; avoidItems: string[]; monthsTitle: string; faqs: { q: string; a: string }[]; cta: string; disclaimer: string }> = {
  en: {
    title: "Wedding Dates 2026: Best Days to Get Married — Chinese Calendar | Chinese Culture Studio",
    desc: "Find the most auspicious wedding dates in 2026 (Year of the Horse) based on the Chinese almanac. Month-by-month guide with lucky and unlucky days.",
    ogTitle: "Wedding Dates 2026: Best Days to Get Married",
    ogDesc: "Month-by-month guide to auspicious wedding dates in 2026, Year of the Horse.",
    heading: "Wedding Dates 2026: Best Days to Get Married",
    subtitle: "A month-by-month guide to the most auspicious wedding dates in the Year of the Horse, based on the Chinese almanac.",
    introTitle: "2026: Year of the Fire Horse",
    introBody: "2026 is the Year of the Horse — energetic, passionate, and full of action. The Horse year is considered favorable for weddings, as the Horse symbolizes vitality and a bright future. Finding a date that harmonizes with both partners' zodiac signs and avoids inauspicious days is key.",
    avoidTitle: "Dates to Avoid in 2026",
    avoidItems: ["Ghost Month (7th lunar month — approximately August): Avoid weddings.", "Qingming Festival (April 5, 2026): Day of ancestral remembrance — not for celebrations.", "Days that clash with either partner's zodiac sign.", "Lunar calendar days 3, 7, 17, 23: Traditionally inauspicious."],
    monthsTitle: "Month-by-Month Guide",
    faqs: [
      { q: "What is the best month to get married in 2026?", a: "Spring (March–May) and autumn (September–November) are traditionally the best seasons. Avoid Ghost Month (7th lunar month)." },
      { q: "How do I know if a date clashes with my zodiac?", a: "The most common clash is Rat-Horse, Ox-Goat, Tiger-Monkey, Rabbit-Rooster, Dragon-Dog, Snake-Pig." },
    ],
    cta: "Find Your Auspicious Date — from $1",
    disclaimer: "For cultural appreciation only. Not professional advice.",
  },
  ru: {
    title: "Свадебные Даты 2026: Лучшие Дни для Бракосочетания | Chinese Culture Studio",
    desc: "Найдите самые благоприятные свадебные даты 2026 года (Год Лошади) по китайскому альманаху. Помесячный гид с удачными и неудачными днями.",
    ogTitle: "Свадебные Даты 2026: Лучшие Дни",
    ogDesc: "Помесячный гид по благоприятным свадебным датам в 2026 году, Год Лошади.",
    heading: "Свадебные Даты 2026: Лучшие Дни для Бракосочетания",
    subtitle: "Помесячный гид по самым благоприятным свадебным датам в Год Лошади, основанный на китайском альманахе.",
    introTitle: "2026: Год Огненной Лошади",
    introBody: "2026 год — Год Лошади: энергичный, страстный и полный действия. Год Лошади считается благоприятным для свадеб, так как Лошадь символизирует жизненную силу и светлое будущее.",
    avoidTitle: "Даты, Которых Следует Избегать в 2026",
    avoidItems: ["Месяц Призраков (7-й лунный месяц — примерно август): Избегайте свадеб.", "Цинмин (5 апреля 2026): День поминовения предков — не для празднований.", "Дни, конфликтующие со знаком зодиака любого из партнёров.", "Дни лунного календаря 3, 7, 17, 23: Традиционно неблагоприятны."],
    monthsTitle: "Помесячный Гид",
    faqs: [
      { q: "Какой лучший месяц для свадьбы в 2026?", a: "Весна (март–май) и осень (сентябрь–ноябрь) — традиционно лучшие сезоны. Избегайте Месяца Призраков." },
      { q: "Как узнать, конфликтует ли дата с моим зодиаком?", a: "Самые частые столкновения: Крыса–Лошадь, Бык–Коза, Тигр–Обезьяна, Кролик–Петух, Дракон–Собака, Змея–Свинья." },
    ],
    cta: "Найти Благоприятную Дату — от $1",
    disclaimer: "Только для культурного ознакомления. Не профессиональная консультация.",
  },
  ja: {
    title: "2026年 結婚吉日：中国暦で選ぶ最高の日取り | Chinese Culture Studio",
    desc: "2026年（午年）の中国暦に基づく最も縁起の良い結婚日。吉日・凶日を月別にご紹介します。",
    ogTitle: "2026年 結婚吉日",
    ogDesc: "2026年午年の縁起の良い結婚日を月別にガイド。",
    heading: "2026年 結婚吉日：中国暦で選ぶ最高の日取り",
    subtitle: "中国暦に基づく午年の最も縁起の良い結婚日の月別ガイド。",
    introTitle: "2026年：火の午年",
    introBody: "2026年は午年 — 活動的で情熱的、行動力にあふれる年です。午は活力と明るい未来を象徴するため、結婚に適した年とされています。両方のパートナーの干支と調和し、凶日を避ける日を見つけることが鍵です。",
    avoidTitle: "2026年に避けるべき日",
    avoidItems: ["鬼月（旧暦7月 — おおよそ8月）：結婚は避けましょう。", "清明節（2026年4月5日）：祖先を偲ぶ日 — お祝い事には不向き。", "どちらかのパートナーの干支と衝突する日。", "旧暦の3日、7日、17日、23日：伝統的に凶日。"],
    monthsTitle: "月別ガイド",
    faqs: [
      { q: "2026年で結婚に最適な月は？", a: "春（3月〜5月）と秋（9月〜11月）が伝統的に最適です。鬼月（旧暦7月）は避けましょう。" },
      { q: "自分の干支と衝突する日を知るには？", a: "最も一般的な衝突：子〜午、丑〜未、寅〜申、卯〜酉、辰〜戌、巳〜亥。衝突する動物の日を避けてください。" },
    ],
    cta: "縁起の良い日を探す — $1から",
    disclaimer: "文化理解のためのものです。専門的なアドバイスではありません。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = CONTENT[params.locale] || CONTENT.en;
  return { title: c.title, description: c.desc, openGraph: { title: c.ogTitle, description: c.ogDesc },
    alternates: {
      languages: {
        en: "https://www.culture-of-china.com/guide/wedding-dates-2026",
        ru: "https://www.culture-of-china.com/ru/guide/wedding-dates-2026",
        ja: "https://www.culture-of-china.com/ja/guide/wedding-dates-2026"
      },
    },
    robots: "index, follow"
  };
}

export default function WeddingDatesGuide({ params: { locale } }: Props) {
  const c = CONTENT[locale] || CONTENT.en;
  const months = MONTHS[locale] || MONTHS.en;

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">{c.heading}</h1>
      <p className="text-stone-500 text-sm">{c.subtitle}</p>
      <hr className="my-6 border-stone-200" />
      <h2>{c.introTitle}</h2><p>{c.introBody}</p>

      <GuideCTA href="/calendar" service="calendar" variant="inline" />

      <h2>{c.avoidTitle}</h2><ul>{c.avoidItems.map((item) => <li key={item}>{item}</li>)}</ul>
      <h2>{c.monthsTitle}</h2>
      {months.map((m) => (
        <div key={m.name} className="not-prose my-3 card-classic p-3">
          <h3 className="text-sm font-bold text-accent m-0">{m.name}</h3>
          <ul className="text-sm text-stone-600 mt-2 mb-0">{m.days.map((d) => <li key={d}>{d}</li>)}</ul>
        </div>
      ))}
      <GuideFaq lang={locale} faqs={c.faqs} />
      <GuideCTA href="/calendar" service="calendar" />
      <hr className="my-6 border-stone-200" /><p className="text-xs text-stone-400">{c.disclaimer}</p>

      <GuideCTA href="/calendar" service="calendar" variant="sticky" />
    </article>
  );
}
