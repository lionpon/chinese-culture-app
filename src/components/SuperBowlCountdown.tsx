"use client";

import { useEffect, useState } from "react";

type Props = {
  targetUtc: string; // ISO "2027-02-14T23:30:00Z"
  labels: { days: string; hours: string; minutes: string; seconds: string };
};

export default function SuperBowlCountdown({ targetUtc, labels }: Props) {
  const target = new Date(targetUtc).getTime();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);

  const cells = [
    { v: days, l: labels.days },
    { v: hours, l: labels.hours },
    { v: minutes, l: labels.minutes },
    { v: seconds, l: labels.seconds },
  ];

  return (
    <div className="flex justify-center gap-2 sm:gap-4">
      {cells.map((c) => (
        <div key={c.l} className="text-center min-w-[64px] sm:min-w-[80px]">
          <div className="rounded-xl px-2 py-2 sm:py-3 text-2xl sm:text-3xl font-black tabular-nums text-white"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
            {String(c.v).padStart(2, "0")}
          </div>
          <p className="text-[10px] sm:text-xs mt-1 text-white/70 uppercase tracking-wider">{c.l}</p>
        </div>
      ))}
    </div>
  );
}
