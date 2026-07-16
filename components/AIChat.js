"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";

const SUGGESTIONS = [
  "Which package is right for me?",
  "How much is the Bronze package?",
  "Do you provide a car for the road test?",
  "How do I book a lesson?",
];

const GREETING = {
  role: "assistant",
  content:
    "Hi! I'm Maya, the Multi-Dimensions virtual assistant. Ask me about packages, pricing, road tests or booking — or tap a suggestion below.",
};

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply ?? "Sorry, please try again." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting. Please call us at +1 647-819-0164 and we'll help right away.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="fixed bottom-5 right-5 z-[140] grid h-14 w-14 place-items-center rounded-full bg-sign-700 text-white shadow-lift ring-4 ring-sign-700/20 sm:h-16 sm:w-16"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Icon name={open ? "close" : "chat"} className="h-6 w-6 sm:h-7 sm:w-7" />
          </motion.span>
        </AnimatePresence>
        {!open && (
          <span className="absolute right-0 top-0 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-road-500 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-road-500" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Maya, the virtual assistant"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-[140] flex h-[min(560px,75vh)] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-ink-200 sm:right-5"
          >
            {/* Header — green guide sign */}
            <div className="flex items-center gap-3 bg-sign-700 px-4 py-3.5 text-white">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 ring-1 ring-white/25">
                <Icon name="sparkles" className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-sm font-bold">Maya · AI Assistant</p>
                <p className="flex items-center gap-1.5 font-mono text-[11px] text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-road-400" />
                  Usually replies instantly
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="ml-auto grid h-8 w-8 place-items-center rounded-lg hover:bg-white/15"
              >
                <Icon name="close" className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-paper-100 px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-sign-700 text-white"
                        : "rounded-bl-md bg-white text-ink-700 ring-1 ring-ink-200"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 ring-1 ring-ink-200">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-2 w-2 animate-bounce rounded-full bg-sign-600"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {messages.length <= 1 && !loading && (
                <div className="space-y-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full rounded-xl bg-white px-3.5 py-2.5 text-left text-sm font-medium text-sign-800 ring-1 ring-ink-200 transition-colors hover:bg-sign-700/[0.06] hover:ring-sign-500"
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
                send();
              }}
              className="flex items-center gap-2 border-t border-ink-200 bg-white p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                className="min-w-0 flex-1 rounded-full bg-paper-100 px-4 py-2.5 text-sm text-ink-900 outline-none ring-1 ring-ink-200 focus:ring-sign-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sign-700 text-white transition-colors hover:bg-sign-800 disabled:opacity-40"
              >
                <Icon name="send" className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
