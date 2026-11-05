# Novaric Labs

Marketing website for **Novaric Labs**, a small engineering team in Charlotte,
NC that helps operations teams actually use AI: a senior engineer embeds with
the team, builds AI into the tools they already run, and leaves them able to
keep it going. Single-page layout with two AI-powered features built on the
Anthropic API.

Built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Lucide** icons.

## The page

Light paper, navy ink, one gold accent. A visible 12-column grid under the
hero, mono micro-labels, numbered hairline rows, a table instead of cards.
The design came out of the exploration in `handoff/rebrand/` (Direction F,
"Declarative Grid").

Sections, in order, one component each under `components/site/`:

- **Nav**: centered wordmark, numbered mono section links either side.
- **Hero**: the stacked "Actually use AI." headline on the grid, lede, two CTAs.
- **Marquee**: who the work is for. Pauses on hover, static under
  `prefers-reduced-motion`.
- **Steps** (`#approach`): Find / Build / Hand off as three numbered rows.
- **Proof**: full-bleed navy block with the property-management story and the
  engagement timeline.
- **Work** (`#work`): where the pattern applies, as a table, plus four figures.
- **FitCheck** (`#fit`): the five-question "Is AI right for your workflow?"
  check, promoted to its own section. Posts to `app/api/qualify`.
- **Contact** (`#contact`): the engagement form (Formspree, or a `mailto:`
  fallback).
- **Footer**.

Plus **Ask Novaric**, the floating chat widget with streaming Claude responses
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
| `ANTHROPIC_API_KEY` | Yes (for AI features) | Powers the chat widget and the fit check. Get one at [console.anthropic.com](https://console.anthropic.com). |
| `ANTHROPIC_MODEL` | No | Override the model. Defaults to `claude-opus-5`. Keep any override undated — a dated snapshot ID will eventually be retired and take both AI features down. |
| `NEXT_PUBLIC_FORMSPREE_ID` | No | Formspree form ID for the contact form. If unset, the form falls back to a prefilled `mailto:` to hello@novariclabs.com. |

The site runs fine without an API key. The chat widget and the fit check
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
  page.tsx              # assembles the page
  globals.css           # tokens + the site stylesheet
  icon.svg              # favicon (navy tile + gold star)
  api/
    chat/route.ts       # streaming chat endpoint
    qualify/route.ts    # fit-check endpoint
components/
  site/
    Nav.tsx  Hero.tsx  Marquee.tsx  Steps.tsx  Proof.tsx
    Work.tsx  FitCheck.tsx  Contact.tsx  Footer.tsx
  ChatWidget.tsx  Logo.tsx
lib/
  anthropic.ts          # shared client, model, and Novaric context
  rateLimit.ts          # in-memory per-IP limiter for the API routes
public/
  novaric-logo.png      # navy wordmark (transparent)
  novaric-logo-white.png# white wordmark for dark backgrounds
handoff/
  rebrand/              # the audit, six design-direction mockups, screenshots
  novaric-fde-launch.html  # the previous (dark, flight-hardware) design
```
