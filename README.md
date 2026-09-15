# Novaric Labs

Marketing website for **Novaric Labs** — a forward-deployed engineering group in
Charlotte, NC that embeds with client teams to enable AI, automate operations,
and incubate new software products. Single-page layout with two AI-powered
features built on the Anthropic API.

Built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Lucide** icons.

## The page

The home page is a port of the FDE launch design (`handoff/novaric-fde-launch.html`
is the visual source of truth). It reads as flight hardware: a dark hull, riveted
avionics modules, bulkheads stamped with station numbers, and a supernova
mechanism in the hero.

Sections, in order — one component each under `components/launch/`:

- **Nav** — sticky instrument panel with a live telemetry readout (≥1120px).
- **Hero** — CSS boot sequence: the checklist types out, the `[go]` line lands in
  sync with the core ignition at ~2s, then the headline lifts in.
- **Supernova** — the SVG mechanism: tick ring, orbiting nodes, sparks,
  shockwaves, corona rays, and a mouse-tracked parallax on pointer devices.
- **Ticker** — telemetry marquee.
- **Capabilities** (`#what`) — SYS-01 Enablement, SYS-02 Automation, SYS-03
  Incubator, plus SYS-04: the AI fit assessment (below).
- **Deployment** (`#how`) — propellant-line timeline of an engagement.
- **Lab** (`#lab`) — the property-management harness, with a live-looking
  console preview (gauge needles + count-up counters on scroll).
- **Principles** (`#why`) — load-path ribs and a pull quote.
- **Contact** (`#contact`) — guarded ignition switch, the engagement form, and
  three `mailto:` path cards.
- **Footer**.

Two AI features sit inside it:

- **Is AI right for your workflow?** — the five-step qualifier, housed as the
  SYS-04 avionics module. Posts to `app/api/qualify` for a Claude-generated
  assessment.
- **Ask Novaric** — floating chat widget with streaming Claude responses
  (`app/api/chat`).

The Anthropic API key is used **only** in server-side route handlers
(`app/api/chat` and `app/api/qualify`) and is never exposed to the browser.

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

| Variable | Required | Purpose |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | Yes (for AI features) | Powers the chat widget and the SYS-04 assessment. Get one at [console.anthropic.com](https://console.anthropic.com). |
| `ANTHROPIC_MODEL` | No | Override the model. Defaults to `claude-sonnet-4-20250514`. |
| `NEXT_PUBLIC_FORMSPREE_ID` | No | Formspree form ID for the contact form. If unset, the form falls back to a prefilled `mailto:` to hello@novariclabs.com. |

The site runs fine without an API key — the chat widget and the assessment
degrade gracefully and point visitors to email.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Production build

```bash
npm run build && npm start
```

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add `ANTHROPIC_API_KEY` (and optionally `ANTHROPIC_MODEL`,
   `NEXT_PUBLIC_FORMSPREE_ID`) under **Project → Settings → Environment Variables**.
4. Deploy.

## Project structure

```
app/
  layout.tsx            # fonts, metadata, skip link
  page.tsx              # assembles the launch page
  globals.css           # hull tokens + the ported launch stylesheet
  icon.svg              # favicon (navy tile + gold star)
  api/
    chat/route.ts       # streaming chat endpoint
    qualify/route.ts    # workflow-fit assessment endpoint
components/
  launch/
    Nav.tsx  Hero.tsx  Supernova.tsx  Ticker.tsx  Bulkhead.tsx
    Capabilities.tsx  Assessment.tsx  Deployment.tsx  Lab.tsx
    Console.tsx  Principles.tsx  Contact.tsx  Footer.tsx
    Rail.tsx  ScrollEffects.tsx
  ChatWidget.tsx  Logo.tsx
lib/
  anthropic.ts          # shared client, model, and Novaric context
  rateLimit.ts          # in-memory per-IP limiter for the API routes
public/
  novaric-logo.png      # navy wordmark (transparent)
  novaric-logo-white.png# white wordmark for dark backgrounds
handoff/
  novaric-fde-launch.html  # the design this page was ported from
```

## Brand

The palette lives as CSS custom properties in `app/globals.css` and is exposed
to Tailwind in `tailwind.config.ts` — nothing hard-codes a hex value in a
component. Hull greys run from `--void` `#080C13` through `--alu-edge`
`#6C7B93`; amber `#F2A93B` is the single accent, with `--ember` `#FF6A2A` for
errors. Type is **Chakra Petch** (headings, buttons), **IBM Plex Sans** (body),
and **JetBrains Mono** (the mono/telemetry voice), all via `next/font/google`.

## Notes

- The page is dark-only by design; there is no theme toggle.
- Respects `prefers-reduced-motion` — the boot sequence, reveals, sparks, and
  smooth scrolling all stand down for users who opt out.
- Responsive at 390 / 768 / 1280 / 1440px. The hero stacks below 960px, the
  modules below 900px, the timeline goes 2-up below 900px and 1-up below 560px,
  and the scroll rail only appears at ≥1320px.
- All interactive elements have accessible names, and the page keeps a semantic
  heading hierarchy with a skip-to-content link.
