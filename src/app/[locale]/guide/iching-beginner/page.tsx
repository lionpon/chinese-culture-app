import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";

type Props = { params: { locale: string } };

const CONTENT: Record<string, { title: string; desc: string; ogTitle: string; ogDesc: string; heading: string; subtitle: string; whatTitle: string; whatBody: string; howAskTitle: string; howAskBody: string; howAskIntro: string; howAskExamples: string[]; howAskAvoid: string; methodTitle: string; coinTitle: string; coinBody: string; yarrowTitle: string; yarrowBody: string; onlineTitle: string; onlineBody: string; readTitle: string; readSteps: string[]; tipsTitle: string; tips: string[]; faqs: { q: string; a: string }[]; cta: string; disclaimer: string }> = {
  en: {
    title: "I Ching for Beginners: How to Consult the Book of Changes | Chinese Culture Studio",
    desc: "A step-by-step beginner's guide: how to ask a question, cast coins, and understand an I Ching hexagram. Ancient wisdom for modern decisions.",
    ogTitle: "I Ching for Beginners",
    ogDesc: "How to consult the I Ching: a guide from scratch.",
    heading: "I Ching for Beginners: How to Consult the Book of Changes",
    subtitle: "A complete beginner's walkthrough — from forming your question to interpreting your hexagram.",
    whatTitle: "What Is the I Ching?",
    whatBody: "The I Ching (易经, Yì Jīng), or Book of Changes, is one of the oldest Chinese classical texts, over 3,000 years old. It is both an oracle and a philosophical treatise. The I Ching consists of 64 hexagrams — six-line figures, each representing an archetypal situation. Lines can be solid (yang) or broken (yin), and some become \"changing lines,\" creating a second hexagram that shows how the situation evolves.",
    howAskTitle: "How to Ask a Question",
    howAskBody: "",
    howAskIntro: "The I Ching answers open-ended questions about situations best — not yes/no questions. Good examples:",
    howAskExamples: ["\"What do I need to know about changing jobs?\"", "\"How should I approach this relationship?\"", "\"What should I focus on this month?\""],
    howAskAvoid: "Avoid questions like \"Will I get the job?\" — instead ask: \"What would help me find the right job?\"",
    methodTitle: "Three Casting Methods",
    coinTitle: "1. Three Coins (Traditional)",
    coinBody: "The most common method. Take three coins. Assign values: heads = 3 (yang), tails = 2 (yin). Toss all three — the sum gives the line type (6, 7, 8, or 9). Repeat 6 times, building the hexagram from bottom to top. Lines of 6 and 9 are changing lines.",
    yarrowTitle: "2. Yarrow Stalks (Classical)",
    yarrowBody: "The traditional method using 50 yarrow stalks. A complex ritual taking 15-20 minutes. Each casting involves multiple divisions and counts. Considered more meditative and precise.",
    onlineTitle: "3. Online / Numerical (Modern)",
    onlineBody: "Our online tool uses a proven numerical method. You can input your own numbers or let the system generate them. The result is identical to the coin method — a hexagram with changing lines and a derived hexagram.",
    readTitle: "How to Read a Hexagram",
    readSteps: [
      "Name and number: Each of the 64 hexagrams has a name reflecting its essence (e.g., Hexagram 1: \"The Creative\").",
      "Judgment (卦辞): The main verdict — describes the overall situation and the correct attitude.",
      "Image (象辞): The symbolic meaning of the two trigrams that compose the hexagram.",
      "Changing lines (爻辞): If you have lines of 6 or 9 — read the text for each. These are specific guidance for your situation.",
      "Derived hexagram: After changing lines, a second hexagram forms — this shows where the situation is heading.",
    ],
    tipsTitle: "Tips for Beginners",
    tips: [
      "Start with one question per session.",
      "Keep a journal of your questions and results — you will see patterns over time.",
      "Don't re-ask the same question repeatedly — the I Ching gives counsel, not prediction.",
      "Meditate on the answer for a few minutes before looking up the \"correct\" interpretation.",
    ],
    faqs: [
      { q: "Do I need to believe in the I Ching for it to work?", a: "No. Many use the I Ching as a reflection tool — it offers fresh perspectives, not supernatural prophecy. Psychologist Carl Jung saw it as a tool of synchronicity." },
      { q: "How many times can I consult it per day?", a: "One question per session is recommended. Tradition advises no more than three consultations per day — the I Ching works best with moderate use." },
      { q: "What if I don't have coins?", a: "You can use our free online tool — it uses the same mathematical principle as the coin method." },
    ],
    cta: "Try the I Ching Now — from $1",
    disclaimer: "For cultural appreciation only.",
  },
  ru: {
    title: "И-Цзин для Начинающих: Как Гадать на Книге Перемен | Chinese Culture Studio",
    desc: "Пошаговое руководство для начинающих: как задать вопрос, бросить монеты и понять гексаграмму И-Цзин. Древняя мудрость для современных решений.",
    ogTitle: "И-Цзин для Начинающих",
    ogDesc: "Как гадать на И-Цзин: руководство с нуля.",
    heading: "И-Цзин для Начинающих: Как Гадать на Книге Перемен",
    subtitle: "Полное руководство для новичков — от формулировки вопроса до интерпретации гексаграммы.",
    whatTitle: "Что Такое И-Цзин?",
    whatBody: "И-Цзин (易经, Yì Jīng), или Книга Перемен — один из древнейших китайских классических текстов, которому более 3000 лет. Это одновременно оракул и философский трактат. И-Цзин состоит из 64 гексаграмм — шестилинейных фигур, каждая из которых представляет архетипическую ситуацию. Линии могут быть сплошными (ян) или прерывистыми (инь), а некоторые становятся «меняющимися», создавая вторую гексаграмму, показывающую развитие ситуации.",
    howAskTitle: "Как Задать Вопрос",
    howAskBody: "",
    howAskIntro: "И-Цзин лучше всего отвечает на открытые вопросы о ситуациях, а не на вопросы «да/нет». Хорошие примеры:",
    howAskExamples: ["«Что мне нужно знать о смене работы?»", "«Как лучше подойти к этим отношениям?»", "«На чём мне сосредоточиться в этом месяце?»"],
    howAskAvoid: "Избегайте вопросов вроде «Получу ли я работу?» — вместо этого спросите: «Что поможет мне найти правильную работу?»",
    methodTitle: "Три Способа Гадания",
    coinTitle: "1. Три Монеты (Традиционный)",
    coinBody: "Самый распространённый метод. Возьмите три монеты. Назначьте сторонам значения: орёл = 3 (ян), решка = 2 (инь). Бросьте все три — сумма даёт тип линии (6, 7, 8 или 9). Повторите 6 раз, строя гексаграмму снизу вверх. Линии 6 и 9 — меняющиеся.",
    yarrowTitle: "2. Стебли Тысячелистника (Классический)",
    yarrowBody: "Традиционный метод с 50 стеблями тысячелистника. Сложный ритуал, занимающий 15-20 минут. Каждое бросание требует нескольких разделений и подсчётов. Считается более медитативным и точным.",
    onlineTitle: "3. Онлайн / Числовой (Современный)",
    onlineBody: "Наш онлайн-инструмент использует проверенный числовой метод. Вы можете ввести свои числа или позволить системе сгенерировать их. Результат идентичен методу монет — гексаграмма с меняющимися линиями и производной гексаграммой.",
    readTitle: "Как Читать Гексаграмму",
    readSteps: [
      "Название и номер: Каждая из 64 гексаграмм имеет имя, отражающее её суть (например, Гексаграмма 1: «Творчество»).",
      "Суждение (卦辞): Основной вердикт — описывает общую ситуацию и правильное отношение.",
      "Образ (象辞): Символическое значение триграмм, составляющих гексаграмму.",
      "Меняющиеся линии (爻辞): Если есть линии 6 или 9 — читайте текст для каждой из них. Это конкретные советы для вашей ситуации.",
      "Производная гексаграмма: После изменения линий образуется вторая гексаграмма — она показывает, к чему идёт ситуация.",
    ],
    tipsTitle: "Советы для Начинающих",
    tips: [
      "Начинайте с одного вопроса за сеанс.",
      "Записывайте свои вопросы и результаты — со временем увидите паттерны.",
      "Не переспрашивайте один и тот же вопрос многократно — И-Цзин даёт совет, а не предсказание.",
      "Медитируйте над ответом несколько минут, прежде чем искать «правильную» интерпретацию.",
    ],
    faqs: [
      { q: "Нужно ли верить в И-Цзин, чтобы он работал?", a: "Нет. Многие используют И-Цзин как инструмент размышления — он предлагает новые перспективы, а не сверхъестественные пророчества. Психолог Карл Юнг считал его инструментом синхронистичности." },
      { q: "Сколько раз можно гадать в день?", a: "Рекомендуется один вопрос за сеанс. Традиция советует не более трёх гаданий в день — И-Цзин лучше всего работает при умеренном использовании." },
      { q: "Что если у меня нет монет?", a: "Вы можете использовать наш бесплатный онлайн-инструмент — он использует тот же математический принцип, что и метод монет." },
    ],
    cta: "Попробовать И-Цзин Сейчас — от $1",
    disclaimer: "Для культурного ознакомления.",
  },
  ja: {
    title: "易経入門：変化の書の占い方 | Chinese Culture Studio",
    desc: "初心者のためのステップバイステップガイド：質問の仕方、コインの投げ方、卦の読み方。古代の知恵を現代の決断に。",
    ogTitle: "易経入門",
    ogDesc: "易経の占い方：ゼロからのガイド。",
    heading: "易経入門：変化の書の占い方",
    subtitle: "初心者のための完全ガイド — 質問の作り方から卦の解釈まで。",
    whatTitle: "易経とは？",
    whatBody: "易経（易经, Yì Jīng）は3000年以上前の最古の中国古典テキストの一つです。託宣であると同時に哲学書でもあります。易経は64の卦（六十四卦）からなり、それぞれが典型的な状況を表す六本線の図です。線は実線（陽）または破線（陰）で、「変爻」となるものもあり、状況がどう展開するかを示す第二の卦を作り出します。",
    howAskTitle: "質問の仕方",
    howAskBody: "",
    howAskIntro: "易経は「はい/いいえ」の質問ではなく、状況についてのオープンな質問に最もよく答えます。良い例：",
    howAskExamples: ["「転職について何を知っておくべきか？」", "「この関係にどうアプローチすべきか？」", "「今月は何に集中すべきか？」"],
    howAskAvoid: "「その仕事に就けるか？」のような質問は避け、代わりに「適切な仕事を見つけるには何が助けになるか？」と尋ねましょう。",
    methodTitle: "三つの卦の立て方",
    coinTitle: "1. 三枚のコイン（伝統的）",
    coinBody: "最も一般的な方法です。三枚のコインを用意します。表＝3（陽）、裏＝2（陰）と割り当てます。三枚すべてを投げ、合計値が線の種類（6, 7, 8, 9）を決めます。6回繰り返し、下から上へ卦を組み立てます。6と9の線が変爻です。",
    yarrowTitle: "2. 蓍草（古典的）",
    yarrowBody: "50本の蓍草を使う伝統的な方法です。15〜20分かかる複雑な儀式です。各回の線を立てるのに複数回の分割と集計が必要です。より瞑想的で正確とされています。",
    onlineTitle: "3. オンライン / 数字（现代的）",
    onlineBody: "当サイトのオンラインツールは検証済みの数字方式を使用しています。ご自身で数字を入力するか、システムに生成させることができます。結果はコイン方式と同じ — 変爻と派生卦を含む卦が得られます。",
    readTitle: "卦の読み方",
    readSteps: [
      "名前と番号：64の卦それぞれに本質を表す名前があります（例：第一卦「乾」）。",
      "卦辞：主な判断 — 全体的な状況と正しい態度を説明します。",
      "象辞：卦を構成する二つの八卦の象徴的な意味。",
      "爻辞：6または9の線がある場合 — それぞれのテキストを読みます。これらは状況に対する具体的な指針です。",
      "派生卦：変爻の後、第二の卦が形成されます — 状況がどこへ向かっているかを示します。",
    ],
    tipsTitle: "初心者のためのヒント",
    tips: [
      "一回のセッションで一つの質問から始めましょう。",
      "質問と結果を日記に記録しましょう — 時間とともにパターンが見えてきます。",
      "同じ質問を繰り返し尋ねないでください — 易経は予言ではなく助言を与えます。",
      "「正しい」解釈を調べる前に、数分間その答えについて瞑想しましょう。",
    ],
    faqs: [
      { q: "易経が機能するには信じる必要がありますか？", a: "いいえ。多くの人が内省のツールとして易経を使っています — 超自然的な予言ではなく、新鮮な視点を提供します。心理学者カール・ユングはこれを共時性のツールと見なしました。" },
      { q: "一日に何回占えますか？", a: "一回のセッションで一つの質問が推奨されます。伝統では一日三回までとされています — 易経は適度な使用で最もよく機能します。" },
      { q: "コインがない場合は？", a: "当サイトの無料オンラインツールをご利用いただけます — コイン方式と同じ数学的原理を使用しています。" },
    ],
    cta: "今すぐ易経を試す — $1から",
    disclaimer: "文化理解のためのものです。",
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

export default function IChingBeginnerGuide({ params: { locale } }: Props) {
  const c = CONTENT[locale] || CONTENT.en;

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">{c.heading}</h1>
      <p className="text-stone-500 text-sm">{c.subtitle}</p>
      <hr className="my-6 border-stone-200" />

      <h2>{c.whatTitle}</h2>
      <p>{c.whatBody}</p>

      <h2>{c.howAskTitle}</h2>
      <p>{c.howAskIntro}</p>
      <ul>
        {c.howAskExamples.map((ex) => <li key={ex}>{ex}</li>)}
      </ul>
      <p>{c.howAskAvoid}</p>

      <h2>{c.methodTitle}</h2>
      <h3>{c.coinTitle}</h3>
      <p>{c.coinBody}</p>
      <h3>{c.yarrowTitle}</h3>
      <p>{c.yarrowBody}</p>
      <h3>{c.onlineTitle}</h3>
      <p>{c.onlineBody}</p>

      <h2>{c.readTitle}</h2>
      <ol>
        {c.readSteps.map((s) => <li key={s}>{s}</li>)}
      </ol>

      <h2>{c.tipsTitle}</h2>
      <ul>
        {c.tips.map((t) => <li key={t}>{t}</li>)}
      </ul>

      <GuideFaq lang={locale} faqs={c.faqs} />

      <div className="not-prose my-8 text-center">
        <Link href="/divination" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>
          {c.cta}
        </Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">{c.disclaimer}</p>
    </article>
  );
}
