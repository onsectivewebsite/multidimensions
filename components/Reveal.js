"use client";

import { useReducedMotion, motion } from "framer-motion";

// Scroll-into-view reveal: small translate + fade, staggered by `delay`.
// When the user prefers reduced motion, render statically (always visible) —
// this also guarantees content is never left hidden.
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  as = "div",
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
