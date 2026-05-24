"use client";

import { useState } from "react";

export default function NavMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 -mr-2 text-stone-500 hover:text-stone-800 transition-colors"
        aria-label="Toggle navigation menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {open && (
        <div className="absolute top-14 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-lg">
          <div className="flex flex-col p-4 space-y-3">
            <a href="/naming" className="text-sm text-stone-600 hover:text-stone-900 py-1" onClick={() => setOpen(false)}>
              Create a Chinese Name
            </a>
            <a href="/calendar" className="text-sm text-stone-600 hover:text-stone-900 py-1" onClick={() => setOpen(false)}>
              Auspicious Date Selection
            </a>
            <a href="/divination" className="text-sm text-stone-600 hover:text-stone-900 py-1" onClick={() => setOpen(false)}>
              I Ching Divination
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
