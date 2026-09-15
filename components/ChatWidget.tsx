"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send, Sparkles, Loader2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi — I'm the Novaric Labs assistant. Ask me about our services, the property management platform, or how an engagement works.",
};

const SUGGESTIONS = [
  "What does Novaric Labs build?",
  "Tell me about the property platform",
  "How do engagements start?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (err) {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content:
            err instanceof Error && err.message.includes("configured")
              ? "The assistant isn't configured yet. Reach us directly at hello@novariclabs.com."
              : "Sorry — I couldn't reach the assistant. Please try again, or email hello@novariclabs.com.",
        };
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Ask Novaric chat" : "Open Ask Novaric chat"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-amber bg-amber text-onamber shadow-lg transition-transform hover:scale-105 hover:bg-amber-hot sm:bottom-6 sm:right-6"
      >
        {open ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Ask Novaric"
          className="fixed bottom-24 right-4 z-50 flex h-[min(560px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden border border-alu-hi bg-hull shadow-2xl shadow-black/60 sm:right-6"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-alu bg-hull-2 px-5 py-4 text-fg">
            <span className="inline-flex h-9 w-9 items-center justify-center border border-alu-hi text-amber">
              <Sparkles size={18} />
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold uppercase tracking-wide">Ask Novaric</p>
              <p className="text-xs text-fg-soft">Usually replies instantly</p>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="thin-scroll flex-1 space-y-4 overflow-y-auto px-4 py-5"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-amber text-onamber"
                      : "rounded-bl-sm border border-alu bg-hull-2 text-fg"
                  }`}
                >
                  {m.content || (
                    <Loader2 size={16} className="animate-spin text-fg-dim" />
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="space-y-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="block w-full border border-alu px-3.5 py-2.5 text-left text-[13px] text-fg-soft transition-colors hover:border-amber hover:text-fg"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-alu p-3"
          >
            <div className="flex items-end gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                aria-label="Message"
                className="flex-1 border border-alu bg-void px-4 py-2.5 text-sm text-fg placeholder:text-fg-dim focus:border-amber focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || streaming}
                aria-label="Send message"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-amber text-onamber transition-colors hover:bg-amber-hot disabled:opacity-40"
              >
                {streaming ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={17} />
                )}
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-fg-dim">
              Powered by Claude · Answers may be imperfect
            </p>
          </form>
        </div>
      )}
    </>
  );
}
