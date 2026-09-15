# Claude Code handoff — ship the FDE launch page to novariclabs.ai

Paste this into a Claude Code session opened at the root of the Novaric Labs Next.js repo. Drop `novaric-fde-launch.html` next to it (or reference its path).

---

## Task

Replace the current home page of the Novaric Labs site (Next.js 14+, Tailwind, Framer Motion, deployed on Vercel) with the design in `novaric-fde-launch.html`. That file is the source of truth for layout, copy, colors, typography, and animation. Match it visually, then rewire the two pieces it couldn't include as a static page.

## 1. Port the page

- Convert the HTML into `app/page.tsx` plus components under `components/launch/` — one component per section: `Nav`, `Hero`, `Supernova` (the SVG mechanism), `Ticker`, `Bulkhead`, `Capabilities`, `Deployment`, `Lab`, `Principles`, `Contact`, `Footer`.
- Keep the copy exactly as written in the HTML. Do not rewrite headlines or body text.
- Fonts: load Chakra Petch (500/600/700), IBM Plex Sans (400/500/600), JetBrains Mono (400/500) via `next/font/google`. Replace the `<link>` tags.
- Colors: lift the `:root` custom properties from the HTML into `globals.css` and map them to Tailwind theme colors (`void`, `hull`, `alu`, `amber`, etc.). Prefer the CSS variables over hard-coded hex so the tokens live in one place.
- Animations: the page uses only CSS keyframes + a small vanilla script (IntersectionObserver reveals, gauge needles, counters, sparks generation, scroll rail, mouse-tracked glow, guarded switch toggle, hero parallax). Port these as `"use client"` components with `useEffect`. Framer Motion is optional — only use it where it simplifies the reveal logic. Keep `prefers-reduced-motion` behavior intact.
- The hero boot sequence (checklist → core ignition → headline) is timed with CSS animation delays; preserve the ~2s sync between the `[go]` line and the core ignition.
- Keep the scroll rail desktop-only (≥1320px) and disable pointer effects on touch devices, as in the HTML.
- Metadata: use the `<title>` and `<meta name="description">` from the HTML in `app/layout.tsx`. Update OG/Twitter description to the same text. Keep the existing logo images in the nav and footer in place of the CSS `.mark` glyph if they render cleanly on the dark hull; otherwise keep the glyph.

## 2. Rewire the contact form

- The Contact section's three `mailto:` path cards and the guarded "Start an engagement" switch should stay, but replace the primary CTA target with the existing contact form (Name, Company, Email, "What are you working on?") that the current site already submits. Reuse the current form handler / API route — do not change where submissions go.
- Put the form in the left column under the ignition switch; the switch should reveal the form (or scroll to it) rather than open a mailto.
- Keep `hello@novariclabs.com` as the fallback email link.

## 3. Rewire the AI assessment tool

- The current site has a five-question "Is AI right for your workflow?" qualifier powered by the Anthropic API. Restore it as a panel inside the Capabilities section, styled as a fourth avionics module spanning full width below the three SYS modules, using the same riveted/brushed styling.
- Reuse the existing API route and prompt. Only restyle.

## 4. Remove what no longer applies

- Delete the old "Industries we serve" section and old "Platform" section components. Their content now lives in the Lab section ("Next in the pipeline") and the three modules.
- Update nav anchors: Capabilities `#what`, Deployment `#how`, The Lab `#lab`, Principles `#why`, Contact `#contact`.

## 5. Verify before deploying

- `npm run build` passes with no type errors.
- Lighthouse on the home page: performance ≥ 85 on desktop. If the supernova SVG filters drag it down, reduce `stdDeviation` on the glow filters before removing any animation.
- Check at 390px, 768px, 1280px, 1440px. The hero stacks below 960px; the modules stack below 900px; the timeline goes 2-up below 900px and 1-up below 560px.
- Confirm the contact form still delivers and the assessment tool still returns a result.
- Open a preview deployment on Vercel and share the URL before merging to main.

## 6. Ship

- Commit on a branch `launch/fde-page`, open a PR, and merge to main once the preview is approved. Vercel will deploy production from main.
