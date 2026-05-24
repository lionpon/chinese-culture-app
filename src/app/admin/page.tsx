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

export default function AdminDashboard() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [today, setToday] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token") || "chinese-culture-admin-2024";
    setToken(t);
    fetchData(t);
  }, []);

  async function fetchData(t: string) {
    setLoading(true);
    try {
      // Auto-generate today's report first (upserts), then fetch
      await fetch(`/api/report?token=${t}`, { method: "POST" });
      const [todayRes, reportsRes] = await Promise.all([
        fetch(`/api/report?token=${t}&date=${new Date().toISOString().slice(0, 10)}`),
        fetch(`/api/report?token=${t}&days=7`),
      ]);
      if (todayRes.ok) setToday(await todayRes.json());
      if (reportsRes.ok) setReports(await reportsRes.json());
    } catch {}
    setLoading(false);
  }

  const maxVisits = Math.max(1, ...reports.map((r) => r.visits));
  const totalVisits = reports.reduce((s, r) => s + r.visits, 0);
  const totalRevenue = reports.reduce((s, r) => s + r.revenue, 0);

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold" style={{ color: "var(--accent)" }}>Chinese Culture Studio — Admin</h1>
          <p className="text-stone-500 text-sm">Analytics & Daily Report — auto-generates on visit</p>
        </div>
        <button onClick={() => fetchData(token)} className="px-4 py-2 rounded-lg text-sm btn-primary">
          Refresh Data
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
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

      {/* 7-Day Summary Table */}
      <div className="card-classic p-4 sm:p-6">
        <h2 className="text-sm font-semibold text-stone-700 mb-4">7-Day Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-stone-400 border-b border-stone-100">
                <th className="text-left py-2 font-medium">Date</th>
                <th className="text-right py-2 font-medium">Visits</th>
                <th className="text-right py-2 font-medium">Countries</th>
                <th className="text-right py-2 font-medium">Revenue</th>
                <th className="text-right py-2 font-medium">Top Country</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => {
                const topCountry = Object.entries(r.countries || {}).sort(([, a], [, b]) => b - a)[0];
                return (
                  <tr key={r.date} className="border-b border-stone-50 hover:bg-stone-50/50">
                    <td className="py-2 text-stone-700">{r.date}</td>
                    <td className="py-2 text-right" style={{ color: "var(--accent)" }}>{r.visits}</td>
                    <td className="py-2 text-right text-stone-600">{r.uniqueCountries}</td>
                    <td className="py-2 text-right" style={{ color: "var(--jade)" }}>${r.revenue}</td>
                    <td className="py-2 text-right text-stone-500">
                      {topCountry ? `${flag(topCountry[0])} ${COUNTRY_NAMES[topCountry[0]] || topCountry[0]}` : "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-center text-xs text-stone-400 mt-8">
        Admin dashboard — protected by token. Set <code className="bg-stone-100 px-1 rounded">ADMIN_TOKEN</code> in your environment variables.
      </p>
    </div>
  );
}
