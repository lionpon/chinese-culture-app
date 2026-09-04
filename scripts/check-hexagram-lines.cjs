// Verify every hexagram has exactly 6 lines with non-empty text/textEn
const fs = require("fs");
const linesSrc = fs.readFileSync("src/data/hexagram-lines.ts", "utf8");
const hexSrc = fs.readFileSync("src/data/hexagrams.ts", "utf8");

// Block for each id in hexagram-lines.ts: capture from "  ID: [" to the next "  X: [" or final "};"
const midBlocks = {};
const midRe = /^  (\d+): \[/gm;
let match;
let lastId = null;
const starts = [];
while ((match = midRe.exec(linesSrc))) {
  starts.push({ id: +match[1], pos: match.index });
}
for (let i = 0; i < starts.length; i++) {
  const end = i + 1 < starts.length ? starts[i + 1].pos : linesSrc.length;
  midBlocks[starts[i].id] = linesSrc.slice(starts[i].pos, end);
}

// Inline lines in hexagrams.ts: count "position:" per entry block
const inlineCounts = {};
const entries = hexSrc.split(/\{\s*id: /).slice(1);
for (const entry of entries) {
  const id = parseInt(entry, 10);
  inlineCounts[id] = (entry.match(/position:/g) || []).length;
}

const problems = [];
for (let id = 1; id <= 64; id++) {
  let count = inlineCounts[id] || 0;
  if (midBlocks[id] !== undefined) {
    count = (midBlocks[id].match(/position:/g) || []).length;
    const emptyText = (midBlocks[id].match(/textEn: ""/g) || []).length;
    if (emptyText > 0) problems.push(id + ": " + emptyText + " empty textEn");
  }
  if (count !== 6) problems.push(id + ": " + count + " lines (expected 6)");
}

// Cross-validate isYang flags against trigram geometry
const TRIGRAM_BITS = {
  乾: [true, true, true], 兑: [true, true, false], 离: [true, false, true], 震: [true, false, false],
  巽: [false, true, true], 坎: [false, true, false], 艮: [false, false, true], 坤: [false, false, false],
};
for (let id = 1; id <= 64; id++) {
  let block = midBlocks[id];
  let trigramLine;
  if (block !== undefined) {
    trigramLine = hexSrc; // fetch trigrams from hexagrams.ts below
  }
  // Get the hexagram's trigrams from hexagrams.ts
  const trigramsMatch = hexSrc.match(new RegExp("id: " + id + "[,\\s\\S]*?upperTrigram: \"([^\"]+)\", lowerTrigram: \"([^\"]+)\""));
  if (!trigramsMatch) { problems.push(id + ": trigrams not found"); continue; }
  const upper = trigramsMatch[1];
  const lower = trigramsMatch[2];
  const expected = [...TRIGRAM_BITS[lower], ...TRIGRAM_BITS[upper]];

  // Extract isYang sequence (position order) for this hexagram
  let seq;
  if (midBlocks[id] !== undefined) {
    seq = [...midBlocks[id].matchAll(/position: (\d)[\s\S]*?isYang: (true|false)/g)].map((m) => m[2] === "true");
  } else {
    const entryStart = hexSrc.indexOf("id: " + id + ",");
    const rest = hexSrc.slice(entryStart);
    const endMatch = rest.match(/\n  \/\/ |\n  \{/);
    const entry = endMatch ? rest.slice(0, endMatch.index) : rest;
    seq = [...entry.matchAll(/position: (\d)[\s\S]*?isYang: (true|false)/g)].map((m) => m[2] === "true");
  }
  if (seq.length !== 6) { problems.push(id + ": could not extract isYang sequence"); continue; }
  const ok = seq.every((v, i) => v === expected[i]);
  if (!ok) problems.push(id + ": isYang mismatch — data " + seq.map((v) => (v ? "1" : "0")).join("") + " vs trigrams " + expected.map((v) => (v ? "1" : "0")).join(""));
}

console.log(
  problems.length
    ? "PROBLEMS:\n" + problems.join("\n")
    : "ALL 64 HEXAGRAMS OK — 6 lines each, no empty textEn, isYang matches trigram geometry"
);

