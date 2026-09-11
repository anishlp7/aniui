"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const slides = [
  { label: "Alpine", seed: "aniui-3d-1" },
  { label: "Harbor", seed: "aniui-3d-2" },
  { label: "Skyline", seed: "aniui-3d-3" },
  { label: "Desert", seed: "aniui-3d-4" },
];

export function PreviewCarousel3D({ className }: { className?: string }) {
  const [active, setActive] = useState(2);

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="relative h-56 [perspective:1100px]">
        {slides.map((slide, i) => {
          const offset = i - active;
          return (
            <button
              key={slide.label}
              type="button"
              onClick={() => setActive(i)}
              className="absolute left-1/2 top-1/2 h-44 w-32 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border shadow-lg transition-all duration-300 cursor-pointer"
              style={{
                transform: `translate(-50%, -50%) translateX(${offset * 92}px) rotateY(${offset * -32}deg) scale(${i === active ? 1 : 0.82})`,
                zIndex: i === active ? 3 : 3 - Math.abs(offset),
                opacity: Math.abs(offset) > 1 ? 0 : i === active ? 1 : 0.55,
              }}
            >
              <img
                src={`https://picsum.photos/seed/${slide.seed}/260/360`}
                alt={slide.label}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-0 right-0 text-center text-xs font-semibold text-white drop-shadow">
                {slide.label}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-3">Tap a card to rotate the cylinder</p>
    </div>
  );
}
