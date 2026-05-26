import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "I Ching Divination: A Beginner's Guide to the Book of Changes",
  description: "What is the I Ching (Yijing) and how does divination work? Learn about hexagrams, changing lines, and how to interpret your reading.",
  openGraph: {
    title: "I Ching Divination: A Beginner's Guide to the Book of Changes",
    description: "What is the I Ching and how does divination work? Learn about hexagrams and interpretation.",
  },
};

export default function IChingGuide() {
  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">I Ching Divination: A Beginner&apos;s Guide</h1>
      <p className="text-stone-500 text-sm">Understanding the 3,000-year-old Book of Changes — from tossing coins to interpreting hexagrams.</p>

      <hr className="my-6 border-stone-200" />

      <h2>What is the I Ching?</h2>
      <p>
        The I Ching (易经), or Book of Changes, is one of the oldest Chinese classical texts, dating back
        over 3,000 years. Originally a divination manual for Zhou dynasty rulers, it evolved into a profound
        philosophical work that influenced Confucianism, Taoism, and Chinese thought for millennia.
      </p>
      <p>
        At its core, the I Ching is a system of <strong>64 hexagrams</strong> — six-line symbols representing
        fundamental patterns of change in the universe. Each hexagram describes a specific situation or
        life stage, along with advice on how to navigate it.
      </p>

      <h2>How Does I Ching Divination Work?</h2>
      <p>
        You ask a question, cast six lines (using coins or yarrow stalks), and receive a hexagram.
        The I Ching then &quot;answers&quot; through the hexagram&apos;s text — but unlike fortune-telling,
        it doesn&apos;t predict the future. Instead, it reveals the underlying dynamics of your situation
        and suggests the wisest course of action.
      </p>

      <h2>The Structure of a Hexagram (卦, Gua)</h2>
      <p>Each hexagram consists of:</p>
      <ul>
        <li><strong>6 lines (爻, Yao)</strong> — each line is either solid (⚊ Yang, active, firm) or broken (⚋ Yin, receptive, yielding)</li>
        <li><strong>2 trigrams (upper + lower)</strong> — each trigram represents a natural force: Heaven, Earth, Thunder, Mountain, Water, Fire, Lake, Wind</li>
        <li><strong>The Judgment (卦辞)</strong> — the main oracular text for the hexagram</li>
        <li><strong>Line Statements (爻辞)</strong> — specific advice for each changing line</li>
      </ul>

      <h2>The 8 Trigrams (八卦, Bagua)</h2>
      <table className="w-full text-sm border-collapse not-prose my-4">
        <thead>
          <tr className="border-b border-stone-200">
            <th className="text-left py-2 pr-4">Name</th>
            <th className="text-left py-2 pr-4">Chinese</th>
            <th className="text-left py-2 pr-4">Nature</th>
            <th className="text-left py-2">Symbol</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-stone-100"><td className="py-2 pr-4">Qian</td><td className="py-2 pr-4">乾</td><td className="py-2 pr-4">Heaven</td><td className="py-2">☰</td></tr>
          <tr className="border-b border-stone-100"><td className="py-2 pr-4">Kun</td><td className="py-2 pr-4">坤</td><td className="py-2 pr-4">Earth</td><td className="py-2">☷</td></tr>
          <tr className="border-b border-stone-100"><td className="py-2 pr-4">Zhen</td><td className="py-2 pr-4">震</td><td className="py-2 pr-4">Thunder</td><td className="py-2">☳</td></tr>
          <tr className="border-b border-stone-100"><td className="py-2 pr-4">Gen</td><td className="py-2 pr-4">艮</td><td className="py-2 pr-4">Mountain</td><td className="py-2">☶</td></tr>
          <tr className="border-b border-stone-100"><td className="py-2 pr-4">Kan</td><td className="py-2 pr-4">坎</td><td className="py-2 pr-4">Water</td><td className="py-2">☵</td></tr>
          <tr className="border-b border-stone-100"><td className="py-2 pr-4">Li</td><td className="py-2 pr-4">离</td><td className="py-2 pr-4">Fire</td><td className="py-2">☲</td></tr>
          <tr className="border-b border-stone-100"><td className="py-2 pr-4">Dui</td><td className="py-2 pr-4">兑</td><td className="py-2 pr-4">Lake</td><td className="py-2">☱</td></tr>
          <tr><td className="py-2 pr-4">Xun</td><td className="py-2 pr-4">巽</td><td className="py-2 pr-4">Wind</td><td className="py-2">☴</td></tr>
        </tbody>
      </table>

      <h2>How to Cast a Hexagram</h2>
      <p>The traditional method uses 50 yarrow stalks, but the quicker (and more popular) coin method works just as well:</p>
      <ol>
        <li><strong>Hold 3 coins</strong> and focus on your question</li>
        <li><strong>Toss the coins</strong> 6 times (once for each line, from bottom to top)</li>
        <li><strong>Count each toss:</strong> 3 heads = old Yang (⚊ changing), 2 heads = young Yang (⚊), 2 tails = young Yin (⚋), 3 tails = old Yin (⚋ changing)</li>
        <li><strong>Build your hexagram</strong> — the first toss is the bottom line, the sixth is the top</li>
        <li><strong>Read the hexagram text</strong> and any changing lines</li>
      </ol>

      <h2>Interpreting Your Reading</h2>
      <p>The hexagram text describes the overall situation. If you have changing lines, those line statements
        offer specific guidance. If lines change, a second hexagram is formed — showing where the situation
        is heading.</p>
      <p>The key is to read the text <em>reflectively</em>. The I Ching doesn&apos;t give yes/no answers —
        it offers perspective. Think of it as consulting a very wise, very old mentor who speaks in metaphors.</p>

      <h2>Try an I Ching Reading</h2>
      <p>
        Our online I Ching tool handles the coin-tossing for you and provides a clear interpretation
        of your hexagram with historical context and practical advice.
      </p>

      <div className="not-prose my-8">
        <Link href="/divination" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>
          Consult the I Ching — $1.00
        </Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">For cultural appreciation and entertainment only. Not professional advice.</p>
    </article>
  );
}
