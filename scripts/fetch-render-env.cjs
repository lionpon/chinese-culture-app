// 通用工具: 从 Render 环境变量读取某个 key（凭证来源 = CLAUDE.md 已存档的 Render API token，运行时读取不落盘）
// 用法: node scripts/fetch-render-env.cjs <ENV_KEY_NAME>   → 仅向 stdout 输出该值
const fs = require("fs");
const keyName = process.argv[2];
if (!keyName) { console.error("用法: node scripts/fetch-render-env.cjs <KEY>"); process.exit(1); }
const claude = fs.readFileSync("D:/chinese culture/project2/CLAUDE.md", "utf8");
const token = claude.match(/Render API:\s*(rnd_[A-Za-z0-9]+)/)?.[1];
const service = claude.match(/Service:\s*(srv-[A-Za-z0-9]+)/)?.[1];
if (!token || !service) { console.error("CLAUDE.md 中未找到 Render 凭证"); process.exit(1); }
(async () => {
  const res = await fetch(`https://api.render.com/v1/services/${service}/env-vars`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) { console.error("Render API:", res.status); process.exit(1); }
  const list = await res.json();
  const found = list.find((x) => x?.envVar?.key === keyName);
  if (!found?.envVar?.value) { console.error("未找到", keyName); process.exit(1); }
  process.stdout.write(found.envVar.value);
})();
