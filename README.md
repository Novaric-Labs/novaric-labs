# Novaric Labs

Marketing website for **Novaric Labs** — an AI consulting firm in Charlotte, NC
that builds agentic infrastructure for operations teams. Single-page layout with
two AI-powered features built on the Anthropic API.

Built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, and
**Lucide** icons.

## Features

- **Hero** — full-viewport intro with an SVG architectural grid + topographic backdrop.
- **Services** — three-column cards (Agentic Systems, AI Integration & Tooling, Strategic Advisory).
- **Property Management Platform** — pre-launch venture with an animated product-console preview.
- **Industries** — horizontal-scroll / grid of target sectors.
- **Why Novaric** — differentiators plus a quote block.
- **Contact** — validated form with Formspree or `mailto:` fallback (no backend required).
- **Ask Novaric** — floating chat widget with streaming Claude responses.
- **Is AI Right For My Workflow?** — 5-step qualifier that returns a personalized Claude-generated assessment.

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
| `ANTHROPIC_API_KEY` | Yes (for AI features) | Powers the chat widget and qualifier tool. Get one at [console.anthropic.com](https://console.anthropic.com). |
| `ANTHROPIC_MODEL` | No | Override the model. Defaults to `claude-sonnet-4-20250514`. |
| `NEXT_PUBLIC_FORMSPREE_ID` | No | Formspree form ID for the contact form. If unset, the form falls back to a prefilled `mailto:` to hello@novariclabs.com. |

The site runs fine without an API key — the chat widget and qualifier degrade
gracefully and point visitors to email.

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
  page.tsx              # assembles all sections
  globals.css
  icon.svg              # favicon (navy tile + gold star)
  api/
    chat/route.ts       # streaming chat endpoint
    qualify/route.ts    # workflow-fit assessment endpoint
components/
  Nav.tsx  Hero.tsx  Services.tsx  PropertyPlatform.tsx
  PlatformPreview.tsx  Industries.tsx  WhyNovaric.tsx
  Contact.tsx  ChatWidget.tsx  QualifierTool.tsx
  Footer.tsx  Logo.tsx  Reveal.tsx
lib/
  anthropic.ts          # shared client, model, and Novaric context
public/
  novaric-logo.png      # navy wordmark (transparent)
  novaric-logo-white.png# white wordmark for dark backgrounds
```

## Brand

Palette is sampled directly from the supplied logo: deep navy `#0B1452` (the
wordmark) and burnished gold `#F2B441` (the star). Warm off-white (`#FBFAF6`)
and warm grays carry the backgrounds. Headings use **Outfit** (Google Fonts).

## Notes

- Respects `prefers-reduced-motion` — scroll reveals and smooth scrolling are
  disabled for users who opt out.
- Responsive at 375 / 768 / 1280 / 1440px.
- All interactive elements have ARIA labels and the page uses a semantic
  heading hierarchy with a skip-to-content link.
