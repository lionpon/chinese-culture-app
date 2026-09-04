// Find a date whose daily hexagram lands on a lines-empty hexagram (17-50) for testing
const fs = require("fs");
const src = fs.readFileSync("src/data/hexagrams.ts", "utf8");
const entries = [...src.matchAll(/id: (\d+)[^}]*?upperTrigram: "([^"]+)", lowerTrigram: "([^"]+)"/gs)]
  .map((m) => ({ id: +m[1], upper: m[2], lower: m[3] }));
const map = new Map(entries.map((e) => [`${e.upper}${e.lower}`, e.id]));

const NUM = { 1: "乾", 2: "兑", 3: "离", 4: "震", 5: "巽", 6: "坎", 7: "艮", 8: "坤" };
for (let day = 0; day < 60; day++) {
  const d = new Date(Date.UTC(2026, 8, 4 + day)); // from Sep 4
  const y = d.getFullYear(), m = d.getMonth() + 1, dd = d.getDate();
  const up = ((y + m + dd) % 8) || 8, low = ((y * m + dd) % 8) || 8;
  const id = map.get(`${NUM[up]}${NUM[low]}`);
  if (id >= 17 && id <= 50 && ![29, 30].includes(id)) {
    console.log(d.toISOString().slice(0, 10), "hexagram id", id, `${NUM[up]}上${NUM[low]}下`);
    break;
  }
}
