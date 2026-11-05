# Novaric Labs rebrand: audit and design directions

Goal: make novariclabs.ai approachable, easy to digest, clean and minimal, and lead with **AI enablement** instead of the three-way Enablement / Automation / Incubator split.

Files in this folder:

| File | What it is |
| --- | --- |
| `index.html` | Links to the five mockups |
| `direction-a-plainspoken.html` … `direction-e-warm-editorial.html` | Five self-contained HTML mockups, each about one screen of hero plus 3–4 sections |
| `directions-overview.png` | All five heroes side by side |
| `current-site.png` | The live site's hero today, for comparison |

The mockups are deliberately rough. Copy is a first draft, images are placeholders, and nothing is wired up. They exist so you can react to a feel, not approve a page.

## 1. What the audit found

A sub-agent read every component, the system prompt in `lib/anthropic.ts`, and both API routes. The short version:

- **AI enablement is never the lead.** It is one of three equal "systems" (SYS-01 of three), and its definition is engineer-centric ("teach them to build on it themselves"), not "help your ops people use AI in daily work." The de facto lead message is "we build agents."
- **The hero fails the five-second test for a non-technical operations leader.** "Forward-deployed engineers for AI that ships" says who you are, not what the visitor gets. The headline is also delayed by a two-second boot animation, so the first thing a visitor reads is `[ok] approval gate armed`.
- **The metaphor is the main digestibility problem.** Station numbers, bulkheads, SYS codes, "Propellant feed", "Lift to arm", "Form 05-A", nav telemetry, the scroll rail. None of it explains the offer, and the guarded switch adds friction to the main call to action.
- **The page is long for what it says.** Roughly 1,700 words of visible copy, with the Lab (the least core offer) as the longest section, and seven competing calls to action.
- **The two AI features are the best assets on the site and the hardest to find.** The five-question "Is AI right for your workflow?" qualifier is honest, needs no email, and is literally AI enablement in miniature. It is buried as the fourth riveted module behind a "Standing by" gate. The chat greets visitors with the property platform, off-message for enablement.

Recommended structure, which all five mockups follow:

1. Hero: plain offer, one primary CTA, the fit check as secondary CTA
2. What enablement means here: three outcomes (find the workflow / build inside your tools / your people own it)
3. How an engagement runs: the existing 8-week timeline, de-jargoned
4. One proof story: the property-management back office
5. The fit check, promoted
6. Contact, one form

Cut entirely: bulkheads, rail, ticker, supernova boot sequence, SYS and Load-path codes, guarded switch, nav telemetry, the three mailto path cards, the Lab intake diagram. The Lab becomes one line ("sometimes it becomes a product").

Copy worth keeping verbatim: "not a deck and a demo", "the working habits that separate a pilot from a practice", "Tell us about the workflow that's costing you the most", "Agents handle the volume; people keep the decisions that carry risk", "Code handed over, not held hostage", and the pull quote "The hard part was never the model…". The no-hype tone rules in the chat prompt are a ready-made voice guide.

## 2. The five directions

Every direction keeps the navy wordmark and the gold four-point star from the logo, drops the dark amber hull, and goes light. Dark mode can be added to any of them later as a toggle, not a default.

### A · Plainspoken

**Principle:** say the thing. White page, Inter, single column, big friendly headline with one gold underline. Think Stripe's docs or Linear's about page.

- Headline: "We help your team actually use AI."
- Feels: calm, competent, zero decoration. The lowest-risk option and the fastest to build from the current codebase.
- Risk: can read as generic SaaS. It leans entirely on copy and whitespace to carry personality.

### B · Soft Grid (inspired by ode.partners)

**Principle:** approachability through softness. Light gray canvas, one oversized geometric headline split around an inset visual, rounded tiles for the three outcomes, a dark navy closing block.

- Headline: "AI your team actually uses."
- Feels: friendly, modern, "a studio you'd like to work with." The rounded tiles make dense information feel light.
- Risk: the inset-image headline is a signature move that needs a strong real image (a photo from an engagement, not a gradient). Tiles can drift back toward card overload if the content grows.

### C · Declarative (inspired by satyress.com)

**Principle:** confidence through scale. Centered wordmark, giant stacked uppercase words, mono micro-labels, a scrolling marquee of who you build for, and one full-bleed navy proof section.

- Headline: "ACTUALLY / USE / AI."
- Feels: bold, memorable, still minimal because there are very few words on screen. Keeps a thread of the current engineering DNA through the mono labels and the timeline panel.
- Risk: the least "soft" of the five. Operations buyers may find it loud. The marquee needs real client types, not guesses.

### D · Swiss Grid

**Principle:** International Typographic Style. One typeface (Archivo), a visible 12-column grid, flush-left ragged-right, everything numbered, a table instead of cards, hairlines instead of boxes.

- Headline: "AI, adopted by the people who do the work."
- Feels: objective, precise, like a well-set technical brief. Trust comes from structure rather than tone. Pairs well with the fixed-price, read-only-first engagement model.
- Risk: can feel cold if the copy isn't warm. The visible grid is a stylistic commitment that has to be carried through every page.

### E · Warm Editorial

**Principle:** warmth and trust through typography. Cream paper, a serif display face (Fraunces), the pitch replaced by a letter with a drop cap, photography of real people, pull quotes.

- Headline: "Help your team feel at home with AI."
- Feels: the most approachable of the five by a distance. Reads like a magazine or a founder's letter, not a product page. Directly answers "make it less intimidating."
- Risk: needs real photography and a real voice to work; placeholder gradients and generic copy would kill it. Serif-on-cream can tip into "boutique agency" if overdone.

## 3. Where they sit

| | Softest | | | Boldest |
| --- | --- | --- | --- | --- |
| E · Warm Editorial | B · Soft Grid | A · Plainspoken | D · Swiss Grid | C · Declarative |

A, B and D are "clean minimal" in the conventional sense. E is minimal but warm. C is minimal by word count, not by volume.

## 4. Recommendation

Lead with **B (Soft Grid)** or **E (Warm Editorial)**, and borrow one thing from C: the fit check should be promoted to a hero-adjacent CTA with the "no email required" line visible.

- Choose **B** if the audience is operations leaders at mid-size companies who are already AI-curious and want to see competence. It is modern, friendly, and the structure ports cleanly into the existing Next.js components.
- Choose **E** if the audience is skeptical, non-technical, or has been burned by an AI pilot before. The letter format and serif voice do more for "approachable" than any layout trick.

Either way, the next concrete step is one real page, not five: pick a direction, write the final hero and three-outcome copy, replace the placeholders with one real engagement photo, and port it into `components/launch/` with the hull tokens swapped for a light palette in `app/globals.css`.
