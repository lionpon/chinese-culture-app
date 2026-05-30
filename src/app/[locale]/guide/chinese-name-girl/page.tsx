import type { Metadata } from "next";
import { Link } from "@/navigation";
import GuideFaq from "@/components/GuideFaq";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isRu = params.locale === "ru";
  return {
    title: isRu ? "Китайские Имена для Девочек: 50+ Красивых Значений | Chinese Culture Studio" : "Chinese Names for Girls: 50+ Beautiful Meanings | Chinese Culture Studio",
    description: isRu ? "Коллекция китайских имён для девочек с переводом. От цветочных имён до элегантных классических вариантов — выберите имя с глубоким смыслом." : "A collection of Chinese girl names with translations. From floral names to elegant classical picks — choose a name with deep meaning.",
    openGraph: { title: isRu ? "Китайские Имена для Девочек" : "Chinese Names for Girls", description: isRu ? "50+ красивых имён: цветы, красота, добродетели." : "50+ beautiful names: flowers, beauty, virtues." },
    robots: "index, follow",
  };
}

const NAMES_EN = [
  { name: "Měi (美)", meaning: "Beautiful, graceful, elegant", style: "Beauty" },
  { name: "Lì (丽)", meaning: "Lovely, pretty, magnificent", style: "Beauty" },
  { name: "Huā (花)", meaning: "Flower, blossom, prosperity", style: "Nature" },
  { name: "Lán (兰)", meaning: "Orchid — refinement, elegance, purity", style: "Flower" },
  { name: "Jú (菊)", meaning: "Chrysanthemum — autumn, longevity, nobility", style: "Flower" },
  { name: "Xuě (雪)", meaning: "Snow — purity, clarity, gentleness", style: "Nature" },
  { name: "Yuè (月)", meaning: "Moon — beauty, mystery, femininity", style: "Nature" },
  { name: "Fēn (芬)", meaning: "Fragrance, sweet aroma, virtue", style: "Flower" },
  { name: "Jìng (静)", meaning: "Quiet, calm, serene, peaceful", style: "Virtue" },
  { name: "Huì (慧)", meaning: "Intelligent, wise, perceptive", style: "Virtue" },
  { name: "Xīn (欣)", meaning: "Joyful, happy, delighted", style: "Emotion" },
  { name: "Yún (云)", meaning: "Cloud — graceful, free-spirited, dreamy", style: "Nature" },
  { name: "Yīng (英)", meaning: "Heroine, flower, outstanding", style: "Virtue" },
  { name: "Lù (露)", meaning: "Dew — freshness, purity, morning", style: "Nature" },
  { name: "Shī (诗)", meaning: "Poetry, verse, literary grace", style: "Arts" },
  { name: "Qín (琴)", meaning: "Zither, musical instrument, harmony", style: "Arts" },
  { name: "Yǎ (雅)", meaning: "Refined, elegant, graceful, cultured", style: "Classical" },
  { name: "Zhēn (珍)", meaning: "Precious, treasured, valuable", style: "Virtue" },
  { name: "Qīng (清)", meaning: "Clear, pure, clean, honest", style: "Virtue" },
  { name: "Xiāng (香)", meaning: "Fragrant, aromatic, sweet", style: "Flower" },
  { name: "Chūn (春)", meaning: "Spring — renewal, youth, vitality", style: "Season" },
  { name: "Ruò (若)", meaning: "Like, as if — philosophical and poetic", style: "Classical" },
  { name: "Lè (乐)", meaning: "Joy, music, happiness, delight", style: "Emotion" },
  { name: "Wǎn (婉)", meaning: "Gentle, graceful, tactful, charming", style: "Classical" },
  { name: "Yáo (瑶)", meaning: "Jade, precious gem, supreme beauty", style: "Gem" },
];

