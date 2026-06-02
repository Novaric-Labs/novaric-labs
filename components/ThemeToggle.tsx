"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Light/dark theme toggle. Reads the initial state from the <html> class set by
 * the no-flash inline script in layout.tsx, then persists changes to
 * localStorage.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-heading transition-colors hover:bg-band ${
        className ?? ""
      }`}
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch. */}
      {mounted && dark ? (
        <Sun size={17} strokeWidth={1.9} aria-hidden="true" />
      ) : (
        <Moon size={17} strokeWidth={1.9} aria-hidden="true" />
      )}
    </button>
  );
}
