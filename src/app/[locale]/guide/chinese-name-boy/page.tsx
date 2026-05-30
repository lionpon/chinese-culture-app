import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isRu = params.locale === "ru";
  return {
    title: isRu ? "Китайские Имена для Мальчиков: 50+ Значений и Символов | Chinese Culture Studio" : "Chinese Names for Boys: 50+ Meanings & Characters | Chinese Culture Studio",
    description: isRu ? "Подборка китайских имён для мальчиков с переводом и значением. От классических добродетелей до современных имён — найдите идеальное имя для сына." : "A curated list of Chinese boy names with translations and meanings. From classic virtues to modern picks — find the perfect name for your son.",
    openGraph: { title: isRu ? "Китайские Имена для Мальчиков" : "Chinese Names for Boys", description: isRu ? "50+ имён с переводом, включая добродетели, природу и современные варианты." : "50+ names with meanings, including virtues, nature, and modern picks." },
    robots: "index, follow",
  };
}

const NAMES_EN = [
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
];

const NAMES_RU = [
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
];

export default function ChineseNameBoyGuide({ params: { locale } }: Props) {
  const isRu = locale === "ru";
  const names = isRu ? NAMES_RU : NAMES_EN;

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">
        {isRu ? "Китайские Имена для Мальчиков: 25+ Значений" : "Chinese Names for Boys: 25+ Meanings"}
      </h1>
      <p className="text-stone-500 text-sm">
        {isRu ? "Отобранные китайские имена для мальчиков с глубоким смыслом — добродетели, природа, мифология и современные варианты." : "Curated Chinese boy names with deep meaning — virtues, nature, mythology, and modern picks."}
      </p>
      <hr className="my-6 border-stone-200" />

      <h2>{isRu ? "Как Выбирают Китайские Имена" : "How Chinese Names Are Chosen"}</h2>
      {isRu ? (
        <>
          <p>Китайские имена — это не просто набор звуков. Каждое имя несёт <strong>смысл, aspiration (пожелание) и часто связано с элементами Ба-Цзы</strong>. Традиционно выбор имени включает:</p>
          <ul>
            <li><strong>Значение иероглифов:</strong> Каждый иероглиф имеет самостоятельное значение — родители комбинируют их для создания уникального смысла.</li>
            <li><strong>Баланс Пяти Элементов:</strong> Если в карте Ба-Цзы ребёнка не хватает Воды, имя может включать радикал «вода» (氵).</li>
            <li><strong>Тон и ритм:</strong> Китайские имена обычно состоят из 1-2 иероглифов (не считая фамилии) и должны звучать гармонично.</li>
            <li><strong>Поколенческий иероглиф:</strong> В некоторых семьях все мальчики одного поколения разделяют общий первый иероглиф.</li>
          </ul>
        </>
      ) : (
        <>
          <p>Chinese names are not just sounds. Each name carries <strong>meaning, aspiration, and often connects to Ba-Zi elements</strong>. Traditionally, name selection involves:</p>
          <ul>
            <li><strong>Character meaning:</strong> Each character has independent meaning — parents combine them to create unique significance.</li>
            <li><strong>Five Element balance:</strong> If a child&apos;s Ba-Zi chart lacks Water, the name may include the water radical (氵).</li>
            <li><strong>Tone and rhythm:</strong> Chinese given names are usually 1-2 characters (not counting surname) and should sound harmonious.</li>
            <li><strong>Generation character:</strong> In some families, all boys of one generation share a common first character.</li>
          </ul>
        </>
      )}

      <h2>{isRu ? "Имена со Значением" : "Names with Meanings"}</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-stone-100">
              <th className="p-2 text-left">{isRu ? "Имя" : "Name"}</th>
              <th className="p-2 text-left">{isRu ? "Значение" : "Meaning"}</th>
              <th className="p-2 text-left">{isRu ? "Стиль" : "Style"}</th>
            </tr>
          </thead>
          <tbody>
            {names.map((n) => (
              <tr key={n.name} className="border-t border-stone-200">
                <td className="p-2 font-medium">{n.name}</td>
                <td className="p-2 text-xs">{n.meaning}</td>
                <td className="p-2 text-xs text-stone-500">{n.style}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>{isRu ? "Популярные Категории Имён" : "Popular Name Categories"}</h2>
      {isRu ? (
        <ul>
          <li><strong>Добродетели (德):</strong> Цзянь (здоровье), Юн (храбрость), Чжи (амбиция) — имена, выражающие желаемые качества.</li>
          <li><strong>Природа (自然):</strong> Фэн (вершина), Линь (лес), Хào (безбрежный) — связь ребёнка с миром природы.</li>
          <li><strong>Мифология (神话):</strong> Лун (дракон) — самое популярное мифологическое имя для мальчиков.</li>
          <li><strong>Успех (成功):</strong> Чэн (успех), Кай (триумф), Вэй (величие) — пожелание достижений.</li>
          <li><strong>Современные (现代):</strong> Си (надежда), Чэнь (рассвет) — популярны среди молодых родителей.</li>
        </ul>
      ) : (
        <ul>
          <li><strong>Virtues (德):</strong> Jiàn (health), Yǒng (courage), Zhì (ambition) — names expressing desired qualities.</li>
          <li><strong>Nature (自然):</strong> Fēng (peak), Lín (forest), Hào (vast) — connecting the child to the natural world.</li>
          <li><strong>Mythology (神话):</strong> Lóng (dragon) — the single most popular mythological name for boys.</li>
          <li><strong>Success (成功):</strong> Chéng (success), Kǎi (triumph), Wěi (greatness) — wishing achievement.</li>
          <li><strong>Modern (现代):</strong> Xī (hope), Chén (dawn) — popular among younger parents.</li>
        </ul>
      )}

      <h2>{isRu ? "Персонализированное Имя" : "A Personalized Name"}</h2>
      {isRu ? (
        <p>Таблицы имён — это хорошее начало, но настоящее китайское имя учитывает вашу дату рождения, карту Ба-Цзы и баланс Пяти Элементов. Наш сервис имён анализирует эти факторы и генерирует 5 персонализированных вариантов с полным объяснением на английском или русском языке.</p>
      ) : (
        <p>Name tables are a good start, but a real Chinese name considers your birth date, Ba-Zi chart, and Five Element balance. Our naming service analyzes these factors and generates 5 personalized options with full explanation in English or Russian.</p>
      )}

      <GuideFaq lang={locale} faqs={isRu ? [
        { q: "Сколько иероглифов в китайском имени мальчика?", a: "Обычно 1 или 2 иероглифа (плюс фамилия). Двухсложные имена более распространены и позволяют создать более богатый смысл." },
        { q: "Может ли нефтяной иностранец использовать китайское имя?", a: "Да! Китайцы часто дарят китайские имена иностранным друзьям. Это знак уважения к культуре. Наш сервис создаёт имена, подходящие для не-китайцев." },
        { q: "Какое имя приносит удачу?", a: "Удача зависит от совместимости имени с вашей картой Ба-Цзы. Имя, балансирующее ваши элементы, считается самым удачным." },
      ] : [
        { q: "How many characters are in a Chinese boy's name?", a: "Usually 1 or 2 characters (plus surname). Two-character given names are more common and allow richer meaning." },
        { q: "Can a non-Chinese person use a Chinese name?", a: "Yes! Chinese people often give Chinese names to foreign friends. It's a sign of cultural respect. Our service creates names suitable for non-Chinese individuals." },
        { q: "Which name brings the most luck?", a: "Luck depends on how well the name matches your Ba-Zi chart. A name that balances your elements is considered the luckiest." },
      ]} />

      <div className="not-prose my-8 text-center">
        <Link href="/naming" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>
          {isRu ? "Получить Персональное Китайское Имя — от $1" : "Get Your Personalized Chinese Name — from $1"}
        </Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">{isRu ? "Для культурного ознакомления." : "For cultural appreciation only."}</p>
    </article>
  );
}
