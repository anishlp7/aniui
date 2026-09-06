"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const slides = [
  { label: "Featured", seed: "aniui-carousel-1" },
  { label: "New", seed: "aniui-carousel-2" },
  { label: "Popular", seed: "aniui-carousel-3" },
];

export function PreviewCarouselParallax({ className }: { className?: string }) {
  const [active, setActive] = useState(1);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-center gap-3 h-56">
        {slides.map((slide, i) => (
          <button
            key={slide.label}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-border shadow-md transition-all duration-300 cursor-pointer",
              i === active ? "h-52 w-40 scale-100" : "h-36 w-28 scale-90 opacity-60"
            )}
          >
            <img
              src={`https://picsum.photos/seed/${slide.seed}/320/420`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300"
              style={{ transform: i === active ? "scale(1.15) translateY(-4px)" : "scale(1)" }}
            />
            <div className="absolute inset-0 bg-black/30" />
            <span className="absolute bottom-2 left-0 right-0 text-center text-xs font-semibold text-white">
              {slide.label}
            </span>
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-3">Tap a card — the photo drifts inside the frame</p>
    </div>
  );
}
