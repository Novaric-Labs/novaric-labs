import { Workflow, Plug, Compass } from "lucide-react";
import Reveal from "./Reveal";
import QualifierTool from "./QualifierTool";

const SERVICES = [
  {
    icon: Workflow,
    title: "Agentic Systems",
    body: "We design multi-step agents that do the work — routing, drafting, reconciling, escalating — not just answering questions. Every high-stakes action runs through an approval gate you control.",
  },
  {
    icon: Plug,
    title: "AI Integration & Tooling",
    body: "We wire AI into the stack you already run: your CRM, ticketing, email, and data. No rip-and-replace. We build the connectors, internal tools, and pipelines that make models useful day to day.",
  },
  {
    icon: Compass,
    title: "Strategic Advisory",
    body: "Before we touch code, we map where AI actually fits. We scope engagements around real operational pain and measurable outcomes, so you invest in the workflows that pay back.",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-band py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="kicker">What we do</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-headline text-heading sm:text-5xl">
            Three ways we build with you.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-body">
            We operate across the full arc — from deciding what to build, to
            shipping agents that run in production and integrate with the
            systems your team already uses.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <article className="group h-full rounded-2xl border border-line bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_-24px_rgba(11,20,82,0.25)]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/15">
                  <s.icon size={24} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl font-semibold text-heading">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-body">
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-16">
          <QualifierTool />
        </Reveal>
      </div>
    </section>
  );
}
