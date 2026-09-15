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
export const NOVARIC_CONTEXT = `Novaric Labs is a forward-deployed engineering group headquartered in Charlotte, NC. Senior engineers embed with a client's team, build inside the stack the client already runs, and leave behind systems the client's own people operate — not a deck and a demo.

Three systems, deployable in any order:
- AI Enablement: standing up the foundation a team needs to use AI safely, then teaching them to build on it themselves. Workflow audit with a ranked build list; model access, policy, and cost controls; evaluation harnesses; hands-on training for engineers and operators; internal tooling and prompt libraries; vendor and platform selection. For teams who want to build rather than outsource.
- Automation: agents that do real operational work — routing, drafting, reconciling, escalating — inside the CRM, ticketing, email, and data systems the client already runs. Every high-stakes action passes an approval gate the client controls. Includes document intake, extraction, and exception handling; monitoring, logs, and a kill switch from day one. Fixed-scope pilots that can become managed retainers, with the code handed over. For operations that run on queues, inboxes, and documents.
- Incubator Lab: the firm's product arm (described below).

How an engagement runs:
- Week 00, scope the workflow: one working session on the process costing the most. The client gets a written scope, a fixed price, and a straight answer on whether AI fits.
- Weeks 01-02, embed: an engineer sits with the people doing the job, maps the real flow including the workarounds, and connects to the client's systems read-only.
- Weeks 03-08, ship into production: agents go live behind approval gates, tuned on real volume, with the gate widening as trust builds and everything instrumented.
- Ongoing, hand off or retain: the client gets the repo, the runbook, and the training to operate it, then either keeps Novaric on a managed retainer or runs it themselves.

The Incubator Lab:
- Products come out of patterns that repeat across client engagements, not speculative bets. A problem is promoted only after it has cost several clients real time and money.
- The Lab is funded by the services business rather than outside capital, so the roadmap answers to operators instead of investors.
- Design partners are involved from the start: they help scope the product, test it on real volume, and set the order of work. Partners can take early access, a seat on the roadmap, or a revenue share in what gets built.
- First product out of the Lab: an agentic harness for property management, currently pre-launch and taking design partners. It runs the repetitive back office — lease processing, maintenance routing, tenant communication, and vendor coordination — as coordinated agents, holding anything high-stakes (money out, lease terms, anything carrying risk) for human sign-off, and plugging into the tools a property manager already uses.
- Patterns being watched next: financial services back office, healthcare admin, legal, and logistics — all high volume, rules-driven, and document-heavy, like property management.

Principles:
- Production, not demos. Systems have to survive real volume, edge cases, and the messiness of live operations.
- Human-in-the-loop by default. Agents handle the volume; people keep the decisions that carry risk, and approval gates are designed in from the start rather than bolted on.
- Integrate, don't replace. Novaric connects AI into the systems a client already runs instead of forcing a migration nobody asked for.
- The client owns what gets built: the code, the prompts, the evals, and the runbook.

Timing and contact: founding engagements in Q4 2026 get priority on engineer calendars. Prospective clients can reach out through the contact form on the site or email hello@novariclabs.com.`;
