"use client";

import { useState, type FormEvent } from "react";

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

/**
 * The contact form. Same fields and the same Formspree / mailto fallback as
 * before; the guarded switch and the three mailto path cards are gone.
 */
export default function Contact() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  function update(key: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
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
      <div className="wrap grid">
        <div className="head">
          <span className="mono">04 / Contact</span>
          <h2 style={{ marginTop: 16 }}>
            Tell us about the workflow that&apos;s costing you the most.
          </h2>
          <p>
            A straight answer on whether, and how, AI fits. A fixed-price scope
            if it does. Founding engagements in Q4 2026 get priority on our
            engineers&apos; calendars.
          </p>
          <p className="email">
            Prefer email? <a className="ul" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>

        {status === "done" ? (
          <div className="form-done" role="status">
            <span className="mono">Received</span>
            <h3>Thanks. We&apos;ve got it.</h3>
            <p>
              {FORMSPREE_ID
                ? "We'll be in touch shortly. If it's urgent, email us directly at "
                : "Your email client should be open. If it didn't, reach us directly at "}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="contact-form">
            <div className="two">
              <div className="field">
                <label className="mono" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={fields.name}
                  onChange={(e) => update("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  placeholder="Jordan Lee"
                />
                {errors.name && (
                  <span className="err" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="field">
                <label className="mono" htmlFor="company">
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
              <label className="mono" htmlFor="email">
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
                <span className="err" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="field">
              <label className="mono" htmlFor="message">
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
                <span className="err" role="alert">
                  {errors.message}
                </span>
              )}
            </div>

            <div className="submit">
              <button type="submit" className="btn fill" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send it over"}
              </button>
              {status === "error" && (
                <span className="err" role="alert">
                  Send failed. Try again, or email {EMAIL}.
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
