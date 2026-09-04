// Social card image generation (营销第 2 步 — Pinterest 图钉流)
// Renders 卦象图 (daily hexagram) and 生肖运势图 (zodiac fortune) cards as PNG.
// Text is converted to SVG paths via opentype.js from a bundled CJK subset font,
// so rendering is deterministic on any server (no system-font dependency).

import fs from "fs";
import path from "path";
import * as opentype from "opentype.js";
import sharp from "sharp";
import type { Hexagram } from "@/data/hexagrams";
import type { ZodiacInfo } from "@/data/zodiac-data";

const FONT_PATH = path.join(process.cwd(), "public", "fonts", "cc-card.ttf");

let _font: opentype.Font | null = null;
function loadFont(): opentype.Font {
  if (!_font) {
    const buf = fs.readFileSync(FONT_PATH);
    _font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
  }
  return _font;
}

/** Text → SVG paths inside a group translated to (x, baselineY). Skips glyphs missing from the subset. */
function text(
  text: string,
  x: number,
  baselineY: number,
  fontSize: number,
  color: string,
  letterSpacing = 0,
): string {
  const font = loadFont();
  let pen = 0;
  const parts: string[] = [];
  for (const ch of Array.from(text)) {
    if (ch === " ") {
      pen += fontSize * 0.32;
      continue;
    }
    if (font.charToGlyphIndex(ch) === 0) continue; // not in subset
    const p = font.getPath(ch, pen, 0, fontSize);
    parts.push(`<path d="${p.toPathData(2)}" fill="${color}"/>`);
    pen += font.getAdvanceWidth(ch, fontSize) + letterSpacing;
  }
  return `<g transform="translate(${Math.round(x)} ${Math.round(baselineY)})">${parts.join("")}</g>`;
}

/** Centered variant of text(). */
function textCenter(str: string, y: number, fontSize: number, color: string, letterSpacing = 0): string {
  return text(str, (W - measureText(str, fontSize)) / 2, y, fontSize, color, letterSpacing);
}

function measureText(text: string, fontSize: number): number {
  const font = loadFont();
  let w = 0;
  for (const ch of Array.from(text)) {
    if (ch === " ") w += fontSize * 0.32;
    else if (font.charToGlyphIndex(ch) !== 0) w += font.getAdvanceWidth(ch, fontSize);
  }
  return w;
}

/** Wrap text into lines that fit maxWidth (splits on spaces; CJK text is one word). */
function wrapText(text: string, fontSize: number, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? line + " " + word : word;
    if (measureText(candidate, fontSize) <= maxWidth || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// ── shared layout constants ───────────────────────────────────────────────
const W = 1000;
const H = 1500;
const BG = "#17130E";
const GOLD = "#C8A24A";
const GOLD_BRIGHT = "#E8D5A3";
const TEXT_MAIN = "#F2E9D8";
const TEXT_SOFT = "#B9AD94";
const TEXT_FAINT = "#7A7262";
const SEAL_RED = "#B33A2B";

function frame(): string {
  return `<rect x="24" y="24" width="${W - 48}" height="${H - 48}" rx="14" fill="none" stroke="${GOLD}" stroke-opacity="0.55" stroke-width="2"/>`;
}

/** Red seal stamp (印章) with a single character, e.g. 易 / 鼠. */
function seal(ch: string, cx: number, cy: number, size: number): string {
  const chSize = size * 0.62;
  const chW = measureText(ch, chSize);
  return (
    `<rect x="${cx - size / 2}" y="${cy - size / 2}" width="${size}" height="${size}" rx="${size * 0.16}" fill="${SEAL_RED}"/>` +
    text(ch, cx - chW / 2, cy + chSize * 0.36, chSize, "#FFFFFF")
  );
}

function header(topLabel: string, dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00Z");
  const dateLabel = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).toUpperCase();
  return textCenter(topLabel, 120, 26, GOLD, 6) + textCenter(dateLabel, 162, 20, TEXT_FAINT, 3);
}

// Trigram → 3-bit line pattern (bottom line first). Derived lines are used
// because some hexagram records in the data file have `lines: []` (17–50).
const TRIGRAM_BITS: Record<string, [boolean, boolean, boolean]> = {
  乾: [true, true, true],
  兑: [true, true, false],
  离: [true, false, true],
  震: [true, false, false],
  巽: [false, true, true],
  坎: [false, true, false],
  艮: [false, false, true],
  坤: [false, false, false],
};

/** Six hexagram lines bottom-to-top, computed from the trigram pair. */
function linePattern(hex: Hexagram): boolean[] {
  const lower = TRIGRAM_BITS[hex.lowerTrigram] || [false, false, false];
  const upper = TRIGRAM_BITS[hex.upperTrigram] || [false, false, false];
  return [...lower, ...upper];
}

/** Six hexagram lines, bottom-to-top (position 1 at the bottom). */
function hexagramLines(lines: boolean[], centerY: number): string {
  const lineH = 20;
  const gap = 16;
  const total = 6 * lineH + 5 * gap;
  const top = centerY - total / 2;
  const lineW = 300;
  const segW = (lineW - 30) / 2;
  let out = "";
  for (let i = 0; i < 6; i++) {
    const ly = top + (5 - i) * (lineH + gap);
    if (lines[i]) {
      out += `<rect x="${(W - lineW) / 2}" y="${ly}" width="${lineW}" height="${lineH}" rx="4" fill="${GOLD_BRIGHT}"/>`;
    } else {
      out += `<rect x="${(W - lineW) / 2}" y="${ly}" width="${segW}" height="${lineH}" rx="4" fill="${GOLD_BRIGHT}"/>`;
      out += `<rect x="${W / 2 + 15}" y="${ly}" width="${segW}" height="${lineH}" rx="4" fill="${GOLD_BRIGHT}"/>`;
    }
  }
  return out;
}

function footer(url: string): string {
  const disc = "For entertainment purposes only";
  return (
    `<line x1="200" y1="1340" x2="800" y2="1340" stroke="${GOLD}" stroke-opacity="0.35" stroke-width="1.5"/>` +
    textCenter(url, 1390, 24, GOLD) +
    textCenter(disc, 1430, 17, TEXT_FAINT)
  );
}

function svgShell(inner: string): string {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
    `<rect width="${W}" height="${H}" fill="${BG}"/>` +
    `<radialGradient id="glow" cx="0.5" cy="0.27" r="0.55">` +
    `<stop offset="0%" stop-color="${GOLD}" stop-opacity="0.16"/><stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>` +
    `</radialGradient>` +
    `<rect width="${W}" height="${H}" fill="url(#glow)"/>` +
    frame() +
    inner +
    `</svg>`
  );
}

