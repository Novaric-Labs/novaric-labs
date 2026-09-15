"use client";

import { useEffect } from "react";

/**
 * The page-level vanilla behaviors from the source design, in one place:
 * scroll reveals, the mouse-tracked glow on modules and path cards, and the
 * rail marker. Renders nothing.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const observe = (selector: string, threshold: number) => {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add("in");
            io.unobserve(e.target);
          });
        },
        { threshold }
      );
      document.querySelectorAll(selector).forEach((el) => io.observe(el));
      return io;
    };

    // Two observers on purpose: `.reveal` elements sit behind a
    // `clip-path: inset(0 100% 0 0)` wipe, and Chrome clips the intersection
    // rect by the target's own clip-path — their ratio is pinned at 0, so the
    // 0.18 threshold the other elements use would never fire for them.
    const revealIo = observe(".reveal", 0);
    const riseIo = observe(".rise,.timeline", 0.18);

    const glow = Array.from(document.querySelectorAll<HTMLElement>(".module,.path"));
    const onPointerMove = (ev: PointerEvent) => {
      const el = ev.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${ev.clientX - r.left}px`);
      el.style.setProperty("--my", `${ev.clientY - r.top}px`);
    };
    glow.forEach((el) => el.addEventListener("pointermove", onPointerMove));

    const mk = document.getElementById("railmk");
    const rail = () => {
      if (!mk) return;
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      mk.style.transform = `translateY(${p * 180}px)`;
    };
    window.addEventListener("scroll", rail, { passive: true });
    rail();

    return () => {
      revealIo.disconnect();
      riseIo.disconnect();
      glow.forEach((el) => el.removeEventListener("pointermove", onPointerMove));
      window.removeEventListener("scroll", rail);
    };
  }, []);

  return null;
}
