"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

function ShimmerRow({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-md bg-muted", className)}>
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-foreground/25 to-transparent"
        animate={{ x: ["-100%", "220%"] }}
        transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}

export function PreviewShimmer({ className }: { className?: string }) {
  return (
    <div className={cn("w-full max-w-xs mx-auto space-y-3", className)}>
      <ShimmerRow className="h-4 w-3/4" />
      <ShimmerRow className="h-4 w-full" />
      <ShimmerRow className="h-24 w-full" />
    </div>
  );
}
