// Extract the complete glyph set needed for social card images (subsetting input).
// Usage: node scripts/extract-glyphs.cjs > scripts/card-glyphs.txt
const fs = require("fs");

const src = fs.readFileSync("src/data/hexagrams.ts", "utf8");
const names = [...src.matchAll(/nameZh: "([^"]+)"/g)].map((m) => m[1]);

const zsrc = fs.readFileSync("src/data/zodiac-data.ts", "utf8");
const zm = zsrc.match(/animalZh: string\[\] = \[([^\]]+)\]/);
const zchars = zm ? zm[1].replace(/["[\]]/g, "").split(",").map((s) => s.trim()) : [];

const trigrams = "乾坤震巽坎离艮兑";
const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const pinyin = "āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü";
const punct = " ·—–-()….,:;!?“”‘’☀⚠⚖☯";

const all = Array.from(new Set([...names.join(""), ...zchars, ...trigrams, ...latin, ...pinyin, ...punct])).join("");
fs.writeFileSync("scripts/card-glyphs.txt", all);
console.log("glyph count:", all.length);
console.log(all);

