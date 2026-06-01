import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";

type Props = { params: { locale: string } };

type Element = { name: string; zh: string; direction: string; season: string; color: string; organ: string; trait: string; planet: string };

const ELEMENTS: Record<string, Element[]> = {
  en: [
    { name: "Wood", zh: "木", direction: "East", season: "Spring", color: "Green", organ: "Liver", trait: "Growth, flexibility, creativity, idealism", planet: "Jupiter" },
    { name: "Fire", zh: "火", direction: "South", season: "Summer", color: "Red", organ: "Heart", trait: "Passion, warmth, dynamism, charisma", planet: "Mars" },
    { name: "Earth", zh: "土", direction: "Center", season: "Late Summer", color: "Yellow", organ: "Spleen", trait: "Stability, nourishment, patience, reliability", planet: "Saturn" },
    { name: "Metal", zh: "金", direction: "West", season: "Autumn", color: "White", organ: "Lung", trait: "Structure, discipline, clarity, righteousness", planet: "Venus" },
    { name: "Water", zh: "水", direction: "North", season: "Winter", color: "Black/Blue", organ: "Kidney", trait: "Wisdom, adaptability, introspection, willpower", planet: "Mercury" },
  ],
  ru: [
    { name: "Дерево", zh: "木", direction: "Восток", season: "Весна", color: "Зелёный", organ: "Печень", trait: "Рост, гибкость, творчество, идеализм", planet: "Юпитер" },
    { name: "Огонь", zh: "火", direction: "Юг", season: "Лето", color: "Красный", organ: "Сердце", trait: "Страсть, тепло, динамизм, харизма", planet: "Марс" },
    { name: "Земля", zh: "土", direction: "Центр", season: "Позднее лето", color: "Жёлтый", organ: "Селезёнка", trait: "Стабильность, питание, терпение, надёжность", planet: "Сатурн" },
    { name: "Металл", zh: "金", direction: "Запад", season: "Осень", color: "Белый", organ: "Лёгкие", trait: "Структура, дисциплина, ясность, справедливость", planet: "Венера" },
    { name: "Вода", zh: "水", direction: "Север", season: "Зима", color: "Чёрный/Синий", organ: "Почки", trait: "Мудрость, адаптивность, воля", planet: "Меркурий" },
  ],
  ja: [
    { name: "木", zh: "木", direction: "東", season: "春", color: "緑", organ: "肝", trait: "成長、柔軟性、創造性、理想主義", planet: "木星" },
    { name: "火", zh: "火", direction: "南", season: "夏", color: "赤", organ: "心", trait: "情熱、温かさ、活力、カリスマ", planet: "火星" },
    { name: "土", zh: "土", direction: "中央", season: "晩夏", color: "黄", organ: "脾", trait: "安定、滋養、忍耐、信頼", planet: "土星" },
    { name: "金", zh: "金", direction: "西", season: "秋", color: "白", organ: "肺", trait: "構造、規律、明晰さ、正義", planet: "金星" },
    { name: "水", zh: "水", direction: "北", season: "冬", color: "黒/青", organ: "腎", trait: "知恵、適応力、内省、意志力", planet: "水星" },
  ],
};

