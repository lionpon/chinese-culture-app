import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";
import GuideToolEmbed from "@/components/GuideToolEmbed";

type Props = { params: { locale: string } };

type Compat = { sign: string; zh: string; best: string; avoid: string };

const MATCHES: Record<string, Compat[]> = {
  en: [
    { sign: "Rat", zh: "鼠", best: "Ox · Dragon · Monkey", avoid: "Horse" },
    { sign: "Ox", zh: "牛", best: "Rat · Snake · Rooster", avoid: "Goat" },
    { sign: "Tiger", zh: "虎", best: "Horse · Dog · Pig", avoid: "Monkey" },
    { sign: "Rabbit", zh: "兔", best: "Goat · Dog · Pig", avoid: "Rooster" },
    { sign: "Dragon", zh: "龙", best: "Rat · Monkey · Rooster", avoid: "Dog" },
    { sign: "Snake", zh: "蛇", best: "Ox · Rooster · Monkey", avoid: "Pig" },
    { sign: "Horse", zh: "马", best: "Tiger · Goat · Dog", avoid: "Rat" },
    { sign: "Goat", zh: "羊", best: "Rabbit · Horse · Pig", avoid: "Ox" },
    { sign: "Monkey", zh: "猴", best: "Rat · Dragon · Snake", avoid: "Tiger" },
    { sign: "Rooster", zh: "鸡", best: "Ox · Snake · Dragon", avoid: "Rabbit" },
    { sign: "Dog", zh: "狗", best: "Tiger · Rabbit · Horse", avoid: "Dragon" },
    { sign: "Pig", zh: "猪", best: "Tiger · Rabbit · Goat", avoid: "Snake" },
  ],
  ru: [
    { sign: "Крыса", zh: "鼠", best: "Бык · Дракон · Обезьяна", avoid: "Лошадь" },
    { sign: "Бык", zh: "牛", best: "Крыса · Змея · Петух", avoid: "Коза" },
    { sign: "Тигр", zh: "虎", best: "Лошадь · Собака · Свинья", avoid: "Обезьяна" },
    { sign: "Кролик", zh: "兔", best: "Коза · Собака · Свинья", avoid: "Петух" },
    { sign: "Дракон", zh: "龙", best: "Крыса · Обезьяна · Петух", avoid: "Собака" },
    { sign: "Змея", zh: "蛇", best: "Бык · Петух · Обезьяна", avoid: "Свинья" },
    { sign: "Лошадь", zh: "马", best: "Тигр · Коза · Собака", avoid: "Крыса" },
    { sign: "Коза", zh: "羊", best: "Кролик · Лошадь · Свинья", avoid: "Бык" },
    { sign: "Обезьяна", zh: "猴", best: "Крыса · Дракон · Змея", avoid: "Тигр" },
    { sign: "Петух", zh: "鸡", best: "Бык · Змея · Дракон", avoid: "Кролик" },
    { sign: "Собака", zh: "狗", best: "Тигр · Кролик · Лошадь", avoid: "Дракон" },
    { sign: "Свинья", zh: "猪", best: "Тигр · Кролик · Коза", avoid: "Змея" },
  ],
  ja: [
    { sign: "子（ねずみ）", zh: "鼠", best: "丑 · 辰 · 申", avoid: "午" },
    { sign: "丑（うし）", zh: "牛", best: "子 · 巳 · 酉", avoid: "未" },
    { sign: "寅（とら）", zh: "虎", best: "午 · 戌 · 亥", avoid: "申" },
    { sign: "卯（うさぎ）", zh: "兔", best: "未 · 戌 · 亥", avoid: "酉" },
    { sign: "辰（たつ）", zh: "龙", best: "子 · 申 · 酉", avoid: "戌" },
    { sign: "巳（み）", zh: "蛇", best: "丑 · 酉 · 申", avoid: "亥" },
    { sign: "午（うま）", zh: "马", best: "寅 · 未 · 戌", avoid: "子" },
    { sign: "未（ひつじ）", zh: "羊", best: "卯 · 午 · 亥", avoid: "丑" },
    { sign: "申（さる）", zh: "猴", best: "子 · 辰 · 巳", avoid: "寅" },
    { sign: "酉（とり）", zh: "鸡", best: "丑 · 巳 · 辰", avoid: "卯" },
    { sign: "戌（いぬ）", zh: "狗", best: "寅 · 卯 · 午", avoid: "辰" },
    { sign: "亥（いのしし）", zh: "猪", best: "寅 · 卯 · 未", avoid: "巳" },
  ],
  ko: [
    { sign: "쥐", zh: "鼠", best: "소 · 용 · 원숭이", avoid: "말" },
    { sign: "소", zh: "牛", best: "쥐 · 뱀 · 닭", avoid: "양" },
    { sign: "호랑이", zh: "虎", best: "말 · 개 · 돼지", avoid: "원숭이" },
    { sign: "토끼", zh: "兔", best: "양 · 개 · 돼지", avoid: "닭" },
    { sign: "용", zh: "龙", best: "쥐 · 원숭이 · 닭", avoid: "개" },
    { sign: "뱀", zh: "蛇", best: "소 · 닭 · 원숭이", avoid: "돼지" },
    { sign: "말", zh: "马", best: "호랑이 · 양 · 개", avoid: "쥐" },
    { sign: "양", zh: "羊", best: "토끼 · 말 · 돼지", avoid: "소" },
    { sign: "원숭이", zh: "猴", best: "쥐 · 용 · 뱀", avoid: "호랑이" },
    { sign: "닭", zh: "鸡", best: "소 · 뱀 · 용", avoid: "토끼" },
    { sign: "개", zh: "狗", best: "호랑이 · 토끼 · 말", avoid: "용" },
    { sign: "돼지", zh: "猪", best: "호랑이 · 토끼 · 양", avoid: "뱀" },
  ],
};

