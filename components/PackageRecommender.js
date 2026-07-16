"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { packages } from "@/lib/data";
import Icon from "./Icon";

const QUESTIONS = [
  {
    id: "experience",
    q: "How much driving experience do you have?",
    options: [
      { label: "Total beginner", value: "none" },
      { label: "Some practice", value: "some" },
      { label: "Confident, need the certificate", value: "confident" },
    ],
  },
  {
    id: "car",
    q: "Do you need a car for your road test?",
    options: [
      { label: "No, I have my own", value: "no" },
      { label: "Yes, for a local test", value: "local" },
      { label: "Yes, and the centre is far", value: "far" },
    ],
  },
  {
    id: "distance",
    q: "How far is your test centre?",
    options: [
      { label: "Local / nearby", value: "local" },
      { label: "Up to 1 hour away", value: "1hr" },
      { label: "1–2 hours away", value: "2hr" },
    ],
  },
  {
    id: "safety",
    q: "How important is a free second attempt?",
    options: [
      { label: "Not needed", value: "no" },
      { label: "Nice to have as a safety net", value: "yes" },
      { label: "Very — I want the backup", value: "must" },
    ],
  },
];

function recommend(answers) {
  if (answers.distance === "2hr" || answers.car === "far") return "platinum";
  if (answers.distance === "1hr") return "gold";
  if (answers.safety === "must" || answers.safety === "yes") return "mdi-special";
  if (answers.car === "local") return "silver";
  return "bronze";
}

export default function PackageRecommender() {
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState({});

  const total = QUESTIONS.length;
  const isResult = step >= total;
  const current = QUESTIONS[step];
  const result = isResult ? packages.find((p) => p.id === recommend(answers)) : null;

  const choose = (value) => {
    setAnswers((a) => ({ ...a, [current.id]: value }));
    setStep((s) => s + 1);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-ink-200">
      {/* Header — green guide sign */}
      <div className="flex items-center gap-3 bg-sign-700 px-6 py-5 text-white">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 ring-1 ring-white/25">
          <Icon name="sparkles" className="h-6 w-6" />
        </span>
        <div>
          <p className="font-display text-base font-bold">Smart Package Finder</p>
          <p className="font-mono text-xs uppercase tracking-wider text-road-400">
            4 questions · ~30 sec
          </p>
        </div>
      </div>

      {/* Progress */}
      {step >= 0 && !isResult && (
        <div className="h-1.5 w-full bg-ink-100">
          <motion.div
            className="h-full bg-road-500"
            initial={false}
            animate={{ width: `${((step + 1) / total) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      )}

      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {step === -1 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="text-center"
            >
              <h3 className="font-display text-xl font-bold text-ink-900">
                Not sure which package fits?
              </h3>
              <p className="mx-auto mt-2 max-w-md text-ink-600">
                Our finder matches you to the right plan based on your experience,
                road-test needs and location.
              </p>
              <button onClick={() => setStep(0)} className="btn-primary mx-auto mt-6">
                Start the finder
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {step >= 0 && !isResult && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28 }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-sign-700">
                Question {step + 1} / {total}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-ink-900">
                {current.q}
              </h3>
              <div className="mt-5 space-y-3">
                {current.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => choose(opt.value)}
                    className="group flex w-full items-center justify-between rounded-xl border-2 border-ink-100 bg-white px-5 py-4 text-left font-medium text-ink-900 transition-all hover:border-sign-500 hover:bg-sign-700/[0.05]"
                  >
                    {opt.label}
                    <Icon
                      name="arrow"
                      className="h-5 w-5 text-ink-200 transition-colors group-hover:text-sign-700"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {isResult && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="text-center"
            >
              <span className="eyebrow">
                <Icon name="check" className="h-3.5 w-3.5" /> Your match
              </span>
              <h3 className="mt-4 font-display text-3xl font-extrabold text-ink-900">
                {result.name} Package
              </h3>
              <p className="mt-1 hud-num text-2xl font-bold text-sign-700">
                ${result.price}
                <span className="font-mono text-sm font-normal text-ink-500"> +tax</span>
              </p>
              <p className="mx-auto mt-3 max-w-md text-ink-600">{result.tagline}</p>

              <ul className="mx-auto mt-5 max-w-sm space-y-2 text-left">
                {result.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink-700">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-sign-600" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href={`/register?package=${result.id}`} className="btn-primary">
                  Register for {result.name}
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link href="/packages" className="btn-ghost">
                  Compare all packages
                </Link>
              </div>
              <button
                onClick={restart}
                className="mt-4 font-mono text-xs uppercase tracking-wider text-ink-500 hover:text-sign-700"
              >
                Start over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
