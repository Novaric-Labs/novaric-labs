"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] },
        };

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-surface"
    >
      {/* Oversized brand star — faint architectural accent, bleeds off the top-right. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="pointer-events-none absolute -right-16 -top-24 h-[34rem] w-[34rem] text-accent/[0.08] sm:-right-10 lg:h-[42rem] lg:w-[42rem]"
      >
        <path
          d="M50 0 L58 42 L100 50 L58 58 L50 100 L42 58 L0 50 L42 42 Z"
          fill="currentColor"
        />
      </svg>
      {/* Hairline horizon to ground the composition. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

      <div className="relative mx-auto w-full max-w-content px-6 py-32 lg:px-8">
        <div className="max-w-4xl">
          {/* Eyebrow — plain, no pill */}
          <motion.div
            {...fade(0)}
            className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            <span className="h-px w-8 bg-accent/60" />
            AI consulting · Charlotte, NC
          </motion.div>

          <motion.h1
            {...fade(0.08)}
            className="text-balance text-[2.75rem] font-semibold leading-[1.05] tracking-headline text-heading sm:text-6xl lg:text-[4.75rem]"
          >
            We build the systems that make AI{" "}
            <span className="relative whitespace-nowrap text-accent">
              work
              <svg
                className="absolute -bottom-1.5 left-0 w-full"
                viewBox="0 0 120 10"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M2 7 C 30 2, 90 2, 118 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                />
              </svg>
            </span>{" "}
            for your business.
          </motion.h1>

          <motion.p
            {...fade(0.18)}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-body sm:text-xl"
          >
            Novaric Labs designs and deploys agentic infrastructure for
            operations teams — automation that takes real action in production,
            with a human in the loop. No demos that fall apart in week two.
          </motion.p>

          <motion.div {...fade(0.28)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-navy-800 dark:bg-accent dark:text-navy dark:hover:bg-gold-400"
            >
              Work with us
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#platform"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-heading/15 px-7 py-3.5 text-base font-medium text-heading transition-colors hover:border-heading/35 hover:bg-band"
            >
              See our work
            </a>
          </motion.div>

          <motion.dl
            {...fade(0.4)}
            className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-line pt-8 sm:gap-8"
          >
            {[
              { v: "Production", l: "Built to ship, not to pitch" },
              { v: "Human-led", l: "Approval gates by default" },
              { v: "Ops-first", l: "We learn your workflow first" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="text-base font-semibold text-heading sm:text-lg">
                  {s.v}
                </dt>
                <dd className="mt-1 text-sm leading-snug text-faint">{s.l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* subtle scroll cue */}
      {!reduce && (
        <motion.a
          href="#services"
          aria-label="Scroll to services"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-faint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.span
            className="block"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={20} />
          </motion.span>
        </motion.a>
      )}
    </section>
  );
}
