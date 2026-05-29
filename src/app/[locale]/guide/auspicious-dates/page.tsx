import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Select Auspicious Dates: Chinese Calendar Guide for Weddings & Business",
  description: "Learn how to pick lucky dates using the Chinese almanac (Tong Shu). Find the best dates for weddings, business openings, travel, and important events.",
  openGraph: {
    title: "How to Select Auspicious Dates: Chinese Calendar Guide",
    description: "Learn how to pick lucky dates using the Chinese almanac (Tong Shu) for weddings and business.",
  },
};

export default function AuspiciousDatesGuide() {
  return (
    <article className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-10 prose prose-stone">
      <h1 className="text-2xl sm:text-3xl font-bold">How to Select Auspicious Dates: A Chinese Calendar Guide</h1>
      <p className="text-stone-500 text-sm">Master the art of choosing lucky dates — from wedding planning to business openings.</p>

      <hr className="my-6 border-stone-200" />

      <h2>Why Dates Matter in Chinese Culture</h2>
      <p>
        In Chinese tradition, the timing of important events can influence their outcome. Starting a business on
        an auspicious day invites prosperity. Getting married on a carefully chosen day ensures harmony.
        This isn&apos;t mere superstition — it&apos;s a 2,000-year-old system rooted in Chinese astronomy,
        the lunar calendar, and the same philosophical framework as feng shui.
      </p>
      <p>
        The Chinese almanac, known as the <strong>Tong Shu</strong> (通书) or <strong>Huang Li</strong> (黄历),
        has been the go-to reference for date selection since the Han dynasty. Even today, many Chinese
        families consult the almanac before scheduling weddings, moving houses, or launching a business.
      </p>

      <h2>What Makes a Date Auspicious?</h2>
      <p>Several factors determine whether a date is favorable:</p>

      <h3>1. Chinese Zodiac Compatibility</h3>
      <p>
        Each year, month, day, and hour is associated with an animal sign and an element. A good date
        harmonizes with the person&apos;s own zodiac sign and avoids clashes (冲, Chong). For example,
        if you were born in the Year of the Rat, you should avoid events on the Day of the Horse.
      </p>

      <h3>2. The 12 Day Officers (建除十二神)</h3>
      <p>
        Each day in the Chinese calendar is governed by one of 12 spirits, cycling predictably.
        Some are lucky (Success, Receive, Open), while others are risky (Danger, Destroy, Close).
        The Tong Shu marks each day accordingly.
      </p>

      <h3>3. Lunar Calendar Phases</h3>
      <p>The lunar month has 29 or 30 days. Certain days are consistently marked as good or bad:</p>
      <ul>
        <li><strong>New Moon (初一)</strong> — good for beginnings, setting intentions</li>
        <li><strong>Full Moon (十五)</strong> — good for celebrations, weddings</li>
        <li><strong>Days 3, 7, 23</strong> — generally inauspicious for major events</li>
      </ul>

      <h3>4. Five Elements Harmony</h3>
      <p>
        The date&apos;s element should support the activity: Fire days for fame/recognition, Earth days for
        business/foundation, Water days for travel/communication. A wedding ideally pairs a Water day
        (communication) with Earth (stability).
      </p>

      <h2>Good Dates for Common Events</h2>
      <ul>
        <li><strong>Weddings</strong> — Avoid Ghost Month (7th lunar month) and Tomb Sweeping Festival. Seek dates with the &quot;Marriage&quot; (嫁娶) designation.</li>
        <li><strong>Business Opening</strong> — Look for &quot;Open Business&quot; (开业) days. Dragon and Snake days are traditionally powerful.</li>
        <li><strong>Moving House</strong> — Choose &quot;Moving&quot; (入宅) days, avoid days of personal zodiac clash.</li>
        <li><strong>Travel</strong> — &quot;Travel&quot; (出行) days with favorable directional energy.</li>
      </ul>

      <h2>Find Your Auspicious Date</h2>
      <p>
        Our Auspicious Date Selection tool checks the Chinese almanac against your preferences
        and zodiac sign to find the most favorable dates for your specific event.
      </p>

      <div className="not-prose my-8">
        <Link href="/calendar" className="inline-block px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "var(--accent)" }}>
          Find Your Auspicious Date — $1.00
        </Link>
      </div>

      <hr className="my-6 border-stone-200" />
      <p className="text-xs text-stone-400">For cultural appreciation only. Not professional advice.</p>
    </article>
  );
}
