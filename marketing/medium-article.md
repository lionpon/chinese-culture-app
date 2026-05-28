# How I Built a Chinese Culture App with $0 Budget (And What I Learned Along the Way)

Last month, I shipped Chinese Culture Studio — a web app that generates authentic Chinese names from classical texts, does I Ching divination, and finds auspicious dates using the traditional almanac. Total infrastructure cost: $0.

Here's how I built it, and what I learned about shipping a side project in 2026.

## The Problem

Chinese culture is fascinating but inaccessible. If you want to learn about I Ching divination, you need to buy a book and three coins. Want an authentic Chinese name? You need a native speaker who understands the Five Elements system. Want to pick an auspicious wedding date? You need a physical Chinese almanac (written entirely in Chinese).

Most existing online tools fall into two camps: Chinese-language sites that are impenetrable to outsiders, or Western "Chinese name generators" that just randomly combine characters with no cultural logic.

I wanted something that was:
- Actually authentic, grounded in classical texts
- Fully in English, accessible to anyone
- Free to try, cheap to use
- Beautiful and simple

## What It Does

The app has three tools:

**1. Chinese Name Creation** — Enter your gender and birth info, and the system calculates your Five Elements balance, then suggests names sourced from texts like the Book of Changes (易经), Classic of Poetry (诗经), and Tang dynasty poems. Each name comes with an explanation of the characters, their literary origin, and why they fit your elemental profile.

**2. I Ching Divination** — The traditional 3-coin method in a web interface. You virtually toss coins six times to generate a hexagram, and you get a full reading with the Judgment, Image, and changing line interpretations, sourced from the Wilhelm/Baynes translation.

**3. Auspicious Date Selection** — Pick a purpose (wedding, business opening, travel, moving) and a date range, and the system evaluates each day using traditional almanac criteria: zodiac compatibility, day quality, and elemental balance.

## The Tech Stack ($0/month)

I deliberately chose services with generous free tiers:

- **Next.js** — Frontend + API routes on Render's free tier
- **PostgreSQL** — Neon's free tier (0.5 GB, perfect for early stage)
- **PayPal** — Payment processing, pay-as-you-go (no monthly fee)
- **Render** — Node.js hosting, free tier with auto-deploy from GitHub

Total recurring infrastructure cost: $0. The only cost is PayPal's transaction fee (2.9% + $0.30) which comes out of the $1 price.

## The Hard Parts

### Finding Classical Source Material in English

The I Ching exists in English (Wilhelm/Baynes is the standard translation), but the Classic of Poetry and Tang poems used for Chinese names required piecing together translations from academic sources. Each name in the system is manually verified against its classical source.

### Getting the I Ching Logic Right

The coin method seems simple — 3 coins, 6 tosses — but correctly computing the hexagram, identifying changing lines, and generating the transformed hexagram required reading the original text carefully. A bug in the trigram-to-hexagram mapping would produce wrong readings, which for a divination tool defeats the purpose entirely.

### Five Elements Calculation

The Chinese Five Elements (Wu Xing) system assigns each person a birth chart that determines which elements they need. This isn't simple — it involves the Heavenly Stems, Earthly Branches, and the generating/controlling cycles. Implementing this in TypeScript took several iterations of testing against reference charts.

### GDPR Compliance

Since I was targeting European users, I needed proper GDPR compliance: a privacy policy explaining what data I collect (almost nothing), a cookie consent banner even though I don't use tracking cookies, and terms of service. This was tedious but necessary — GDPR has teeth, and fines are proportional to revenue, not company size.

## The Pricing Psychology

I priced everything at $1 per reading, with 2 free readings per browser. Here's why:

- **$1 is impulse-buy territory.** In Europe and the US, $1 is less than a coffee, less than a bus fare. Nobody thinks twice about spending $1.
- **Free trials build trust.** People can verify the quality before paying. The conversion from free to paid tells you whether your product is good.
- **No subscriptions.** Nobody wants another monthly charge. $1 per use means zero commitment.
- **PayPal handles the psychology.** People already trust PayPal. I don't see or store payment info.

After the first few days, the free-to-paid conversion rate is about 15-20%, which is solid for a micro-transaction model.

## The Numbers (First Week)

- ~200 unique visitors
- ~40 free readings used
- 7 paid readings ($7 total)
- Most popular tool: Chinese Name Creation (55% of usage)
- Top countries: US, UK, Germany, Netherlands

It's not a startup. It's not going to make me rich. But seven people in four countries paid real money for Chinese names and I Ching readings — and that's genuinely satisfying.

## What I'd Do Differently

1. **Launch earlier.** I spent too long polishing. The first version should have gone out weeks sooner — the feedback from real users is worth more than any amount of solo iteration.
2. **SEO from day one.** I added structured data and submitted to Google Search Console after launch. Should have done it before.
3. **More cultural content.** The blog/guide pages drive more organic traffic than the tools themselves. People search "what is I Ching" more than "I Ching divination online."

## Try It Yourself

[Chinese Culture Studio](https://chinese-culture-app.onrender.com) — 2 free readings, $1 after that.

If you try it, I'd love feedback. Building something that bridges cultures is harder than it looks, and I'm sure there are things I'm getting wrong.

---

*This post was also shared on Dev.to and Hacker News Show HN.*
