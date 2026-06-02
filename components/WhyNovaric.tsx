import { Rocket, Search, UserCheck, GitBranch } from "lucide-react";
import Reveal from "./Reveal";

const POINTS = [
  {
    icon: Rocket,
    title: "We build for production, not demos",
    body: "A slick prototype isn't the goal. We ship systems that survive real volume, edge cases, and the messiness of live operations.",
  },
  {
    icon: Search,
    title: "We understand your ops before we touch your stack",
    body: "We sit with how work actually flows today — the exceptions, the handoffs, the workarounds — before proposing a single line of automation.",
  },
  {
    icon: UserCheck,
    title: "Human-in-the-loop by default",
    body: "Agents handle the volume; people keep control of the decisions that carry risk. Approval gates are designed in from the start, not bolted on.",
  },
  {
    icon: GitBranch,
    title: "We integrate, we don't replace",
    body: "Your team keeps the tools they know. We connect AI into the systems you already run instead of forcing a migration nobody asked for.",
  },
];

export default function WhyNovaric() {
  return (
    <section id="why" className="scroll-mt-20 bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="kicker">Why Novaric Labs</p>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-headline text-heading sm:text-5xl">
              Operators who happen to build AI.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-body">
              Plenty of teams can call an API. Fewer understand what it takes to
              run automation inside a business that can&apos;t afford to break.
              That&apos;s the gap we work in.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="flex h-full flex-col">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <p.icon size={22} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-heading">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-body">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Quote / stat block as a visual break */}
        <Reveal delay={0.1} className="mt-20">
          <figure className="overflow-hidden rounded-3xl bg-panel px-8 py-14 text-center sm:px-16">
            <blockquote className="mx-auto max-w-3xl text-balance text-2xl font-medium leading-snug text-panel-fg sm:text-3xl">
              &ldquo;The hard part was never the model. It was making automation
              that operations teams actually trust enough to run every day.&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-sm text-panel-muted">
              The principle behind everything we ship
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
