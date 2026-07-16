"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// Thin reading-progress bar pinned to the top of the viewport.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden="true"
      className="fixed left-0 top-0 z-[200] h-[3px] w-full origin-left bg-gradient-to-r from-sign-700 via-sign-500 to-road-400"
    />
  );
}
