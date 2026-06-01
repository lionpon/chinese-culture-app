import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";

type Props = { params: { locale: string } };

type Prediction = { sign: string; forecast: string };

const PREDICTIONS: Record<string, Prediction[]> = {
  en: [
    { sign: "Rat", forecast: "A steady year. Career opportunities in spring. Watch spending in summer. Good for building foundations." },
    { sign: "Ox", forecast: "Harmonious with Goat. Strong year for relationships and family. Professional recognition likely in the second half." },
    { sign: "Tiger", forecast: "A dynamic year. Travel and learning are favored. Caution with investments. Creative projects thrive." },
    { sign: "Rabbit", forecast: "Goat and Rabbit are friendly. Social life flourishes. Good year for collaboration and partnerships." },
    { sign: "Dragon", forecast: "A neutral year. Focus on health and routine. Steady progress rather than dramatic wins. Good for study." },
    { sign: "Snake", forecast: "Goat supports Snake's wisdom. Excellent for planning and strategy. Financial gains through careful choices." },
    { sign: "Horse", forecast: "Goat is Horse's best ally! An excellent year — luck in career, love, and creativity. One of the luckiest signs." },
    { sign: "Goat", forecast: "Your year (本命年)! Wear red for protection. A year of self-discovery. Be cautious with major decisions." },
    { sign: "Monkey", forecast: "A mixed year. Social opportunities abound but focus is needed. Good for networking, less so for solo work." },
    { sign: "Rooster", forecast: "A stable year. Hard work pays off. Good for career advancement. Watch health in winter." },
    { sign: "Dog", forecast: "A pleasant year. Emotional fulfillment. Good for home and family matters. Minor financial fluctuations." },
    { sign: "Pig", forecast: "Goat and Pig are harmonious. A joyful year with social celebrations. Good fortune in creative endeavors." },
  ],
  ru: [
    { sign: "Крыса", forecast: "Стабильный год. Карьерные возможности весной. Следите за расходами летом. Хорошо для фундамента." },
    { sign: "Бык", forecast: "Гармония с Козой. Сильный год для отношений и семьи. Профессиональное признание во второй половине." },
    { sign: "Тигр", forecast: "Динамичный год. Путешествия и обучение благоприятны. Осторожность с инвестициями. Творчество процветает." },
    { sign: "Кролик", forecast: "Кролик и Коза дружественны. Социальная жизнь цветёт. Хороший год для партнёрства и коллабораций." },
    { sign: "Дракон", forecast: "Нейтральный год. Фокус на здоровье и режим. Стабильный прогресс. Хорошо для учёбы." },
    { sign: "Змея", forecast: "Коза поддерживает мудрость Змеи. Отлично для планирования и стратегии. Финансовые выгоды через осторожность." },
    { sign: "Лошадь", forecast: "Коза — лучший союзник Лошади! Отличный год — удача в карьере, любви и творчестве. Один из самых везучих знаков." },
    { sign: "Коза", forecast: "Ваш год (本命年)! Носите красное для защиты. Год самопознания. Осторожность с крупными решениями." },
    { sign: "Обезьяна", forecast: "Смешанный год. Много социальных возможностей, но нужен фокус. Хорошо для нетворкинга." },
    { sign: "Петух", forecast: "Стабильный год. Труд окупается. Хорошо для карьерного роста. Следите за здоровьем зимой." },
    { sign: "Собака", forecast: "Приятный год. Эмоциональное удовлетворение. Хорошо для дома и семьи. Небольшие финансовые колебания." },
    { sign: "Свинья", forecast: "Свинья и Коза гармоничны. Радостный год с праздниками. Удача в творческих начинаниях." },
  ],
  ja: [
    { sign: "子（ねずみ）", forecast: "安定した年。春にキャリアのチャンス。夏は出費に注意。基盤作りに良い年。" },
    { sign: "丑（うし）", forecast: "未と調和。人間関係と家族にとって強い年。下半期に仕事での評価が期待できます。" },
    { sign: "寅（とら）", forecast: "活動的な年。旅行と学習に恵まれます。投資には注意。創造的プロジェクトが開花。" },
    { sign: "卯（うさぎ）", forecast: "未と卯は友好的。社交面が充実。コラボレーションやパートナーシップに良い年。" },
    { sign: "辰（たつ）", forecast: "中立の年。健康と日常習慣に集中。劇的な成功より着実な進歩。学習に良い。" },
    { sign: "巳（へび）", forecast: "未が巳の知恵をサポート。計画と戦略に最適。慎重な選択による金銭的利益。" },
    { sign: "午（うま）", forecast: "未は午の最高の味方！キャリア、恋愛、創造性に幸運。最も幸運な干支の一つ。" },
    { sign: "未（ひつじ）", forecast: "あなたの本命年！厄除けに赤を身につけて。自己発見の年。大きな決断は慎重に。" },
    { sign: "申（さる）", forecast: "混合の年。社交の機会は豊富ですが集中力が必要。ネットワーキングに良いが、単独作業はやや不調。" },
    { sign: "酉（とり）", forecast: "安定した年。努力が報われます。キャリアアップに良い。冬は健康に注意。" },
    { sign: "戌（いぬ）", forecast: "心地よい年。情緒的な充実。家庭と家族の問題に良い。小さな金銭的変動。" },
    { sign: "亥（いのしし）", forecast: "未と亥は調和。社交的な祝い事のある楽しい年。創造的な試みに幸運。" },
  ],
};

