"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// Animates the leading number of a stat (e.g. "10k+", "98%") when scrolled
// into view, preserving any suffix. Non-numeric values ("MTO") render as-is.
export default function CountUp({ value, className = "", duration = 1400 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const [n, setN] = useState(target === null || reduce ? target : 0);

  useEffect(() => {
    if (target === null || reduce || !inView) return;
    let raf;
    let startTs;
    const step = (ts) => {
      if (startTs === undefined) startTs = ts;
      const p = Math.min(1, (ts - startTs) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {target === null ? value : `${n}${suffix}`}
    </span>
  );
}