const NAMES_RU = [
  { name: "Мэй (美)", meaning: "Красивая, изящная, элегантная", style: "Красота" },
  { name: "Ли (丽)", meaning: "Прелестная, великолепная", style: "Красота" },
  { name: "Хуа (花)", meaning: "Цветок, расцвет, процветание", style: "Природа" },
  { name: "Лань (兰)", meaning: "Орхидея — утончённость, чистота", style: "Цветы" },
  { name: "Цзюй (菊)", meaning: "Хризантема — долголетие, благородство", style: "Цветы" },
  { name: "Сюэ (雪)", meaning: "Снег — чистота, ясность, нежность", style: "Природа" },
  { name: "Юэ (月)", meaning: "Луна — красота, тайна, женственность", style: "Природа" },
  { name: "Фэнь (芬)", meaning: "Аромат, сладкий запах, добродетель", style: "Цветы" },
  { name: "Цзин (静)", meaning: "Тихая, спокойная, безмятежная", style: "Добродетель" },
  { name: "Хуэй (慧)", meaning: "Умная, мудрая, проницательная", style: "Добродетель" },
  { name: "Синь (欣)", meaning: "Радостная, счастливая", style: "Эмоция" },
  { name: "Юнь (云)", meaning: "Облако — грациозная, мечтательная", style: "Природа" },
  { name: "Ин (英)", meaning: "Героиня, цветок, выдающаяся", style: "Добродетель" },
  { name: "Лу (露)", meaning: "Роса — свежесть, чистота, утро", style: "Природа" },
  { name: "Ши (诗)", meaning: "Поэзия, стих, литературная грация", style: "Искусство" },
  { name: "Цинь (琴)", meaning: "Цитра, музыка, гармония", style: "Искусство" },
  { name: "Я (雅)", meaning: "Утончённая, элегантная, культурная", style: "Классика" },
  { name: "Чжэнь (珍)", meaning: "Драгоценная, ценная, treasured", style: "Добродетель" },
  { name: "Цин (清)", meaning: "Чистая, прозрачная, честная", style: "Добродетель" },
  { name: "Сян (香)", meaning: "Ароматная, благоухающая", style: "Цветы" },
  { name: "Чунь (春)", meaning: "Весна — обновление, юность", style: "Сезон" },
  { name: "Жо (若)", meaning: "Подобно, словно — философское", style: "Классика" },
  { name: "Лэ (乐)", meaning: "Радость, музыка, счастье", style: "Эмоция" },
  { name: "Вань (婉)", meaning: "Нежная, грациозная, тактичная", style: "Классика" },
  { name: "Яо (瑶)", meaning: "Нефрит, драгоценный камень, высшая красота", style: "Камень" },
];

