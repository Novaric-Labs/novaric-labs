import {
  FileText,
  Wrench,
  MessageSquare,
  Handshake,
  ArrowRight,
} from "lucide-react";
import Reveal from "./Reveal";
import PlatformPreview from "./PlatformPreview";

const WORKFLOWS = [
  {
    icon: FileText,
    title: "Lease processing",
    body: "Parse applications, flag exceptions, and prep documents for sign-off — with a human approving anything that matters.",
  },
  {
    icon: Wrench,
    title: "Maintenance routing",
    body: "Triage inbound requests, match the right vendor, schedule, and follow up until the ticket is actually closed.",
  },
  {
    icon: MessageSquare,
    title: "Tenant communication",
    body: "Draft and send timely, on-brand responses across email and SMS, escalating to staff when sentiment or stakes rise.",
  },
  {
    icon: Handshake,
    title: "Vendor coordination",
    body: "Collect quotes, track work orders, and reconcile invoices against the work that was approved and completed.",
  },
];

export default function PropertyPlatform() {
  return (
    <section id="platform" className="scroll-mt-20 bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          {/* Left: narrative */}
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Current venture · Pre-launch
            </span>
            <h2 className="mt-5 text-balance text-4xl font-semibold tracking-headline text-heading sm:text-5xl">
              An agentic harness for property management.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-body">
              We&apos;re building a system that runs the repetitive back office of
              a property management company — the email triage, the vendor
              chase, the document shuffle — as coordinated agents instead of
              manual queues.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-body">
              Requests come in the way they always do — an email, a maintenance
              ticket, a tenant text. From there the system handles the busywork
              and keeps you in control: anything high-stakes — money out, lease
              terms, anything that carries risk — waits for your approval. It
              plugs into the tools your team already uses, so nothing gets ripped
              out and replaced.
            </p>

            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-navy-800 dark:bg-accent dark:text-navy dark:hover:bg-gold-400"
            >
              Join the waitlist
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </Reveal>

          {/* Right: product preview */}
          <Reveal delay={0.12}>
            <PlatformPreview />
          </Reveal>
        </div>

        {/* Workflow cards */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WORKFLOWS.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06}>
              <div className="h-full rounded-xl border border-line bg-band p-6">
                <w.icon
                  size={22}
                  strokeWidth={1.75}
                  className="text-accent"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-base font-semibold text-heading">
                  {w.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {w.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
