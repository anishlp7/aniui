"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

// Plain keyed motion.div — re-mounts on route change and replays the enter
// animation. Intentionally NOT wrapped in AnimatePresence mode="wait":
// with the App Router, exit-then-stream-enter races with React Server
// Components and occasionally leaves the new page stuck at opacity 0
// until a hard refresh.
export function DocsPageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
