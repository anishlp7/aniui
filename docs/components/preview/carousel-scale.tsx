"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewCarouselScale({ className }: { className?: string }) {
  const [active, setActive] = useState(1);
  const slides = ["Prev", "Focus", "Next"];

  return (
    <div className={cn("flex items-end justify-center gap-2 h-32", className)}>
      {slides.map((label, i) => (
        <button
          key={label}
          type="button"
          onClick={() => setActive(i)}
          className={cn(
            "rounded-xl border border-border bg-card flex items-center justify-center text-xs font-semibold transition-all duration-300 cursor-pointer",
            i === active ? "h-28 w-24 text-foreground scale-100" : "h-20 w-16 text-muted-foreground opacity-70"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
