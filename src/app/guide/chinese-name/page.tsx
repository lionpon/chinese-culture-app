import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Choose an Authentic Chinese Name — A Complete Guide",
  description: "Learn the art of Chinese naming based on Five Elements, I Ching, and classical poetry. Discover how to find a name that balances sound, meaning, and destiny.",
  openGraph: {
    title: "How to Choose an Authentic Chinese Name — A Complete Guide",
    description: "Learn the art of Chinese naming based on Five Elements, I Ching, and classical poetry.",
  },
};

export default function ChineseNameGuide() {
  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">How to Choose an Authentic Chinese Name</h1>
      <p className="text-stone-500 text-sm">A guide to the ancient art of Chinese naming — from classical texts to modern life.</p>

      <hr className="my-6 border-stone-200" />

      <h2>Why Chinese Names Matter</h2>
      <p>
        In Chinese culture, a name is not just a label — it carries your parents&apos; hopes, your family&apos;s heritage,
        and a vision of your destiny. A well-chosen name is believed to bring balance to the Five Elements
        (wood, fire, earth, metal, water), harmonize with your birth date, and inspire success in life.
      </p>
      <p>
        Unlike Western names that parents choose mainly by sound or family tradition, Chinese names are
        carefully constructed using principles from classical poetry, the I Ching (Book of Changes), and
        the theory of Yin-Yang and Five Elements.
      </p>

      <h2>The Structure of a Chinese Name</h2>
      <p>A full Chinese name consists of two parts:</p>
      <ul>
        <li><strong>Family name (姓)</strong> — inherited from the father, usually one character (e.g., 李 Li, 王 Wang, 张 Zhang)</li>
        <li><strong>Given name (名)</strong> — chosen by parents, typically one or two characters (e.g., 伟 Wei, 小雅 Xiaoya)</li>
      </ul>
      <p>So a complete name looks like: <strong>李伟 (Li Wei)</strong> or <strong>王小明 (Wang Xiaoming)</strong>.</p>

      <h2>How Chinese Names Are Chosen: The 5 Classical Methods</h2>

      <h3>1. Five Elements (五行) Balancing</h3>
      <p>
        This is the most common method. A fortune teller or naming expert analyzes the child&apos;s birth date
        and time (八字, Bazi) to determine which of the Five Elements is lacking or excessive. The name is
        then crafted using characters that carry the needed element:
      </p>
      <ul>
        <li><strong>Wood (木)</strong>: 林, 森, 松, 柏 — growth, vitality</li>
        <li><strong>Fire (火)</strong>: 炎, 明, 灵, 辉 — warmth, brilliance</li>
        <li><strong>Earth (土)</strong>: 坤, 坚, 培, 基 — stability, grounding</li>
        <li><strong>Metal (金)</strong>: 鑫, 锐, 锦, 钧 — strength, refinement</li>
        <li><strong>Water (水)</strong>: 海, 波, 清, 源 — wisdom, adaptability</li>
      </ul>

      <h3>2. Classical Poetry (诗经/楚辞)</h3>
      <p>
        Chinese parents often turn to ancient poetry for inspiration. The <em>Book of Songs</em> (诗经) and
        <em>Songs of Chu</em> (楚辞) are the two most respected sources. Names drawn from poetry carry
        cultural depth and literary beauty.
      </p>
      <p><strong>Examples:</strong></p>
      <ul>
        <li>徽因 (Huiyin) — from 诗经 &quot;大姒嗣徽音&quot;</li>
        <li>思成 (Sicheng) — from 尚书 &quot;钦明文思安安&quot;</li>
      </ul>

      <h3>3. Generation Name (辈分)</h3>
      <p>
        Many families follow a generation poem (字辈诗), where each generation shares a specific
        character in their name. This creates a family tree that you can read by looking at names.
      </p>

      <h3>4. Auspicious Meaning</h3>
      <p>
        Parents choose characters with positive meanings: 智 (wisdom), 勇 (courage), 美 (beauty),
        康 (health), 安 (peace), 乐 (happiness). The combination of characters should also
        sound harmonious when spoken aloud.
      </p>

      <h3>5. Sound and Tone Balance</h3>
      <p>
        Mandarin has four tones. A good name balances the tones so it sounds musical, not flat.
        The characters should also avoid unfortunate homophones — for example, a name that sounds
        like a curse word or an insult in any major Chinese dialect.
      </p>

      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li><strong>Too common</strong> — names like 张伟 (Zhang Wei) are shared by hundreds of thousands</li>
        <li><strong>Too unusual</strong> — using obscure characters that no one can read or type</li>
        <li><strong>Gender mismatch</strong> — using feminine characters for a boy (and vice versa)</li>
        <li><strong>Bad homophones</strong> — always test how the name sounds in different dialects</li>
        <li><strong>Ignoring strokes</strong> — in traditional practice, the total stroke count should be auspicious</li>
      </ul>

      <h2>Get Your Authentic Chinese Name</h2>
      <p>
        At Chinese Culture Studio, our naming tool draws from classical texts and Five Elements theory
        to generate personalized Chinese names based on your preferences. Each reading includes the
        characters, pronunciation, meaning, and cultural background.
      </p>

      <div className="not-prose my-8">
        <Link href="/naming" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>
          Create Your Chinese Name — $1.00
        </Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">For cultural appreciation only. Not professional advice.</p>
    </article>
  );
}
