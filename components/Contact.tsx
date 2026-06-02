"use client";

import { useState, type FormEvent } from "react";
import { Mail, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

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

export default function Contact() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

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

  const inputBase =
    "w-full rounded-lg border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors";

  return (
    <section id="contact" className="scroll-mt-20 bg-panel py-24 text-panel-fg sm:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: pitch */}
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Work with us
            </p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-headline sm:text-5xl">
              Let&apos;s scope what&apos;s worth automating.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-panel-muted">
              Tell us about the workflow that&apos;s costing you the most. We&apos;ll
              come back with a straight answer on whether — and how — AI fits.
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="mt-8 inline-flex items-center gap-2.5 text-[15px] text-panel-fg/85 transition-colors hover:text-accent"
            >
              <Mail size={18} className="text-accent" />
              Prefer email? {EMAIL}
            </a>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.1}>
            {status === "done" ? (
              <div
                className="flex h-full flex-col items-start justify-center rounded-2xl border border-panel-line bg-panel-fg/[0.03] p-10"
                role="status"
              >
                <CheckCircle2 size={36} className="text-accent" />
                <h3 className="mt-4 text-2xl font-semibold">Thanks — we&apos;ve got it.</h3>
                <p className="mt-2 text-panel-muted">
                  {FORMSPREE_ID
                    ? "We'll be in touch shortly. If it's urgent, email us directly at "
                    : "Your email client should be open. If it didn't, reach us directly at "}
                  <a href={`mailto:${EMAIL}`} className="text-accent underline-offset-2 hover:underline">
                    {EMAIL}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="rounded-2xl border border-panel-line bg-panel-fg/[0.03] p-7 sm:p-9"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" error={errors.name} htmlFor="name">
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={fields.name}
                      onChange={(e) => update("name", e.target.value)}
                      aria-invalid={!!errors.name}
                      className={`${inputBase} ${errors.name ? "border-red-300" : "border-sand-200"}`}
                      placeholder="Jordan Lee"
                    />
                  </Field>

                  <Field label="Company" htmlFor="company" optional>
                    <input
                      id="company"
                      type="text"
                      autoComplete="organization"
                      value={fields.company}
                      onChange={(e) => update("company", e.target.value)}
                      className={`${inputBase} border-sand-200`}
                      placeholder="Acme Property Group"
                    />
                  </Field>
                </div>

                <div className="mt-5">
                  <Field label="Email" error={errors.email} htmlFor="email">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={fields.email}
                      onChange={(e) => update("email", e.target.value)}
                      aria-invalid={!!errors.email}
                      className={`${inputBase} ${errors.email ? "border-red-300" : "border-sand-200"}`}
                      placeholder="jordan@acme.com"
                    />
                  </Field>
                </div>

                <div className="mt-5">
                  <Field
                    label="What are you working on?"
                    error={errors.message}
                    htmlFor="message"
                  >
                    <textarea
                      id="message"
                      rows={5}
                      value={fields.message}
                      onChange={(e) => update("message", e.target.value)}
                      aria-invalid={!!errors.message}
                      className={`${inputBase} resize-none ${errors.message ? "border-red-300" : "border-sand-200"}`}
                      placeholder="The workflow that's eating the most time, the systems it lives in, and what 'fixed' would look like."
                    />
                  </Field>
                </div>

                {status === "error" && (
                  <p className="mt-4 text-sm text-red-300" role="alert">
                    Something went wrong sending that. Please try again, or email{" "}
                    {EMAIL}.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-navy-950 transition-colors hover:bg-gold-400 disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send it over
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-panel-fg/85"
      >
        {label}
        {optional && <span className="ml-1 text-panel-muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-red-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
