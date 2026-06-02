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
      "[novaric] ANTHROPIC_API_KEY is not set. The chat and qualifier features will not work until it is added to .env.local."
    );
  }
}

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

export const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";

export function hasApiKey(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

/** Shared context about Novaric Labs, reused across both AI features. */
export const NOVARIC_CONTEXT = `Novaric Labs is an AI consulting firm headquartered in Charlotte, NC.
The firm builds production AI tooling and agentic infrastructure across industries.

What Novaric Labs does:
- Agentic Systems: designing and deploying multi-step agent workflows that take real actions in production, with human-in-the-loop checkpoints.
- AI Integration & Tooling: wiring AI into existing software stacks — APIs, internal tools, data pipelines — so teams get value without rebuilding everything.
- Strategic Advisory: helping operations leaders identify where AI actually fits, scoping engagements grounded in real workflows rather than hype.

Current venture — Property Management Platform (pre-launch):
- An agentic harness that automates back-office workflows for property management companies.
- Core workflows: lease processing, maintenance routing, tenant communication, and vendor coordination.
- How it works: inbound events (an email, a maintenance request, a payment) are picked up automatically, handled by specialized agents, and routed for human approval whenever an action is high-stakes.
- It connects to the tools a property manager already uses — accounting, vendor networks, and tenant communication channels — rather than replacing them.
- Status: pre-launch, accepting waitlist signups.

Industries the firm serves or is moving toward: Property Management, Financial Services, Healthcare Operations, Legal, and Logistics.

How Novaric works:
- Builds for production, not demos.
- Understands a team's operations before touching their stack.
- Human-in-the-loop by default.

Getting started: prospective clients can reach out through the contact form on the site or email hello@novariclabs.com.`;
