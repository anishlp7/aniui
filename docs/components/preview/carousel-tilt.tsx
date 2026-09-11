"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const slides = [
  { label: "Dune", seed: "aniui-tilt-1" },
  { label: "Reef", seed: "aniui-tilt-2" },
  { label: "Ridge", seed: "aniui-tilt-3" },
  { label: "Grove", seed: "aniui-tilt-4" },
];

export function PreviewCarouselTilt({ className }: { className?: string }) {
  const [active, setActive] = useState(1);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-end justify-center gap-4 h-56 [perspective:900px]">
        {slides.map((slide, i) => (
          <button
            key={slide.label}
            type="button"
            onClick={() => setActive(i)}
            className="relative h-40 w-28 overflow-hidden rounded-2xl border border-border shadow-md transition-all duration-300 cursor-pointer"
            style={{
              transform: `rotateZ(${(i - active) * 14}deg) translateY(${i === active ? 0 : 18}px) scale(${i === active ? 1.08 : 0.88})`,
              transformOrigin: "bottom",
              opacity: i === active ? 1 : 0.65,
              zIndex: i === active ? 3 : 3 - Math.abs(i - active),
            }}
          >
            <img
              src={`https://picsum.photos/seed/${slide.seed}/220/320`}
              alt={slide.label}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-3">Tap a card — the fan rotates and lifts from the bottom</p>
    </div>
  );
}
