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
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-lg shadow-navy/30 transition-transform hover:scale-105 hover:bg-navy-800 dark:bg-accent dark:text-navy dark:hover:bg-gold-400 sm:bottom-6 sm:right-6"
      >
        {open ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Ask Novaric"
          className="fixed bottom-24 right-4 z-50 flex h-[min(560px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl shadow-navy/20 sm:right-6"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-panel-line bg-panel px-5 py-4 text-panel-fg">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <Sparkles size={18} />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Ask Novaric</p>
              <p className="text-xs text-panel-muted">Usually replies instantly</p>
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
                      ? "rounded-br-sm bg-navy text-white dark:bg-accent dark:text-navy"
                      : "rounded-bl-sm bg-band text-heading"
                  }`}
                >
                  {m.content || (
                    <Loader2 size={16} className="animate-spin text-faint" />
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
                    className="block w-full rounded-lg border border-line px-3.5 py-2.5 text-left text-[13px] text-body transition-colors hover:border-accent/40 hover:bg-band"
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
            className="border-t border-line p-3"
          >
            <div className="flex items-end gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                aria-label="Message"
                className="flex-1 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-heading placeholder:text-faint focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40"
              />
              <button
                type="submit"
                disabled={!input.trim() || streaming}
                aria-label="Send message"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-white transition-colors hover:bg-navy-800 disabled:opacity-40 dark:bg-accent dark:text-navy dark:hover:bg-gold-400"
              >
                {streaming ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={17} />
                )}
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-faint">
              Powered by Claude · Answers may be imperfect
            </p>
          </form>
        </div>
      )}
    </>
  );
}
