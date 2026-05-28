import DailyHexagram from "@/components/DailyHexagram";
import FreeTierBadge from "@/components/FreeTierBadge";
import FeatureCard from "@/components/FeatureCard";

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

      <div className="max-w-lg mx-auto mb-6">
        <FreeTierBadge />
      </div>

      <DailyHexagram />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
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
        <FeatureCard
          href="/palm-reading"
          title="Palm Reading · 手相"
          desc="Upload a photo of your palm for a classical palmistry analysis based on Ma Yi Shen Xiang and other ancient texts."
          hideFree
        />
      </div>

      <section className="mt-12 sm:mt-20 text-center">
        <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
          For entertainment and cultural appreciation only. Contributions support ongoing development and server costs.
          <br />
          <a href="/privacy" className="underline hover:text-stone-500">Privacy Policy</a>
          {" · "}
          <a href="/terms" className="underline hover:text-stone-500">Terms of Service</a>
        </p>
      </section>
    </div>
  );
}