// ── 卦象图 (Daily hexagram card) ──────────────────────────────────────────
export function hexagramCardSVG(hex: Hexagram, dateStr: string): string {
  const quote = hex.judgmentEn && hex.judgmentEn.length > 0 ? hex.judgmentEn : hex.judgment;
  const quoteLines = wrapText(quote.length > 130 ? quote.slice(0, 130).trimEnd() + "…" : quote, 25, 780).slice(0, 3);

  const quoteParts = quoteLines
    .map((ln, i) => textCenter(ln, 1070 + i * 40, 25, TEXT_SOFT))
    .join("");

  return svgShell(
    header("DAILY I CHING", dateStr) +
    seal("易", 110, 120, 72) +
    hexagramLines(linePattern(hex), 560) +
    textCenter(hex.nameZh, 850, 78, TEXT_MAIN) +
    textCenter(hex.pinyin, 905, 27, GOLD) +
    textCenter(hex.nameEn, 962, 34, TEXT_MAIN, 2) +
    quoteParts +
    footer("culture-of-china.com"),
  );
}

// ── 生肖运势图 (Zodiac fortune card) ──────────────────────────────────────
export function zodiacCardSVG(z: ZodiacInfo, dateStr: string): string {
  const elementLine = z.element + " element";

  // personality chips
  const chips = z.personality.slice(0, 4);
  const chipH = 56;
  const chipGap = 18;
  const chipWs = chips.map((p) => measureText(p, 24) + 56);
  const totalChipsW = chipWs.reduce((a, b) => a + b, 0) + chipGap * (chips.length - 1);
  let penX = (W - totalChipsW) / 2;
  const chipParts = chips
    .map((p, i) => {
      const cw = chipWs[i];
      const part =
        `<rect x="${penX}" y="1040" width="${cw}" height="${chipH}" rx="28" fill="none" stroke="${GOLD}" stroke-opacity="0.7" stroke-width="2"/>` +
        text(p, penX + (cw - measureText(p, 24)) / 2, 1077, 24, GOLD_BRIGHT);
      penX += cw + chipGap;
      return part;
    })
    .join("");

  // info rows
  const rows: Array<[string, string]> = [
    ["Lucky numbers", z.luckyNumbers],
    ["Lucky colors", z.luckyColors],
    ["Best matches", z.compatible],
    ["Watch out for", z.incompatible],
  ];
  const rowY0 = 1170;
  const rowParts = rows
    .map(([label, value], i) => {
      const y = rowY0 + i * 56;
      const lx = 170;
      const vx = W - 170 - measureText(value, 23);
      const lw = measureText(label, 23);
      return (
        text(label, lx, y, 23, TEXT_FAINT) +
        text(value, vx, y, 23, TEXT_MAIN) +
        `<line x1="${lx + lw + 20}" y1="${y - 14}" x2="${vx - 20}" y2="${y - 14}" stroke="${GOLD}" stroke-opacity="0.2" stroke-width="1.5" stroke-dasharray="4 6"/>`
      );
    })
    .join("");

  return svgShell(
    header("CHINESE ZODIAC", dateStr) +
    seal(z.animalZh, W / 2, 480, 220) +
    textCenter(z.animal, 700, 52, TEXT_MAIN, 2) +
    textCenter(elementLine, 752, 26, GOLD) +
    chipParts +
    rowParts +
    footer("culture-of-china.com"),
  );
}

export async function svgToPng(svg: string): Promise<Buffer> {
  return sharp(Buffer.from(svg), { density: 150 }).png().toBuffer();
}

/** Convenience: render the daily hexagram card straight to PNG. */
export async function renderHexagramCardPng(hex: Hexagram, dateStr: string): Promise<Buffer> {
  return svgToPng(hexagramCardSVG(hex, dateStr));
}

export async function renderZodiacCardPng(z: ZodiacInfo, dateStr: string): Promise<Buffer> {
  return svgToPng(zodiacCardSVG(z, dateStr));
}

