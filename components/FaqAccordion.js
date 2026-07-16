"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";

export default function FaqAccordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={`overflow-hidden rounded-2xl bg-white ring-1 transition-colors ${
              isOpen ? "ring-sign-500 shadow-soft" : "ring-ink-200"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
            >
              <span className="font-display text-base font-bold text-ink-900 sm:text-lg">
                {item.q}
              </span>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                  isOpen ? "rotate-45 bg-sign-700 text-white" : "bg-ink-100 text-ink-500"
                }`}
              >
                <Icon name="close" className="h-4 w-4 rotate-45" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-5 pb-5 text-ink-600 sm:px-6 sm:pb-6">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
