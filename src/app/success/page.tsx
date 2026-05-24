"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useResults } from "@/lib/result-store";
import { getFreeTier } from "@/lib/free-tier";
import type { NamingResult, CalendarResult, DivinationResult } from "@/types";
import NamingResultView from "@/components/NamingResultView";
import CalendarResultView from "@/components/CalendarResultView";
import DivinationResultView from "@/components/DivinationResultView";
import LoadingSpinner from "@/components/LoadingSpinner";

type ResultState = "loading" | "completed" | "failed";

const SERVICE_LINKS: Record<string, { label: string; href: string }> = {
  naming: { label: "Get Another Name", href: "/naming" },
  calendar: { label: "Find Another Date", href: "/calendar" },
  divination: { label: "Cast Another Hexagram", href: "/divination" },
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const purchaseId = searchParams.get("purchase_id");
  const isFree = searchParams.get("free") === "1";

  const [state, setState] = useState<ResultState>("loading");
  const [type, setType] = useState<string>("");
  const [result, setResult] = useState<NamingResult | CalendarResult | DivinationResult | null>(null);
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState(0);

  const { setNamingResult, setCalendarResult, setDivinationResult } = useResults();

  useEffect(() => {
    if (!purchaseId) {
      setError("Missing purchase ID. Please try again.");
      setState("failed");
      return;
    }

    // Free tier — read remaining from localStorage after the decrement in useCheckout
    if (isFree) {
      const tier = getFreeTier();
      setRemaining(tier.remaining);
    }

    let attempts = 0;
    const maxAttempts = isFree ? 3 : 30; // free results are ready immediately

    const poll = setInterval(async () => {
      attempts++;
      try {
        const res = await fetch(`/api/result?purchase_id=${purchaseId}`);
        const data = await res.json();

        if (data.status === "completed") {
          clearInterval(poll);
          setState("completed");
          setType(data.type);
          setResult(data.result);

          if (data.type === "naming") setNamingResult(data.result);
          else if (data.type === "calendar") setCalendarResult(data.result);
          else if (data.type === "divination") setDivinationResult(data.result);
        } else if (data.status === "failed") {
          clearInterval(poll);
          setState("failed");
          setError(data.error || "Processing failed.");
        }
      } catch {
        // Keep polling
      }

      if (attempts >= maxAttempts) {
        clearInterval(poll);
        setState("failed");
        setError("Result is taking longer than expected. Please check back or contact support.");
      }
    }, 2000);

    return () => clearInterval(poll);
  }, [purchaseId, isFree, setNamingResult, setCalendarResult, setDivinationResult]);

  if (!purchaseId) {
    return <div className="text-center py-16 text-red-600">Missing purchase ID. Please try your request again.</div>;
  }

  if (state === "loading") {
    return (
      <div>
        <LoadingSpinner text={isFree ? "Preparing your reading..." : "Payment received. Preparing your reading..."} />
        <p className="text-center text-xs text-stone-400 -mt-12">
          {isFree ? "Your free reading is ready." : "This usually takes a few seconds."}
        </p>
      </div>
    );
  }

  if (state === "failed") {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 font-medium">Something went wrong</p>
        <p className="text-stone-500 text-sm mt-2">{error || "Please contact support."}</p>
        <a href="/" className="inline-block mt-4 text-stone-600 underline text-sm hover:text-stone-800">Return to Home</a>
      </div>
    );
  }

  const serviceLink = SERVICE_LINKS[type];

  return (
    <div className="max-w-2xl mx-auto">
      {type === "naming" && result && <NamingResultView result={result as NamingResult} />}
      {type === "calendar" && result && <CalendarResultView result={result as CalendarResult} />}
      {type === "divination" && result && <DivinationResultView result={result as DivinationResult} />}

      {isFree && (
        <div className="mt-8 card-classic p-5 text-center">
          <p className="text-sm font-medium text-accent mb-2">
            {remaining > 0
              ? `Free reading used — ${remaining} free ${remaining === 1 ? "use" : "uses"} remaining`
              : "That was your last free reading"}
          </p>
          <p className="text-xs text-stone-500 mb-4">
            Each personalized reading requires computation based on classical texts and traditional methods.
            Future readings are $1 each.
          </p>
          {serviceLink && (
            <a href={serviceLink.href} className="inline-block px-5 py-2.5 rounded-xl text-sm font-medium btn-primary">
              {serviceLink.label} — $1.00
            </a>
          )}
        </div>
      )}

      <p className="text-center text-xs text-stone-400 mt-8">
        For cultural appreciation only. Decisions are your own responsibility. Payments are voluntary contributions for app maintenance.
      </p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SuccessContent />
    </Suspense>
  );
}
