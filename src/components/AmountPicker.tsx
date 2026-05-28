"use client";

import { useState } from "react";

const PRESETS = [1, 3, 5, 10];

interface Props {
  value: number;
  onChange: (amount: number) => void;
}

export default function AmountPicker({ value, onChange }: Props) {
  const [customMode, setCustomMode] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-2">
        Support Amount (USD)
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {PRESETS.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => { setCustomMode(false); onChange(amt); }}
            className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
              !customMode && value === amt
                ? "border-accent bg-accent-muted text-accent font-medium"
                : "border-stone-200 text-stone-600 hover:border-stone-300"
            }`}
          >
            ${amt}
          </button>
        ))}
        <button
          type="button"
          onClick={() => { setCustomMode(true); onChange(value >= 1 ? value : 5); }}
          className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
            customMode
              ? "border-accent bg-accent-muted text-accent font-medium"
              : "border-stone-200 text-stone-600 hover:border-stone-300"
          }`}
        >
          Custom
        </button>
      </div>
      {customMode && (
        <input
          type="number"
          min={1}
          max={100}
          value={value}
          onChange={(e) => onChange(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-24 border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300"
          placeholder="Amount"
        />
      )}
      <p className="text-xs text-stone-400 mt-1.5">
        Your contribution supports ongoing development, API costs, and server maintenance.
      </p>
    </div>
  );
}
