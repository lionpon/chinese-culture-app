import type { Metadata } from "next";
import GuideFaq from "@/components/GuideFaq";
import { Link } from "@/navigation";
import GuideCTA from "@/components/GuideCTA";
import GuideToolEmbed from "@/components/GuideToolEmbed";
import { GIRL_NAMES_EN } from "@/data/name-lists";

type Props = { params: { locale: string } };

type Name = { name: string; meaning: string; style: string };

const CONTENT: Record<string, { title: string; desc: string; ogTitle: string; ogDesc: string; heading: string; subtitle: string; tableTitle: string; nameH: string; meaningH: string; styleH: string; groups: { title: string; names: Name[] }[]; personalizedTitle: string; personalizedBody: string; faqs: { q: string; a: string }[]; disclaimer: string }> = {
  en: {
    title: "100+ Chinese Girl Names & Meanings: Elegant, Cute & Unique (2026) | Chinese Culture Studio",
    desc: "100+ beautiful Chinese girl names with meanings — floral, elegant, modern & classical. Find the perfect Chinese name for your baby girl or character. Free naming tool included.",
    ogTitle: "100+ Chinese Girl Names & Meanings (2026)",
    ogDesc: "Discover 100+ beautiful Chinese girl names with meanings. Floral names, elegant classics, modern picks & virtue names. Free Chinese name generator.",
    heading: "100+ Chinese Girl Names & Their Meanings (2026)",
    subtitle: "100+ beautiful Chinese girl names with meanings, pinyin and style — organized by flowers, nature, virtues, arts, gems, joy, classical poetry, and modern favorites.",
    tableTitle: "Names with Meanings",
    nameH: "Name", meaningH: "Meaning", styleH: "Style",
    groups: GIRL_NAMES_EN,
    personalizedTitle: "From Preview to Your Real Name",
    personalizedBody: "The preview above uses only a birth year. A truly authentic Chinese name is crafted from your full birth information and Ba-Zi chart — our naming service generates 5 personalized options with pinyin, meanings, and the elemental reasoning behind each.",
    faqs: [
      { q: "How is a Chinese girl's name different from a boy's?", a: "Girl names often feature beauty, flower, and virtue characters, while boy names emphasize strength and ambition. But many modern names are gender-neutral." },
      { q: "What are the most popular Chinese girl names?", a: "Classical names like Lán (orchid), Xuě (snow), and modern names like Shī (poetry) and Lè (joy) are currently popular among Chinese parents." },
      { q: "How do you pronounce these names?", a: "Each name above shows pinyin with tone marks — the standard romanization of Mandarin. The tone mark tells you the pitch: e.g. Měi is pronounced 'may' with a falling-rising tone." },
      { q: "Can these names work as middle names?", a: "Yes. Chinese given names are usually one or two characters, so a single-character name like Lán or Yuè slots naturally into Western name formats as a middle name." },
      { q: "Which name fits my baby's birth chart?", a: "That's what Ba-Zi naming is for. A name list can't see your child's birth date — our naming service matches 5 names to the Five Elements balance of the exact birth information. Try the free preview above." },
    ],
    disclaimer: "For cultural appreciation only.",
  },
  ru: {
    title: "Китайские Имена для Девочек: 50+ Красивых Значений | Chinese Culture Studio",
    desc: "Коллекция китайских имён для девочек с переводом. От цветочных имён до элегантных классических вариантов.",
    ogTitle: "Китайские Имена для Девочек",
    ogDesc: "50+ красивых имён: цветы, красота, добродетели.",
    heading: "Китайские Имена для Девочек: 25+ Красивых Значений",
    subtitle: "Коллекция китайских имён для девочек — цветы, красота, добродетели и классическая элегантность.",
    tableTitle: "Имена со Значением",
    nameH: "Имя", meaningH: "Значение", styleH: "Стиль",
    groups: [{ title: "", names: [
      { name: "Мэй (美)", meaning: "Красивая, изящная, элегантная", style: "Красота" },
      { name: "Ли (丽)", meaning: "Прелестная, великолепная", style: "Красота" },
      { name: "Хуа (花)", meaning: "Цветок, расцвет, процветание", style: "Природа" },
      { name: "Лань (兰)", meaning: "Орхидея — утончённость, чистота", style: "Цветы" },
      { name: "Цзюй (菊)", meaning: "Хризантема — долголетие, благородство", style: "Цветы" },
      { name: "Сюэ (雪)", meaning: "Снег — чистота, ясность, мягкость", style: "Природа" },
      { name: "Юэ (月)", meaning: "Луна — красота, тайна, женственность", style: "Природа" },
      { name: "Фэнь (芬)", meaning: "Аромат, благоухание", style: "Цветы" },
      { name: "Цзин (静)", meaning: "Тихая, спокойная, безмятежная", style: "Добродетель" },
      { name: "Хуэй (慧)", meaning: "Умная, мудрая, проницательная", style: "Добродетель" },
      { name: "Синь (欣)", meaning: "Радостная, счастливая", style: "Эмоция" },
      { name: "Юнь (云)", meaning: "Облако — мечтательная, свободная", style: "Природа" },
      { name: "Ин (英)", meaning: "Героиня, цветок, выдающаяся", style: "Добродетель" },
      { name: "Лу (露)", meaning: "Роса — свежесть, чистота", style: "Природа" },
      { name: "Ши (诗)", meaning: "Поэзия, стих, литературная грация", style: "Искусство" },
      { name: "Цинь (琴)", meaning: "Цитра, гармония, музыкальность", style: "Искусство" },
      { name: "Я (雅)", meaning: "Утончённая, элегантная, культурная", style: "Классика" },
      { name: "Чжэнь (珍)", meaning: "Драгоценная, ценная", style: "Добродетель" },
      { name: "Цин (清)", meaning: "Чистая, ясная, честная", style: "Добродетель" },
      { name: "Сян (香)", meaning: "Ароматная, душистая", style: "Цветы" },
      { name: "Чунь (春)", meaning: "Весна — обновление, юность", style: "Сезон" },
      { name: "Жо (若)", meaning: "Подобно — философское, поэтичное", style: "Классика" },
      { name: "Лэ (乐)", meaning: "Радость, музыка, счастье", style: "Эмоция" },
      { name: "Вань (婉)", meaning: "Нежная, тактичная, очаровательная", style: "Классика" },
      { name: "Яо (瑶)", meaning: "Нефрит, драгоценный камень", style: "Драгоценности" },
  ] }],
    personalizedTitle: "От предпросмотра к вашему настоящему имени",
    personalizedBody: "Предпросмотр выше использует только год рождения. Подлинное китайское имя создаётся из вашей полной информации о рождении и карты Ба-Цзы — наш сервис генерирует 5 персонализированных вариантов с пиньинем, значениями и объяснением каждого.",
    faqs: [
      { q: "Чем отличается китайское имя девочки от мальчика?", a: "Женские имена часто содержат иероглифы красоты, цветов и добродетелей, в то время как мужские подчёркивают силу и амбиции. Но многие современные имена универсальны." },
      { q: "Какие китайские имена для девочек самые популярные?", a: "Классические имена как Лань (орхидея), Сюэ (снег) и современные как Ши (поэзия) и Лэ (радость) популярны среди китайских родителей." },
    ],
    disclaimer: "Для культурного ознакомления.",
  },
  ja: {
    title: "女の子の中国名：50以上の美しい意味 | Chinese Culture Studio",
    desc: "翻訳付きの女の子の中国名コレクション。花の名前から優雅な古典まで。",
    ogTitle: "女の子の中国名",
    ogDesc: "花、美、美徳を含む50以上の美しい名前。",
    heading: "女の子の中国名：25以上の美しい意味",
    subtitle: "厳選された女の子の中国名 — 花、美しさ、美徳、そして古典的な優雅さ。",
    tableTitle: "意味付きの名前",
    nameH: "名前", meaningH: "意味", styleH: "スタイル",
    groups: [{ title: "", names: [
      { name: "美（メイ）", meaning: "美しく優雅で上品", style: "美" },
      { name: "麗（リー）", meaning: "愛らしく華麗", style: "美" },
      { name: "花（ホア）", meaning: "花、開花、繁栄", style: "自然" },
      { name: "蘭（ラン）", meaning: "蘭 — 洗練、優雅、純粋", style: "花" },
      { name: "菊（ジュー）", meaning: "菊 — 秋、長寿、高貴", style: "花" },
      { name: "雪（シュエ）", meaning: "雪 — 純粋、明晰、優しさ", style: "自然" },
      { name: "月（ユエ）", meaning: "月 — 美しさ、神秘、女性らしさ", style: "自然" },
      { name: "芬（フェン）", meaning: "香り、甘い芳香", style: "花" },
      { name: "静（ジン）", meaning: "静かで穏やか、平穏", style: "美徳" },
      { name: "慧（ホイ）", meaning: "知的で賢明、洞察力がある", style: "美徳" },
      { name: "欣（シン）", meaning: "喜びに満ち、幸せ", style: "感情" },
      { name: "雲（ユン）", meaning: "雲 — 優雅で自由奔放、夢想的", style: "自然" },
      { name: "英（イン）", meaning: "ヒロイン、花、傑出した", style: "美徳" },
      { name: "露（ルー）", meaning: "露 — 新鮮さ、純粋、朝", style: "自然" },
      { name: "詩（シー）", meaning: "詩、韻文、文学的な優雅さ", style: "芸術" },
      { name: "琴（チン）", meaning: "琴、楽器、調和", style: "芸術" },
      { name: "雅（ヤー）", meaning: "洗練され優雅で教養がある", style: "古典" },
      { name: "珍（ジェン）", meaning: "貴重で大切、価値あるもの", style: "美徳" },
      { name: "清（チン）", meaning: "澄んで清らか、誠実", style: "美徳" },
      { name: "香（シャン）", meaning: "香り高く芳しい", style: "花" },
      { name: "春（チュン）", meaning: "春 — 再生、若さ、活力", style: "季節" },
      { name: "若（ルオ）", meaning: "〜の如く — 哲学的で詩的", style: "古典" },
      { name: "楽（ラー）", meaning: "喜び、音楽、幸福", style: "感情" },
      { name: "婉（ワン）", meaning: "優しく上品で魅力的", style: "古典" },
      { name: "瑶（ヤオ）", meaning: "翡翠、貴石、最高の美", style: "宝石" },
  ] }],
    personalizedTitle: "プレビューから本当の名前へ",
    personalizedBody: "上のプレビューは生まれた年だけを使ったものです。本当に本格的な中国名はあなたの誕生情報と八字から作られます。当サービスの命名ツールはピンイン・意味・それぞれの理由付きで5つの名前を生成します。",
    faqs: [
      { q: "女の子と男の子の中国名の違いは？", a: "女の子の名前は美しさ、花、美徳の漢字が多く使われ、男の子は力強さと志が重視されます。しかし現代では多くの名前が性別を問いません。" },
      { q: "最も人気のある女の子の中国名は？", a: "蘭（ラン、蘭の花）、雪（シュエ、雪）などの古典的な名前や、詩（シー、詩）や楽（ラー、喜び）などの現代的な名前が人気です。" },
    ],
    disclaimer: "文化理解のためのものです。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = CONTENT[params.locale] || CONTENT.en;
  return { title: c.title, description: c.desc, openGraph: { title: c.ogTitle, description: c.ogDesc },
    alternates: {
      languages: {
        en: "https://www.culture-of-china.com/guide/chinese-name-girl",
        ru: "https://www.culture-of-china.com/ru/guide/chinese-name-girl",
        ja: "https://www.culture-of-china.com/ja/guide/chinese-name-girl"
      },
    },
    robots: "index, follow"
  };
}

export default function ChineseNameGirlGuide({ params: { locale } }: Props) {
  const c = CONTENT[locale] || CONTENT.en;
  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">{c.heading}</h1>
      <p className="text-stone-500 text-sm">{c.subtitle}</p>
      <hr className="my-6 border-stone-200" />
      <h2>{c.tableTitle}</h2>
      {c.groups.map((g, gi) => (
        <div key={gi}>
          {g.title && <h3 className="text-base font-semibold mt-6 mb-2">{g.title}</h3>}
          <div className="not-prose overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="bg-stone-100"><th className="p-2 text-left">{c.nameH}</th><th className="p-2 text-left">{c.meaningH}</th><th className="p-2 text-left">{c.styleH}</th></tr></thead>
              <tbody>{g.names.map((n) => <tr key={n.name} className="border-t border-stone-200"><td className="p-2 font-medium">{n.name}</td><td className="p-2 text-xs">{n.meaning}</td><td className="p-2 text-xs text-stone-500">{n.style}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      ))}
      <GuideToolEmbed tool="namePreview" gender="female" names={c.groups.flatMap(g => g.names)} />

      <h2>{c.personalizedTitle}</h2><p>{c.personalizedBody}</p>
      <GuideFaq lang={locale} faqs={c.faqs} />
      <div className="not-prose my-8 text-center">
        <GuideCTA href="/naming" service="naming" />
      </div>
      <div className="not-prose my-8">
        <p className="text-sm font-semibold mb-2">Related Guides</p>
        <ul className="space-y-1 text-sm list-disc list-inside">
          <li><Link href="/guide/chinese-name-boy">50+ Chinese Boy Names &amp; Their Meanings</Link></li>
          <li><Link href="/guide/chinese-name">How Chinese Names Are Chosen — the Complete Guide</Link></li>
          <li><Link href="/naming">Get 5 Personalized Chinese Names from Your Birth Chart</Link></li>
        </ul>
      </div>
      <hr className="my-6 border-stone-200" /><p className="text-xs text-stone-400">{c.disclaimer}</p>

      <GuideCTA href="/naming" service="naming" variant="sticky" />
    </article>
  );
}
