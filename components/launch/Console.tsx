"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Gauge = {
  deg: string;
  to: number;
  dec: number;
  suffix: string;
  label: string;
  /** The first gauge carries a filled arc behind the needle. */
  arc?: boolean;
};

const GAUGES: Gauge[] = [
  { deg: "65deg", to: 47, dec: 0, suffix: "", label: "Handled today", arc: true },
  { deg: "-60deg", to: 3, dec: 0, suffix: "", label: "Waiting on you" },
  { deg: "40deg", to: 6.2, dec: 1, suffix: "h", label: "Time saved" },
];

const ROWS = [
  {
    t: "Leak reported, Unit 4B",
    pill: "Scheduled",
    ok: false,
    d: "Routed to ProTech Plumbing, scheduled Thu 9:00 AM",
  },
  {
    t: "Tenant question about rent, Unit 12C",
    pill: "Handled",
    ok: false,
    d: "Drafted and sent a reply with their balance",
  },
  {
    t: "Lease renewal ready, Unit 7A",
    pill: "Needs your OK",
    ok: true,
    d: "Drafted with current terms, waiting for your sign-off",
  },
  {
    t: "Vendor invoice matched, ProTech",
    pill: "Handled",
    ok: false,
    d: "Checked against work order #1182, cleared to pay",
  },
];

/**
 * Console preview. Needles rest at -90deg and swing to their reading when the
 * panel scrolls into view; the counters run up alongside them.
 */
export default function Console() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [counts, setCounts] = useState<number[]>(GAUGES.map(() => 0));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          setLive(true);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;

    const targets = GAUGES.map((g) => g.to);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCounts(targets);
      return;
    }

    let start: number | null = null;
    let frame = requestAnimationFrame(function tick(t) {
      if (start === null) start = t;
      const raw = Math.min(1, (t - start) / 1400);
      const p = 1 - Math.pow(1 - raw, 3);
      setCounts(targets.map((v) => v * p));
      if (raw < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [live]);

  return (
    <div className="console rise" id="console" ref={ref} aria-label="Novaric Console preview">
      <div className="scanline" aria-hidden="true" />
      <div className="console-head mono">
        <b>Novaric Console</b>
        <span className="live">
          <i aria-hidden="true" />
          Live
        </span>
      </div>

      <div className="gauges">
        {GAUGES.map((g, i) => (
          <div className="gauge" key={g.label}>
            <svg viewBox="0 0 100 56" aria-hidden="true">
              <path d="M8 50 A42 42 0 0 1 92 50" stroke="#2A3547" strokeWidth="6" fill="none" />
              {g.arc && (
                <path
                  d="M8 50 A42 42 0 0 1 92 50"
                  stroke="#F2A93B"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="132"
                  strokeDashoffset="30"
                  opacity=".5"
                />
              )}
              <line
                className="needle"
                x1="50"
                y1="50"
                x2="50"
                y2="14"
                stroke="#FFC86A"
                strokeWidth="2.5"
                style={{ "--deg": live ? g.deg : "-90deg" } as CSSProperties}
              />
              <circle cx="50" cy="50" r="4" fill="#F2A93B" />
            </svg>
            <b>
              {counts[i].toFixed(g.dec)}
              {g.suffix}
            </b>
            <span className="mono">{g.label}</span>
          </div>
        ))}
      </div>

      <ul>
        {ROWS.map((r) => (
          <li key={r.t}>
            <span className="t">{r.t}</span>
            <span className={r.ok ? "pill ok" : "pill"}>{r.pill}</span>
            <span className="d">{r.d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
