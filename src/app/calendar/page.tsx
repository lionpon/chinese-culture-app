"use client";

import { FormEvent } from "react";
import { useCheckout } from "@/lib/useCheckout";
import SubmitButton from "@/components/SubmitButton";
import FreeTierBadge from "@/components/FreeTierBadge";
import { hasFreeUses } from "@/lib/free-tier";

export default function CalendarPage() {
  const { loading, checkout } = useCheckout("calendar");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    await checkout({
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      eventType: form.eventType.value,
    });
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-accent">Auspicious Date Selection</h1>
        <p className="text-stone-500 mt-2">Based on traditional Chinese almanac principles</p>
        {!hasFreeUses() && (
          <p className="text-xs mt-1 inline-block px-3 py-1 rounded badge-accent">$1 per reading</p>
        )}
      </div>

      <FreeTierBadge />

      <form onSubmit={handleSubmit} className="space-y-5 card-classic p-4 sm:p-6">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Date Range</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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

        <SubmitButton loading={loading} label="Find Auspicious Dates" hasFree={hasFreeUses()} />
      </form>
    </div>
  );
}
