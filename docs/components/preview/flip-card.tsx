"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewFlipCard({ className }: { className?: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      className={cn("relative h-28 w-44 [perspective:900px] cursor-pointer", className)}
      aria-pressed={flipped}
    >
      <div
        className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-border bg-card [backface-visibility:hidden]">
          <span className="text-sm font-semibold text-foreground">Tap to flip</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary text-primary-foreground [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="text-sm font-semibold">Back side</span>
        </div>
      </div>
    </button>
  );
}
