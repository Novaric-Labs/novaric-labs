"use client";

import { useState } from "react";

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
    helper: "Be specific. The more concrete, the better the read.",
    placeholder:
      "e.g. Maintenance requests come in by email and get manually sorted, routed to vendors, and followed up on. It eats two FTEs and things slip.",
  },
  {
    key: "stack",
    question: "What software do you run today?",
    helper: "The tools this workflow lives in.",
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

/**
 * The five-question fit check. Same questions and the same /api/qualify
 * route as before; promoted to its own section and restyled.
 */
export default function FitCheck() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const current = STEPS[step];
  const value = answers[current.key];
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
        e instanceof Error ? e.message : "Something went wrong. Please try again."
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
    <section className="fit" id="fit">
      <div className="wrap">
        <span className="mono" style={{ display: "block", marginBottom: 24 }}>
          03 / Fit check · Free · No email required
        </span>
        <h2>Is AI right for your workflow?</h2>
        <p>
          Five questions, one candid read. We&apos;ll tell you to wait if you
          should wait. Your answers go to Claude for a one-time assessment and
          nothing is stored.
        </p>

        {!started && !result && (
          <button type="button" className="btn fill" onClick={() => setStarted(true)}>
            Start the fit check
          </button>
        )}

        {started && !result && (
          <div className="fit-panel">
            <div className="dots" aria-hidden="true">
              {STEPS.map((s, i) => (
                <i key={s.key} className={i <= step ? "on" : undefined} />
              ))}
            </div>
            <span className="mono">
              Step {step + 1} of {STEPS.length}
            </span>
            <h3>{current.question}</h3>
            <p className="helper">{current.helper}</p>

            {current.options ? (
              <fieldset className="opts">
                <legend className="sr-only">{current.question}</legend>
                {current.options.map((opt) => {
                  const selected = value === opt;
                  return (
                    <label key={opt} className={selected ? "opt sel" : "opt"}>
                      <input
                        type="radio"
                        name={current.key}
                        value={opt}
                        checked={selected}
                        onChange={() => setValue(opt)}
                        className="sr-only"
                      />
                      <i aria-hidden="true" />
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
              />
            )}

            {error && (
              <span className="err" role="alert">
                {error}
              </span>
            )}

            <div className="assess-nav">
              <button
                type="button"
                className="linkish mono"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0 || loading}
              >
                ‹ Back
              </button>

              {isLast ? (
                <button
                  type="button"
                  className="btn fill sm"
                  onClick={submit}
                  disabled={!canAdvance || loading}
                >
                  {loading ? "Reading…" : "Get my read"}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn sm"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canAdvance}
                >
                  Next ›
                </button>
              )}
            </div>
          </div>
        )}

        {result && (
          <div className="fit-panel">
            <span className="mono">Your read</span>
            <div className="out thin-scroll">
              {result.split(/\n\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="assess-nav">
              <button type="button" className="linkish mono" onClick={reset}>
                ‹ Start over
              </button>
              <a className="btn fill sm" href="#contact">
                Talk to us about this
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
