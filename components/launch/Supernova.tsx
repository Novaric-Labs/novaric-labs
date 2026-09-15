"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Small seeded PRNG so the tick ring and the spark field are identical on the
 * server and on the client — the original generated them with Math.random() in
 * a script tag, which would hydrate-mismatch here.
 */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TICKS = Array.from({ length: 72 }, (_, i) => {
  const major = i % 6 === 0;
  return {
    i,
    major,
    y2: 16 + (major ? 14 : 6),
    stroke: major ? "#F2A93B" : "#33476A",
    width: major ? 2 : 1,
    rotate: i * 5,
  };
});

const SPARKS = (() => {
  const rnd = mulberry32(0x5eed);
  return Array.from({ length: 28 }, (_, i) => ({
    i,
    a: (rnd() * 360).toFixed(1),
    d: (140 + rnd() * 200).toFixed(0),
    dur: (1.8 + rnd() * 2.4).toFixed(2),
    delay: (2 + rnd() * 4).toFixed(2),
    r: (1 + rnd() * 2).toFixed(1),
  }));
})();

export default function Supernova() {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse-tracked parallax on the whole mechanism. Pointer devices only, and
  // never when the visitor asked for reduced motion.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 14;
      my = (e.clientY / window.innerHeight - 0.5) * 14;
    };
    const loop = () => {
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;
      el.style.transform = `translate(${cx}px,${cy}px)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      el.style.transform = "";
    };
  }, []);

  return (
    <div className="mech" id="mech" ref={ref} aria-hidden="true">
      <div className="stars" />
      <div className="nebula" />
      <svg viewBox="0 0 600 600" fill="none" strokeLinecap="round">
        <defs>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#FFE3A8" />
            <stop offset=".3" stopColor="#F2A93B" />
            <stop offset=".7" stopColor="#F2A93B" stopOpacity=".25" />
            <stop offset="1" stopColor="#F2A93B" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="halo" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#FFC86A" stopOpacity=".45" />
            <stop offset=".4" stopColor="#F2A93B" stopOpacity=".12" />
            <stop offset="1" stopColor="#F2A93B" stopOpacity="0" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow2" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* shockwaves */}
        <circle className="shock s1" cx="300" cy="300" r="60" stroke="#F2A93B" strokeWidth="1.5" />
        <circle className="shock s2" cx="300" cy="300" r="60" stroke="#F2A93B" strokeWidth="1.2" />
        <circle className="shock s3" cx="300" cy="300" r="60" stroke="#F2A93B" strokeWidth="1" />
        <circle className="burst" cx="300" cy="300" r="60" stroke="#FFC86A" strokeWidth="2" filter="url(#glow)" />

        {/* crosshair + frame */}
        <g stroke="#22314A" strokeWidth="1">
          <line x1="300" y1="-20" x2="300" y2="620" />
          <line x1="-20" y1="300" x2="620" y2="300" />
          <rect x="220" y="220" width="160" height="160" stroke="#33476A" transform="rotate(45 300 300)" />
        </g>

        {/* outer tick ring */}
        <g className="ring r4" stroke="#22314A">
          <circle cx="300" cy="300" r="284" strokeWidth="1" />
          <g id="ticks">
            {TICKS.map((t) => (
              <line
                key={t.i}
                x1="300"
                y1="16"
                x2="300"
                y2={t.y2}
                stroke={t.stroke}
                strokeWidth={t.width}
                transform={`rotate(${t.rotate} 300 300)`}
              />
            ))}
          </g>
        </g>

        {/* dashed ring with energy sweep */}
        <g className="ring r1" stroke="#33476A" strokeWidth="1.5">
          <circle cx="300" cy="300" r="240" strokeDasharray="4 10" />
          <circle
            className="arc"
            cx="300"
            cy="300"
            r="240"
            stroke="#F2A93B"
            strokeWidth="2.5"
            strokeDasharray="140 1368"
            opacity=".85"
          />
        </g>

        {/* segmented ring */}
        <g className="ring r2" stroke="#33476A" strokeWidth="10">
          <circle cx="300" cy="300" r="196" strokeDasharray="60 24" opacity=".7" />
          <circle
            className="arc"
            cx="300"
            cy="300"
            r="196"
            stroke="#F2A93B"
            strokeWidth="10"
            strokeDasharray="90 1141"
          />
        </g>

        {/* inner fast ring */}
        <g className="ring r3" stroke="#F2A93B">
          <circle cx="300" cy="300" r="140" strokeWidth="1" opacity=".5" />
          <circle className="arc" cx="300" cy="300" r="140" strokeWidth="3" strokeDasharray="40 840" />
        </g>

        {/* orbiting nodes with trails */}
        <g className="orbit o1">
          <path
            d="M300 190 A110 110 0 0 0 209 245"
            stroke="#F2A93B"
            strokeWidth="2"
            opacity=".5"
            filter="url(#glow)"
          />
          <circle className="node" cx="300" cy="190" r="5" fill="#FFC86A" filter="url(#glow)" />
        </g>
        <g className="orbit o2">
          <path
            d="M300 470 A170 170 0 0 0 424 415"
            stroke="#F2A93B"
            strokeWidth="2"
            opacity=".4"
            filter="url(#glow)"
          />
          <circle className="node b" cx="300" cy="470" r="4.5" fill="#FFC86A" filter="url(#glow)" />
        </g>
        <g className="orbit o3">
          <path
            d="M78 300 A222 222 0 0 0 170 480"
            stroke="#FF6A2A"
            strokeWidth="1.5"
            opacity=".35"
            filter="url(#glow)"
          />
          <circle className="node c" cx="78" cy="300" r="4" fill="#FFC86A" filter="url(#glow)" />
        </g>

        {/* sparks */}
        <g id="sparks" fill="#F2A93B" opacity=".7">
          {SPARKS.map((s) => (
            <circle
              key={s.i}
              className="spark"
              cx="300"
              cy="300"
              r={s.r}
              style={
                {
                  "--a": `${s.a}deg`,
                  "--d": `${s.d}px`,
                  "--dur": `${s.dur}s`,
                  "--delay": `${s.delay}s`,
                } as CSSProperties
              }
            />
          ))}
        </g>

        {/* corona rays */}
        <g className="rays" stroke="#F2A93B" strokeWidth="1">
          <line x1="300" y1="300" x2="300" y2="150" />
          <line x1="300" y1="300" x2="405" y2="195" />
          <line x1="300" y1="300" x2="450" y2="300" />
          <line x1="300" y1="300" x2="405" y2="405" />
          <line x1="300" y1="300" x2="300" y2="450" />
          <line x1="300" y1="300" x2="195" y2="405" />
          <line x1="300" y1="300" x2="150" y2="300" />
          <line x1="300" y1="300" x2="195" y2="195" />
        </g>

        {/* core */}
        <g className="core">
          <circle cx="300" cy="300" r="100" fill="url(#halo)" />
          <circle cx="300" cy="300" r="64" fill="url(#core)" filter="url(#glow2)" />
          <circle cx="300" cy="300" r="30" fill="#F2A93B" />
          <circle cx="300" cy="300" r="38" fill="none" stroke="#FFC86A" strokeWidth="1.5" opacity=".6" />
        </g>
      </svg>
      <div className="hud a">
        Origin <b>ignited</b>
      </div>
      <div className="hud b">
        Engineer <b>on-site</b>
      </div>
      <div className="hud c">
        Expansion <b>accelerating</b>
      </div>
    </div>
  );
}
