import {
  Building2,
  Landmark,
  HeartPulse,
  Scale,
  Truck,
} from "lucide-react";
import Reveal from "./Reveal";

const INDUSTRIES = [
  {
    icon: Building2,
    label: "Property Management",
    note: "Where we're building first",
  },
  { icon: Landmark, label: "Financial Services", note: "Ops & back office" },
  { icon: HeartPulse, label: "Healthcare Operations", note: "Admin workflows" },
  { icon: Scale, label: "Legal", note: "Document-heavy work" },
  { icon: Truck, label: "Logistics", note: "Coordination at scale" },
];

export default function Industries() {
  return (
    <section
      id="industries"
      className="scroll-mt-20 border-y border-line bg-band py-24 sm:py-28"
    >
      <div className="mx-auto max-w-content px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="kicker">Industries we serve</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-headline text-heading sm:text-5xl">
            Built for operations-heavy work.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-body">
            Our first system targets property management, but the pattern —
            high-volume, rules-driven, document-laden operations — repeats across
            industries. Here&apos;s where we&apos;re headed.
          </p>
        </Reveal>

        <div className="mt-12">
          {/* horizontal scroll on small screens, grid on larger */}
          <ul
            className="flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible md:grid-cols-3 lg:grid-cols-5"
            aria-label="Industries Novaric Labs serves"
          >
            {INDUSTRIES.map((ind, i) => (
              <Reveal as="li" key={ind.label} delay={i * 0.06}>
                <div className="h-full min-w-[220px] snap-start rounded-2xl border border-line bg-card p-6 transition-colors hover:border-accent/40 sm:min-w-0">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <ind.icon size={22} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold leading-tight text-heading">
                    {ind.label}
                  </h3>
                  <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-faint">
                    {ind.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