export default function ChineseNameGirlGuide({ params: { locale } }: Props) {
  const isRu = locale === "ru";
  const names = isRu ? NAMES_RU : NAMES_EN;

  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">
        {isRu ? "Китайские Имена для Девочек: 25+ Красивых Значений" : "Chinese Names for Girls: 25+ Beautiful Meanings"}
      </h1>
      <p className="text-stone-500 text-sm">
        {isRu ? "Коллекция китайских имён для девочек — цветы, красота, искусство, добродетели и классические варианты." : "A collection of Chinese girl names — flowers, beauty, arts, virtues, and classical picks."}
      </p>
      <hr className="my-6 border-stone-200" />

      <h2>{isRu ? "Традиция Женских Имён в Китае" : "The Tradition of Chinese Girl Names"}</h2>
      {isRu ? (
        <>
          <p>Китайские женские имена традиционно отражают <strong>красоту, грацию, добродетель и связь с природой</strong>. В отличие от мужских имён, которые подчёркивают силу и амбиции, женские имена часто черпают вдохновение из:</p>
          <ul>
            <li><strong>Цветы и растения:</strong> Орхидея (兰), хризантема (菊), лотос — символы чистоты и элегантности.</li>
            <li><strong>Природные явления:</strong> Луна (月), снег (雪), облака (云) — поэтические и женственные образы.</li>
            <li><strong>Красота и грация:</strong> Мэй (美), Я (雅), Ли (丽) — прямые указания на внешнюю и внутреннюю красоту.</li>
            <li><strong>Искусство и музыка:</strong> Ши (поэзия), Цинь (цитра) — культурное воспитание.</li>
            <li><strong>Драгоценности:</strong> Яо (нефрит), Чжэнь (сокровище) — ценность и редкость.</li>
          </ul>
        </>
      ) : (
        <>
          <p>Chinese girl names traditionally reflect <strong>beauty, grace, virtue, and a connection to nature</strong>. Unlike boy names that emphasize strength and ambition, girl names often draw inspiration from:</p>
          <ul>
            <li><strong>Flowers and plants:</strong> Orchid (兰), chrysanthemum (菊), lotus — symbols of purity and elegance.</li>
            <li><strong>Natural phenomena:</strong> Moon (月), snow (雪), clouds (云) — poetic and feminine imagery.</li>
            <li><strong>Beauty and grace:</strong> Měi (美), Yǎ (雅), Lì (丽) — direct references to outer and inner beauty.</li>
            <li><strong>Arts and music:</strong> Shī (poetry), Qín (zither) — cultural refinement.</li>
            <li><strong>Gems and treasures:</strong> Yáo (jade), Zhēn (treasure) — value and rarity.</li>
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

      <h2>{isRu ? "Как Выбрать Имя для Дочери" : "How to Choose a Name for Your Daughter"}</h2>
      {isRu ? (
        <>
          <p>Выбор китайского имени для девочки — это сочетание искусства и традиции. Вот что стоит учесть:</p>
          <ul>
            <li><strong>Тонкая гармония:</strong> Имя должно звучать мелодично с фамилией. Обратите внимание на тон и ритм.</li>
            <li><strong>Смысловая глубина:</strong> Лучшие имена работают на нескольких уровнях — прямое значение, культурная отсылка и семейная история.</li>
            <li><strong>Современный контекст:</strong> Некоторые классические имена могут звучать старомодно. Наш сервис учитывает современное использование.</li>
            <li><strong>Элементы Ба-Цзы:</strong> Если карта девочки показывает дисбаланс, имя может внести недостающий элемент.</li>
          </ul>
        </>
      ) : (
        <>
          <p>Choosing a Chinese name for a girl blends art and tradition. Consider:</p>
          <ul>
            <li><strong>Tonal harmony:</strong> The name should sound melodic with the surname. Pay attention to tone and rhythm.</li>
            <li><strong>Depth of meaning:</strong> The best names work on multiple levels — direct meaning, cultural allusion, and family story.</li>
            <li><strong>Modern context:</strong> Some classical names can sound dated. Our service considers contemporary usage.</li>
            <li><strong>Ba-Zi elements:</strong> If the girl&apos;s chart shows imbalance, the name can introduce the missing element.</li>
          </ul>
        </>
      )}

      <GuideFaq lang={locale} faqs={isRu ? [
        { q: "Какие имена самые популярные для девочек в Китае?", a: "В 2020-х популярны Жо (若), Юэ (月), Си (希) — короткие, поэтические имена с современным звучанием." },
        { q: "Можно ли использовать цветочное имя для мальчика?", a: "Некоторые цветочные иероглифы (как Лань-орхидея) исторически использовались для обоих полов, но большинство цветочных имён традиционно женские." },
        { q: "Почему многие китайские женские имена связаны с природой?", a: "Природа в китайской эстетике символизирует гармонию, чистоту и естественную красоту — качества, традиционно ценимые в женщинах." },
      ] : [
        { q: "What are the most popular girl names in China?", a: "In the 2020s, Ruò (若), Yuè (月), Xī (希) are popular — short, poetic names with a modern feel." },
        { q: "Can a floral name be used for a boy?", a: "Some floral characters (like Lán-orchid) have been historically unisex, but most flower names are traditionally feminine." },
        { q: "Why are Chinese girl names often nature-related?", a: "Nature in Chinese aesthetics symbolizes harmony, purity, and natural beauty — qualities traditionally valued in women." },
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
