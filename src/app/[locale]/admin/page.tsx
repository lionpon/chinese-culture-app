"use client";

import { useEffect, useState } from "react";

interface ReportData {
  date: string;
  visits: number;
  uniqueCountries: number;
  revenue: number;
  countries: Record<string, number>;
  pages: Record<string, number>;
  byType: Record<string, { count: number; revenue: number }>;
  freeTrials: number;
  freeTrialsByType: Record<string, number>;
}

const COUNTRY_NAMES: Record<string, string> = {
  US: "United States", GB: "United Kingdom", CA: "Canada", AU: "Australia",
  DE: "Germany", FR: "France", JP: "Japan", KR: "South Korea", CN: "China",
  TW: "Taiwan", HK: "Hong Kong", SG: "Singapore", MY: "Malaysia",
  IN: "India", BR: "Brazil", NL: "Netherlands", IT: "Italy", ES: "Spain",
  NZ: "New Zealand", SE: "Sweden", CH: "Switzerland", Unknown: "Unknown",
};

function flag(country: string): string {
  const flags: Record<string, string> = {
    US: "🇺🇸", GB: "🇬🇧", CA: "🇨🇦", AU: "🇦🇺", DE: "🇩🇪", FR: "🇫🇷",
    JP: "🇯🇵", KR: "🇰🇷", CN: "🇨🇳", TW: "🇹🇼", HK: "🇭🇰", SG: "🇸🇬",
    MY: "🇲🇾", IN: "🇮🇳", BR: "🇧🇷", NL: "🇳🇱", IT: "🇮🇹", ES: "🇪🇸",
    NZ: "🇳🇿", SE: "🇸🇪", CH: "🇨🇭",
  };
  return flags[country] || "🌐";
}

const MODULE_NAMES: Record<string, string> = {
  naming: "取名", calendar: "择日", divination: "占卜", "palm-reading": "手相",
};
const MODULE_COLORS: Record<string, string> = {
  naming: "#a855f7", calendar: "#3b82f6", divination: "#f59e0b", "palm-reading": "#ec4899",
};
const ALL_MODULES = ["naming", "calendar", "divination", "palm-reading"];
const FREE_MODULES = ["naming", "calendar", "divination"]; // palm-reading is never free

