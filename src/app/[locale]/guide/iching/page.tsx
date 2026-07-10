import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";

type Props = { params: { locale: string } };

const CONTENT: Record<string, { title: string; desc: string; ogTitle: string; ogDesc: string; heading: string; subtitle: string; whatTitle: string; whatBody1: string; whatBody2: string; howTitle: string; howBody: string; structureTitle: string; lineIntro: string; lineYang: string; lineYin: string; trigramIntro: string; trigramNature: string; judgmentTitle: string; judgmentDesc: string; lineStatementsTitle: string; lineStatementsDesc: string; baguaTitle: string; baguaNameH: string; baguaChinese: string; baguaNatureH: string; baguaSymbolH: string; baguaNames: string[]; baguaNature: string[]; castTitle: string; castSteps: string[]; tryTitle: string; tryBody: string; faqs: { q: string; a: string }[]; cta: string; disclaimer: string }> = {
  en: {
    title: "I Ching Divination: A Beginner's Guide to the Book of Changes",
    desc: "What is the I Ching (Yijing) and how does divination work? Learn about hexagrams, changing lines, and how to interpret your reading.",
    ogTitle: "I Ching Divination: A Beginner's Guide",
    ogDesc: "What is the I Ching and how do hexagrams work. Complete guide.",
    heading: "I Ching Divination: A Beginner's Guide",
    subtitle: "Understanding the 3,000-year-old Book of Changes — from tossing coins to interpreting hexagrams.",
    whatTitle: "What is the I Ching?",
    whatBody1: "The I Ching (易经), or Book of Changes, is one of the oldest Chinese classical texts, dating back over 3,000 years. Originally a divination manual for Zhou dynasty rulers, it evolved into a profound philosophical work that influenced Confucianism, Taoism, and Chinese thought for millennia.",
    whatBody2: "At its core, the I Ching is a system of 64 hexagrams — six-line symbols representing fundamental patterns of change in the universe. Each hexagram describes a specific situation or life stage, along with advice on how to navigate it.",
    howTitle: "How Does I Ching Divination Work?",
    howBody: "You ask a question, cast six lines (using coins or yarrow stalks), and receive a hexagram. The I Ching then \"answers\" through the hexagram's text — but unlike fortune-telling, it doesn't predict the future. Instead, it reveals the underlying dynamics of your situation and suggests the wisest course of action.",
    structureTitle: "The Structure of a Hexagram (卦, Gua)",
    lineIntro: "6 lines (爻, Yao)",
    lineYang: "each line is either solid (Yang, active) or broken (Yin, receptive)",
    lineYin: "",
    trigramIntro: "2 trigrams (upper + lower)",
    trigramNature: "each represents a natural force: Heaven, Earth, Thunder, Mountain, Water, Fire, Lake, Wind",
    judgmentTitle: "The Judgment (卦辞)",
    judgmentDesc: "the main oracular text",
    lineStatementsTitle: "Line Statements (爻辞)",
    lineStatementsDesc: "specific advice for each changing line",
    baguaTitle: "The 8 Trigrams (八卦, Bagua)",
    baguaNameH: "Name",
    baguaChinese: "Chinese",
    baguaNatureH: "Nature",
    baguaSymbolH: "Symbol",
    baguaNames: ["Qian", "Kun", "Zhen", "Gen", "Kan", "Li", "Dui", "Xun"],
    baguaNature: ["Heaven", "Earth", "Thunder", "Mountain", "Water", "Fire", "Lake", "Wind"],
    castTitle: "How to Cast a Hexagram",
    castSteps: ["Hold 3 coins and focus on your question", "Toss the coins 6 times (from bottom to top)", "Count each toss: 3 heads = old Yang (changing), 2 heads = young Yang, 2 tails = young Yin, 3 tails = old Yin (changing)", "Build your hexagram — first toss = bottom line", "Read the hexagram text and any changing lines"],
    tryTitle: "Try an I Ching Reading",
    tryBody: "Our online I Ching tool handles the coin-tossing for you and provides a clear interpretation of your hexagram with historical context and practical advice.",
    faqs: [
      { q: "What is the I Ching?", a: "The I Ching (Book of Changes) is an ancient Chinese text over 3,000 years old. It's a system of 64 hexagrams, each describing a specific life situation with wise counsel." },
      { q: "How does I Ching divination work?", a: "You ask a question, the system generates a hexagram, and you receive an interpretation. The I Ching doesn't predict the future — it reveals the dynamics of your situation and suggests the wisest path." },
      { q: "What do the 64 hexagrams mean?", a: "Each hexagram represents a fundamental life situation or pattern of change. For example, Hexagram 1 (Qian) represents creativity and initiative, while Hexagram 2 (Kun) represents receptivity and patience. The hexagram you receive reflects the underlying dynamics of your question." },
      { q: "Can the I Ching predict the future?", a: "The I Ching does not predict the future like a fortune-telling tool. Instead, it analyzes the present dynamics of your situation and suggests how events may unfold based on current patterns — giving you wisdom to make better choices." },
      { q: "How do I interpret a changing line?", a: "Changing lines (old yang or old yin) indicate a transformation point. The line's text provides specific advice for your situation, and the resulting hexagram shows where the situation is heading. Pay special attention to changing lines — they reveal the pivot point." },
      { q: "What's the difference between I Ching and Tao Te Ching?", a: "Both are foundational Chinese classics, but they serve different purposes. The I Ching (Yijing) is a divination text and philosophical work about change. The Tao Te Ching (Daodejing) is a philosophical poem about the Tao (Way) and virtue. They complement each other in Chinese thought." },
      { q: "Is it paid?", a: "You choose the contribution amount — from $1. First 2 readings are free (preview mode). It's a voluntary contribution, not a purchase." },
    ],
    cta: "Consult the I Ching — from $1",
    disclaimer: "For cultural appreciation only. Not professional advice.",
  },
  ru: {
    title: "И-Цзин Гадание: Руководство для Начинающих по Книге Перемен | Chinese Culture Studio",
    desc: "Что такое И-Цзин (Книга Перемен) и как работает гадание? Узнайте о гексаграммах, меняющихся линиях и толковании.",
    ogTitle: "И-Цзин Гадание: Руководство для Начинающих",
    ogDesc: "Что такое И-Цзин и как работают гексаграммы. Полное руководство.",
    heading: "И-Цзин: Руководство для Начинающих",
    subtitle: "Понимание 3000-летней Книги Перемен — от бросания монет до толкования гексаграмм.",
    whatTitle: "Что Такое И-Цзин?",
    whatBody1: "И-Цзин (易经), или Книга Перемен, — один из древнейших китайских классических текстов, насчитывающий более 3000 лет. Первоначально руководство по гаданию для правителей династии Чжоу, он превратился в глубокое философское произведение, повлиявшее на конфуцианство, даосизм и китайскую мысль на тысячелетия.",
    whatBody2: "В своей основе И-Цзин — это система из 64 гексаграмм — шестилинейных символов, представляющих фундаментальные паттерны изменений во вселенной. Каждая гексаграмма описывает конкретную ситуацию или жизненный этап вместе с советом, как через него пройти.",
    howTitle: "Как Работает Гадание И-Цзин?",
    howBody: "Вы задаёте вопрос, бросаете шесть линий (используя монеты или стебли тысячелистника) и получаете гексаграмму. И-Цзин «отвечает» через текст гексаграммы — но в отличие от гадания, она не предсказывает будущее. Вместо этого она раскрывает скрытую динамику вашей ситуации и предлагает мудрейший образ действий.",
    structureTitle: "Структура Гексаграммы (卦)",
    lineIntro: "6 линий (爻, Яо)",
    lineYang: "каждая линия либо сплошная (Ян, активная), либо прерывистая (Инь, восприимчивая)",
    lineYin: "",
    trigramIntro: "2 триграммы (верхняя + нижняя)",
    trigramNature: "каждая представляет природную силу: Небо, Земля, Гром, Гора, Вода, Огонь, Озеро, Ветер",
    judgmentTitle: "Суждение (卦辞)",
    judgmentDesc: "основной оракульный текст",
    lineStatementsTitle: "Утверждения Линий (爻辞)",
    lineStatementsDesc: "конкретный совет для каждой меняющейся линии",
    baguaTitle: "8 Триграмм (八卦, Багуа)",
    baguaNameH: "Название",
    baguaChinese: "Китайский",
    baguaNatureH: "Природа",
    baguaSymbolH: "Символ",
    baguaNames: ["Qian", "Kun", "Zhen", "Gen", "Kan", "Li", "Dui", "Xun"],
    baguaNature: ["Небо", "Земля", "Гром", "Гора", "Вода", "Огонь", "Озеро", "Ветер"],
    castTitle: "Как Бросить Гексаграмму",
    castSteps: ["Возьмите 3 монеты и сосредоточьтесь на вопросе", "Бросьте монеты 6 раз (снизу вверх)", "Посчитайте: 3 орла = старый Ян (меняющийся), 2 орла = молодой Ян, 2 решки = молодая Инь, 3 решки = старая Инь (меняющаяся)", "Постройте гексаграмму — первый бросок = нижняя линия", "Прочитайте текст гексаграммы и меняющиеся линии"],
    tryTitle: "Попробуйте Гадание И-Цзин",
    tryBody: "Наш онлайн-инструмент И-Цзин выполняет бросание монет за вас и предоставляет чёткое толкование вашей гексаграммы с историческим контекстом и практическим советом.",
    faqs: [
      { q: "Что такое И-Цзин?", a: "И-Цзин (Книга Перемен) — древний китайский текст возрастом более 3000 лет. Это система из 64 гексаграмм, каждая из которых описывает определённую жизненную ситуацию и даёт мудрый совет." },
      { q: "Как работает гадание И-Цзин?", a: "Вы задаёте вопрос, система генерирует гексаграмму, и вы получаете толкование. И-Цзин не предсказывает будущее — он раскрывает динамику вашей ситуации и предлагает наилучший путь." },
      { q: "Что означают 64 гексаграммы?", a: "Каждая гексаграмма представляет фундаментальную жизненную ситуацию или паттерн изменений. Например, Гексаграмма 1 (Цянь) представляет творчество и инициативу, а Гексаграмма 2 (Кунь) — восприимчивость и терпение." },
      { q: "Может ли И-Цзин предсказывать будущее?", a: "И-Цзин не предсказывает будущее как инструмент гадания. Вместо этого он анализирует текущую динамику вашей ситуации и предполагает, как события могут развиваться, основываясь на текущих паттернах." },
      { q: "Как толковать меняющуюся линию?", a: "Меняющиеся линии (старый ян или старая инь) указывают на точку трансформации. Текст линии даёт конкретный совет для вашей ситуации, а результирующая гексаграмма показывает, куда движется ситуация." },
      { q: "В чём разница между И-Цзин и Дао Дэ Цзин?", a: "Оба являются основополагающими китайскими классическими текстами. И-Цзин — это текст для гадания и философский труд о переменах. Дао Дэ Цзин — философская поэма о Дао (Пути) и добродетели. Они дополняют друг друга в китайской мысли." },
      { q: "Это платно?", a: "Вы сами выбираете сумму взноса — от $1. Первые 2 чтения бесплатны (в режиме предпросмотра). Это добровольный вклад, а не покупка." },
    ],
    cta: "Задать Вопрос И-Цзин — от $1",
    disclaimer: "Только для культурного ознакомления. Не является профессиональной консультацией.",
  },
  ja: {
    title: "易経占い：変化の書 初心者ガイド | Chinese Culture Studio",
    desc: "易経（周易）とは何か、占いはどのように機能するのか？卦、変爻、リーディングの解釈方法を学びましょう。",
    ogTitle: "易経占い：初心者ガイド",
    ogDesc: "易経とは何か、卦の仕組みを解説する完全ガイド。",
    heading: "易経占い：初心者ガイド",
    subtitle: "3000年の歴史を持つ易経を理解する — コイン投げから卦の解釈まで。",
    whatTitle: "易経とは？",
    whatBody1: "易経（易经）は3000年以上前の最古の中国古典テキストの一つです。もともと周王朝の統治者のための占い手引書でしたが、儒学、道教、そして中国思想に数千年にわたって影響を与えた深遠な哲学書へと発展しました。",
    whatBody2: "易経の核心は64の卦（六十四卦）— 宇宙の変化の基本的なパターンを表す六本線のシンボルです。各卦は特定の状況や人生の段階を説明し、それをどう乗り越えるかの助言を与えます。",
    howTitle: "易経占いはどのように機能するのか？",
    howBody: "質問をし、六本の線を立て（コインまたは蓍草を使用）、卦を受け取ります。易経は卦のテキストを通して「答えます」— しかし占いとは異なり、未来を予言するのではなく、状況の根底にある力学を明らかにし、最も賢明な行動を提案します。",
    structureTitle: "卦の構造（卦, Gua）",
    lineIntro: "6本の線（爻, Yao）",
    lineYang: "各線は実線（陽、能動的）または破線（陰、受容的）",
    lineYin: "",
    trigramIntro: "2つの八卦（上卦＋下卦）",
    trigramNature: "それぞれ自然の力を表す：天、地、雷、山、水、火、沢、風",
    judgmentTitle: "卦辞",
    judgmentDesc: "主要な託宣テキスト",
    lineStatementsTitle: "爻辞",
    lineStatementsDesc: "各変爻に対する具体的な助言",
    baguaTitle: "八卦（Bagua）",
    baguaNameH: "名称",
    baguaChinese: "中国語",
    baguaNatureH: "自然",
    baguaSymbolH: "象徴",
    baguaNames: ["乾", "坤", "震", "艮", "坎", "離", "兌", "巽"],
    baguaNature: ["天", "地", "雷", "山", "水", "火", "沢", "風"],
    castTitle: "卦の立て方",
    castSteps: ["3枚のコインを手に取り、質問に集中する", "コインを6回投げる（下から上へ）", "各回を数える：3表＝老陽（変爻）、2表＝少陽、2裏＝少陰、3裏＝老陰（変爻）", "卦を組み立てる — 1回目の投げ＝一番下の線", "卦のテキストと変爻を読む"],
    tryTitle: "易経リーディングを試す",
    tryBody: "当サイトのオンライン易経ツールがコイン投げを代行し、歴史的な文脈と実践的なアドバイスを含む明快な卦の解釈を提供します。",
    faqs: [
      { q: "易経とは何ですか？", a: "易経（変化の書）は3000年以上前の古代中国テキストです。64の卦からなる体系で、それぞれが特定の人生の状況を説明し、賢明な助言を与えます。" },
      { q: "易経占いはどのように機能しますか？", a: "質問をすると、システムが卦を生成し、解釈を受け取ります。易経は未来を予言するのではなく、状況の力学を明らかにし、最も賢明な道を提案します。" },
      { q: "64卦は何を意味しますか？", a: "各卦は人生の根本的な状況や変化のパターンを表します。例えば、第1卦（乾）は創造性と率先力を、第2卦（坤）は受容性と忍耐を表します。得られた卦はあなたの質問の背後にある力学を反映しています。" },
      { q: "易経は未来を予言できますか？", a: "易経は占い道具のように未来を予言するのではなく、現在の状況の力学を分析し、現在のパターンに基づいてどのように展開するかを示唆します。より良い選択をするための知恵を与えるものです。" },
      { q: "変爻はどう解釈すればよいですか？", a: "変爻（老陽または老陰）は変容のポイントを示します。その爻のテキストは具体的なアドバイスを与え、結果として生じる卦は状況の向かう方向を示します。変爻は転機を明らかにするため、特に注意を払ってください。" },
      { q: "易経と老子道徳経の違いは？", a: "両方とも中国の重要な古典ですが、目的が異なります。易経は占いの書であり変化についての哲学書です。道徳経は道と徳についての哲学詩です。中国思想において両者は補完し合います。" },
      { q: "有料ですか？", a: "支援額は$1からご自身で選べます。最初の2回は無料（プレビューモード）です。これは購入ではなく任意のご支援です。" },
    ],
    cta: "易経に問いかける — $1から",
    disclaimer: "文化理解のためのものです。専門的なアドバイスではありません。",
  },
};

