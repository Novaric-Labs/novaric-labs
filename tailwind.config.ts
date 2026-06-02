import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sampled directly from the Novaric logo.
        navy: {
          DEFAULT: "#0B1452", // logo wordmark (rgb 0,0,88 warmed slightly)
          950: "#070C33",
          900: "#0B1452",
          800: "#141E63",
          700: "#1F2B7A",
          600: "#2C3A93",
          400: "#6470B5",
        },
        gold: {
          DEFAULT: "#F2B441", // logo star
          600: "#D99A22",
          500: "#F2B441",
          400: "#F8C058",
          200: "#FBE3A8",
        },
        sand: {
          50: "#FBFAF6", // warm off-white page background
          100: "#F4F2EB",
          200: "#E9E5D9",
        },
        ink: {
          DEFAULT: "#1A1D2B",
          muted: "#5A5E6E",
          faint: "#8B8FA0",
        },

        // ===== Semantic, theme-aware tokens (flip in .dark) =====
        surface: "rgb(var(--surface) / <alpha-value>)", // default section bg
        band: "rgb(var(--band) / <alpha-value>)", // alternating section bg
        card: "rgb(var(--card) / <alpha-value>)", // raised cards
        line: "rgb(var(--line) / <alpha-value>)", // borders / dividers
        heading: "rgb(var(--heading) / <alpha-value>)", // strong text
        body: "rgb(var(--body) / <alpha-value>)", // body copy
        faint: "rgb(var(--faint) / <alpha-value>)", // muted labels
        // Intentionally-dark feature blocks (contact, qualifier, chat header,
        // footer) — dark navy in light mode, harmonized in dark mode.
        panel: "rgb(var(--panel) / <alpha-value>)",
        "panel-fg": "rgb(var(--panel-fg) / <alpha-value>)",
        "panel-muted": "rgb(var(--panel-muted) / <alpha-value>)",
        "panel-line": "rgb(var(--panel-line) / <alpha-value>)",
        // Accent that adapts (brighter gold in dark for contrast).
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightish: "-0.02em",
        headline: "-0.03em",
      },
      maxWidth: {
        content: "76rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
