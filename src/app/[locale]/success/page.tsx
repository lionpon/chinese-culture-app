"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useResults } from "@/lib/result-store";
import type { NamingResult, CalendarResult, DivinationResult, PalmReadingResult, DreamInterpretationResult } from "@/types";
import NamingResultView from "@/components/NamingResultView";
import CalendarResultView from "@/components/CalendarResultView";
import DivinationResultView from "@/components/DivinationResultView";
import PalmReadingResultView from "@/components/PalmReadingResultView";
import DreamInterpretationResultView from "@/components/DreamInterpretationResultView";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Link } from "@/navigation";

type ResultState = "loading" | "completed" | "failed" | "timeout";

function SuccessContent() {
  const t = useTranslations("success");
  const searchParams = useSearchParams();
  const purchaseId = searchParams.get("purchase_id");
  const isFree = searchParams.get("free") === "1";
  const tx = searchParams.get("tx");

  const [state, setState] = useState<ResultState>("loading");
  const [type, setType] = useState<string>("");
  const [result, setResult] = useState<NamingResult | CalendarResult | DivinationResult | PalmReadingResult | DreamInterpretationResult | null>(null);
  const [error, setError] = useState("");

  const { setNamingResult, setCalendarResult, setDivinationResult, setPalmReadingResult, setDreamInterpretationResult } = useResults();

  useEffect(() => {
    if (!purchaseId) {
      setError(t("missingId"));
      setState("failed");
      return;
    }

    const showResult = (data: { status: string; type?: string; result?: unknown; error?: string }) => {
      if (data.status === "completed" && data.type && data.result) {
        setState("completed");
        setType(data.type);
        setResult(data.result as NamingResult | CalendarResult | DivinationResult | DreamInterpretationResult);
        if (data.type === "naming") setNamingResult(data.result as NamingResult);
        else if (data.type === "calendar") setCalendarResult(data.result as CalendarResult);
        else if (data.type === "divination") setDivinationResult(data.result as DivinationResult);
        else if (data.type === "palm-reading") setPalmReadingResult(data.result as PalmReadingResult);
        else if (data.type === "dream-interpretation") setDreamInterpretationResult(data.result as DreamInterpretationResult);
        return true;
      } else if (data.status === "failed") {
        setState("failed");
        setError(data.error || t("failedBody"));
        return true;
      }
      return false;
    };

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
        } catch {}
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
  }, [purchaseId, isFree, tx, setNamingResult, setCalendarResult, setDivinationResult, setPalmReadingResult, setDreamInterpretationResult, t]);

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
          else if (data.type === "dream-interpretation") setDreamInterpretationResult(data.result);
          return true;
        } else if (data.status === "failed") {
          setState("failed");
          setError(t("failedBody"));
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

  const SERVICE_LINKS: Record<string, { label: string; href: string }> = {
    naming: { label: t("anotherName"), href: "/naming" },
    calendar: { label: t("anotherDate"), href: "/calendar" },
    divination: { label: t("anotherHexagram"), href: "/divination" },
    "palm-reading": { label: t("anotherPalm"), href: "/palm-reading" },
    "dream-interpretation": { label: t("anotherDream"), href: "/dream-interpretation" },
  };

  if (!purchaseId) {
    return <div className="text-center py-16 text-red-600">{t("missingId")}</div>;
  }

  if (state === "loading") {
    return (
      <div>
        <LoadingSpinner text={isFree ? t("preparing") : t("paidPreparing")} />
        <p className="text-center text-xs text-stone-400 -mt-12">
          {isFree ? t("freeReady") : t("waitSubtitle")}
        </p>
      </div>
    );
  }

  if (state === "timeout") {
    return (
      <div className="text-center py-16 max-w-md mx-auto">
        <p className="text-amber-600 font-medium text-lg mb-2">{t("timeoutTitle")}</p>
        <p className="text-stone-500 text-sm mb-2">{t("timeoutBody")}</p>
        <p className="text-stone-400 text-xs mb-6">{t("timeoutDetail")}</p>
        <div className="bg-stone-50 rounded-lg p-4 mb-6 text-left text-xs text-stone-500 font-mono break-all">
          {t("reference", { id: purchaseId })}
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={retry} className="px-5 py-2.5 rounded-xl text-sm font-medium btn-primary">
            {t("checkAgain")}
          </button>
          <Link href="/" className="px-5 py-2.5 rounded-xl text-sm border border-stone-300 text-stone-500 hover:bg-stone-50 transition-colors">
            {t("backHome")}
          </Link>
        </div>
        <p className="text-xs text-stone-400 mt-6">{t("timeoutFooter")}</p>
      </div>
    );
  }

  if (state === "failed") {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 font-medium">{t("failedTitle")}</p>
        <p className="text-stone-500 text-sm mt-2">{error || t("failedBody")}</p>
        <Link href="/" className="inline-block mt-4 text-stone-600 underline text-sm hover:text-stone-800">{t("returnHome")}</Link>
      </div>
    );
  }

  const serviceLink = SERVICE_LINKS[type];

  return (
    <div className="max-w-2xl mx-auto">
      {type === "naming" && result && <NamingResultView result={result as NamingResult} isFree={isFree} purchaseId={purchaseId ?? undefined} />}
      {type === "calendar" && result && <CalendarResultView result={result as CalendarResult} isFree={isFree} purchaseId={purchaseId ?? undefined} />}
      {type === "divination" && result && <DivinationResultView result={result as DivinationResult} isFree={isFree} purchaseId={purchaseId ?? undefined} />}
      {type === "palm-reading" && result && <PalmReadingResultView result={result as PalmReadingResult} />}
      {type === "dream-interpretation" && result && <DreamInterpretationResultView result={result as DreamInterpretationResult} />}

      {isFree && (
        <div className="mt-8 text-center">
          {serviceLink && (
            <Link href={serviceLink.href} className="inline-block px-5 py-2.5 rounded-xl text-sm border border-stone-300 text-stone-500 hover:bg-stone-50 transition-colors">
              {serviceLink.label}
            </Link>
          )}
        </div>
      )}
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
