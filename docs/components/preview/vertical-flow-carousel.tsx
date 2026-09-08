"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const slides = [
  { label: "Mist", seed: "aniui-vflow-1" },
  { label: "Cliff", seed: "aniui-vflow-2" },
  { label: "Dusk", seed: "aniui-vflow-3" },
  { label: "Tide", seed: "aniui-vflow-4" },
  { label: "Bay", seed: "aniui-vflow-5" },
];

export function PreviewVerticalFlowCarousel({ className }: { className?: string }) {
  const [active, setActive] = useState(1);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-col items-center justify-center gap-3 [perspective:900px]">
        {slides.map((slide, i) => {
          const distance = i - active;
          return (
            <button
              key={slide.label}
              type="button"
              onClick={() => setActive(i)}
              className="relative h-16 w-full max-w-xs overflow-hidden rounded-xl border border-border shadow-md transition-all duration-300 cursor-pointer"
              style={{
                transform: `rotateZ(${distance * 6}deg) scale(${i === active ? 1 : 0.85})`,
                opacity: i === active ? 1 : 0.5,
                zIndex: i === active ? 3 : 3 - Math.abs(distance),
              }}
            >
              <img src={`https://picsum.photos/seed/${slide.seed}/400/160`} alt={slide.label} className="absolute inset-0 h-full w-full object-cover" />
              {i !== active && <div className="absolute inset-0 backdrop-blur-[2px] bg-black/10" />}
            </button>
          );
        })}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-3">Tap a card — neighbors tilt, shrink, and blur away from the centered one</p>
    </div>
  );
}
