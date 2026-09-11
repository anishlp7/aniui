"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { reducedMotionTransition } from "@/lib/motion";

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const transition = prefersReducedMotion ? reducedMotionTransition : { duration: 0.15 };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors z-10 cursor-pointer"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "copied" : "copy"}
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.85 }}
          transition={transition}
          className="flex items-center gap-1.5"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied!" : "Copy"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
