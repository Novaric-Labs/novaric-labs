import type { Config } from "tailwindcss";

/**
 * The palette lives in app/globals.css as CSS custom properties (the `:root`
 * block lifted from the FDE launch design). Tailwind just gives those tokens
 * class names — nothing here hard-codes a hex value.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "var(--void)",
        hull: {
          DEFAULT: "var(--hull)",
          2: "var(--hull-2)",
        },
        alu: {
          DEFAULT: "var(--alu)",
          hi: "var(--alu-hi)",
          edge: "var(--alu-edge)",
        },
        fg: {
          DEFAULT: "var(--fg)",
          soft: "var(--fg-soft)",
          dim: "var(--fg-dim)",
        },
        amber: {
          DEFAULT: "var(--amber)",
          hot: "var(--amber-hot)",
        },
        ember: "var(--ember)",
        // Ink used on top of amber fills (buttons, chat bubbles).
        onamber: "#1A1204",
      },
      fontFamily: {
        sans: ["var(--font-plex)", "IBM Plex Sans", "system-ui", "sans-serif"],
        display: ["var(--font-chakra)", "Chakra Petch", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
