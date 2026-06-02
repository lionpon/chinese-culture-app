import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";

type Props = { params: { locale: string } };

const CONTENT: Record<string, {
  title: string; desc: string; ogTitle: string; ogDesc: string;
  heading: string; subtitle: string;
  whyTitle: string; whyBody: string;
  luckyTitle: string;
  unluckyTitle: string;
  comboTitle: string; comboBody: string;
  findTitle: string; findBody: string;
  faqs: { q: string; a: string }[];
  cta: string;
}> = {
  en: {
    title: "Chinese Lucky Numbers: 6, 8, 9 — Meaning & Guide | Chinese Culture Studio",
    desc: "Discover which numbers are lucky in Chinese culture: 8 (fortune), 6 (smooth), 9 (eternal). Learn how to use them for naming, dates, phone & license plates.",
    ogTitle: "Chinese Lucky Numbers: 6, 8, 9",
    ogDesc: "Learn why 8 means fortune, 6 means smooth, 9 means eternity — and why 4 is avoided.",
    heading: "Chinese Lucky Numbers: A Complete Guide",
    subtitle: "In Chinese culture, numbers carry deep symbolic meaning. Knowing which numbers are lucky can help with naming, choosing dates, and even picking phone numbers.",
    whyTitle: "Why Numbers Matter in Chinese Culture",
    whyBody: "Chinese is a tonal language where many words share similar pronunciations. A number is considered lucky if it sounds like a word with positive meaning (homophony). For example, 8 (bā) sounds like 发 (fā, fortune), making it the most sought-after number. This belief influences everything from wedding dates to real estate prices — buildings in China often skip the 4th floor entirely, similar to how Western buildings skip the 13th.",
    luckyTitle: "Lucky Numbers",
    unluckyTitle: "Numbers to Avoid",
    comboTitle: "Lucky Number Combinations",
    comboBody: "Combinations multiply meaning: 88 (double fortune), 168 (一路发, fortune all the way), 520 (wǒ ài nǐ, I love you), 1314 (一生一世, forever). The sequence 888 is considered extremely auspicious — the 2008 Beijing Olympics opening ceremony started at 8:08:08 PM on 08/08/08.",
    findTitle: "How to Use Lucky Numbers",
    findBody: "Use lucky numbers in your baby's name stroke count (name reading), wedding dates (8th of the month is most popular), business phone numbers (ending in 8 or 168), and home addresses. Our name reading tool automatically considers lucky number principles when generating Chinese name suggestions.",
    faqs: [
      { q: "What is the luckiest number in Chinese culture?", a: "8 (八, bā) is universally considered the luckiest number because it sounds like 发 (fā), meaning wealth, fortune, and prosperity." },
      { q: "Why is 4 considered unlucky in China?", a: "4 (四, sì) sounds almost identical to 死 (sǐ), meaning death. Many buildings in China skip floors 4, 14, 24, etc." },
      { q: "Is 9 lucky in Chinese?", a: "Yes, 9 (九, jiǔ) sounds like 久 (jiǔ), meaning long-lasting or eternal. It's associated with the emperor and longevity." },
      { q: "What does 6 mean in Chinese?", a: "6 (六, liù) sounds like 溜 (liū), meaning smooth or flowing well. 66 means everything goes smoothly and is used as online slang for skill." },
      { q: "What does 520 mean in Chinese?", a: "520 (wǔ èr líng) sounds like 我爱你 (wǒ ài nǐ, I love you). May 20th (5/20) is celebrated as an informal Valentine's Day in China." },
    ],
    cta: "Try Our Name Reading Tool",
  },
  ru: {
    title: "Китайские счастливые числа: 6, 8, 9 — значение и гид | Chinese Culture Studio",
    desc: "Узнайте, какие числа считаются счастливыми в Китае: 8 (богатство), 6 (гладкость), 9 (вечность). Как использовать для имён, дат, номеров.",
    ogTitle: "Китайские счастливые числа: 6, 8, 9",
    ogDesc: "Почему 8 означает богатство, 6 — успех, 9 — вечность, а 4 избегают.",
    heading: "Китайские счастливые числа: Полный гид",
    subtitle: "В китайской культуре числа несут глубокое символическое значение. Знание счастливых чисел помогает с именами, датами и номерами.",
    whyTitle: "Почему числа важны в Китае",
    whyBody: "Китайский язык — тональный, и многие слова звучат одинаково. Число считается счастливым, если оно звучит как слово с положительным значением. Например, 8 (bā) звучит как 发 (fā, богатство). Это влияет на всё — от дат свадьбы до цен на недвижимость.",
    luckyTitle: "Счастливые числа",
    unluckyTitle: "Числа, которых избегают",
    comboTitle: "Счастливые комбинации",
    comboBody: "Комбинации усиливают значение: 88 (двойное богатство), 168 (удача на всём пути), 520 (я тебя люблю), 1314 (навсегда). Церемония открытия Олимпиады 2008 в Пекине началась 08.08.08 в 20:08.",
    findTitle: "Как использовать счастливые числа",
    findBody: "Используйте счастливые числа в количестве черт имени, датах свадьбы, номерах телефонов и адресах. Наш инструмент чтения имён учитывает принципы счастливых чисел.",
    faqs: [
      { q: "Какое самое счастливое число в Китае?", a: "8 (八, bā) считается самым счастливым, потому что звучит как 发 (fā) — богатство и процветание." },
      { q: "Почему 4 считается несчастливым?", a: "4 (四, sì) звучит почти как 死 (sǐ), смерть. Во многих зданиях Китая пропускают этажи 4, 14, 24." },
      { q: "Счастливо ли число 9 в Китае?", a: "Да, 9 (九, jiǔ) звучит как 久 (jiǔ) — долговечность. Число императора и долголетия." },
      { q: "Что означает 6 в Китае?", a: "6 (六, liù) звучит как 溜 (liū) — гладкий. 66 означает, что всё идёт гладко, используется как интернет-сленг." },
    ],
    cta: "Попробуйте наш инструмент имён",
  },
  ja: {
    title: "中国のラッキーナンバー: 6, 8, 9 — 意味とガイド | Chinese Culture Studio",
    desc: "中国で縁起が良いとされる数字：8（繁栄）、6（順調）、9（永遠）。命名、日取り、電話番号選びに役立つ数字の意味。",
    ogTitle: "中国のラッキーナンバー: 6, 8, 9",
    ogDesc: "8が繁栄、6が順調、9が永遠を意味する理由と、4が避けられる理由。",
    heading: "中国のラッキーナンバー完全ガイド",
    subtitle: "中国文化では数字に深い象徴的な意味があります。縁起の良い数字を知ることで、命名や日取り選びに役立ちます。",
    whyTitle: "数字が中国文化で重要な理由",
    whyBody: "中国語は声調言語で、多くの単語が同じ発音を持ちます。数字はポジティブな意味を持つ言葉と同じ発音であれば縁起が良いとされます。例えば8（bā）は発（fā、繁栄）に似ています。この考え方は結婚式の日取りから不動産価格まで影響を与えます。",
    luckyTitle: "縁起の良い数字",
    unluckyTitle: "避けるべき数字",
    comboTitle: "縁起の良い数字の組み合わせ",
    comboBody: "組み合わせは意味を増幅します：88（二重の繁栄）、168（一路繁栄）、520（愛してる）、1314（永遠に）。2008年北京五輪の開会式は08/08/08の20:08に始まりました。",
    findTitle: "ラッキーナンバーの使い方",
    findBody: "赤ちゃんの名前の画数、結婚式の日取り（8日が最も人気）、ビジネスの電話番号（8や168で終わるもの）、住所にラッキーナンバーを使いましょう。",
    faqs: [
      { q: "中国で最も縁起の良い数字は？", a: "8（八、bā）が最も縁起が良いとされます。発（fā、繁栄・富）に発音が似ているためです。" },
      { q: "4が不吉とされる理由は？", a: "4（四、sì）は死（sǐ）と発音がほぼ同じです。中国の多くの建物では4階、14階、24階が省略されます。" },
      { q: "9は縁起が良い？", a: "はい、9（九、jiǔ）は久（jiǔ、永遠）に発音が似ており、皇帝の数、長寿の象徴です。" },
      { q: "6の意味は？", a: "6（六、liù）は溜（liū、スムーズ）に似ています。66はすべて順調の意味で、ネットスラングとして使われます。" },
    ],
    cta: "名前ツールを試す",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = CONTENT[params.locale] || CONTENT.en;
  return {
    title: c.title,
    description: c.desc,
    openGraph: { title: c.ogTitle, description: c.ogDesc },
    robots: "index, follow",
  };
}

const NUMBER_DATA: Record<string, { num: number; zh: string; pinyin: string; soundsLike: string; meaning: string; type: string }[]> = {
  en: [
    { num: 8, zh: "八", pinyin: "bā", soundsLike: "发 (fā)", meaning: "Fortune, wealth, prosperity. The luckiest number in Chinese culture.", type: "lucky" },
    { num: 6, zh: "六", pinyin: "liù", soundsLike: "溜 (liū)", meaning: "Smooth, flowing, everything goes well. 66 = pro-level skill in internet slang.", type: "lucky" },
    { num: 9, zh: "九", pinyin: "jiǔ", soundsLike: "久 (jiǔ)", meaning: "Eternal, long-lasting. Associated with the emperor and longevity.", type: "lucky" },
    { num: 4, zh: "四", pinyin: "sì", soundsLike: "死 (sǐ)", meaning: "Death. Avoided in floor numbers, phone numbers, and gifts. Never give gifts in sets of four.", type: "unlucky" },
  ],
  ru: [
    { num: 8, zh: "八", pinyin: "bā", soundsLike: "发 (fā)", meaning: "Богатство, процветание. Самое счастливое число в Китае.", type: "lucky" },
    { num: 6, zh: "六", pinyin: "liù", soundsLike: "溜 (liū)", meaning: "Гладкость. 66 = всё идёт гладко, интернет-сленг мастерства.", type: "lucky" },
    { num: 9, zh: "九", pinyin: "jiǔ", soundsLike: "久 (jiǔ)", meaning: "Вечность, долголетие. Число императора.", type: "lucky" },
    { num: 4, zh: "四", pinyin: "sì", soundsLike: "死 (sǐ)", meaning: "Смерть. Избегают в номерах этажей и подарках.", type: "unlucky" },
  ],
  ja: [
    { num: 8, zh: "八", pinyin: "bā", soundsLike: "发 (fā)", meaning: "繁栄、富。中国文化で最も縁起の良い数字。", type: "lucky" },
    { num: 6, zh: "六", pinyin: "liù", soundsLike: "溜 (liū)", meaning: "スムーズ。66は「すべて順調」のネットスラング。", type: "lucky" },
    { num: 9, zh: "九", pinyin: "jiǔ", soundsLike: "久 (jiǔ)", meaning: "永遠、長寿。皇帝の数字。", type: "lucky" },
    { num: 4, zh: "四", pinyin: "sì", soundsLike: "死 (sǐ)", meaning: "死。階数や電話番号、贈り物で避けられる。", type: "unlucky" },
  ],
};

export default function LuckyNumbersPage({ params }: Props) {
  const c = CONTENT[params.locale] || CONTENT.en;
  const numbers = NUMBER_DATA[params.locale] || NUMBER_DATA.en;
  const lucky = numbers.filter((n) => n.type === "lucky");
  const unlucky = numbers.filter((n) => n.type === "unlucky");

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-center" style={{ color: "var(--accent)" }}>
        {c.heading}
      </h1>
      <p className="text-sm text-stone-500 text-center mb-8">{c.subtitle}</p>

      <section className="card-classic p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold text-stone-700 mb-3">{c.whyTitle}</h2>
        <p className="text-sm text-stone-600 leading-relaxed">{c.whyBody}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-stone-700 mb-4">{c.luckyTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {lucky.map((n) => (
            <div key={n.num} className="card-classic p-4 text-center">
              <div className="text-3xl font-bold mb-1" style={{ color: "var(--accent)" }}>{n.num}</div>
              <div className="text-sm font-medium text-stone-700">{n.zh} ({n.pinyin})</div>
              <div className="text-xs text-stone-400 mt-1">→ {n.soundsLike}</div>
              <p className="text-xs text-stone-500 mt-2 leading-relaxed">{n.meaning}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card-classic p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold text-stone-700 mb-3">{c.unluckyTitle}</h2>
        {unlucky.map((n) => (
          <div key={n.num} className="flex items-start gap-3">
            <div className="text-2xl font-bold text-red-500">{n.num}</div>
            <div>
              <div className="text-sm font-medium text-stone-700">{n.zh} ({n.pinyin}) → {n.soundsLike}</div>
              <p className="text-xs text-stone-500">{n.meaning}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="card-classic p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold text-stone-700 mb-3">{c.comboTitle}</h2>
        <p className="text-sm text-stone-600 leading-relaxed">{c.comboBody}</p>
      </section>

      <section className="card-classic p-4 sm:p-6 mb-8">
        <h2 className="text-lg font-semibold text-stone-700 mb-3">{c.findTitle}</h2>
        <p className="text-sm text-stone-600 leading-relaxed mb-4">{c.findBody}</p>
        <Link href="/naming" className="inline-block px-5 py-2.5 rounded-xl text-sm font-medium btn-primary">
          {c.cta} →
        </Link>
      </section>

      <GuideFaq faqs={c.faqs} lang={params.locale} />
    </div>
  );
}