const CONTENT: Record<string, { title: string; desc: string; ogTitle: string; ogDesc: string; heading: string; subtitle: string; howItWorks: string; howBody: string; matchesHeading: string; bestLabel: string; avoidLabel: string; note: string; faqs: { q: string; a: string }[]; cta: string; disclaimer: string }> = {
  en: {
    title: "Chinese Zodiac Compatibility 2026: Love Matches & Best Pairs (Free Calculator) | Chinese Culture Studio",
    desc: "Which Chinese zodiac signs are most compatible with yours? Six-harmony pairs, best love matches for all 12 signs, and a free compatibility calculator.",
    ogTitle: "Chinese Zodiac Compatibility: Best Love Matches for All 12 Signs",
    ogDesc: "Six-harmony (六合) and triple-harmony (三合) pairs explained. Best matches for every sign, plus a free zodiac compatibility calculator.",
    heading: "Chinese Zodiac Compatibility: Best Love Matches for All 12 Signs",
    subtitle: "Which animal signs are your best match? Six-harmony and triple-harmony pairs explained, with a free calculator.",
    howItWorks: "How Zodiac Compatibility Works",
    howBody: "Chinese zodiac compatibility is built on three patterns. Six harmonies (六合) are the strongest pairs — opposite signs that balance each other, like Rat and Ox. Triple harmonies (三合) are three-sign families that naturally support each other, like Tiger, Horse and Dog. Clashes (六冲) are signs six positions apart that spark with each other — chemistry, but with friction. Traditional matchmakers weigh all three when reading a couple's prospects.",
    matchesHeading: "Best Matches by Sign",
    bestLabel: "Best matches",
    avoidLabel: "Watch out",
    note: "Compatibility is a starting point, not a verdict — real relationships depend on the people in them. Year-sign pairs are one layer among many in Chinese astrology.",
    faqs: [
      { q: "Which Chinese zodiac signs are most compatible?", a: "The strongest pairings are the six-harmony pairs: Rat–Ox, Tiger–Pig, Rabbit–Dog, Dragon–Rooster, Snake–Monkey and Horse–Goat. Each pair complements the other's temperament, which is why traditional Chinese matchmaking treats them as ideal matches." },
      { q: "What is the difference between six harmony and triple harmony?", a: "Six harmony (六合) is a two-sign bond of opposites that balance — the classic marriage match. Triple harmony (三合) is a trio of signs four years apart that share an element family and collaborate naturally, like Tiger, Horse and Dog in the Fire family." },
      { q: "Does Chinese zodiac compatibility really work?", a: "Think of it as a personality framework rather than destiny. In Chinese culture, millions of couples consult zodiac compatibility before marriage, but it is read alongside other factors like BaZi (八字) birth charts. Our calculator gives you the traditional pairings — the interpretation is up to you." },
    ],
    cta: "💕 Calculate Your Love Match Percentage",
    disclaimer: "For entertainment and cultural insight. Chinese zodiac compatibility reflects tradition, not a guarantee of relationship outcomes.",
  },
  ru: {
    title: "Совместимость по китайскому гороскопу 2026: лучшие пары (бесплатный калькулятор) | Chinese Culture Studio",
    desc: "Узнайте, какие знаки китайского зодиака совместимы с вашим. Пары шести гармоний, лучшие сочетания для всех 12 знаков и бесплатный калькулятор совместимости.",
    ogTitle: "Совместимость знаков китайского зодиака: лучшие пары",
    ogDesc: "Пары шести гармоний (六合) и трёх гармоний (三合) с объяснениями. Лучшие сочетания для каждого знака и бесплатный калькулятор.",
    heading: "Совместимость знаков китайского зодиака: лучшие пары",
    subtitle: "Какой знак подходит вам лучше всего? Пары шести гармоний и трёх гармоний — с бесплатным калькулятором.",
    howItWorks: "Как работает совместимость",
    howBody: "Совместимость по китайскому зодиаку строится на трёх принципах. Шесть гармоний (六合) — самые сильные пары: противоположные знаки, которые уравновешивают друг друга, например Крыса и Бык. Тройные гармонии (三合) — тройки знаков одной стихии, которые естественно поддерживают друг друга, как Тигр, Лошадь и Собака. Столкновения (六冲) — знаки, отстоящие на шесть позиций, между которыми много искр и трений. Традиционные свахи учитывают все три принципа.",
    matchesHeading: "Лучшие пары по знакам",
    bestLabel: "Лучшие пары",
    avoidLabel: "Осторожно",
    note: "Совместимость — это отправная точка, а не приговор: настоящие отношения зависят от самих людей. Пары по году рождения — лишь один из слоёв китайской астрологии.",
    faqs: [
      { q: "Какие знаки китайского зодиака наиболее совместимы?", a: "Самые сильные пары — шесть гармоний: Крыса–Бык, Тигр–Свинья, Кролик–Собака, Дракон–Петух, Змея–Обезьяна и Лошадь–Коза. Каждая пара дополняет темперамент другой, поэтому традиционное китайское сватовство считает их идеальными." },
      { q: "Чем отличаются шесть гармоний от трёх гармоний?", a: "Шесть гармоний (六合) — союз двух противоположных знаков, которые уравновешивают друг друга: классическая брачная пара. Тройные гармонии (三合) — три знака с разницей в четыре года, принадлежащие одной стихии и естественно сотрудничающие, как Тигр, Лошадь и Собака в семье Огня." },
      { q: "Действительно ли работает совместимость по зодиаку?", a: "Воспринимайте её как систему описания характеров, а не как судьбу. В китайской культуре миллионы пар сверяются с совместимостью перед свадьбой, но её читают вместе с другими факторами, например картой Ба-Цзы (八字). Наш калькулятор даёт традиционные пары — интерпретация за вами." },
    ],
    cta: "💕 Рассчитайте процент совместимости",
    disclaimer: "Материал носит развлекательный и познавательный характер и не гарантирует исход отношений.",
  },
  ja: {
    title: "干支相性2026：十二支の相性とベストカップル（無料診断）| Chinese Culture Studio",
    desc: "あなたと相性の良い干支は？六合・三合の相性、全12支のベストカップル、無料の相性計算ツールをご紹介します。",
    ogTitle: "干支の相性：12支のベストカップル早見表",
    ogDesc: "六合・三合の相性を解説。全12支のベストカップルと無料の相性計算ツール付き。",
    heading: "干支の相性：12支のベストカップル早見表",
    subtitle: "あなたに一番合う干支はどれ？六合・三合の相性を解説、無料計算ツール付き。",
    howItWorks: "干支の相性の仕組み",
    howBody: "干支の相性は3つのパターンで成り立っています。六合（りくごう）は最も強い相性——正反対の位置にあり互いを補完し合うペアで、子と丑などが代表的です。三合（さんごう）は4年離れた3つの干支が同じ五行の家族として自然に支え合う関係で、寅・午・戌などが該当します。冲（ちゅう）は6つ離れた干支同士で、刺激的ですが摩擦も生みます。伝統的な仲人はこの3つをすべて考慮します。",
    matchesHeading: "干支別ベスト相性",
    bestLabel: "相性◎",
    avoidLabel: "要注意",
    note: "相性は出発点であって結論ではありません。本当の関係は人そのものにかかっています。年干支の相性は中国占星術の一つの層にすぎません。",
    faqs: [
      { q: "最も相性の良い干支の組み合わせは？", a: "最も強いのは六合のペアです：子–丑、寅–亥、卯–戌、辰–酉、巳–申、午–未。それぞれが相手の気質を補完し合うため、伝統的な中国の縁談では理想の組み合わせとされます。" },
      { q: "六合と三合の違いは？", a: "六合（りくごう）は正反対の位置にある2つの干支が互いを補完する関係で、結婚相手の定番です。三合（さんごう）は4年違いの3つの干支が同じ五行の仲間として自然に協力し合う関係で、火の家族の寅・午・戌などが代表的です。" },
      { q: "干支の相性は本当に当たりますか？", a: "運命というより性格の枠組みとして捉えるのがおすすめです。中国文化では多くのカップルが結婚前に相性を確認しますが、四柱推命（八字）など他の要素と合わせて読みます。当サイトのツールは伝統的な組み合わせを提示します——解釈はあなた次第です。" },
    ],
    cta: "💕 恋愛相性パーセントを計算",
    disclaimer: "娯楽・文化的な内容です。干支の相性は伝統に基づくもので、関係の結果を保証するものではありません。",
  },
  ko: {
    title: "띠별 궁합 2026: 12간지 최고의 궁합 (무료 계산기) | Chinese Culture Studio",
    desc: "나와 가장 잘 맞는 띠는? 육합 궁합, 12간지별 베스트 커플, 무료 궁합 계산기를 확인하세요.",
    ogTitle: "띠별 궁합: 12간지 최고의 커플",
    ogDesc: "육합(六合)과 삼합(三合) 궁합을 설명합니다. 모든 띠의 베스트 커플과 무료 궁합 계산기.",
    heading: "띠별 궁합: 12간지 최고의 커플",
    subtitle: "나에게 가장 잘 맞는 띠는 무엇일까요? 육합과 삼합 궁합을 설명하고 무료 계산기를 제공합니다.",
    howItWorks: "띠별 궁합의 원리",
    howBody: "띠별 궁합은 세 가지 원리로 구성됩니다. 육합(六合)은 가장 강한 궁합으로, 서로 반대편에 있어 균형을 이루는 쌍입니다(예: 쥐와 소). 삼합(三合)은 4년 차이의 세 띠가 같은 오행 가족으로 자연스럽게 서로를 돕는 관계입니다(예: 호랑이·말·개). 충(沖)은 여섯 칸 떨어진 띠끼리의 관계로, 자극적이지만 마찰도 생깁니다. 전통 중매인은 세 가지를 모두 고려합니다.",
    matchesHeading: "띠별 최고의 궁합",
    bestLabel: "잘 맞는 띠",
    avoidLabel: "주의",
    note: "궁합은 출발점이지 결론이 아닙니다. 진짜 관계는 사람에게 달려 있습니다. 띠 궁합은 중국 점성술의 여러 층위 중 하나일 뿐입니다.",
    faqs: [
      { q: "가장 궁합이 좋은 띠 조합은 무엇인가요?", a: "가장 강한 조합은 육합 쌍입니다: 쥐–소, 호랑이–돼지, 토끼–개, 용–닭, 뱀–원숭이, 말–양. 각 쌍이 서로의 성향을 보완하기 때문에 전통 중국 중매에서 이상적인 궁합으로 여겨집니다." },
      { q: "육합과 삼합의 차이는 무엇인가요?", a: "육합(六合)은 반대편에 있는 두 띠가 서로를 보완하는 관계로, 전통적인 결혼 궁합입니다. 삼합(三合)은 4년 차이의 세 띠가 같은 오행 가족으로 자연스럽게 협력하는 관계로, 불의 가족인 호랑이·말·개가 대표적입니다." },
      { q: "띠별 궁합이 실제로 맞나요?", a: "운명이라기보다 성격의 틀로 생각하세요. 중국 문화에서는 수많은 커플이 결혼 전에 궁합을 확인하지만, 사주팔자(八字) 등 다른 요소와 함께 봅니다. 저희 계산기는 전통적인 조합을 보여드립니다 — 해석은 여러분의 몫입니다." },
    ],
    cta: "💕 우리 궁합 퍼센트 계산하기",
    disclaimer: "오락 및 문화적 참고용입니다. 띠별 궁합은 전통에 기반하며 관계의 결과를 보장하지 않습니다.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = CONTENT[params.locale] || CONTENT.en;
  return {
    title: c.title,
    description: c.desc,
    openGraph: { title: c.ogTitle, description: c.ogDesc },
    alternates: {
      languages: {
        en: "https://www.culture-of-china.com/guide/zodiac-compatibility",
        ru: "https://www.culture-of-china.com/ru/guide/zodiac-compatibility",
        ja: "https://www.culture-of-china.com/ja/guide/zodiac-compatibility",
      },
    },
    robots: "index, follow",
  };
}

export default function ZodiacCompatibilityGuide({ params: { locale } }: Props) {
  const c = CONTENT[locale] || CONTENT.en;
  const matches = MATCHES[locale] || MATCHES.en;

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">{c.heading}</h1>
      <p className="text-stone-500 text-sm">{c.subtitle}</p>
      <hr className="my-6 border-stone-200" />

      <h2>{c.howItWorks}</h2>
      <p>{c.howBody}</p>

      <h2>{c.matchesHeading}</h2>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {matches.map((m) => (
          <div key={m.sign} className="card-classic p-3 text-sm">
            <p className="font-bold text-accent">{m.zh} {m.sign}</p>
            <p className="text-xs text-stone-500 mt-1">
              <span className="font-medium" style={{ color: "var(--jade)" }}>{c.bestLabel}:</span> {m.best}
            </p>
            <p className="text-xs text-stone-400">
              <span className="font-medium">{c.avoidLabel}:</span> {m.avoid}
            </p>
          </div>
        ))}
      </div>

      <p className="text-xs text-stone-400">{c.note}</p>

      <GuideFaq lang={locale} faqs={c.faqs} />

      <GuideToolEmbed tool="zodiac" />

      <div className="not-prose my-8 text-center">
        <Link href="/tools/zodiac-match" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>
          {c.cta}
        </Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">{c.disclaimer}</p>
    </article>
  );
}