const CONTENT: Record<string, {
  title: string; desc: string; ogTitle: string; ogDesc: string;
  heading: string; subtitle: string;
  whenTitle: string; whenBody1: string; whenBody2: string;
  symbolTitle: string; symbolBody1: string; symbolBody2: string;
  symbolItem1: string; symbolItem2: string; symbolItem3: string;
  tradTitle: string;
  trad1: string; trad2: string; trad3: string; trad4: string; trad5: string;
  predTitle: string;
  prepTitle: string;
  prep1: string; prep2: string; prep3: string; prep4: string; prep5: string;
  faqs: { q: string; a: string }[];
  cta: string; disclaimer: string;
}> = {
  en: {
    title: "Chinese New Year 2027: Year of the Goat — Dates, Traditions, Predictions | Chinese Culture Studio",
    desc: "Chinese New Year 2027: when the Year of the Fire Goat begins, celebration traditions, what to prepare, and zodiac predictions for every sign.",
    ogTitle: "Chinese New Year 2027: Year of the Goat",
    ogDesc: "Dates, traditions, and predictions for the Year of the Fire Goat.",
    heading: "Chinese New Year 2027: Year of the Goat — Complete Guide",
    subtitle: "Everything about Chinese New Year 2027: date, traditions, food, and zodiac predictions for every sign.",
    whenTitle: "When Is Chinese New Year 2027?",
    whenBody1: "Chinese New Year 2027 falls on <strong>February 6, 2027</strong>. This marks the beginning of the Year of the Fire Goat (丁未, dīng wèi). The celebration lasts 15 days, ending with the Lantern Festival on February 20, 2027.",
    whenBody2: "New Year's Eve is February 5, 2027 — time for the traditional reunion dinner (年夜饭).",
    symbolTitle: "Year of the Goat: Symbolism & Energy",
    symbolBody1: "The Goat (羊, yáng) is the eighth sign of the Chinese zodiac. It symbolizes <strong>gentleness, creativity, empathy, and resilience</strong>. Unlike aggressive signs, the Goat achieves goals through harmony and persistence.",
    symbolBody2: "2027 is a Fire Goat year. Fire gives the Goat extra energy and charisma. This is a year for:",
    symbolItem1: "<strong>Creative projects:</strong> The Goat is the most artistic zodiac sign. Excellent time for art, music, and design.",
    symbolItem2: "<strong>Strengthening relationships:</strong> The Goat values family and community — a perfect year for bonding.",
    symbolItem3: "<strong>Self-care:</strong> Goat energy is gentle — don't overload yourself, make time for rest.",
    tradTitle: "Traditions & Customs",
    trad1: "<strong>House cleaning (大扫除):</strong> Days before New Year — sweep away bad luck and make room for good fortune.",
    trad2: "<strong>Red envelopes (红包):</strong> Money in red envelopes given to children and unmarried adults — a blessing of luck.",
    trad3: "<strong>Reunion dinner (年夜饭):</strong> Fish (abundance), dumplings (wealth), sticky rice (unity) — every dish is symbolic.",
    trad4: "<strong>Fireworks and firecrackers:</strong> Scare away evil spirits and welcome the New Year.",
    trad5: "<strong>Lantern Festival (元宵节):</strong> Day 15 — ends the celebration with lanterns and sweet glutinous rice balls (tāngyuán).",
    predTitle: "2027 Predictions for Each Zodiac Sign",
    prepTitle: "What to Prepare for New Year",
    prep1: "<strong>Fish (鱼, yú):</strong> Leave some leftover — symbolizes abundance carrying into the next year.",
    prep2: "<strong>Dumplings (饺子, jiǎozi):</strong> Shaped like ancient gold ingots — for wealth.",
    prep3: "<strong>Spring rolls (春卷, chūnjuǎn):</strong> Golden and crispy — symbolizing gold bars.",
    prep4: "<strong>Rice cake (年糕, niángāo):</strong> The name sounds like \"year higher\" — for promotion and growth.",
    prep5: "<strong>Glutinous rice balls (汤圆, tāngyuán):</strong> Round — symbolizing family unity and completeness.",
    faqs: [
      { q: "Why does the Chinese New Year date change?", a: "The Chinese calendar is lunisolar. New Year falls on the second new moon after the winter solstice, between January 21 and February 20." },
      { q: "What to wear for Chinese New Year?", a: "Red! Red wards off evil spirits and brings luck. Avoid black and white (mourning colors). In your zodiac year (if you're a Goat), wear red underwear for protection." },
      { q: "Can I wash my hair on New Year's Day?", a: "Traditionally no — washing hair or cleaning on Day 1 may wash away good luck. Clean beforehand." },
    ],
    cta: "Get Your 2027 I Ching Forecast — from $1",
    disclaimer: "For cultural appreciation only.",
  },
  ru: {
    title: "Китайский Новый Год 2027: Год Козы — Даты, Традиции, Прогнозы | Chinese Culture Studio",
    desc: "Китайский Новый год 2027: когда начинается год Огненной Козы, традиции празднования, что готовить и какие прогнозы для каждого знака зодиака.",
    ogTitle: "Китайский Новый Год 2027: Год Козы",
    ogDesc: "Даты, традиции и прогнозы на год Огненной Козы.",
    heading: "Китайский Новый Год 2027: Год Козы — Полный Гид",
    subtitle: "Всё о китайском Новом годе 2027: дата, традиции, еда и прогнозы для каждого знака зодиака.",
    whenTitle: "Когда Китайский Новый Год 2027?",
    whenBody1: "Китайский Новый год 2027 выпадает на <strong>6 февраля 2027 года</strong>. Это начало года Огненной Козы (丁未, dīng wèi). Празднование длится 15 дней и завершается Фестивалем Фонарей 20 февраля 2027.",
    whenBody2: "Канун Нового года — 5 февраля 2027, время для традиционного семейного ужина (年夜饭).",
    symbolTitle: "Год Козы: Символика и Энергия",
    symbolBody1: "Коза (羊, yáng) — восьмой знак китайского зодиака. Она символизирует <strong>мягкость, творчество, сочувствие и стойкость</strong>. В отличие от агрессивных знаков, Коза достигает целей через гармонию и настойчивость.",
    symbolBody2: "2027 — год Огненной Козы. Огонь придаёт Козе дополнительную энергию и харизму. Это год для:",
    symbolItem1: "<strong>Творческих проектов:</strong> Коза — самый артистичный знак зодиака. Прекрасное время для искусства, музыки и дизайна.",
    symbolItem2: "<strong>Укрепления отношений:</strong> Коза ценит семью и сообщество — идеальный год для сближения.",
    symbolItem3: "<strong>Самозаботы:</strong> Энергия Козы мягкая — не перегружайте себя, находите время для отдыха.",
    tradTitle: "Традиции и Обычаи",
    trad1: "<strong>Уборка дома (大扫除):</strong> За несколько дней до Нового года — вымести неудачу и освободить место для удачи.",
    trad2: "<strong>Красные конверты (红包):</strong> Деньги в красных конвертах дарят детям и неженатым — символ благословения и удачи.",
    trad3: "<strong>Новогодний ужин (年夜饭):</strong> Рыба (изобилие), пельмени (богатство), клейкий рис (единство) — каждое блюдо символично.",
    trad4: "<strong>Фейерверки и петарды:</strong> Отпугивают злых духов и приветствуют Новый год.",
    trad5: "<strong>Фестиваль Фонарей (元宵节):</strong> 15-й день — завершение праздника с фонарями и клейкими шариками танъюань.",
    predTitle: "Прогнозы для Каждого Знака в 2027",
    prepTitle: "Что Приготовить на Новый Год",
    prep1: "<strong>Рыба (鱼, yú):</strong> Оставьте немного — символ изобилия, переходящего в следующий год.",
    prep2: "<strong>Пельмени (饺子, jiǎozi):</strong> Форма как у древних золотых слитков — к богатству.",
    prep3: "<strong>Весенние рулеты (春卷, chūnjuǎn):</strong> Золотистые и хрустящие — символ золотых слитков.",
    prep4: "<strong>Рисовый пирог (年糕, niángāo):</strong> Название звучит как «год выше» — к повышению и росту.",
    prep5: "<strong>Клейкие рисовые шарики (汤圆, tāngyuán):</strong> Круглые — символ семейного единства и полноты.",
    faqs: [
      { q: "Почему дата китайского Нового года меняется?", a: "Китайский календарь — лунно-солнечный. Новый год выпадает на второе новолуние после зимнего солнцестояния, между 21 января и 20 февраля." },
      { q: "Что надеть на китайский Новый год?", a: "Красное! Красный цвет отпугивает злых духов и приносит удачу. Избегайте чёрного и белого (цвета траура). В год Козы — ваш знак (если вы Коза), носите красное бельё для защиты." },
      { q: "Можно ли мыть голову в Новый год?", a: "По традиции нельзя мыть голову или убираться в первый день — можно «смыть» удачу. Уборку делают заранее." },
    ],
    cta: "Узнать Свой Прогноз на 2027 — от $1",
    disclaimer: "Для культурного ознакомления.",
  },
  ja: {
    title: "2027年 旧正月：未年 — 日付・伝統・予測 | Chinese Culture Studio",
    desc: "2027年旧正月：火の未年の始まり、祝いの伝統、準備するもの、全干支の運勢予測。",
    ogTitle: "2027年 旧正月：未年",
    ogDesc: "火の未年の日付、伝統、運勢予測。",
    heading: "2027年 旧正月：未年 — 完全ガイド",
    subtitle: "2027年旧正月のすべて：日付、伝統、食べ物、全干支の運勢予測。",
    whenTitle: "2027年の旧正月はいつ？",
    whenBody1: "2027年の旧正月は<strong>2027年2月6日</strong>です。これは火の未年（丁未）の始まりを示します。祝いは15日間続き、2027年2月20日の元宵節で締めくくられます。",
    whenBody2: "大晦日は2027年2月5日 — 伝統的な団らんの夕食（年夜饭）の時間です。",
    symbolTitle: "未年：象徴とエネルギー",
    symbolBody1: "羊（未）は中国十二支の8番目のサインです。<strong>優しさ、創造性、共感、回復力</strong>を象徴します。攻撃的なサインとは異なり、未は調和と粘り強さを通じて目標を達成します。",
    symbolBody2: "2027年は火の未年です。火は未にさらなるエネルギーとカリスマを与えます。この年に適していること：",
    symbolItem1: "<strong>創造的プロジェクト：</strong>未は最も芸術的な干支です。アート、音楽、デザインに最適な時期。",
    symbolItem2: "<strong>人間関係の強化：</strong>未は家族とコミュニティを大切にします — 絆を深めるのに完璧な年。",
    symbolItem3: "<strong>セルフケア：</strong>未のエネルギーは穏やかです — 過負荷にならず、休息の時間を作りましょう。",
    tradTitle: "伝統と習慣",
    trad1: "<strong>大掃除（大扫除）：</strong>新年の数日前に — 厄を掃き出し幸運のための場所を作ります。",
    trad2: "<strong>お年玉（红包）：</strong>子供や未婚の大人に赤い封筒に入れたお金を渡します — 幸運の祝福。",
    trad3: "<strong>団らんの夕食（年夜饭）：</strong>魚（豊かさ）、餃子（富）、もち米（団結）— どの料理も象徴的です。",
    trad4: "<strong>花火と爆竹：</strong>悪霊を追い払い、新年を迎えます。",
    trad5: "<strong>元宵節（元宵节）：</strong>15日目 — 灯籠と甘い団子（湯円）で祝いを締めくくります。",
    predTitle: "2027年 各干支の運勢予測",
    prepTitle: "新年に準備するもの",
    prep1: "<strong>魚（鱼, yú）：</strong>少し残しておきましょう — 翌年に持ち越す豊かさを象徴します。",
    prep2: "<strong>餃子（饺子, jiǎozi）：</strong>古代の金塊の形 — 富を象徴。",
    prep3: "<strong>春巻き（春卷, chūnjuǎn）：</strong>黄金色でサクサク — 金の延べ棒を象徴。",
    prep4: "<strong>年糕（niángāo）：</strong>名前が「年が高い」と同音 — 昇進と成長を願って。",
    prep5: "<strong>湯円（tāngyuán）：</strong>丸い形 — 家族の団結と完全性を象徴。",
    faqs: [
      { q: "旧正月の日付が毎年変わるのはなぜですか？", a: "中国暦は太陰太陽暦です。旧正月は冬至の後の2回目の新月にあたり、1月21日から2月20日の間になります。" },
      { q: "旧正月に何を着ればいいですか？", a: "赤です！赤は悪霊を追い払い幸運を招きます。黒と白（喪の色）は避けましょう。本命年（未年の方）は厄除けに赤い下着を着用します。" },
      { q: "元旦に髪を洗ってもいいですか？", a: "伝統的には避けます — 元旦の洗髪や掃除は幸運を洗い流す可能性があります。事前に掃除を済ませましょう。" },
    ],
    cta: "2027年の易経予測を見る — $1から",
    disclaimer: "文化理解のためのものです。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = CONTENT[params.locale] || CONTENT.en;
  return { title: c.title, description: c.desc, openGraph: { title: c.ogTitle, description: c.ogDesc }, robots: "index, follow" };
}

export default function ChineseNewYear2027Guide({ params: { locale } }: Props) {
  const c = CONTENT[locale] || CONTENT.en;
  const predictions = PREDICTIONS[locale] || PREDICTIONS.en;

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">{c.heading}</h1>
      <p className="text-stone-500 text-sm">{c.subtitle}</p>
      <hr className="my-6 border-stone-200" />

      <h2>{c.whenTitle}</h2>
      <p dangerouslySetInnerHTML={{ __html: c.whenBody1 }} />
      <p>{c.whenBody2}</p>

      <h2>{c.symbolTitle}</h2>
      <p dangerouslySetInnerHTML={{ __html: c.symbolBody1 }} />
      <p>{c.symbolBody2}</p>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: c.symbolItem1 }} />
        <li dangerouslySetInnerHTML={{ __html: c.symbolItem2 }} />
        <li dangerouslySetInnerHTML={{ __html: c.symbolItem3 }} />
      </ul>

      <h2>{c.tradTitle}</h2>
      <ol>
        <li dangerouslySetInnerHTML={{ __html: c.trad1 }} />
        <li dangerouslySetInnerHTML={{ __html: c.trad2 }} />
        <li dangerouslySetInnerHTML={{ __html: c.trad3 }} />
        <li dangerouslySetInnerHTML={{ __html: c.trad4 }} />
        <li dangerouslySetInnerHTML={{ __html: c.trad5 }} />
      </ol>

      <h2>{c.predTitle}</h2>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
        {predictions.map((p) => (
          <div key={p.sign} className="card-classic p-3 text-sm">
            <p className="font-bold text-accent">{p.sign}</p>
            <p className="text-xs text-stone-500 mt-1">{p.forecast}</p>
          </div>
        ))}
      </div>

      <h2>{c.prepTitle}</h2>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: c.prep1 }} />
        <li dangerouslySetInnerHTML={{ __html: c.prep2 }} />
        <li dangerouslySetInnerHTML={{ __html: c.prep3 }} />
        <li dangerouslySetInnerHTML={{ __html: c.prep4 }} />
        <li dangerouslySetInnerHTML={{ __html: c.prep5 }} />
      </ul>

      <GuideFaq lang={locale} faqs={c.faqs} />

      <div className="not-prose my-8 text-center">
        <Link href="/divination" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>{c.cta}</Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">{c.disclaimer}</p>
    </article>
  );
}
