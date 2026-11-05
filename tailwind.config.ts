import type { Config } from "tailwindcss";

/**
 * The palette lives in app/globals.css as CSS custom properties. Tailwind
 * just gives those tokens class names; nothing here hard-codes a hex value.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "var(--ink)",
          2: "var(--ink-2)",
          soft: "var(--ink-soft)",
          dim: "var(--ink-dim)",
        },
        paper: "var(--paper)",
        line: "var(--line)",
        grid: "var(--grid)",
        gold: {
          DEFAULT: "var(--gold)",
          ink: "var(--gold-ink)",
        },
      },
      fontFamily: {
        sans: ["var(--font-grotesk)", "Space Grotesk", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
