"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const slides = [
  { label: "Trailhead", seed: "aniui-scale-1" },
  { label: "Overlook", seed: "aniui-scale-2" },
  { label: "Lagoon", seed: "aniui-scale-3" },
  { label: "Canyon", seed: "aniui-scale-4" },
];

export function PreviewCarouselScale({ className }: { className?: string }) {
  const [active, setActive] = useState(1);

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      <div className="flex items-center justify-center gap-3 h-56">
        {slides.map((slide, i) => (
          <button
            key={slide.label}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-border shadow-md transition-all duration-300 cursor-pointer",
              i === active ? "h-52 w-36 z-10" : "h-36 w-24 opacity-70"
            )}
          >
            <img
              src={`https://picsum.photos/seed/${slide.seed}/240/320`}
              alt={slide.label}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {i === active && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-0 right-0 text-center text-xs font-semibold text-white drop-shadow">
                  {slide.label}
                </span>
              </>
            )}
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-3">Tap a card — neighbors shrink, the focused one zooms up</p>
    </div>
  );
}
