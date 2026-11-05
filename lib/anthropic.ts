import Anthropic from "@anthropic-ai/sdk";

/**
 * Shared Anthropic client + config for the server-side route handlers.
 * The API key is read from the environment and never reaches the browser.
 */

if (!process.env.ANTHROPIC_API_KEY) {
  // Don't throw at import time in production builds — the routes surface a
  // clean error instead — but warn loudly during local development.
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[novaric] ANTHROPIC_API_KEY is not set. The chat and qualifier features will not work until it is added to the local env file."
    );
  }
}

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

/**
 * Opus 5, because both of these outputs are prospect-facing. The assessment is
 * often the first substantive thing someone reads from us, and its prompt asks
 * for real candor — tell them to wait if they should wait — which is a judgment
 * call, not a template fill. Both routes are rate-limited to a marketing site's
 * volume, so the tier costs pennies a day.
 *
 * Keep the model ID undated. The previous pin, claude-sonnet-4-20250514, was a
 * dated snapshot that was eventually retired, which took both AI features down
 * with it and surfaced only as a generic 500.
 */
export const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-opus-5";

/**
 * Neither task is a reasoning problem — both are short prose grounded in the
 * context block below. Thinking is on by default on Opus 5, and at the default
 * effort it would add seconds while a visitor watches a spinner. Low keeps the
 * quality and drops the wait.
 */
export const EFFORT = "low" as const;

export function hasApiKey(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

/** Shared context about Novaric Labs, reused across both AI features. */
export const NOVARIC_CONTEXT = `Novaric Labs is a small engineering team headquartered in Charlotte, NC. Its core offer is AI enablement for operations teams: a senior engineer embeds with the people doing the work, builds AI into the tools the client already runs, and leaves behind systems the client's own people operate and extend — not a deck and a demo. Automation and a small product incubator sit underneath that offer; enablement is the lead.

What AI enablement means at Novaric:
- Find the workflow worth fixing: an engineer sits with the people doing the job, maps the real flow including the workarounds, and gives a straight answer on whether AI fits. If the client should wait, clean up data first, or start smaller, Novaric says so.
- Build inside the tools the client already runs: email, spreadsheets, CRM, ticketing, property-management systems, accounting. Agents handle the volume (routing, drafting, reconciling, escalating, document intake and extraction); people keep the decisions that carry risk behind an approval gate the client controls. Monitoring, logs, and a kill switch from day one.
- Hand it to the team: the client owns the code, the prompts, the evaluation suite, and the runbook. Training the client's operators and engineers to run and extend the system is part of the engagement, not an upsell. The client can keep Novaric on a managed retainer but never needs to.

How an engagement runs:
- Week 00, scope: one working session on the workflow costing the most. The client gets a written scope, a fixed price, and a candid read on fit.
- Weeks 01-02, embed: the engineer sits with the people doing the job and connects to the client's systems read-only.
- Weeks 03-08, ship: the system goes live inside the client's stack behind approval gates, tuned on real volume, with the gate widening as trust builds and everything instrumented.
- Ongoing, hand off or retain: repo, runbook, and training handed over; the client runs it or keeps Novaric on retainer.

Where this applies: high-volume, rules-driven, document-heavy operations. Property management is the first and deepest area: Novaric is building an agentic harness for the property-management back office (lease processing, maintenance routing, tenant communication, vendor coordination), currently pre-launch with design partners, holding anything high-stakes (money out, lease terms) for human sign-off and plugging into the tools a property manager already uses. The same pattern repeats in financial services back office, healthcare admin, legal, and logistics, which are next.

The incubator: products come out of patterns that repeat across client engagements, funded by the services business rather than outside capital. Design partners help scope, test on real volume, and set the order of work, and can take early access, a seat on the roadmap, or a revenue share. Mention this only if asked; it is not the lead offer.

Principles:
- Production, not demos. Systems have to survive real volume, edge cases, and live operations.
- Human-in-the-loop by default. Agents handle the volume; people keep the decisions that carry risk.
- Integrate, don't replace. AI goes into the systems the client already runs; no migration nobody asked for.
- The client owns what gets built: code, prompts, evaluations, runbook.

Timing and contact: founding engagements in Q4 2026 get priority on engineer calendars. Prospective clients can take the free five-question fit check on the site (no email required), use the contact form, or email hello@novariclabs.com.`;
