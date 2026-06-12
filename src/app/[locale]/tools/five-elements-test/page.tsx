"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/navigation";
import { quizQuestions, calculateElement, elementResults, type QuizQuestion } from "@/data/five-elements-quiz-data";
import EmailCaptureForm from "@/components/EmailCaptureForm";

type Locale = "en" | "ru" | "ja" | "ko";

export default function FiveElementsTestPage() {
  const t = useTranslations("tools");
  const locale = useLocale();
  const l = (locale as Locale) || "en";

  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 });
  const [result, setResult] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const questions = quizQuestions;
  const totalQ = questions.length;

  const handleSelect = (q: QuizQuestion, optionIndex: number) => {
    if (answered) return;
    setAnswered(true);

    const option = q.options[optionIndex];
    const newScores = { ...scores };
    for (const [el, val] of Object.entries(option.scores)) {
      newScores[el] = (newScores[el] || 0) + val;
    }
    setScores(newScores);

    if (currentQ === totalQ - 1) {
      const best = calculateElement(newScores);
      setResult(best);
    }
  };

  const handleNext = () => {
    setCurrentQ(currentQ + 1);
    setAnswered(false);
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setScores({ Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 });
    setResult(null);
    setAnswered(false);
  };

  if (result) {
    const r = elementResults[result];
    return (
      <div className="max-w-lg mx-auto px-3 sm:px-4 py-6 sm:py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 text-center mb-6">
          {t("fiveElements.title")}
        </h1>

        <div className="card-classic p-5 sm:p-6 mb-6 text-center">
          <div className="text-sm text-stone-500 mb-2">{t("fiveElements.yourElement")}</div>
          <div className="text-7xl mb-3" style={{ color: r.color }}>{r.elementZh}</div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: r.color }}>
            {r.element[l]}
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full mt-2 mb-4" style={{ backgroundColor: r.color }} />

          <p className="text-stone-600 text-sm leading-relaxed mb-6 text-left">
            {r.description[l]}
          </p>

          <div className="space-y-4 text-left">
            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-1">{t("fiveElements.career")}</h3>
              <p className="text-sm text-stone-600">{r.career[l]}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-700 mb-1">{t("fiveElements.compatible")}</h3>
              <p className="text-sm text-stone-600">{r.compatible[l]}</p>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="mt-6 text-sm text-stone-500 hover:text-stone-700 underline"
          >
            {t("fiveElements.restart")}
          </button>
        </div>

        <EmailCaptureForm source="five-elements-test" />

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-center">
            <p className="text-sm text-stone-600 mb-2">{t("fiveElements.ctaDivination")}</p>
            <Link href="/divination" className="btn-primary inline-block px-4 py-1.5 text-xs font-medium rounded-md">
              I Ching →
            </Link>
          </div>
          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-center">
            <p className="text-sm text-stone-600 mb-2">{t("fiveElements.ctaCalendar")}</p>
            <Link href="/calendar" className="btn-primary inline-block px-4 py-1.5 text-xs font-medium rounded-md">
              Calendar →
            </Link>
          </div>
        </div>

        <p className="text-center text-stone-400 text-xs mt-8">{t("disclaimer")}</p>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="max-w-lg mx-auto px-3 sm:px-4 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 text-center mb-2">
        {t("fiveElements.title")}
      </h1>
      <p className="text-stone-500 text-center text-sm mb-8">
        {t("fiveElements.subtitle")}
      </p>

      <div className="mb-4">
        <div className="flex gap-1 justify-center mb-4">
          {Array.from({ length: totalQ }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i < currentQ ? "bg-green-400" : i === currentQ ? "bg-accent" : "bg-stone-200"
              }`}
            />
          ))}
        </div>
        <p className="text-stone-400 text-xs text-center">
          {t("fiveElements.question")} {currentQ + 1} {t("fiveElements.of")} {totalQ}
        </p>
      </div>

      <div className="card-classic p-5 sm:p-6 mb-4">
        <p className="text-stone-800 font-medium mb-4">{q.question[l]}</p>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const label = opt.label[l];
            return (
              <button
                key={i}
                onClick={() => handleSelect(q, i)}
                disabled={answered}
                className={`w-full text-left px-4 py-3 rounded-md border text-sm transition-colors ${
                  answered
                    ? "border-stone-200 bg-stone-50 opacity-60 cursor-default"
                    : "border-stone-200 hover:border-accent/50 hover:bg-stone-50 cursor-pointer"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => { setCurrentQ(currentQ - 1); setAnswered(false); }}
          disabled={currentQ === 0}
          className="text-sm text-stone-500 hover:text-stone-700 disabled:opacity-30 disabled:cursor-default"
        >
          ← {t("fiveElements.prev")}
        </button>
        <button
          onClick={handleNext}
          disabled={(!answered && currentQ !== totalQ - 1) || (currentQ === totalQ - 1 && !answered)}
          className="text-sm font-medium text-accent hover:opacity-80 disabled:opacity-30 disabled:cursor-default"
        >
          {currentQ === totalQ - 1 ? t("fiveElements.seeResult") : `${t("fiveElements.next")} →`}
        </button>
      </div>

      <p className="text-center text-stone-400 text-xs mt-8">{t("disclaimer")}</p>
    </div>
  );
}
