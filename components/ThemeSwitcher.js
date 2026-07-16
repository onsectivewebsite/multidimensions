"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";

// Live theme presets — the swatch shows [primary, accent].
const THEMES = [
  { id: "default", name: "Ink & Lime", colors: ["#18181B", "#84CC16"] },
  { id: "indigo", name: "Indigo & Lime", colors: ["#4338CA", "#84CC16"] },
  { id: "magenta", name: "Magenta & Cyan", colors: ["#A21CAF", "#06B6D4"] },
  { id: "sunset", name: "Rose & Violet", colors: ["#E11D48", "#7C3AED"] },
  { id: "forest", name: "Emerald & Gold", colors: ["#047857", "#F59E0B"] },
  { id: "grape", name: "Violet & Amber", colors: ["#6D28D9", "#F59E0B"] },
];

const STORAGE_KEY = "mdd-theme";

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("default");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) apply(saved);
  }, []);

  function apply(id) {
    setActive(id);
    if (id === "default") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = id;
    localStorage.setItem(STORAGE_KEY, id);
  }

  return (
    <div className="fixed bottom-5 left-5 z-[140]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 left-0 w-60 rounded-2xl bg-white p-3 shadow-lift ring-1 ring-ink-200"
          >
            <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-ink-500">
              Try a colour theme
            </p>
            <div className="space-y-1">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => apply(t.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm font-medium transition-colors ${
                    active === t.id
                      ? "bg-sign-700/10 text-sign-700"
                      : "text-ink-700 hover:bg-ink-100"
                  }`}
                >
                  <span className="flex gap-1">
                    {t.colors.map((c) => (
                      <span
                        key={c}
                        className="h-5 w-5 rounded-full ring-1 ring-black/10"
                        style={{ background: c }}
                      />
                    ))}
                  </span>
                  {t.name}
                  {active === t.id && (
                    <Icon name="check" className="ml-auto h-4 w-4 text-sign-700" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change colour theme"
        className="flex h-12 items-center gap-2 rounded-full bg-ink-900 px-4 text-sm font-semibold text-white shadow-lift ring-1 ring-white/10 transition-transform hover:scale-105"
      >
        <Icon name={open ? "close" : "sparkles"} className="h-5 w-5" />
        <span className="hidden sm:inline">Theme</span>
      </button>
    </div>
  );
}
