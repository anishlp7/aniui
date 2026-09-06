"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const cards = [
  { label: "Card 1", className: "bg-primary text-primary-foreground" },
  { label: "Card 2", className: "bg-secondary text-secondary-foreground" },
  { label: "Card 3", className: "bg-accent text-accent-foreground" },
];

export function PreviewFillingStack({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => Math.min(i + 1, cards.length - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  return (
    <div className={cn("flex w-full max-w-[220px] flex-col items-center gap-2", className)}>
      <div className="relative h-40 w-full">
        {cards.map((card, i) => {
          const depth = i - index;
          const isActive = depth === 0;
          return (
            <div
              key={card.label}
              className={cn(
                "absolute inset-x-0 flex h-36 items-center justify-center rounded-2xl border border-border text-sm font-semibold shadow-md transition-all duration-300",
                card.className
              )}
              style={{
                transform: `translateY(${depth < 0 ? -160 : depth === 0 ? 0 : (depth - 1) * 10}px) scale(${isActive ? 1 : depth < 0 ? 1.05 : 0.94})`,
                opacity: depth < 0 ? 0 : 1,
                zIndex: cards.length - i,
              }}
            >
              {card.label}
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={prev} className="rounded-full border border-border px-3 py-1 text-xs text-foreground cursor-pointer">
          Up
        </button>
        <button type="button" onClick={next} className="rounded-full border border-border px-3 py-1 text-xs text-foreground cursor-pointer">
          Down
        </button>
      </div>
    </div>
  );
}
