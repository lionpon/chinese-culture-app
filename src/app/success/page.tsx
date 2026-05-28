"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useResults } from "@/lib/result-store";
import { getFreeTier } from "@/lib/free-tier";
import type { NamingResult, CalendarResult, DivinationResult, PalmReadingResult } from "@/types";
import NamingResultView from "@/components/NamingResultView";
import CalendarResultView from "@/components/CalendarResultView";
import DivinationResultView from "@/components/DivinationResultView";
import PalmReadingResultView from "@/components/PalmReadingResultView";
import LoadingSpinner from "@/components/LoadingSpinner";

type ResultState = "loading" | "completed" | "failed" | "timeout";

const SERVICE_LINKS: Record<string, { label: string; href: string }> = {
  naming: { label: "Get Another Name", href: "/naming" },
  calendar: { label: "Find Another Date", href: "/calendar" },
  divination: { label: "Cast Another Hexagram", href: "/divination" },
  "palm-reading": { label: "Read Another Palm", href: "/palm-reading" },
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const purchaseId = searchParams.get("purchase_id");
  const isFree = searchParams.get("free") === "1";

  const tx = searchParams.get("tx");

  const [state, setState] = useState<ResultState>("loading");
  const [type, setType] = useState<string>("");
  const [result, setResult] = useState<NamingResult | CalendarResult | DivinationResult | PalmReadingResult | null>(null);
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState(0);

  const { setNamingResult, setCalendarResult, setDivinationResult, setPalmReadingResult } = useResults();

  useEffect(() => {
    if (!purchaseId) {
      setError("Missing purchase ID. Please try again.");
      setState("failed");
      return;
    }

    if (isFree) {
      const tier = getFreeTier();
      setRemaining(tier.remaining);
    }

    const showResult = (data: { status: string; type?: string; result?: unknown; error?: string }) => {
      if (data.status === "completed" && data.type && data.result) {
        setState("completed");
        setType(data.type);
        setResult(data.result as NamingResult | CalendarResult | DivinationResult);
        if (data.type === "naming") setNamingResult(data.result as NamingResult);
        else if (data.type === "calendar") setCalendarResult(data.result as CalendarResult);
        else if (data.type === "divination") setDivinationResult(data.result as DivinationResult);
        else if (data.type === "palm-reading") setPalmReadingResult(data.result as PalmReadingResult);
        return true;
      } else if (data.status === "failed") {
        setState("failed");
        setError(data.error || "Processing failed. Your payment is safe — contact support for a refund if needed.");
        return true;
      }
      return false;
    };

    // Paid flow with PDT: try instant verification first
    if (!isFree && tx) {
      fetch("/api/pdt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchase_id: purchaseId, tx }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (showResult(data)) return;
          startPolling();
        })
        .catch(() => startPolling());
      return;
    }

    startPolling();

    function startPolling() {
      let attempts = 0;
      const maxAttempts = isFree ? 3 : 90;

      const checkResult = async () => {
        attempts++;
        try {
          const res = await fetch(`/api/result?purchase_id=${purchaseId}`);
          const data = await res.json();
          if (showResult(data)) return true;
        } catch {
          // Network error, keep polling
        }
        if (attempts >= maxAttempts) {
          setState("timeout");
          return true;
        }
        return false;
      };

      checkResult().then((done) => {
        if (done) return;
        const poll = setInterval(async () => {
          const done = await checkResult();
          if (done) clearInterval(poll);
        }, 2000);
        return () => clearInterval(poll);
      });
    }
  }, [purchaseId, isFree, tx, setNamingResult, setCalendarResult, setDivinationResult, setPalmReadingResult]);

  function retry() {
    setState("loading");
    let attempts = 0;

    const checkResult = async () => {
      attempts++;
      try {
        const res = await fetch(`/api/result?purchase_id=${purchaseId}`);
        const data = await res.json();

        if (data.status === "completed") {
          setState("completed");
          setType(data.type);
          setResult(data.result);
          if (data.type === "naming") setNamingResult(data.result);
          else if (data.type === "calendar") setCalendarResult(data.result);
          else if (data.type === "divination") setDivinationResult(data.result);
          else if (data.type === "palm-reading") setPalmReadingResult(data.result);
          return true;
        } else if (data.status === "failed") {
          setState("failed");
          setError("Processing failed. Your payment is safe — contact support for a refund if needed.");
          return true;
        }
      } catch {}

      if (attempts >= 30) {
        setState("timeout");
        return true;
      }
      return false;
    };

    checkResult().then((done) => {
      if (done) return;
      const poll = setInterval(async () => {
        const done = await checkResult();
        if (done) clearInterval(poll);
      }, 2000);
      return () => clearInterval(poll);
    });
  }

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

  if (state === "timeout") {
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <p className="text-amber-600 font-medium text-lg mb-2">Still Processing</p>
        <p className="text-stone-500 text-sm mb-2">
          Your payment has been received, but the result is taking longer than expected to prepare.
        </p>
        <p className="text-stone-400 text-xs mb-6">
          This can happen when PayPal&apos;s notification is delayed. Your payment and reading are safe.
        </p>
        <div className="bg-stone-50 rounded-lg p-4 mb-6 text-left text-xs text-stone-500 font-mono break-all">
          Reference: {purchaseId}
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={retry} className="px-5 py-2.5 rounded-xl text-sm font-medium btn-primary">
            Check Again
          </button>
          <a href="/" className="px-5 py-2.5 rounded-xl text-sm border border-stone-300 text-stone-500 hover:bg-stone-50 transition-colors">
            Back to Home
          </a>
        </div>
        <p className="text-xs text-stone-400 mt-6">
          If the result doesn&apos;t appear within 10 minutes, please contact support with your reference ID.
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
      {type === "palm-reading" && result && <PalmReadingResultView result={result as PalmReadingResult} />}

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
