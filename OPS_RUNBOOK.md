# 🛠 OPS RUNBOOK — 验证速查手册

> 目的：把历次"重新探索"沉淀为固定流程。每项验证都有 2 分钟路径。
> 最后更新：2026-08-27（8/27 全链路验证后）

---

## 0. 最高频的坑（先读）

| 坑 | 事实 | 正确做法 |
|---|---|---|
| **时区** | `Visit.createdAt` 是 `timestamp without time zone`，存 **naive UTC**，会话时区 UTC | 北京 = `"createdAt" + interval '8 hours'`；过滤边界用 `'2026-08-21 00:00:00+08'`（PG 自动换算）。**不要**用 `AT TIME ZONE 'Asia/Shanghai'`（在 naive 列上会得到存储值-8h，8/27 踩过） |
| **本地 dev 连生产库** | `.env.local` 的 DATABASE_URL 就是生产 Supabase | 任何 checkout/表单测试都写生产库：测试数据 input 里带标记词（如 `E2E`/`Probe`），用完 `deleteMany({ input: { contains: 标记 } })` 清理；Visit 测试行按 `country=Unknown AND city=''` 删 |
| **dev StrictMode** | useEffect 事件 ×2 | 验证埋点数量时除以 2 心态；生产是 1 次 |
| **Render 无国家头** | 生产没有 `cf-ipcountry`/`x-vercel-ip-country` | `/api/track` 的国家级限流（内存+DB 配额）全部空转——检查发生在 geo 解析前，country="Unknown"。修 RU 配额时**必须先挪到 geo 后，且只限 DC 流量** |
| **PAYPAL_EMAIL fallback** | 代码 `PAYPAL_EMAIL \|\| "22728717@qq.com"` | Render env 空了也兜底 QQ 邮箱；但 env 要显式写对 |
| **PayPal 反爬** | curl/headless 打付款页 = 403/空白 | 买家视角验证必须真人浏览器（VPN 美国节点 + 无痕） |

---

## 1. 数据库查询（直查 Supabase 生产）

**速查脚本已入库**：`node scripts/review-queries.cjs`（标准复核五件套：RU 配额 / datecheck 埋点 / 日历漏斗 / Referrer / 付费）
- 环境变量 `SINCE` 指定窗口起点（默认 `2026-08-21T00:00:00+08:00`）

**临时查询模板**（新写脚本时复用头部）：
```js
const fs = require("fs");
const envRaw = fs.readFileSync("D:/chinese culture/project2/.env", "utf8");
process.env.DATABASE_URL = envRaw.match(/^DATABASE_URL=(.+)$/m)[1].trim();
const { PrismaClient } = require("D:/chinese culture/project2/node_modules/@prisma/client");
const prisma = new PrismaClient();
// 北京日: to_char("createdAt" + interval '8 hours','YYYY-MM-DD')
```

**表结构要点**：
- `Visit`：page 带 `__click__:` 前缀 = 点击事件；`referrer=''` = 直访/站内（修复后自家域名会被滤空）
- `Purchase`：status pending/completed/failed + paid + fingerprint + checkoutId(unique)；**免费试用 = completed + paid=false + 有 fingerprint**
- `DailyReport`：revenue 污染过两次（8/13 沙盒），复核时顺眼看

---

## 2. 支付链路验证（2 分钟版）

**a) 生产是 sandbox 还是 live + 收款邮箱对不对**（一条命令）：
```bash
curl -s -X POST "https://www.culture-of-china.com/api/checkout" \
  -H "Content-Type: application/json" \
  -d '{"type":"naming","input":{"firstName":"Probe","lastName":"X","gender":"female","style":"elegant","mode":"create","amount":5.99},"free":false}'
```
看返回 url：`www.paypal.com`=live ✅ / `www.sandbox.paypal.com`=沙盒 ❌；`business=` 参数 = 实际收款邮箱。**探完删行**：`scripts/probe-checkout.cjs` 内置自动清理，或 deleteMany input contains "Probe"。

**b) 游客信用卡入口**（买家视角）：VPN 美国节点 + 无痕浏览器打开付款链接 → 出现「使用借记卡或信用卡付款」= Account Optional 生效 ✅。已确认开启（8/27），**不必重复验证**，除非 PayPal 后台动过设置。

**c) PDT**：后台 paypal.com/businessmanage/account/websettings（或经典版 `cgi-bin/webscr?cmd=_profile-website-payments`）→ 网站付款习惯设定 → 付款数据传输：开启 + Identity Token = `jvQnz...TKi`。生产 Render env `PAYPAL_PDT_TOKEN` 同值 ✅（8/27 已核）。

**d) 部署验证（新代码是否上线）**：找新代码独有的响应特征。8/27 用的是 `POST /api/checkout free=true` → 响应头出现 `Set-Cookie: cc_purchase_id` = 新代码已上线。

