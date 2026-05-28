# Product Hunt 重新发布计划

## 上次失败原因

- 5/27 预约了 13:00，但用的 session-only cron → 会话结束 → 窗口错过
- 没有用 PH 的 Scheduled Launch 功能（PH 支持提前预约，自动发布）

## 本次策略：Weekend Launch（周末发布）

**为什么选周末而不是周二-周四？**

- 我们是 0 粉丝的独立产品，工作日和大厂抢流量必输
- 周末竞争减少 30-40%，只需约 366 upvotes 就能拿 #1（工作日要 633）
- 周末 "Visit" 点击率反而高 15%（浏览者有更多时间探索）
- 适合"首次发布试水"定位

**推荐日期：Sunday June 1 (6月1日周日) 或 Saturday May 31**

## 发布前准备清单

### 今天（5/28 周四）— 距离发布 3 天

- [ ] **创建 PH Coming Soon 页面**
  - 网址：https://www.producthunt.com/launches/new
  - 用 Scheduled Launch 功能预约到周日凌晨 12:01 AM PST（北京时间 15:01）
  - 必须上传：Icon (240×240)、Tagline、Description
- [ ] **准备视觉素材**（见下方素材清单）
- [ ] **写 First Comment**（见下方模板）
- [ ] **准备 Maker 个人资料**：真实头像、Twitter/LinkedIn 连接

### 明天（5/29 周五）

- [ ] 在 PH 社区互动（upvote + comment 至少 5 个其他产品）
- [ ] 收集 Notify Me 订阅者（Coming Soon 页面自动收集）
- [ ] 准备社交媒体帖子（Twitter/X 模板）

### 后天（5/30 周六）— 发布前一天

- [ ] 最终检查所有素材和链接
- [ ] 确认网站正常运行（特别是手相模块）
- [ ] 准备 outreach 消息模板

### 发布当天（5/31 周六或 6/1 周日）— 北京时间 15:01

PH 自动在预定时间发布。用户需要做的：

- [ ] **15:01** — 确认已上线，立即发布 First Comment
- [ ] **15:01-17:00** — 回复每一条评论（30 分钟内）
- [ ] **17:00-21:00** — 美国西海岸起床，社交媒体发帖
- [ ] **21:00-次日** — 持续回复评论

---

## 视觉素材清单

### 必需
| 素材 | 规格 | 内容 |
|------|------|------|
| Icon | 240×240 PNG | 中国风图标（建议用"文"字印章风格） |
| Tagline | ≤60 字符 | "AI-powered Chinese culture readings — names, dates, divination & palmistry" |
| Description | ≤260 字符 | 简短介绍 4 个模块 |

### 推荐
| 素材 | 规格 | 内容 |
|------|------|------|
| Screenshot 1 | 1270×760 | 首页 — 4 个模块卡片全景 |
| Screenshot 2 | 1270×760 | 取名结果页 — 中英文名字展示 |
| Screenshot 3 | 1270×760 | 手相上传页 — 展现"上传手掌照片"交互 |
| Demo GIF | ≤3MB | 从首页 → 取名 → 结果的快速演示 |

---

## First Comment 模板

```
Hi Product Hunt! 👋

I'm [Name], the solo developer behind Chinese Culture Studio.

I built this because I've always been fascinated by how ancient Chinese wisdom — the I Ching, classical naming traditions, palmistry — can be made accessible to anyone with a browser. These traditions are thousands of years old but feel locked behind language and cultural barriers.

What I'm most proud of:

📜 **Chinese Name Generator** — Not just translation. Each name draws from classical texts (Classic of Poetry, Analects) and is algorithmically matched to your birth date's Five Elements balance. With voice pronunciation.

📅 **Auspicious Date Selection** — Traditional Chinese almanac (通书) principles applied to modern events. Pick a date range, choose your event, get the optimal days.

🔮 **I Ching Divination** — True hexagram generation using three different casting methods. Full classical commentary with English explanations.

✋ **Palm Reading** — Upload a photo of your palm, AI analyzes it against classical texts like 麻衣神相 (Ma Yi Shen Xiang, the most famous Chinese physiognomy text). Zero persistence privacy design — your image is deleted within 5 minutes.

**All free to try twice**, then pay-what-you-want starting at $1.

I'd love your honest feedback — especially on the palm reading module, which I just shipped this week. What feature would make you come back?

🙏 Thanks for checking it out!
```

---

## 社交媒体帖子模板

### Twitter/X（3 条）

**帖子 1 — 公告（15:30 发布）**
```
Just launched on @ProductHunt! 🚀

Chinese Culture Studio — AI-powered readings based on 2000+ year old classical texts.

📜 Chinese naming ✋ Palm reading 🔮 I Ching 📅 Auspicious dates

Free to try → [link]
```

**帖子 2 — 功能亮点（18:00 发布）**
```
The palm reading module analyzes your palm against 麻衣神相 (Ma Yi Shen Xiang) — the most influential Chinese physiognomy text from the Song Dynasty.

Upload a photo → AI reads your three talent lines → result in Chinese + English

Your image is deleted in 5 minutes. Zero storage.
```

**帖子 3 — 感谢（次日）**
```
Thanks for the love on @ProductHunt yesterday! 🙏

Top feedback so far: [fill in]

If you haven't checked it out yet: [link]
```

---

## 成功标准

| 目标 | 乐观 | 现实 |
|------|------|------|
| Upvotes | 100+ | 30-50 |
| Comments | 20+ | 5-10 |
| 网站访问 | 500+ | 100-200 |
| 免费试用 | 50+ | 10-20 |
| 付费转化 | 5+ | 1-2 |

对于我们这种 0 粉丝的首次发布，**现实目标就是及格**。关键是：
1. 真的发上去（不像上次空过）
2. 拿到真实用户反馈
3. 为下次发布积累经验

---

## 风险预案

| 风险 | 应对 |
|------|------|
| PH 审核不通过 | 提前 2 天提交，留缓冲时间 |
| 网站挂了 | Render 自动扩容，免费 tier 够用 |
| 手相 API 超时 | Qwen VL 偶有慢响应，有 32s 先例，不影响使用 |
| 没流量 | 正常，首次发布本质是"挂牌"，后续靠 SEO + 社区积累 |
