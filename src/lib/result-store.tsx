"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { NamingResult, CalendarResult, DivinationResult, PalmReadingResult, DreamInterpretationResult } from "@/types";

interface StoredResults {
  naming: NamingResult | null;
  calendar: CalendarResult | null;
  divination: DivinationResult | null;
  palmReading: PalmReadingResult | null;
  dreamInterpretation: DreamInterpretationResult | null;
  updatedAt: Partial<Record<keyof StoredResults, number>>;
}

interface ResultContextValue {
  results: StoredResults;
  setNamingResult: (r: NamingResult | null) => void;
  setCalendarResult: (r: CalendarResult | null) => void;
  setDivinationResult: (r: DivinationResult | null) => void;
  setPalmReadingResult: (r: PalmReadingResult | null) => void;
  setDreamInterpretationResult: (r: DreamInterpretationResult | null) => void;
  clearAll: () => void;
}

const STORAGE_KEY = "chinese-culture-results";

const emptyResults: StoredResults = {
  naming: null,
  calendar: null,
  divination: null,
  palmReading: null,
  dreamInterpretation: null,
  updatedAt: {},
};

function loadFromStorage(): StoredResults {
  if (typeof window === "undefined") return { ...emptyResults };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* corrupted data, reset */ }
  return { ...emptyResults };
}

function saveToStorage(results: StoredResults) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch { /* storage full or unavailable */ }
}

const ResultContext = createContext<ResultContextValue | null>(null);

export function ResultProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<StoredResults>(emptyResults);

  useEffect(() => {
    setResults(loadFromStorage());
  }, []);

  const update = useCallback((key: keyof StoredResults, value: unknown) => {
    setResults(prev => {
      const next = {
        ...prev,
        [key]: value,
        updatedAt: { ...prev.updatedAt, [key]: Date.now() },
      };
      saveToStorage(next);
      return next;
    });
  }, []);

  const setNamingResult = useCallback((r: NamingResult | null) => update("naming", r), [update]);
  const setCalendarResult = useCallback((r: CalendarResult | null) => update("calendar", r), [update]);
  const setDivinationResult = useCallback((r: DivinationResult | null) => update("divination", r), [update]);
  const setPalmReadingResult = useCallback((r: PalmReadingResult | null) => update("palmReading", r), [update]);
  const setDreamInterpretationResult = useCallback((r: DreamInterpretationResult | null) => update("dreamInterpretation", r), [update]);

  const clearAll = useCallback(() => {
    setResults({ ...emptyResults });
    if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <ResultContext.Provider value={{ results, setNamingResult, setCalendarResult, setDivinationResult, setPalmReadingResult, setDreamInterpretationResult, clearAll }}>
      {children}
    </ResultContext.Provider>
  );
}

export function useResults(): ResultContextValue {
  const ctx = useContext(ResultContext);
  if (!ctx) throw new Error("useResults must be used within a ResultProvider");
  return ctx;
}
