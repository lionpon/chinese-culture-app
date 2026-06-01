import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";

type Props = { params: { locale: string } };

type Name = { name: string; meaning: string; style: string };

const NAMES: Record<string, { title: string; desc: string; ogTitle: string; ogDesc: string; heading: string; subtitle: string; howTitle: string; howBody1: string; howBullets: string[]; tableTitle: string; nameH: string; meaningH: string; styleH: string; names: Name[]; categoriesTitle: string; categories: string[]; personalizedTitle: string; personalizedBody: string; faqs: { q: string; a: string }[]; cta: string; disclaimer: string }> = {
  en: {
    title: "Chinese Names for Boys: 50+ Meanings & Characters | Chinese Culture Studio",
    desc: "A curated list of Chinese boy names with translations and meanings. From classic virtues to modern picks — find the perfect name for your son.",
    ogTitle: "Chinese Names for Boys",
    ogDesc: "50+ names with meanings, including virtues, nature, and modern picks.",
    heading: "Chinese Names for Boys: 25+ Meanings",
    subtitle: "Curated Chinese boy names with deep meaning — virtues, nature, mythology, and modern picks.",
    howTitle: "How Chinese Names Are Chosen",
    howBody1: "Chinese names are not just sounds. Each name carries meaning, aspiration, and often connects to Ba-Zi elements. Traditionally, name selection involves:",
    howBullets: ["Character meaning: Each character has independent meaning — parents combine them to create unique significance.", "Five Element balance: If a child's Ba-Zi chart lacks Water, the name may include the water radical (氵).", "Tone and rhythm: Chinese given names are usually 1-2 characters (not counting surname) and should sound harmonious.", "Generation character: In some families, all boys of one generation share a common first character."],
    tableTitle: "Names with Meanings",
    nameH: "Name", meaningH: "Meaning", styleH: "Style",
    names: [
      { name: "Jiàn (健)", meaning: "Healthy, strong, vigorous", style: "Virtue" },
      { name: "Wěi (伟)", meaning: "Great, mighty, extraordinary", style: "Virtue" },
      { name: "Yǒng (勇)", meaning: "Brave, courageous, fearless", style: "Virtue" },
      { name: "Hào (浩)", meaning: "Vast, grand, boundless", style: "Nature" },
      { name: "Lóng (龙)", meaning: "Dragon — power, majesty, success", style: "Mythology" },
      { name: "Yǔ (宇)", meaning: "Universe, cosmos, space", style: "Nature" },
      { name: "Míng (明)", meaning: "Bright, clear, intelligent", style: "Virtue" },
      { name: "Zé (泽)", meaning: "Grace, beneficence, marsh", style: "Nature" },
      { name: "Jùn (俊)", meaning: "Handsome, talented, refined", style: "Modern" },
      { name: "Fēng (峰)", meaning: "Peak, summit, pinnacle", style: "Nature" },
      { name: "Ruì (瑞)", meaning: "Auspicious, lucky, propitious", style: "Virtue" },
      { name: "Bó (博)", meaning: "Erudite, learned, broad-minded", style: "Virtue" },
      { name: "Chén (晨)", meaning: "Morning, dawn, new beginning", style: "Nature" },
      { name: "Kǎi (凯)", meaning: "Triumphant, victorious", style: "Modern" },
      { name: "Xī (希)", meaning: "Hope, rare, aspiration", style: "Modern" },
      { name: "Héng (恒)", meaning: "Perseverance, constant, eternal", style: "Virtue" },
      { name: "Tāo (涛)", meaning: "Great waves, billows, power", style: "Nature" },
      { name: "Xuān (轩)", meaning: "Lofty, dignified, refined", style: "Classical" },
      { name: "Yáng (阳)", meaning: "Sun, positive energy, yang principle", style: "Nature" },
      { name: "Lín (林)", meaning: "Forest, grove, strength in numbers", style: "Nature" },
      { name: "Zhì (志)", meaning: "Ambition, will, purpose", style: "Virtue" },
      { name: "Qí (祺)", meaning: "Blessing, good fortune, peace", style: "Virtue" },
      { name: "Hóng (鸿)", meaning: "Swan goose, grand, vast ambition", style: "Classical" },
      { name: "Yǔ (雨)", meaning: "Rain, nourishment, gentle strength", style: "Nature" },
      { name: "Chéng (成)", meaning: "Success, accomplishment, completion", style: "Modern" },
    ],
    categoriesTitle: "Popular Name Categories",
    categories: ["Virtues (德): Jiàn (health), Yǒng (courage), Zhì (ambition) — names expressing desired qualities.", "Nature (自然): Fēng (peak), Lín (forest), Hào (vast) — connecting the child to the natural world.", "Mythology (神话): Lóng (dragon) — the single most popular mythological name for boys.", "Success (成功): Chéng (success), Kǎi (triumph), Wěi (greatness) — wishing achievement.", "Modern (现代): Xī (hope), Chén (dawn) — popular among younger parents."],
    personalizedTitle: "A Personalized Name",
    personalizedBody: "Name tables are a good start, but a real Chinese name considers your birth date, Ba-Zi chart, and Five Element balance. Our naming service analyzes these factors and generates 5 personalized options with full explanation.",
    faqs: [
      { q: "How many characters are in a Chinese boy's name?", a: "Usually 1 or 2 characters (plus surname). Two-character given names are more common and allow richer meaning." },
      { q: "Can a non-Chinese person use a Chinese name?", a: "Yes! Chinese people often give Chinese names to foreign friends. It's a sign of cultural respect." },
      { q: "Which name brings the most luck?", a: "Luck depends on how well the name matches your Ba-Zi chart. A name that balances your elements is considered the luckiest." },
    ],
    cta: "Get Your Personalized Chinese Name — from $1",
    disclaimer: "For cultural appreciation only.",
  },
  ru: {
    title: "Китайские Имена для Мальчиков: 50+ Значений и Символов | Chinese Culture Studio",
    desc: "Подборка китайских имён для мальчиков с переводом и значением. От классических добродетелей до современных имён — найдите идеальное имя для сына.",
    ogTitle: "Китайские Имена для Мальчиков",
    ogDesc: "50+ имён с переводом, включая добродетели, природу и современные варианты.",
    heading: "Китайские Имена для Мальчиков: 25+ Значений",
    subtitle: "Отобранные китайские имена для мальчиков с глубоким смыслом — добродетели, природа, мифология и современные варианты.",
    howTitle: "Как Выбирают Китайские Имена",
    howBody1: "Китайские имена — это не просто набор звуков. Каждое имя несёт смысл, aspiration (пожелание) и часто связано с элементами Ба-Цзы. Традиционно выбор имени включает:",
    howBullets: ["Значение иероглифов: Каждый иероглиф имеет самостоятельное значение — родители комбинируют их для создания уникального смысла.", "Баланс Пяти Элементов: Если в карте Ба-Цзы ребёнка не хватает Воды, имя может включать радикал «вода» (氵).", "Тон и ритм: Китайские имена обычно состоят из 1-2 иероглифов (не считая фамилии) и должны звучать гармонично.", "Поколенческий иероглиф: В некоторых семьях все мальчики одного поколения разделяют общий первый иероглиф."],
    tableTitle: "Имена со Значением",
    nameH: "Имя", meaningH: "Значение", styleH: "Стиль",
    names: [
      { name: "Цзянь (健)", meaning: "Здоровый, сильный, энергичный", style: "Добродетель" },
      { name: "Вэй (伟)", meaning: "Великий, могучий, выдающийся", style: "Добродетель" },
      { name: "Юн (勇)", meaning: "Храбрый, мужественный, бесстрашный", style: "Добродетель" },
      { name: "Хао (浩)", meaning: "Безбрежный, грандиозный", style: "Природа" },
      { name: "Лун (龙)", meaning: "Дракон — сила, величие, успех", style: "Мифология" },
      { name: "Юй (宇)", meaning: "Вселенная, космос, пространство", style: "Природа" },
      { name: "Мин (明)", meaning: "Яркий, ясный, умный", style: "Добродетель" },
      { name: "Цзэ (泽)", meaning: "Благодать, благодеяние", style: "Природа" },
      { name: "Цзюнь (俊)", meaning: "Красивый, талантливый, утончённый", style: "Современное" },
      { name: "Фэн (峰)", meaning: "Вершина, пик, апогей", style: "Природа" },
      { name: "Жуй (瑞)", meaning: "Благоприятный, счастливый", style: "Добродетель" },
      { name: "Бо (博)", meaning: "Эрудированный, учёный", style: "Добродетель" },
      { name: "Чэнь (晨)", meaning: "Утро, рассвет, новое начало", style: "Природа" },
      { name: "Кай (凯)", meaning: "Триумфальный, победный", style: "Современное" },
      { name: "Си (希)", meaning: "Надежда, редкий, стремление", style: "Современное" },
      { name: "Хэн (恒)", meaning: "Настойчивость, постоянство", style: "Добродетель" },
      { name: "Тао (涛)", meaning: "Великие волны, мощь", style: "Природа" },
      { name: "Сюань (轩)", meaning: "Возвышенный, достойный", style: "Классическое" },
      { name: "Ян (阳)", meaning: "Солнце, позитивная энергия, ян", style: "Природа" },
      { name: "Линь (林)", meaning: "Лес, роща, сила в единстве", style: "Природа" },
      { name: "Чжи (志)", meaning: "Амбиция, воля, цель", style: "Добродетель" },
      { name: "Ци (祺)", meaning: "Благословение, удача, мир", style: "Добродетель" },
      { name: "Хун (鸿)", meaning: "Лебедь-гусь, великие амбиции", style: "Классическое" },
      { name: "Юй (雨)", meaning: "Дождь, питание, мягкая сила", style: "Природа" },
      { name: "Чэн (成)", meaning: "Успех, достижение, завершение", style: "Современное" },
    ],
    categoriesTitle: "Популярные Категории Имён",
    categories: ["Добродетели (德): Цзянь (здоровье), Юн (храбрость), Чжи (амбиция) — имена, выражающие желаемые качества.", "Природа (自然): Фэн (вершина), Линь (лес), Хао (безбрежный) — связь ребёнка с миром природы.", "Мифология (神话): Лун (дракон) — самое популярное мифологическое имя для мальчиков.", "Успех (成功): Чэн (успех), Кай (триумф), Вэй (величие) — пожелание достижений.", "Современные (现代): Си (надежда), Чэнь (рассвет) — популярны среди молодых родителей."],
    personalizedTitle: "Персонализированное Имя",
    personalizedBody: "Таблицы имён — это хорошее начало, но настоящее китайское имя учитывает вашу дату рождения, карту Ба-Цзы и баланс Пяти Элементов. Наш сервис имён анализирует эти факторы и генерирует 5 персонализированных вариантов с полным объяснением.",
    faqs: [
      { q: "Сколько иероглифов в китайском имени мальчика?", a: "Обычно 1 или 2 иероглифа (плюс фамилия). Двухсложные имена более распространены и позволяют создать более богатый смысл." },
      { q: "Может ли не-китаец использовать китайское имя?", a: "Да! Китайцы часто дарят китайские имена иностранным друзьям. Это знак уважения к культуре." },
      { q: "Какое имя приносит удачу?", a: "Удача зависит от совместимости имени с вашей картой Ба-Цзы. Имя, балансирующее ваши элементы, считается самым удачным." },
    ],
    cta: "Получить Персональное Китайское Имя — от $1",
    disclaimer: "Для культурного ознакомления.",
  },
  ja: {
    title: "男の子の中国名：50以上の意味と漢字 | Chinese Culture Studio",
    desc: "男の子の中国名を翻訳と意味付きで厳選してご紹介。古典的な美徳から現代的な選択まで。",
    ogTitle: "男の子の中国名",
    ogDesc: "美徳、自然、現代的なものを含む50以上の名前と意味。",
    heading: "男の子の中国名：25以上の意味",
    subtitle: "深い意味を持つ男の子の中国名 — 美徳、自然、神話、現代的な選択。",
    howTitle: "中国名の選び方",
    howBody1: "中国名は単なる音ではありません。それぞれの名前に意味と願いが込められ、多くの場合八字の要素と結びついています。伝統的に名前選びには以下が含まれます：",
    howBullets: ["漢字の意味：各漢字は独立した意味を持ち、親はそれらを組み合わせて独自の意味を作り出します。", "五行のバランス：子供の八字に水が不足している場合、名前に水部（氵）を含めることがあります。", "音とリズム：中国の名前は通常1〜2文字（姓を除く）で、調和よく響くべきです。", "世代の字：一部の家族では、同世代の男子全員が共通の最初の文字を共有します。"],
    tableTitle: "意味付きの名前",
    nameH: "名前", meaningH: "意味", styleH: "スタイル",
    names: [
      { name: "健（ジェン）", meaning: "健康で強く活力がある", style: "美徳" },
      { name: "偉（ウェイ）", meaning: "偉大で力強い", style: "美徳" },
      { name: "勇（ヨン）", meaning: "勇敢で恐れを知らない", style: "美徳" },
      { name: "浩（ハオ）", meaning: "広大で壮大、無限", style: "自然" },
      { name: "龍（ロン）", meaning: "龍 — 力、威厳、成功", style: "神話" },
      { name: "宇（ユー）", meaning: "宇宙、大空", style: "自然" },
      { name: "明（ミン）", meaning: "明るく聡明", style: "美徳" },
      { name: "澤（ズー）", meaning: "恵み、恩恵", style: "自然" },
      { name: "俊（ジュン）", meaning: "ハンサムで才能があり洗練されている", style: "現代" },
      { name: "峰（フォン）", meaning: "頂点、山頂", style: "自然" },
      { name: "瑞（ルイ）", meaning: "めでたく幸運", style: "美徳" },
      { name: "博（ボー）", meaning: "博識で学識がある", style: "美徳" },
      { name: "晨（チェン）", meaning: "朝、夜明け、新しい始まり", style: "自然" },
      { name: "凱（カイ）", meaning: "勝利、凱旋", style: "現代" },
      { name: "希（シー）", meaning: "希望、希少、憧れ", style: "現代" },
      { name: "恒（ホン）", meaning: "忍耐、不変、永遠", style: "美徳" },
      { name: "濤（タオ）", meaning: "大波、力強さ", style: "自然" },
      { name: "軒（シュエン）", meaning: "高く気品がある", style: "古典" },
      { name: "陽（ヤン）", meaning: "太陽、陽のエネルギー", style: "自然" },
      { name: "林（リン）", meaning: "森、林、結束の力", style: "自然" },
      { name: "志（ジー）", meaning: "志、意志、目的", style: "美徳" },
      { name: "祺（チー）", meaning: "祝福、幸運、平和", style: "美徳" },
      { name: "鴻（ホン）", meaning: "大雁、壮大な志", style: "古典" },
      { name: "雨（ユー）", meaning: "雨、滋養、優しい力", style: "自然" },
      { name: "成（チョン）", meaning: "成功、達成、完成", style: "現代" },
    ],
    categoriesTitle: "人気の名前カテゴリー",
    categories: ["美徳（德）：健（健康）、勇（勇気）、志（志）— 望ましい資質を表す名前。", "自然（自然）：峰（頂点）、林（森）、浩（広大）— 自然とのつながり。", "神話（神話）：龍（ドラゴン）— 男の子に最も人気のある神話的名前。", "成功（成功）：成（成功）、凱（勝利）、偉（偉大）— 達成を願って。", "現代（現代）：希（希望）、晨（夜明け）— 若い親に人気。"],
    personalizedTitle: "パーソナライズされた名前",
    personalizedBody: "名前表は良い出発点ですが、本当の中国名は生年月日、八字、五行のバランスを考慮します。当サービスの命名ツールはこれらの要素を分析し、完全な説明付きで5つのパーソナライズされた名前を生成します。",
    faqs: [
      { q: "男の子の中国名は何文字ですか？", a: "通常1〜2文字（姓を除く）です。2文字の名前がより一般的で、より豊かな意味を持たせることができます。" },
      { q: "中国人以外でも中国名を使えますか？", a: "はい！中国人はよく外国人の友人に中国名を贈ります。それは文化への敬意の表れです。" },
      { q: "最も幸運をもたらす名前は？", a: "幸運は名前が八字とどれだけ調和するかによって決まります。五行のバランスを整える名前が最も幸運とされています。" },
    ],
    cta: "あなただけの中国名を取得 — $1から",
    disclaimer: "文化理解のためのものです。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = NAMES[params.locale] || NAMES.en;
  return { title: c.title, description: c.desc, openGraph: { title: c.ogTitle, description: c.ogDesc }, robots: "index, follow" };
}

export default function ChineseNameBoyGuide({ params: { locale } }: Props) {
  const c = NAMES[locale] || NAMES.en;
  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">{c.heading}</h1>
      <p className="text-stone-500 text-sm">{c.subtitle}</p>
      <hr className="my-6 border-stone-200" />
      <h2>{c.howTitle}</h2>
      <p>{c.howBody1}</p>
      <ul>{c.howBullets.map((b) => <li key={b}>{b}</li>)}</ul>
      <h2>{c.tableTitle}</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead><tr className="bg-stone-100"><th className="p-2 text-left">{c.nameH}</th><th className="p-2 text-left">{c.meaningH}</th><th className="p-2 text-left">{c.styleH}</th></tr></thead>
          <tbody>{c.names.map((n) => <tr key={n.name} className="border-t border-stone-200"><td className="p-2 font-medium">{n.name}</td><td className="p-2 text-xs">{n.meaning}</td><td className="p-2 text-xs text-stone-500">{n.style}</td></tr>)}</tbody>
        </table>
      </div>
      <h2>{c.categoriesTitle}</h2>
      <ul>{c.categories.map((cat) => <li key={cat}>{cat}</li>)}</ul>
      <h2>{c.personalizedTitle}</h2><p>{c.personalizedBody}</p>
      <GuideFaq lang={locale} faqs={c.faqs} />
      <div className="not-prose my-8 text-center">
        <Link href="/naming" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>{c.cta}</Link>
      </div>
      <hr className="my-6 border-stone-200" /><p className="text-xs text-stone-400">{c.disclaimer}</p>
    </article>
  );
}
