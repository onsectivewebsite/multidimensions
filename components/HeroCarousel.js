"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";

const SLIDES = [
  { src: "/flyer1.png", alt: "We encourage you to get out on the road — expert training, safe drivers, confident futures. Register today." },
  { src: "/flyer2.png", alt: "Multi-Dimensions Driving School — your journey starts here. Register today." },
];

export default function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((n) => setI((c) => (n + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((c) => (c + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="group relative overflow-hidden rounded-3xl ring-1 ring-ink-200 shadow-lift"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="relative aspect-[1983/793]">
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Link href="/register" aria-label={SLIDES[i].alt}>
              <Image
                src={SLIDES[i].src}
                alt={SLIDES[i].alt}
                fill
                priority={i === 0}
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover"
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <button
        onClick={() => go(i - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-ink-900 opacity-0 shadow-soft ring-1 ring-ink-200 backdrop-blur transition-opacity hover:bg-white group-hover:opacity-100"
      >
        <Icon name="arrow" className="h-5 w-5 rotate-180" />
      </button>
      <button
        onClick={() => go(i + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-ink-900 opacity-0 shadow-soft ring-1 ring-ink-200 backdrop-blur transition-opacity hover:bg-white group-hover:opacity-100"
      >
        <Icon name="arrow" className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, n) => (
          <button
            key={n}
            onClick={() => setI(n)}
            aria-label={`Go to slide ${n + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              n === i ? "w-7 bg-sign-600" : "w-2.5 bg-ink-900/25 hover:bg-ink-900/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
