"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, ArrowLeft, Loader2, RotateCcw } from "lucide-react";

type Answers = {
  industry: string;
  teamSize: string;
  painPoint: string;
  stack: string;
  readiness: string;
};

type Step = {
  key: keyof Answers;
  question: string;
  helper: string;
  options?: string[];
  textarea?: boolean;
  placeholder?: string;
};

const STEPS: Step[] = [
  {
    key: "industry",
    question: "What industry are you in?",
    helper: "Pick the closest fit.",
    options: [
      "Property Management",
      "Financial Services",
      "Healthcare Operations",
      "Legal",
      "Logistics",
      "Other",
    ],
  },
  {
    key: "teamSize",
    question: "How big is the team this would touch?",
    helper: "The people whose work the automation would affect.",
    options: ["Just me / under 5", "5–25", "25–100", "100–500", "500+"],
  },
  {
    key: "painPoint",
    question: "What's the biggest operational pain point?",
    helper: "Be specific — the more concrete, the better the assessment.",
    textarea: true,
    placeholder:
      "e.g. Maintenance requests come in by email and get manually sorted, routed to vendors, and followed up on. It eats two FTEs and things slip.",
  },
  {
    key: "stack",
    question: "What software do you run today?",
    helper: "The tools this workflow lives in.",
    textarea: true,
    placeholder: "e.g. AppFolio, Gmail, Slack, a few spreadsheets, QuickBooks",
  },
  {
    key: "readiness",
    question: "How documented and repeatable is the process today?",
    helper: "An honest read helps us scope realistically.",
    options: [
      "It's all in people's heads",
      "Loosely documented",
      "Mostly documented & repeatable",
      "Fully documented with clear rules",
    ],
  },
];

const EMPTY: Answers = {
  industry: "",
  teamSize: "",
  painPoint: "",
  stack: "",
  readiness: "",
};

export default function QualifierTool() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const current = STEPS[step];
  const value = answers[current?.key];
  const isLast = step === STEPS.length - 1;
  const canAdvance = Boolean(value && value.trim());

  function setValue(v: string) {
    setAnswers((a) => ({ ...a, [current.key]: v }));
  }

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/qualify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setResult(data.assessment);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStarted(false);
    setStep(0);
    setAnswers(EMPTY);
    setResult(null);
    setError(null);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-panel-line bg-panel text-panel-fg">
      <div className="grid gap-8 p-8 sm:p-10 md:grid-cols-[1.1fr_1.4fr] md:items-center">
        {/* Left: pitch */}
        <div>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <Sparkles size={22} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-2xl font-semibold tracking-tightish">
            Is AI right for your workflow?
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-panel-muted">
            Answer five quick questions and get a candid, AI-generated
            assessment of where automation fits — and where it doesn&apos;t —
            for your operation. No email required.
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-panel-muted/70">
            <Sparkles size={13} /> Powered by Claude
          </p>
        </div>

        {/* Right: interactive panel */}
        <div className="rounded-xl border border-panel-line bg-panel-fg/[0.03] p-6 sm:p-7">
          {!started && !result && (
            <div className="flex h-full min-h-[220px] flex-col items-start justify-center">
              <p className="text-lg font-medium">Takes about a minute.</p>
              <p className="mt-2 text-sm text-panel-muted">
                Your answers are sent to Claude to generate a one-time
                assessment. Nothing is stored.
              </p>
              <button
                type="button"
                onClick={() => setStarted(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
              >
                Start the assessment
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {started && !result && (
            <div>
              {/* progress */}
              <div className="mb-6 flex items-center gap-2" aria-hidden="true">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i <= step ? "bg-accent" : "bg-panel-fg/15"
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                Step {step + 1} of {STEPS.length}
              </p>
              <h4 className="mt-2 text-xl font-semibold">{current.question}</h4>
              <p className="mt-1.5 text-sm text-panel-muted">{current.helper}</p>

              <div className="mt-5">
                {current.options ? (
                  <fieldset className="grid gap-2.5">
                    <legend className="sr-only">{current.question}</legend>
                    {current.options.map((opt) => {
                      const selected = value === opt;
                      return (
                        <label
                          key={opt}
                          className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
                            selected
                              ? "border-accent bg-accent/10 text-panel-fg"
                              : "border-panel-fg/12 text-panel-fg/75 hover:border-panel-fg/30 hover:bg-panel-fg/5"
                          }`}
                        >
                          <input
                            type="radio"
                            name={current.key}
                            value={opt}
                            checked={selected}
                            onChange={() => setValue(opt)}
                            className="sr-only"
                          />
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                              selected ? "border-accent" : "border-panel-fg/30"
                            }`}
                            aria-hidden="true"
                          >
                            {selected && (
                              <span className="h-2 w-2 rounded-full bg-accent" />
                            )}
                          </span>
                          {opt}
                        </label>
                      );
                    })}
                  </fieldset>
                ) : (
                  <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={current.placeholder}
                    rows={4}
                    aria-label={current.question}
                    className="w-full resize-none rounded-lg border border-panel-fg/12 bg-panel-fg/[0.04] px-4 py-3 text-sm text-panel-fg placeholder:text-panel-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40"
                  />
                )}
              </div>

              {error && (
                <p className="mt-4 text-sm text-red-300" role="alert">
                  {error}
                </p>
              )}

              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0 || loading}
                  className="inline-flex items-center gap-1.5 text-sm text-panel-muted transition-colors hover:text-panel-fg disabled:invisible"
                >
                  <ArrowLeft size={15} /> Back
                </button>

                {isLast ? (
                  <button
                    type="button"
                    onClick={submit}
                    disabled={!canAdvance || loading}
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Assessing…
                      </>
                    ) : (
                      <>
                        Get my assessment <Sparkles size={15} />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canAdvance}
                    className="inline-flex items-center gap-2 rounded-full bg-panel-fg px-6 py-2.5 text-sm font-semibold text-panel transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next <ArrowRight size={15} />
                  </button>
                )}
              </div>
            </div>
          )}

          {result && (
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                Your assessment
              </p>
              <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-panel-fg/90 thin-scroll max-h-72 overflow-y-auto pr-1">
                {result.split(/\n\n+/).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
                >
                  Talk to us about this <ArrowRight size={15} />
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-sm text-panel-muted transition-colors hover:text-panel-fg"
                >
                  <RotateCcw size={14} /> Start over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
