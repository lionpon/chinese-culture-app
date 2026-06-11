# Product Hunt 上线物料包

## 基本信息

| 字段 | 内容 |
|------|------|
| **Name** | Chinese Culture Studio |
| **Website** | https://www.culture-of-china.com |
| **Pricing** | $1 per reading (pay per use) |
| **Launch date** | 待定 (建议周二/周三 PT 时间 00:01 AM) |

---

## Tagline (60 字符上限)

> **Option A (推荐):** Ancient Chinese wisdom, one click away. I Ching, names & dates.
> (72 chars — 超标，缩减为↓)

> **Option A (精简):** I Ching divination, Chinese names & auspicious dates — $1 each
> (63 chars)

> **Option B:** Consult the I Ching, find your Chinese name, pick an auspicious date
> (73 chars — 超标，缩减为↓)

> **Option B (精简):** Get your Chinese name, I Ching reading & auspicious date — $1
> (64 chars)

**推荐使用 Option A 精简版**

---

## Description (260 字符上限)

> Discover your authentic Chinese name from classical texts, consult the ancient I Ching (Book of Changes) for guidance, or find the most auspicious date for your wedding or business — all for $1 each. Built on traditional Five Elements and almanac principles.

(259 chars)

---

## Topics / Categories

Product Hunt 主题标签（最多 5 个）：

1. **Web App** — 主要分类
2. **Fun** — 轻松的娱乐属性
3. **Entertainment** — 文化娱乐
4. **Spirituality** — 精神/哲学层面（如果有这个选项）
5. **Tech** — 备选

具体可见 topics 在 PH 上搜索确认。

---

## Maker Comment (发布后第一条评论)

```
Hi Product Hunt 👋

I built Chinese Culture Studio because I wanted to make traditional Chinese cultural practices accessible to everyone globally — not just people who read Chinese.

🎯 What it does:
• Create an authentic Chinese name based on your birth info and Five Elements theory
• Consult the I Ching (Book of Changes) for personal guidance on any question
• Find auspicious dates for weddings, business openings, travel, and more

💰 It's $1 per reading — no subscriptions, no accounts needed.

🔧 Tech stack: Next.js + Neon PostgreSQL + PayPal + Claude API for name generation

📖 All names are sourced from classical Chinese texts (诗经, 楚辞, 论语, 唐诗). The I Ching engine uses the traditional Plum Blossom Numerology (梅花易数) method with all 64 hexagrams and changing lines.

🌏 Built this as a solo maker. Would love your feedback — especially on whether the experience feels authentic and culturally respectful.

Try the free daily I Ching on the homepage to see what it's like before paying!

Thanks for checking it out 🙏
```

---

## Images 规格要求

| 类型 | 尺寸 | 说明 |
|------|------|------|
| **Logo** | 240×240 px | 方形图标，建议用红底白字/篆书风格 |
| **Thumbnail** | 1270×760 px | 主图，显示在列表页 |
| **Gallery 1** | 1270×760 px | 首页截图（含 daily hexagram） |
| **Gallery 2** | 1270×760 px | 起名结果页截图 |
| **Gallery 3** | 1270×760 px | I Ching 占卜结果截图 |

Logo 简易方案：用 CSS 渲染一个红色圆形 + 白色 "易" 字 → 导出 PNG

```
Logo 快速 HTML:
<div style="width:240px;height:240px;border-radius:50%;background:linear-gradient(135deg,#9B4A3A,#7D3B2E);
display:flex;align-items:center;justify-content:center;font-size:96px;color:white;font-family:serif;">
易
</div>
```

截图工具：打开浏览器 → F12 设手机模式 (375×760) → 截各页面

---

## 预发布检查清单

- [ ] Tagline < 60 字符
- [ ] Description < 260 字符
- [ ] Logo 240×240 上传
- [ ] 至少 3 张截图 1270×760
- [ ] Maker comment 准备好（发布后立即粘贴）
- [ ] Twitter/X 账号关联到 PH
- [ ] 提前 2 天在 PH Upcoming 页面预告
- [ ] 发布当天联系 5-10 人帮忙 upvote
- [ ] 在 r/iching, r/taoism 等 subreddit 发帖引流到 PH 页面

---

## 发布后操作

1. 发布后立即粘贴 Maker Comment
2. 在 Twitter/X 发帖 @ProductHunt
3. 在相关 Reddit 发帖（不直接求 upvote，说"on PH today"）
4. 当天结束时回复所有 PH 评论
5. 24h 后查看排名和流量数据