const zhNames = ["乾", "坤", "震", "艮", "坎", "离", "兑", "巽"];
const symbols = ["☰", "☷", "☳", "☶", "☵", "☲", "☱", "☴"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = CONTENT[params.locale] || CONTENT.en;
  return {
    title: c.title,
    description: c.desc,
    openGraph: { title: c.ogTitle, description: c.ogDesc },
        alternates: {
      languages: {
        en: "https://www.culture-of-china.com/guide/iching",
        ru: "https://www.culture-of-china.com/ru/guide/iching",
        ja: "https://www.culture-of-china.com/ja/guide/iching",
      },
    },
      robots: "index, follow",
  };
}

export default function IChingGuide({ params: { locale } }: Props) {
  const c = CONTENT[locale] || CONTENT.en;

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">{c.heading}</h1>
      <p className="text-stone-500 text-sm">{c.subtitle}</p>
      <hr className="my-6 border-stone-200" />

      <h2>{c.whatTitle}</h2>
      <p>{c.whatBody1}</p>
      <p>{c.whatBody2}</p>

      <h2>{c.howTitle}</h2>
      <p>{c.howBody}</p>

      <h2>{c.structureTitle}</h2>
      <ul>
        <li><strong>{c.lineIntro}</strong> — {c.lineYang}</li>
        <li><strong>{c.trigramIntro}</strong> — {c.trigramNature}</li>
        <li><strong>{c.judgmentTitle}</strong> — {c.judgmentDesc}</li>
        <li><strong>{c.lineStatementsTitle}</strong> — {c.lineStatementsDesc}</li>
      </ul>

      <h2>{c.baguaTitle}</h2>
      <table className="w-full text-sm border-collapse not-prose my-4">
        <thead><tr className="border-b border-stone-200"><th className="text-left py-2 pr-4">{c.baguaNameH}</th><th className="text-left py-2 pr-4">{c.baguaChinese}</th><th className="text-left py-2 pr-4">{c.baguaNatureH}</th><th className="text-left py-2">{c.baguaSymbolH}</th></tr></thead>
        <tbody>
          {c.baguaNames.map((name, i) => (
            <tr key={name} className="border-b border-stone-100">
              <td className="py-2 pr-4">{name}</td>
              <td className="py-2 pr-4">{zhNames[i]}</td>
              <td className="py-2 pr-4">{c.baguaNature[i]}</td>
              <td className="py-2">{symbols[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{c.castTitle}</h2>
      <ol>
        {c.castSteps.map((step) => <li key={step}>{step}</li>)}
      </ol>

      <h2>{c.tryTitle}</h2>
      <p>{c.tryBody}</p>

      <GuideFaq lang={locale} faqs={c.faqs} />

      <div className="not-prose my-8">
        <Link href="/divination" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>
          {c.cta}
        </Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">{c.disclaimer}</p>
    </article>
  );
}