const CONTENT: Record<string, {
  title: string; desc: string; ogTitle: string; ogDesc: string;
  heading: string; subtitle: string;
  whatTitle: string; whatBody: string;
  cyclesTitle: string;
  genTitle: string; genBody: string;
  ctrlTitle: string; ctrlBody: string;
  tableTitle: string;
  elH: string; zhH: string; dirH: string; seasonH: string; colorH: string; organH: string; traitH: string;
  findTitle: string; findBody1: string; findBody2: string; findBody3: string;
  appTitle: string; appItems: string[];
  faqs: { q: string; a: string }[];
  cta: string; disclaimer: string;
}> = {
  en: {
    title: "Five Elements (Wu Xing): Wood, Fire, Earth, Metal, Water | Chinese Culture Studio",
    desc: "A complete guide to the Five Elements of Chinese philosophy: generating & controlling cycles, traits of each element, and how to find yours.",
    ogTitle: "Five Elements (Wu Xing)",
    ogDesc: "Generating & controlling cycles, meaning of each element.",
    heading: "Five Elements (Wu Xing): A Complete Guide",
    subtitle: "Understanding the Five Elements is the key to Chinese metaphysics, medicine, and naming.",
    whatTitle: "What Is Wu Xing?",
    whatBody: "Wu Xing (五行, Wǔ Xíng) — the Five Phases or Five Elements — form the foundation of Chinese philosophy. Unlike the Greek four elements, Wu Xing describes not substances but <strong>processes and cycles of change</strong>. Each element represents a phase of Qi energy, and all five constantly interact through generating and controlling cycles. This system is used in Traditional Chinese Medicine, Feng Shui, astrology, martial arts, and Chinese naming.",
    cyclesTitle: "The Two Main Cycles",
    genTitle: "Generating Cycle (生, Shēng)",
    genBody: "Wood generates Fire (burns) → Fire generates Earth (ash) → Earth generates Metal (ore) → Metal generates Water (condensation) → Water generates Wood (nourishes). This cycle describes support and growth — like a mother nourishing a child.",
    ctrlTitle: "Controlling Cycle (克, Kè)",
    ctrlBody: "Wood controls Earth (roots) → Earth controls Water (dams) → Water controls Fire (extinguishes) → Fire controls Metal (melts) → Metal controls Wood (cuts). This cycle maintains balance — no single element should dominate.",
    tableTitle: "The Five Elements: Reference Table",
    elH: "Element", zhH: "Hanzi", dirH: "Direction", seasonH: "Season", colorH: "Color", organH: "Organ", traitH: "Personality",
    findTitle: "How to Find Your Element",
    findBody1: "Your personal element is determined by your birth date through the Ba-Zi (Eight Characters) system. Each of the four pillars (year, month, day, hour) has a heavenly stem and earthly branch — a combination of element and animal.",
    findBody2: "Most people have a <strong>dominant element</strong> (the day element), but other elements also appear in varying degrees. The balance of all five elements shapes personality, health, and fortune.",
    findBody3: "Try our Chinese name service — it includes a full Ba-Zi analysis with your elements.",
    appTitle: "Applications of the Five Elements",
    appItems: [
      "<strong>Chinese Medicine:</strong> Each element links to organs. Illness is an element imbalance; treatment restores harmony.",
      "<strong>Feng Shui:</strong> Home layout, colors, and materials are chosen by element to harmonize energy flow.",
      "<strong>Naming:</strong> Chinese names often include radicals linked to the element a child lacks in their Ba-Zi chart.",
      "<strong>Cooking:</strong> Foods are classified by five tastes (sour, bitter, sweet, pungent, salty) matching the elements.",
      "<strong>Martial Arts:</strong> Movements and strategies in styles like Xing Yi are based on Wu Xing cycles.",
    ],
    faqs: [
      { q: "What is my element?", a: "Your day element is determined by your Ba-Zi (Eight Characters) based on your full birth date. Try our naming service — it reveals your dominant element." },
      { q: "Can I have more than one element?", a: "Yes! Everyone has all five elements in varying degrees. The goal is balance among them, not dominance of one." },
      { q: "How do elements relate to Chinese zodiac?", a: "Each zodiac sign has a fixed element (e.g., Rat = Water), but the year also has a heavenly stem element, creating a 60-year cycle." },
    ],
    cta: "Discover Your Element & Ba-Zi — from $1",
    disclaimer: "For cultural appreciation only.",
  },
  ru: {
    title: "Пять Элементов (У-Син): Дерево, Огонь, Земля, Металл, Вода | Chinese Culture Studio",
    desc: "Полный гид по Пяти Элементам китайской философии: циклы порождения и контроля, характер каждого элемента и как узнать свой.",
    ogTitle: "Пять Элементов (У-Син)",
    ogDesc: "Циклы порождения и контроля, значение каждого элемента.",
    heading: "Пять Элементов (У-Син): Полный Гид",
    subtitle: "Понимание Пяти Элементов — ключ к китайской метафизике, медицине и именованию.",
    whatTitle: "Что Такое У-Син?",
    whatBody: "У-Син (五行, Wǔ Xíng) — это пять фаз или элементов, лежащих в основе китайской философии. В отличие от греческих четырёх элементов, У-Син описывает не вещества, а <strong>процессы и циклы изменений</strong>. Каждый элемент представляет собой фазу энергии Ци, и все пять постоянно взаимодействуют друг с другом через циклы порождения и контроля. Эта система используется в традиционной китайской медицине, фэн-шуй, астрологии, боевых искусствах и именовании.",
    cyclesTitle: "Два Главных Цикла",
    genTitle: "Цикл Порождения (生)",
    genBody: "Дерево порождает Огонь (горит) → Огонь порождает Землю (пепел) → Земля порождает Металл (руда) → Металл порождает Воду (конденсат) → Вода порождает Дерево (питает). Этот цикл описывает поддержку и рост — как мать питает ребёнка.",
    ctrlTitle: "Цикл Контроля (克)",
    ctrlBody: "Дерево контролирует Землю (корни) → Земля контролирует Воду (плотины) → Вода контролирует Огонь (тушит) → Огонь контролирует Металл (плавит) → Металл контролирует Дерево (рубит). Этот цикл обеспечивает баланс — ни один элемент не должен доминировать.",
    tableTitle: "Пять Элементов: Таблица",
    elH: "Элемент", zhH: "Хань", dirH: "Направление", seasonH: "Сезон", colorH: "Цвет", organH: "Орган", traitH: "Характер",
    findTitle: "Как Узнать Свой Элемент",
    findBody1: "Ваш личный элемент определяется по дате рождения через систему Ба-Цзы (Восемь Иероглифов). Каждый из четырёх столпов (год, месяц, день, час) имеет небесный ствол и земную ветвь — комбинацию элемента и животного.",
    findBody2: "У большинства людей есть <strong>основной элемент</strong> (элемент дня), но также присутствуют и другие элементы в разной степени. Баланс всех пяти элементов определяет характер, здоровье и удачу.",
    findBody3: "Попробуйте наш сервис китайского имени — он включает полный анализ Ба-Цзы с вашими элементами.",
    appTitle: "Применение Пяти Элементов",
    appItems: [
      "<strong>Китайская медицина:</strong> Каждый элемент связан с органами. Болезнь — это дисбаланс элементов; лечение восстанавливает гармонию.",
      "<strong>Фэн-шуй:</strong> Расположение дома, цвета и материалы выбираются по элементам для гармонизации энергии.",
      "<strong>Именование:</strong> Китайские имена часто включают радикалы, связанные с элементом, которого ребёнку не хватает в Ба-Цзы.",
      "<strong>Кулинария:</strong> Продукты классифицируются по пяти вкусам (кислый, горький, сладкий, острый, солёный), соответствующим элементам.",
      "<strong>Боевые искусства:</strong> Движения и стратегии в таких стилях, как Син-И, основаны на циклах У-Син.",
    ],
    faqs: [
      { q: "Какой у меня элемент?", a: "Ваш элемент дня определяется по Ба-Цзы (Восемь Иероглифов) на основе полной даты рождения. Попробуйте наш сервис имени — он покажет ваш доминирующий элемент." },
      { q: "Может ли у меня быть больше одного элемента?", a: "Да! У каждого есть все пять элементов в разной степени. Цель — баланс между ними, а не доминирование одного." },
      { q: "Как элементы связаны с китайским зодиаком?", a: "Каждый знак зодиака имеет фиксированный элемент (например, Крыса — Вода), но год также имеет элемент небесного ствола, создавая 60-летний цикл." },
    ],
    cta: "Узнать Свой Элемент и Ба-Цзы — от $1",
    disclaimer: "Для культурного ознакомления.",
  },
  ja: {
    title: "五行（木・火・土・金・水）：完全ガイド | Chinese Culture Studio",
    desc: "中国哲学の五行完全ガイド：相生・相克のサイクル、各元素の特性、あなたの元素の見つけ方。",
    ogTitle: "五行（木・火・土・金・水）",
    ogDesc: "相生・相克のサイクル、各元素の意味。",
    heading: "五行（ごぎょう）：完全ガイド",
    subtitle: "五行を理解することは中国の形而上学、医学、命名を理解する鍵です。",
    whatTitle: "五行とは？",
    whatBody: "五行（Wǔ Xíng）— 五つの段階または五元素は中国哲学の基礎を形成します。ギリシャの四大元素とは異なり、五行は物質ではなく<strong>変化のプロセスと循環</strong>を表します。各元素は気のエネルギーの一段階を表し、五つすべてが相生・相克サイクルを通じて絶えず相互作用します。この体系は中医学、風水、占星術、武術、命名に用いられています。",
    cyclesTitle: "二つの主要サイクル",
    genTitle: "相生（そうしょう）",
    genBody: "木は火を生じ（燃える）→ 火は土を生じ（灰）→ 土は金を生じ（鉱石）→ 金は水を生じ（結露）→ 水は木を生じ（養う）。このサイクルはサポートと成長を表します — 母が子を育むように。",
    ctrlTitle: "相克（そうこく）",
    ctrlBody: "木は土に克つ（根）→ 土は水に克つ（堤防）→ 水は火に克つ（消火）→ 火は金に克つ（溶融）→ 金は木に克つ（切断）。このサイクルはバランスを保ちます — 一つの元素が支配的になるべきではありません。",
    tableTitle: "五行 参照表",
    elH: "元素", zhH: "漢字", dirH: "方位", seasonH: "季節", colorH: "色", organH: "臓器", traitH: "特性",
    findTitle: "自分の元素を知る方法",
    findBody1: "あなたのパーソナル元素は八字（Ba-Zi）システムを通じて生年月日から決定されます。四柱（年・月・日・時）それぞれに天干と地支 — 元素と動物の組み合わせがあります。",
    findBody2: "ほとんどの人には<strong>主要元素</strong>（日の元素）がありますが、他の元素も様々な程度で存在します。五元素すべてのバランスが性格、健康、運勢を形成します。",
    findBody3: "当サイトの命名サービスをお試しください — あなたの元素を含む完全な八字分析が得られます。",
    appTitle: "五行の応用",
    appItems: [
      "<strong>中医学：</strong>各元素は臓器と結びついています。病気は元素の不調和であり、治療は調和を取り戻します。",
      "<strong>風水：</strong>家の間取り、色、素材は気の流れを調和させるため元素に基づいて選ばれます。",
      "<strong>命名：</strong>中国名はしばしば八字で不足している元素に関連する部首を含みます。",
      "<strong>料理：</strong>食べ物は五味（酸味、苦味、甘味、辛味、塩味）に分類され、元素に対応します。",
      "<strong>武術：</strong>形意拳などの武術の動きや戦略は五行の循環に基づいています。",
    ],
    faqs: [
      { q: "自分の元素は何ですか？", a: "あなたの日の元素は完全な生年月日に基づく八字（Ba-Zi）で決まります。当サイトの命名サービスをお試しください — あなたの主要元素がわかります。" },
      { q: "複数の元素を持つことはありますか？", a: "はい！誰もが五つすべての元素を様々な程度で持っています。目標はいずれか一つを際立たせることではなく、バランスをとることです。" },
      { q: "元素と干支の関係は？", a: "各干支には固定元素がありますが（例：子＝水）、年には天干の元素もあり、60年の周期を作ります。" },
    ],
    cta: "あなたの元素と八字を知る — $1から",
    disclaimer: "文化理解のためのものです。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = CONTENT[params.locale] || CONTENT.en;
  return { title: c.title, description: c.desc, openGraph: { title: c.ogTitle, description: c.ogDesc }, robots: "index, follow" };
}

export default function FiveElementsGuide({ params: { locale } }: Props) {
  const c = CONTENT[locale] || CONTENT.en;
  const elements = ELEMENTS[locale] || ELEMENTS.en;

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">{c.heading}</h1>
      <p className="text-stone-500 text-sm">{c.subtitle}</p>
      <hr className="my-6 border-stone-200" />

      <h2>{c.whatTitle}</h2>
      <p dangerouslySetInnerHTML={{ __html: c.whatBody }} />

      <h2>{c.cyclesTitle}</h2>
      <h3>{c.genTitle}</h3>
      <p>{c.genBody}</p>
      <h3>{c.ctrlTitle}</h3>
      <p>{c.ctrlBody}</p>

      <h2>{c.tableTitle}</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-stone-100">
              <th className="p-2 text-left">{c.elH}</th>
              <th className="p-2 text-left">{c.zhH}</th>
              <th className="p-2 text-left">{c.dirH}</th>
              <th className="p-2 text-left">{c.seasonH}</th>
              <th className="p-2 text-left">{c.colorH}</th>
              <th className="p-2 text-left">{c.organH}</th>
              <th className="p-2 text-left">{c.traitH}</th>
            </tr>
          </thead>
          <tbody>
            {elements.map((el) => (
              <tr key={el.name} className="border-t border-stone-200">
                <td className="p-2 font-medium">{el.name}</td>
                <td className="p-2">{el.zh}</td>
                <td className="p-2">{el.direction}</td>
                <td className="p-2">{el.season}</td>
                <td className="p-2">{el.color}</td>
                <td className="p-2">{el.organ}</td>
                <td className="p-2 text-xs">{el.trait}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>{c.findTitle}</h2>
      <p>{c.findBody1}</p>
      <p dangerouslySetInnerHTML={{ __html: c.findBody2 }} />
      <p>{c.findBody3}</p>

      <h2>{c.appTitle}</h2>
      <ul>
        {c.appItems.map((item) => <li key={item} dangerouslySetInnerHTML={{ __html: item }} />)}
      </ul>

      <GuideFaq lang={locale} faqs={c.faqs} />

      <div className="not-prose my-8 text-center">
        <Link href="/naming" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>{c.cta}</Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">{c.disclaimer}</p>
    </article>
  );
}
