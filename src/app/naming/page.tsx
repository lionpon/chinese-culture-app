"use client";

import { FormEvent } from "react";
import { useCheckout } from "@/lib/useCheckout";
import SubmitButton from "@/components/SubmitButton";

export default function NamingPage() {
  const { loading, checkout } = useCheckout("naming");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    await checkout({
      surname: form.surname.value,
      gender: form.gender.value,
      birthYear: parseInt(form.birthYear.value),
      birthMonth: parseInt(form.birthMonth.value),
      birthDay: parseInt(form.birthDay.value),
      birthHour: parseInt(form.birthHour.value),
      style: (form.elements.namedItem("style") as HTMLSelectElement).value,
    });
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-accent">Create a Chinese Name</h1>
        <p className="text-stone-500 mt-2">Based on your birth information and classical Chinese texts</p>
        <p className="text-xs mt-1 inline-block px-3 py-1 rounded badge-accent">$1 per reading</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 card-classic p-4 sm:p-6">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Your Surname</label>
          <input name="surname" required placeholder="e.g. Smith" className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Gender</label>
          <select name="gender" required className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300">
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Date of Birth</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input name="birthYear" type="number" placeholder="Year" required min={1900} max={2100} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
            <input name="birthMonth" type="number" placeholder="Month" required min={1} max={12} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
            <input name="birthDay" type="number" placeholder="Day" required min={1} max={31} className="border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Birth Hour (0-23)</label>
          <input name="birthHour" type="number" placeholder="e.g. 8 for 8:00 AM" required min={0} max={23} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300" />
          <p className="text-xs text-stone-400 mt-1">Approximate is fine if you don&apos;t know the exact hour.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Name Style</label>
          <select name="style" required className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300">
            <option value="">Select...</option>
            <option value="elegant">Elegant & Refined · 典雅</option>
            <option value="grand">Grand & Powerful · 大气</option>
            <option value="fresh">Fresh & Natural · 清新</option>
          </select>
        </div>

        <SubmitButton loading={loading} label="Generate Name — $1.00" />
      </form>
    </div>
  );
}
