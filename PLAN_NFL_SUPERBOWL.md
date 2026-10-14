# PLAN: 主页世界杯 → NFL / Super Bowl LXI 替换（2026-10-14 开工）

> 背景：世界杯 2026 已于 7/19 结束（西班牙夺冠），主页导航 ⚽ WC 与移动端脉冲按钮、NavMenu 首项仍指向陈旧内容。
> 目标：复用已验证的「I Ching x 热点赛事」模板，换为 NFL 2026 赛季 + Super Bowl LXI 专区。

## 已核实事实（Wikipedia, 2026-10-13）

- NFL 2026 = 第 107 赛季；常规赛 **2026-09-09 开打**（揭幕战卫冕冠军 Seattle 胜 New England）→ **2027-01-10 结束**（18 周）
- 季后赛 **2027-01-16** 开打；**Super Bowl LXI：2027-02-14，SoFi Stadium, Inglewood, CA**（LA 第 9 次、SoFi 第 2 次；史上首次情人节+总统日周末）
- 卫冕冠军：Seattle Seahawks（Super Bowl LX，2026-02-08）
- 当前 2026-10-13 ≈ 常规赛第 6 周——上线即"进行中"，窗口极佳

## 范围（明天一次会话做完）

1. **保留 `/world-cup` 为存档**（已是 retrospective 标题、有 SEO 流量，不删不重定向）
2. **新路由 `/nfl`**：I Ching x NFL 2026 主页面
   - 本周焦点战预测（每周精选 4-6 场 playoff-relevant 比赛，人工数据量可控；不做 16 场/周全量）
   - Super Bowl LXI 倒计时专区（日期/球场/对阵占位 + 卦象预测占位）
   - 季后赛阶段（1/16 起）改为逐轮完整预测
   - 卦象精度统计（复用 getAccuracyStats 思路，NFL 无平局 → 只 home/away）
3. **主页与导航**：⚽ WC → 🏈 NFL
   - layout.tsx 桌面 nav（149 行）+ 移动脉冲按钮（178 行，animate-pulse 正是用户看到"陈旧"的点）
   - NavMenu.tsx 首项
   - 主页 banner：`NFL_BANNER`（4 语言）+ `showNflBanner()` 窗口 2026-09-09 → 2027-02-15（当天起即显示，倒计时语境）
   - cron 预热页列表 + `/nfl`
4. **sitemap.ts** 加 `/nfl`（priority 0.9, daily）
5. **CLAUDE.md 路线图**：Super Bowl LX（2026.2 过期）→ LXI（2027.2）状态更新

## 技术方案（全部复用现有模式）

- 数据：`src/data/nfl-2026.ts` — `NFLMatch { id, week, date, home, away, venue, result? }` + `NFL_TEAMS`（32 队 8 分区）+ `SUPER_BOWL_LXI = { date: "2027-02-14", venue: "SoFi Stadium, Inglewood, CA" }` + 季后赛日期
- 预测引擎：`src/lib/nfl.ts` — 复制 world-cup.ts 的 hash(日期|主队|客队) → 64 卦 → **奇=home / 偶=away（无 draw）**；精度统计只 home/away
- 主题文案：新写 `NFL_THEMES`（64 卦 NFL 语汇：turnover/red zone/fourth down/overtime/defense pressure……，不沿用足球语汇 goal/set pieces）
- 页面：`src/app/[locale]/nfl/page.tsx` — 复用 world-cup/page.tsx 骨架（4 locale UI 对象 + meta + 免责声明复制改 NFL 措辞）
- CTA：`components/NflCTA.tsx`（WorldCupCTA 改）
- 埋点：banner 点击 `banner_nfl`、页面 CTA `nfl_cta_*` 沿用 trackClick

## SEO 关键词（en meta）

- "NFL predictions 2026 I Ching" / "Super Bowl LXI prediction Feb 14 2027" / "NFL playoff predictions 2027" / "who will win Super Bowl LXI"
- 页面标题模板："I Ching x NFL 2026 — Super Bowl LXI Predictions | Chinese Culture Studio"

## 数据维护约定（2026-10-14 定稿，赛果全自动）

- **每周焦点战由人工选定**（对抗性 + 季后赛悬念）——仅需新增赛程到 `src/data/nfl-2026.ts`，无需填赛果
- **赛果自动更新**：每日 cron（daily-seo.yml → `/api/cron` 第 7 步）抓 ESPN scoreboard API → upsert 到 Supabase `NflResult` 表（首次运行全量种子化，之后只扫最近 14 天 + 未入库场次）；`/nfl` 页面每次请求读 DB（DB 缺失回退 TS 静态 result）
- 建表脚本：`node scripts/nfl-results-setup.cjs`（幂等）
- 1/16 季后赛开始后：每轮全覆盖（6+4+2+1=13 场）
- 全部含娱乐免责声明（沿用 WC 文案改 NFL 词）

## 验收清单

- [x] tsc + build 绿
- [x] `/nfl` 4 语言 HTTP 200，meta 正确
- [x] 主页 banner 显示（窗口 9/9→2/15）+ 桌面/移动 nav 指向 /nfl
- [x] `/world-cup` 保持 200 不受影响
- [x] sitemap 含 /nfl；cron 预热含 /nfl
- [x] 赛果自动更新链路：NflResult 表 + cron ESPN 同步（实跑 30 场种子化成功，DB/静态 0 差异）
- [x] 提交 + 推送（Render 自动部署，生产已生效）

## 团队名单（数据文件用，2026 赛季 32 队）

AFC East: Bills / Dolphins / Patriots / Jets ｜ AFC North: Ravens / Bengals / Browns / Steelers
AFC South: Texans / Colts / Jaguars / Titans ｜ AFC West: Chiefs / Chargers / Broncos / Raiders
NFC East: Cowboys / Giants / Eagles / Commanders ｜ NFC North: Bears / Lions / Packers / Vikings
NFC South: Falcons / Panthers / Saints / Buccaneers ｜ NFC West: Cardinals / Rams / 49ers / Seahawks（卫冕冠军）
