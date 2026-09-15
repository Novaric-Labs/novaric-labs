"use client";

import { useRef, useState, type FormEvent } from "react";

const EMAIL = "hello@novariclabs.com";
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Fields = {
  name: string;
  company: string;
  email: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", company: "", email: "", message: "" };

const PATHS: [string, string, string][] = [
  [
    "Enable my team",
    "Audit, foundation, and training so your engineers build with AI themselves.",
    "AI%20Enablement%20engagement",
  ],
  [
    "Automate a workflow",
    "A forward-deployed engineer embeds and ships agents into your stack.",
    "Automation%20engagement",
  ],
  [
    "Partner with the Lab",
    "Be a design partner on a product, or bring us a problem worth building for.",
    "Incubator%20Lab%20%E2%80%94%20partner",
  ],
];

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please add your name.";
  if (!f.email.trim()) {
    e.email = "Please add your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
    e.email = "That email doesn't look right.";
  }
  if (!f.message.trim()) e.message = "Tell us a little about what you're working on.";
  return e;
}

export default function Contact() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [armed, setArmed] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  function update(key: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  /** The guarded switch no longer opens a mailto — it drops you into the form. */
  function ignite() {
    setArmed(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    formRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
    window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), reduce ? 0 : 500);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // No Formspree configured → fall back to a prefilled mailto.
    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(
        `New inquiry from ${fields.name}${fields.company ? ` (${fields.company})` : ""}`
      );
      const body = encodeURIComponent(
        `Name: ${fields.name}\nCompany: ${fields.company}\nEmail: ${fields.email}\n\n${fields.message}`
      );
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      setStatus("done");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          company: fields.company,
          email: fields.email,
          message: fields.message,
        }),
      });
      if (!res.ok) throw new Error("Form submission failed");
      setStatus("done");
      setFields(EMPTY);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap cols">
        <div>
          <div className="idx mono reveal">05 / Ignition</div>
          <h2 className="reveal">Tell us about the workflow that&apos;s costing you the most.</h2>
          <p className="rise soft" style={{ marginTop: "1.1rem", fontSize: "1.1rem", maxWidth: "52ch" }}>
            We&apos;ll come back with a straight answer on whether — and how — AI
            fits, and a fixed-price scope if it does. Founding engagements in Q4
            2026 get priority on our engineers&apos; calendars.
          </p>

          <div className={`ignite rise${armed ? " open" : ""}`} id="ignite">
            <div className="well">
              <button type="button" className="btn btn-amber" onClick={ignite}>
                Start an engagement
              </button>
              <div
                className="cover hazard"
                id="cover"
                aria-hidden="true"
                onClick={() => setArmed((v) => !v)}
              >
                <span className="mono">Lift to arm</span>
              </div>
            </div>
            <span className="hint mono">Guarded switch. Hover or tap to arm.</span>
          </div>

          {status === "done" ? (
            <div className="form-done rise" role="status">
              <span className="mono" style={{ color: "var(--amber)" }}>
                Signal received
              </span>
              <h3>Thanks — we&apos;ve got it.</h3>
              <p>
                {FORMSPREE_ID
                  ? "We'll be in touch shortly. If it's urgent, email us directly at "
                  : "Your email client should be open. If it didn't, reach us directly at "}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate className="ignition-form rise brushed">
              <div className="form-head mono">
                <span>Engagement request</span>
                <span>Form 05-A</span>
              </div>

              <div className="grid-2">
                <div className="field">
                  <label className="lbl mono" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    ref={nameRef}
                    type="text"
                    autoComplete="name"
                    value={fields.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    placeholder="Jordan Lee"
                  />
                  {errors.name && (
                    <span className="err mono" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label className="lbl mono" htmlFor="company">
                    Company <em>(optional)</em>
                  </label>
                  <input
                    id="company"
                    type="text"
                    autoComplete="organization"
                    value={fields.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder="Acme Property Group"
                  />
                </div>
              </div>

              <div className="field">
                <label className="lbl mono" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  placeholder="jordan@acme.com"
                />
                {errors.email && (
                  <span className="err mono" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="field">
                <label className="lbl mono" htmlFor="message">
                  What are you working on?
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={fields.message}
                  onChange={(e) => update("message", e.target.value)}
                  aria-invalid={!!errors.message}
                  placeholder="The workflow that's eating the most time, the systems it lives in, and what 'fixed' would look like."
                />
                {errors.message && (
                  <span className="err mono" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              <div className="submit-row">
                <button type="submit" className="btn btn-amber" disabled={status === "sending"}>
                  {status === "sending" ? "Transmitting…" : "Send it over"}
                </button>
                {status === "error" && (
                  <span className="err mono" role="alert">
                    Send failed. Try again, or email {EMAIL}.
                  </span>
                )}
              </div>
            </form>
          )}

          <p className="email rise">
            Prefer email? <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>

        <div className="paths rise">
          {PATHS.map(([title, body, subject]) => (
            <a className="path brushed" key={title} href={`mailto:${EMAIL}?subject=${subject}`}>
              <h3>{title}</h3>
              <span className="go" aria-hidden="true">
                »
              </span>
              <p>{body}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
