"use client";

import { useState, FormEvent } from "react";
import { useResults } from "@/lib/result-store";
import PayPalButton from "@/components/PayPalButton";

export default function CalendarPage() {
  const [loading, setLoading] = useState(false);
  const [paypalOrderId, setPaypalOrderId] = useState<string | null>(null);
  const [paypalPurchaseId, setPaypalPurchaseId] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState("");
  const { results, setCalendarResult } = useResults();
  const result = results.calendar;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setCheckoutError("");
    setCalendarResult(null);

    const form = e.currentTarget;
    const data = {
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      eventType: form.eventType.value,
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "calendar", input: data }),
      });
      const { orderId, purchaseId, error } = await res.json();
      if (orderId) {
        setPaypalOrderId(orderId);
        setPaypalPurchaseId(purchaseId);
      } else {
        setCheckoutError(error || "Something went wrong");
      }
    } catch {
      setCheckoutError("Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handlePayPalSuccess(purchaseId: string) {
    window.location.href = `/success?purchase_id=${purchaseId}`;
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "var(--accent)" }}>Auspicious Date Selection</h1>
        <p className="text-stone-500 mt-2">Based on traditional Chinese almanac principles</p>
        <p className="text-xs mt-1 inline-block px-3 py-1 rounded" style={{ color: "#8B7D5E", backgroundColor: "var(--gold-muted)" }}>$1 per reading</p>
      </div>

      {checkoutError && (
        <div className="card-classic p-4 text-red-600 text-sm text-center mb-4">{checkoutError}</div>
      )}

      {paypalOrderId && paypalPurchaseId ? (
        <div className="card-classic p-6 space-y-4">
          <h2 className="text-lg font-bold text-center" style={{ color: "var(--accent)" }}>Complete Payment</h2>
          <p className="text-sm text-stone-500 text-center">Pay securely with PayPal — $1.00 USD</p>
          <PayPalButton
            orderId={paypalOrderId}
            purchaseId={paypalPurchaseId}
            onSuccess={handlePayPalSuccess}
            onError={(msg) => { setCheckoutError(msg); setPaypalOrderId(null); }}
            onCancel={() => { setPaypalOrderId(null); setPaypalPurchaseId(null); }}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 card-classic p-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Date Range</label>
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-xs text-stone-400">Start</span>
                <input name="startDate" type="date" required className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" /></div>
              <div><span className="text-xs text-stone-400">End</span>
                <input name="endDate" type="date" required className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" /></div>
            </div>
            <p className="text-xs text-stone-400 mt-1">Select a range of up to 90 days for best results.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Event Type</label>
            <select name="eventType" required className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300">
              <option value="">Select event type...</option>
              <option value="wedding">Wedding · 嫁娶</option>
              <option value="engagement">Engagement · 订婚</option>
              <option value="business">Business Opening · 开市</option>
              <option value="travel">Travel · 出行</option>
              <option value="moving">Moving House · 搬家</option>
              <option value="contract">Signing Contract · 签约</option>
              <option value="sacrifice">Ancestral Ceremony · 祭祀</option>
              <option value="construction">Construction · 修造</option>
              <option value="medical">Medical Treatment · 求医</option>
              <option value="funeral">Funeral & Burial · 安葬</option>
              <option value="education">Education & Study · 入学</option>
              <option value="meeting">Meeting & Gathering · 会友</option>
              <option value="renovation">Renovation · 装修</option>
            </select>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 btn-primary">
            {loading ? "Processing..." : "Find Auspicious Dates — $1.00"}
          </button>
          <p className="text-center text-xs text-stone-400">You will be redirected to a secure payment page</p>
        </form>
      )}

      {result && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold" style={{ color: "var(--accent)" }}>Auspicious Dates</h2>
          {result.auspiciousDays.map((day, i) => (
            <div key={i} className="card-classic p-6 mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xl font-bold" style={{ color: "var(--accent)" }}>{day.date}</p>
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded">Score: {day.score}/100</span>
              </div>
              <p className="text-sm text-stone-500 mb-3">{day.lunarDate}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-stone-400 text-xs">Heavenly Stems</p><p>{day.ganzhi.year} {day.ganzhi.month} {day.ganzhi.day}</p></div>
                <div><p className="text-stone-400 text-xs">Jianchu / Constellation</p><p>{day.jianchu} / {day.constellation}</p></div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs font-medium" style={{ color: "var(--accent)" }}>Suitable 宜</p>
                  <p style={{ color: "var(--accent)" }}>{day.suitable.join("、")}</p>
                  <p className="text-xs mt-0.5 opacity-60" style={{ color: "var(--accent)" }}>{day.suitableEn?.join(" / ")}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-xs font-medium">Unsuitable 忌</p>
                  <p className="text-stone-600">{day.unsuitable.join("、")}</p>
                  <p className="text-stone-500/60 text-xs mt-0.5">{day.unsuitableEn?.join(" / ")}</p>
                </div>
              </div>
              <p className="mt-2 text-xs" style={{ color: "var(--accent)" }}>Auspicious gods: {day.gods.join("、")}</p>
              <div className="mt-3 pt-3 border-t border-stone-100">
                <p className="text-xs font-medium mb-2" style={{ color: "var(--accent)" }}>Auspicious Hours 吉时</p>
                <div className="flex flex-wrap gap-1">
                  {day.hours.map(h => (
                    <span key={h.branch} className="text-xs px-2 py-1 rounded border"
                      style={h.auspicious ? { color: "var(--accent)", backgroundColor: "var(--accent-muted)", borderColor: "rgba(155,74,58,0.25)" } : { color: "#A4958A", backgroundColor: "#F5F3F0", borderColor: "#E8E4DF" }}
                      title={`${h.label} (${h.labelEn}) — ${h.auspicious ? "Auspicious" : "Inauspicious"}`}>
                      {h.label} <span className="opacity-60">{h.time}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
