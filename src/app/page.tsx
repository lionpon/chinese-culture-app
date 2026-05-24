import DailyHexagram from "@/components/DailyHexagram";

export default function Home() {
  return (
    <div>
      <section className="text-center py-12 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-4">
          Chinese Culture Studio
        </h1>
        <p className="text-base sm:text-lg text-stone-500 max-w-lg mx-auto leading-relaxed">
          Discover the wisdom of ancient Chinese classics through names, dates, and divination
        </p>
      </section>

      <DailyHexagram />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
        <FeatureCard
          href="/naming"
          title="Create a Chinese Name"
          desc="Generate your authentic Chinese name based on the Five Elements and I Ching principles, sourced from classical texts."
        />
        <FeatureCard
          href="/calendar"
          title="Auspicious Date Selection"
          desc="Find the most favorable dates for weddings, business, travel, and more using traditional almanac methods."
        />
        <FeatureCard
          href="/divination"
          title="I Ching Divination"
          desc="Consult the ancient Book of Changes and receive a personalized hexagram reading with clear guidance."
        />
      </div>

      <section className="mt-12 sm:mt-20 text-center">
        <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
          For entertainment and cultural appreciation only. $1 per reading.
          <br />
          <a href="/privacy" className="underline hover:text-stone-500">Privacy Policy</a>
          {" · "}
          <a href="/terms" className="underline hover:text-stone-500">Terms of Service</a>
        </p>
      </section>
    </div>
  );
}

function FeatureCard({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <a href={href} className="group block p-4 sm:p-6 rounded-xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-md transition-all">
      <h2 className="text-lg font-semibold text-stone-800 mb-2 group-hover:text-stone-900 transition-colors">
        {title}
      </h2>
      <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
      <span className="inline-block mt-4 text-xs font-medium text-stone-400 group-hover:text-stone-500 transition-colors">
        $1 per reading →
      </span>
    </a>
  );
}
