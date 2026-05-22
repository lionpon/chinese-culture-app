"use client";

import { ResultProvider } from "@/lib/result-store";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return <ResultProvider>{children}</ResultProvider>;
}
