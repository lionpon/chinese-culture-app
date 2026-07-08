# Chinese Culture Studio

> Discover ancient Chinese wisdom — I Ching divination, Chinese name creation, auspicious date selection, palm reading, and dream interpretation.

**[culture-of-china.com](https://www.culture-of-china.com)** — $1 per reading, no subscriptions.

## Features

- **I Ching Divination** — Cast hexagrams by time, random generation, or manual numbers. Full interpretation with changing lines, trigrams, and mutual hexagram.
- **Chinese Name Creation** — Generate authentic Chinese names based on Bazi (八字), Five Elements (五行), and classical texts.
- **Auspicious Date Selection** — Traditional Chinese almanac (黄历) date finder for weddings, business, travel, and 10+ event types.
- **Palm Reading** — AI-powered palm line analysis from uploaded hand photos.
- **Dream Interpretation** — Zhou Gong (周公解梦) classic dream dictionary with Freudian analysis.
- **Daily I Ching** — A new hexagram every day, in 4 languages.
- **Guides** — I Ching, Five Elements, Chinese Zodiac, Feng Shui, Face Reading, Lucky Numbers, and more.

## Tech Stack

Next.js 14 · TypeScript · Prisma · Neon PostgreSQL · Tailwind CSS · next-intl (en/ru/ja/ko) · PayPal Payments Standard · OpenRouter AI

## Getting Started

```bash
npm install
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Environment variables required:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (Neon) |
| `NEXT_PUBLIC_APP_URL` | Site URL for PayPal callbacks |
| `PAYPAL_EMAIL` | PayPal merchant email |
| `PAYPAL_SANDBOX` | `true` for sandbox, `false` for live |
| `PAYPAL_PDT_TOKEN` | PayPal PDT identity token |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI features |
| `ADMIN_TOKEN` | Admin dashboard access token |
