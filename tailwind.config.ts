import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme named colors for new code
        background: "var(--bg-deep)",
        foreground: "var(--text-body)",
        surface: "var(--bg-surface)",
        card: "var(--bg-card)",
        gold: "var(--gold)",
        "gold-light": "var(--gold-light)",
        vermilion: "var(--vermilion)",
        "text-primary": "var(--text-primary)",
        "text-body": "var(--text-body)",
        "text-muted": "var(--text-muted)",
        "border-subtle": "var(--border-subtle)",
        "border-medium": "var(--border-medium)",

        // Remap stone palette → dark theme for backward compat
        // All existing text-stone-*, bg-stone-*, border-stone-* classes
        // will automatically work with the dark theme.
        stone: {
          50:  "var(--bg-surface)",            // was warm light gray → now dark surface
          100: "var(--bg-card)",                // was warm light gray → now dark card
          200: "var(--border-subtle)",           // was light border → now subtle border
          300: "var(--border-medium)",           // was medium border → now medium border
          400: "var(--text-muted)",              // was muted gray → now muted
          500: "var(--text-body)",               // was medium gray → now body text
          600: "var(--text-primary)",            // was dark gray → now primary text
          700: "#d8d4cc",                        // was darker → now bright text
          800: "#e8e4dc",                        // was darkest → now brightest text
          900: "#f5f2ed",                        // was near-black → now near-white
        },

        // Override white → use dark card bg for backward compat
        white: "var(--bg-card)",
      },
    },
  },
  plugins: [],
};
export default config;