function DailySocialPosts() {
  const [posts, setPosts] = useState<{
    date: string;
    posts: { en: Record<string, string>; ru: Record<string, string> };
  } | null>(null);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    fetch("/api/daily-social")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => {});
  }, []);

  async function copy(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 2000);
  }

  if (!posts) return null;

  const platforms = [
    { key: "twitter", label: "X / Twitter", icon: "𝕏" },
    { key: "telegram", label: "Telegram", icon: "📣" },
    { key: "reddit", label: "Reddit", icon: "💬" },
  ];

  return (
    <div className="card-classic p-4 sm:p-6 mb-6 sm:mb-8">
      <h2 className="text-sm font-semibold text-stone-700 mb-4">
        📋 Daily Social Posts — {posts.date}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(["en", "ru"] as const).map((lang) => (
          <div key={lang}>
            <h3 className="text-xs font-semibold text-stone-500 uppercase mb-3">
              {lang === "en" ? "🇬🇧 English" : "🇷🇺 Русский"}
            </h3>
            <div className="space-y-3">
              {platforms.map(({ key, label, icon }) => (
                <div key={key} className="bg-stone-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-stone-600">{icon} {label}</span>
                    <button
                      onClick={() => copy(posts.posts[lang][key], `${lang}-${key}`)}
                      className="text-xs px-2 py-0.5 rounded bg-stone-200 hover:bg-stone-300 text-stone-600 transition-colors"
                    >
                      {copied === `${lang}-${key}` ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <pre className="text-xs text-stone-700 whitespace-pre-wrap leading-relaxed font-sans">
                    {posts.posts[lang][key]}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [today, setToday] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token") || "";
    setToken(t);
    if (t) fetchData(t);
    else { setLoading(false); setAuthError(true); }
  }, []);

  async function fetchData(t: string) {
    setLoading(true);
    setAuthError(false);
    try {
      const todayStr = new Date().toISOString().slice(0, 10);
      const [todayRes, reportsRes] = await Promise.all([
        fetch(`/api/report?token=${t}&date=${todayStr}`),
        fetch(`/api/report?token=${t}&days=7`),
      ]);
      if (todayRes.status === 401 || reportsRes.status === 401) {
        setAuthError(true);
        setLoading(false);
        return;
      }
      if (todayRes.ok) setToday(await todayRes.json());
      if (reportsRes.ok) setReports(await reportsRes.json());
    } catch {}
    setLoading(false);
  }

  const maxVisits = Math.max(1, ...reports.map((r) => r.visits));
  const maxFreeByModule = Math.max(1, ...reports.flatMap((r) => Object.values(r.freeTrialsByType || {})));
  const totalVisits = reports.reduce((s, r) => s + r.visits, 0);
  const totalRevenue = reports.reduce((s, r) => s + r.revenue, 0);
  const totalFreeTrials7d = reports.reduce((s, r) => s + (r.freeTrials || 0), 0);

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold" style={{ color: "var(--accent)" }}>Chinese Culture Studio — Admin</h1>
          <p className="text-stone-500 text-sm">Analytics & Daily Report — auto-generates on visit</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="password"
            placeholder="Admin token"
            value={token}
            onChange={(e) => { setToken(e.target.value); setAuthError(false); }}
            onKeyDown={(e) => e.key === "Enter" && fetchData(token)}
            className="px-3 py-1.5 text-sm border border-stone-300 rounded-lg w-48"
          />
          <button onClick={() => fetchData(token)} className="px-4 py-2 rounded-lg text-sm btn-primary">
            Refresh
          </button>
        </div>
      </div>

      {authError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          Invalid or missing admin token. Enter the correct token above or add <code className="bg-red-100 px-1 rounded">?token=...</code> to the URL.
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="card-classic p-3 sm:p-5 text-center">
          <p className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--accent)" }}>{today?.visits ?? "-"}</p>
          <p className="text-[10px] sm:text-xs text-stone-500 mt-1">Visits Today</p>
        </div>
        <div className="card-classic p-3 sm:p-5 text-center">
          <p className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--gold)" }}>{today?.uniqueCountries ?? "-"}</p>
          <p className="text-[10px] sm:text-xs text-stone-500 mt-1">Countries Today</p>
        </div>
        <div className="card-classic p-3 sm:p-5 text-center">
          <p className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--jade)" }}>${today?.revenue ?? "0"}</p>
          <p className="text-[10px] sm:text-xs text-stone-500 mt-1">Revenue Today</p>
        </div>
        <div className="card-classic p-3 sm:p-5 text-center">
          <p className="text-2xl sm:text-3xl font-bold text-purple-600">{today?.freeTrials ?? "-"}</p>
          <p className="text-[10px] sm:text-xs text-stone-500 mt-1">Free Trials Today</p>
        </div>
        <div className="card-classic p-3 sm:p-5 text-center">
          <p className="text-2xl sm:text-3xl font-bold text-stone-700">{loading ? "..." : totalVisits}</p>
          <p className="text-[10px] sm:text-xs text-stone-500 mt-1">7-Day Visits</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* 7-Day Trend */}
        <div className="card-classic p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-stone-700 mb-4">7-Day Trend</h2>
          <div className="flex items-end gap-1 sm:gap-2 h-32 sm:h-40">
            {reports.map((r) => (
              <div key={r.date} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-xs text-stone-600">{r.visits}</span>
                <div
                  className="w-full rounded-t transition-all"
                  style={{ height: `${Math.max(4, (r.visits / maxVisits) * 100)}%`, backgroundColor: "var(--accent)", opacity: r.date === new Date().toISOString().slice(0, 10) ? 1 : 0.5 }}
                />
                <span className="text-[10px] text-stone-400">{r.date.slice(5)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Country Distribution */}
        <div className="card-classic p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-stone-700 mb-4">Country Distribution (7-Day)</h2>
          <div className="space-y-2 max-h-48 sm:max-h-60 overflow-y-auto">
            {today?.countries &&
              Object.entries(today.countries)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 10)
                .map(([c, n]) => (
                  <div key={c} className="flex items-center justify-between text-xs">
                    <span>{flag(c)} {COUNTRY_NAMES[c] || c}</span>
                    <span className="text-stone-500">{n}</span>
                  </div>
                ))}
            {(!today?.countries || Object.keys(today.countries).length === 0) && (
              <p className="text-xs text-stone-400">No data yet. Generate today&apos;s report.</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Page Visits */}
        <div className="card-classic p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-stone-700 mb-4">Page Visits Today</h2>
          <div className="space-y-2">
            {today?.pages &&
              Object.entries(today.pages)
                .sort(([, a], [, b]) => b - a)
                .map(([p, n]) => (
                  <div key={p} className="flex items-center justify-between text-xs">
                    <span className="text-stone-600">{p === "/" ? "Home" : p.slice(1).charAt(0).toUpperCase() + p.slice(2)}</span>
                    <span style={{ color: "var(--accent)" }}>{n}</span>
                  </div>
                ))}
            {(!today?.pages || Object.keys(today.pages).length === 0) && (
              <p className="text-xs text-stone-400">No data yet.</p>
            )}
          </div>
        </div>

        {/* Revenue by Type */}
        <div className="card-classic p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-stone-700 mb-4">Revenue by Service</h2>
          <div className="space-y-3">
            {today?.byType &&
              Object.entries(today.byType).map(([type, data]) => (
                <div key={type}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-stone-600 capitalize">{type}</span>
                    <span className="text-stone-500">{data.count} payments · ${data.revenue}</span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${totalRevenue > 0 ? (data.revenue / Math.max(1, totalRevenue)) * 100 : 0}%`, backgroundColor: "var(--accent)" }}
                    />
                  </div>
                </div>
              ))}
            {(!today?.byType || Object.keys(today.byType).length === 0) && (
              <p className="text-xs text-stone-400">No purchases today.</p>
            )}
          </div>
        </div>
      </div>

      {/* Free Trials Detail Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Free Trials by Module Today */}
        <div className="card-classic p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-stone-700 mb-4">今日免费试用分布</h2>
          {today?.freeTrialsByType && Object.keys(today.freeTrialsByType).length > 0 ? (
            <div className="space-y-3">
              {FREE_MODULES.filter((m) => (today.freeTrialsByType[m] || 0) > 0).map((type) => (
                <div key={type}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-stone-700 font-medium">{MODULE_NAMES[type]}</span>
                    <span className="font-medium" style={{ color: MODULE_COLORS[type] }}>
                      {today.freeTrialsByType[type]} 次
                    </span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${today.freeTrials > 0 ? ((today.freeTrialsByType[type] || 0) / today.freeTrials) * 100 : 0}%`,
                        backgroundColor: MODULE_COLORS[type],
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="border-t border-stone-100 pt-2 mt-2 flex justify-between text-xs">
                <span className="text-stone-500">合计</span>
                <span className="text-purple-600 font-bold">{today.freeTrials} 次</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-stone-400">今日尚无免费试用。</p>
          )}
        </div>

        {/* 7-Day Free Trials by Module Trend */}
        <div className="card-classic p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-stone-700 mb-4">7日免费试用趋势（按模块）</h2>
          {reports.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-end gap-1 sm:gap-1.5 h-32 sm:h-40">
                {reports.map((r) => {
                  const dayTotal = (r.freeTrialsByType?.naming || 0) + (r.freeTrialsByType?.calendar || 0) + (r.freeTrialsByType?.divination || 0);
                  return (
                    <div key={r.date} className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end">
                      <span className="text-[10px] text-stone-500">{dayTotal || ""}</span>
                      <div className="w-full flex flex-col-reverse rounded-t overflow-hidden" style={{ height: `${Math.max(4, (dayTotal / maxFreeByModule) * 100)}%` }}>
                        {FREE_MODULES.map((m) => {
                          const cnt = r.freeTrialsByType?.[m] || 0;
                          if (cnt === 0) return null;
                          const totalForDay = dayTotal || 1;
                          return (
                            <div
                              key={m}
                              className="w-full transition-all"
                              style={{ height: `${(cnt / totalForDay) * 100}%`, backgroundColor: MODULE_COLORS[m] }}
                              title={`${MODULE_NAMES[m]}: ${cnt}`}
                            />
                          );
                        })}
                      </div>
                      <span className="text-[10px] text-stone-400">{r.date.slice(5)}</span>
                    </div>
                  );
                })}
              </div>
              {/* Legend */}
              <div className="flex justify-center gap-4 text-[10px]">
                {FREE_MODULES.map((m) => (
                  <span key={m} className="flex items-center gap-0.5 text-stone-500">
                    <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: MODULE_COLORS[m] }} />
                    {MODULE_NAMES[m]}
                  </span>
                ))}
              </div>
              <div className="text-center text-xs text-stone-400">
                7日合计：{totalFreeTrials7d} 次免费试用
              </div>
            </div>
          ) : (
            <p className="text-xs text-stone-400">暂无数据。</p>
          )}
        </div>
      </div>

      {/* 7-Day Summary Table */}
      <div className="card-classic p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-stone-700 mb-4">7日汇总明细</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-stone-400 border-b border-stone-100">
                <th className="text-left py-2 font-medium">Date</th>
                <th className="text-right py-2 font-medium">Visits</th>
                <th className="text-right py-2 font-medium">Trials</th>
                <th className="text-right py-2 font-medium">取名</th>
                <th className="text-right py-2 font-medium">择日</th>
                <th className="text-right py-2 font-medium">占卜</th>
                <th className="text-right py-2 font-medium">手相</th>
                <th className="text-right py-2 font-medium">Countries</th>
                <th className="text-right py-2 font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                  <tr key={r.date} className="border-b border-stone-50 hover:bg-stone-50/50">
                    <td className="py-2 text-stone-700">{r.date}</td>
                    <td className="py-2 text-right" style={{ color: "var(--accent)" }}>{r.visits}</td>
                    <td className="py-2 text-right text-purple-600 font-medium">{r.freeTrials ?? 0}</td>
                    {ALL_MODULES.map((m) => (
                      <td key={m} className="py-2 text-right text-stone-500">
                        {r.freeTrialsByType?.[m] || 0}
                      </td>
                    ))}
                    <td className="py-2 text-right text-stone-600">{r.uniqueCountries}</td>
                    <td className="py-2 text-right" style={{ color: "var(--jade)" }}>${r.revenue}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Daily Social Posts */}
      <DailySocialPosts />

      <p className="text-center text-xs text-stone-400 mt-8">
        Admin dashboard — protected by token. Set <code className="bg-stone-100 px-1 rounded">ADMIN_TOKEN</code> in your environment variables.
      </p>
    </div>
  );
}