---

## 3. 埋点全链路验证（本地，10 分钟版）

1. `npm run dev`（后台），等 health 200
2. Playwright 已装好（`node_modules/@playwright` + chromium）：真实表单流程走 `/naming` → 提交 → `/success` 显示结果（含姓名+拼音）
3. 查 Visit 表最近行，应有：`__click__:form_submit_naming` → `/success` PV → `__click__:free_result_viewed` → `__click__:result_free_naming`
4. 清理：purchase deleteMany + Visit 测试行
5. 已知：Playwright `browser.close()` 偶尔挂起 → 脚本末尾 `process.exit(0)`

---

## 4. Render 管理速查

| 项 | 位置 |
|---|---|
| 用量（实例小时/带宽/构建分钟） | `https://dashboard.render.com/billing` |
| ~~升级 Starter（$7/月）~~ | ✅ 已完成 2026-08-28；续费评估 9 月底 |
| 服务环境变量 | dashboard → chinese-culture-app → Environment |
| 日志 | 同服务 → Logs（导出后找 `Checkout error:` 等） |

**环境变量审计清单**（8/27 已全部核过，变更才需重查）：
`PAYPAL_PDT_TOKEN`=`jvQnz...TKi` · `PAYPAL_SANDBOX`=`false` · `PAYPAL_EMAIL`=`22728717@qq.com` · `NEXT_PUBLIC_APP_URL`=`https://www.culture-of-china.com`

**Starter 特性（2026-08-28 起，$7/月）**：无休眠、无冷启动、无 750h 上限。`monitor.yml` 每 10 分钟 ping `/api/health`，失败退出码 → 真实故障才收告警邮件。**告警邮件 ≠ 服务挂了**，先 curl /api/health 再下结论。
**历史（免费档，已退役）**：750h/月；15 分钟无请求休眠；冷启动 30-60s 超 keep-alive curl 45s 误报失败邮件；4 组 cron 每 7-17min ping，实例小时 ~700h/月贴线。

---

## 5. Git / 部署

- push：SSH 已配好（`~/.ssh/config` → `IdentityFile ~/.ssh/id_ed25519_temp`，deploy key，8/27 修过）。直接 `git push origin master`
- 推送后 Render autoDeploy ≈ 3-5 分钟生效
- 提交风格：`fix:` / `feat:` / `docs:` 单行主题 + 详情，中文说明

---

## 6. 已确认但别忘的事实（8/27 验证结论）

- 生产 = **LIVE PayPal** ✅；8/13 `paid=true` 行是本地沙盒测试写入共享生产库，不是生产开沙盒
- 游客信用卡（Account Optional）**已开启** ✅；PDT 令牌一致 ✅ → 支付基建无断点
- 无付费根因 = **客群错配**：俄卡被 PayPal 硬拒（PayPal 2020 退出俄）、乌卡不稳、大陆买家不可用；不是通道坏
- RU 配额**从未生效**（Render 无国家头，见坑表）；修复时只限 DC 流量（RU/UA 真实用户是唯一转化客群）
- Kyiv/Kharkiv 在 DC 城市黑名单里误伤真实用户（只影响统计标记，不影响拦截）

---

## 7. 社媒矩阵运维（9/4 起，营销第 2 步）

**路由**：`/api/daily-social`（看当日 4 语言 × 4 平台文案）· `/api/twitter-post` · `/api/telegram-post` · `/api/pinterest-post` · `/api/reddit-post` · `/api/social/card`（卦象图/生肖图 PNG，公开无鉴权）

**鉴权**：发帖路由一律 `?token=TELEGRAM_POST_SECRET` 或 `ADMIN_TOKEN`；cron 自带 token 串 4 语言。

**凭证就绪检查**（curl 不出发帖，只看配置）：
```
curl "https://www.culture-of-china.com/api/twitter-post?token=$ADMIN&lang=en"   # 未配置返回 reason 说明
curl "https://www.culture-of-china.com/api/social/card?date=$(date +%F)"        # 200 + image/png 即图片管线正常
```

**发帖验证（首次/换号后）**：`curl "/api/cron?token=$CRON"` 一次 → 看 JSON 各平台结果；双发风险 = cron 多触发（Render 单实例 cron 正常无此问题）。

**图片管线**：字体子集 `public/fonts/cc-card.ttf`（Noto Sans SC OFL，201 字形）。新增字形需重跑：`node scripts/extract-glyphs.cjs` → pyftsubset（`scripts/find-hex-date.cjs` 可找任意卦象日期测卡）。

**社媒账号被封/限流的处置**：社媒流量看 `visit.referrer` 归因（UTM 全链路已埋）；某平台连续 3 天 0 点击 → 停发该平台，宁可少发不触发 spam 判定。
