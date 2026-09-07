"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const slides = [
  { label: "Aurora", seed: "aniui-vpage-1" },
  { label: "Canyon", seed: "aniui-vpage-2" },
  { label: "Harbor", seed: "aniui-vpage-3" },
];

export function PreviewVerticalPageCarousel({ className }: { className?: string }) {
  const [active, setActive] = useState(1);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col items-center justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.label}
            type="button"
            onClick={() => setActive(i)}
            className="relative w-full max-w-xs overflow-hidden rounded-2xl border border-border shadow-md transition-all duration-300 cursor-pointer"
            style={{
              height: i === active ? 176 : 96,
              transform: `scale(${i === active ? 1 : 0.9})`,
              opacity: i === active ? 1 : 0.5,
            }}
          >
            <img src={`https://picsum.photos/seed/${slide.seed}/400/300`} alt={slide.label} className="absolute inset-0 h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-3">Tap a card — one page fills the screen at a time, paged vertically</p>
    </div>
  );
}
