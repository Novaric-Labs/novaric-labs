import { anthropic, MODEL, EFFORT, hasApiKey, NOVARIC_CONTEXT } from "@/lib/anthropic";
import { checkRateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 30;

type ChatMessage = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `You are the Novaric Labs assistant — a knowledgeable, professional guide on the Novaric Labs website.

Your job is to answer visitor questions about Novaric Labs' three systems, how an engagement runs, the Incubator Lab, and general applied-AI topics.

${NOVARIC_CONTEXT}

Tone and rules:
- Professional, direct, and technically literate. Confident but never hype-y.
- Avoid the words "cutting-edge", "revolutionary", "game-changing", "unlock", and "leverage".
- Keep answers concise — usually 2-4 short sentences, and under about 120 words unless the visitor explicitly asks for detail.
- The chat window renders plain text, not markdown. Never use asterisks for emphasis, headers, backticks, or any other markdown syntax — it shows up literally. If a list genuinely helps, put each item on its own line starting with a dash.
- When a question signals real buying intent (scoping a project, pricing, timelines), encourage them to use the contact form or email hello@novariclabs.com.
- If you don't know something specific (exact pricing, launch dates), say so plainly and point them to contact the team. Do not invent facts.
- You represent Novaric Labs. Stay on topics relevant to the firm and applied AI.`;

export async function POST(req: Request) {
  if (!hasApiKey()) {
    return Response.json(
      { error: "The assistant is not configured. Set ANTHROPIC_API_KEY to enable it." },
      { status: 503 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: "Too many requests. Please wait a moment before trying again." },
      { status: 429 }
    );
  }

  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error("messages must be a non-empty array");
    }
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Clamp history to keep requests bounded.
  const trimmed = messages.slice(-12).map((m) => ({
    role: m.role,
    content: String(m.content ?? "").slice(0, 4000),
  }));

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const messageStream = anthropic.messages.stream({
          model: MODEL,
          // Headroom for thinking tokens, which count against max_tokens.
          // Answers themselves are 2-4 sentences.
          max_tokens: 2048,
          output_config: { effort: EFFORT },
          system: SYSTEM_PROMPT,
          messages: trimmed,
        });

        for await (const event of messageStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        console.error("[novaric] chat stream error:", err);
        controller.enqueue(
          encoder.encode(
            "\n\nSorry — something went wrong reaching the assistant. Please try again, or email hello@novariclabs.com."
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
