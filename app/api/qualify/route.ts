import { anthropic, MODEL, hasApiKey, NOVARIC_CONTEXT } from "@/lib/anthropic";
import { checkRateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 30;

type QualifierAnswers = {
  industry?: string;
  teamSize?: string;
  painPoint?: string;
  stack?: string;
  readiness?: string;
};

const SYSTEM_PROMPT = `You are an AI engagement strategist at Novaric Labs. A prospective client has answered a short questionnaire about their operation. Write them a candid, useful assessment of whether AI/agentic automation is a good fit for their workflow right now, and what an engagement with Novaric Labs might look like.

${NOVARIC_CONTEXT}

Output rules:
- Write 2-3 short paragraphs of plain prose. No headings, no bullet lists, no markdown.
- Be honest. If their situation suggests they should wait, clean up data first, or start small, say so. Do not oversell.
- Name the most relevant Novaric service (Agentic Systems, AI Integration & Tooling, or Strategic Advisory) and a realistic starting point.
- Address the reader as "you". Be specific to their answers — reference their industry, pain point, and stack.
- Avoid the words "cutting-edge", "revolutionary", "game-changing", "unlock", and "leverage".
- End with a concrete, low-pressure next step (e.g. a scoping conversation), referencing the contact form or hello@novariclabs.com.`;

export async function POST(req: Request) {
  if (!hasApiKey()) {
    return Response.json(
      { error: "The qualifier is not configured. Set ANTHROPIC_API_KEY to enable it." },
      { status: 503 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(ip, { limit: 10, windowMs: 60_000 })) {
    return Response.json(
      { error: "Too many requests. Please wait a moment before trying again." },
      { status: 429 }
    );
  }

  let answers: QualifierAnswers;
  try {
    const body = await req.json();
    answers = body.answers ?? {};
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const userPrompt = `Here are the prospect's answers:

- Industry: ${answers.industry || "Not specified"}
- Team size: ${answers.teamSize || "Not specified"}
- Biggest operational pain point: ${answers.painPoint || "Not specified"}
- Current software stack: ${answers.stack || "Not specified"}
- Automation readiness (how much is documented / repeatable today): ${answers.readiness || "Not specified"}

Write their personalized fit assessment.`;

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text = response.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("\n")
      .trim();

    return Response.json({ assessment: text });
  } catch (err) {
    console.error("[novaric] qualify error:", err);
    return Response.json(
      { error: "We couldn't generate an assessment right now. Please try again, or email hello@novariclabs.com." },
      { status: 500 }
    );
  }
}
