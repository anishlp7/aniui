"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const items = ["A", "B", "C", "D", "E"];

export function PreviewCarouselCircular({ className }: { className?: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("relative h-36 w-36 mx-auto", className)}>
      {items.map((label, i) => {
        const angle = ((i - active) / items.length) * Math.PI * 2;
        const x = Math.sin(angle) * 52;
        const y = Math.cos(angle) * 18;
        const scale = i === active ? 1 : 0.75;
        return (
          <button
            key={label}
            type="button"
            onClick={() => setActive(i)}
            className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-card text-xs font-bold text-foreground shadow-sm cursor-pointer transition-all duration-300"
            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`, zIndex: i === active ? 2 : 1 }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
