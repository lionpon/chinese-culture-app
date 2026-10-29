// Render 环境变量管理 + 部署（凭证来自 CLAUDE.md 存档, 值不打印）
// 用法: node scripts/render-env-manage.cjs delete <KEY>
//       node scripts/render-env-manage.cjs deploy
//       node scripts/render-env-manage.cjs set <KEY> <本地env文件中的键名>
const fs = require("fs");
const claude = fs.readFileSync("D:/chinese culture/project2/CLAUDE.md", "utf8");
const token = claude.match(/Render API:\s*(rnd_[A-Za-z0-9]+)/)?.[1];
const service = claude.match(/Service:\s*(srv-[A-Za-z0-9]+)/)?.[1];
if (!token || !service) { console.error("Render 凭证缺失"); process.exit(1); }
(async () => {
  const [cmd, key] = process.argv.slice(2);
  if (cmd === "delete") {
    const res = await fetch(`https://api.render.com/v1/services/${service}/env-vars/${key}`, {
      method: "DELETE", headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`DELETE ${key}:`, res.status);
  } else if (cmd === "deploy") {
    const res = await fetch(`https://api.render.com/v1/services/${service}/deploys`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const dj = await res.json();
    console.log("deploy:", res.status, dj?.deploy?.id || dj?.id || JSON.stringify(dj).slice(0, 120));
  } else if (cmd === "set") {
    const localKey = key;
    const env = fs.readFileSync("D:/chinese culture/project2/.env.local", "utf8");
    const value = env.match(new RegExp("^" + localKey + "=(.+)$", "m"))?.[1]?.trim();
    if (!value) { console.error("本地无", localKey); process.exit(1); }
    const res = await fetch(`https://api.render.com/v1/services/${service}/env-vars/${localKey}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });
    console.log(`PUT ${localKey}:`, res.status, `(长度 ${value.length})`);
  }
})();
