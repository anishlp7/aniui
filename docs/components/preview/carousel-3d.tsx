"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const slides = [
  { label: "1", className: "bg-primary text-primary-foreground" },
  { label: "2", className: "bg-secondary text-secondary-foreground" },
  { label: "3", className: "bg-accent text-accent-foreground" },
];

export function PreviewCarousel3D({ className }: { className?: string }) {
  const [active, setActive] = useState(1);

  return (
    <div className={cn("w-full max-w-[260px]", className)}>
      <div className="relative h-36 [perspective:800px]">
        {slides.map((slide, i) => {
          const offset = i - active;
          return (
            <button
              key={slide.label}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "absolute left-1/2 top-1/2 h-28 w-20 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border shadow-md transition-all duration-300 flex items-center justify-center text-sm font-semibold cursor-pointer",
                slide.className
              )}
              style={{
                transform: `translate(-50%, -50%) translateX(${offset * 56}px) rotateY(${offset * -28}deg) scale(${i === active ? 1 : 0.82})`,
                zIndex: i === active ? 3 : 1,
                opacity: i === active ? 1 : 0.65,
              }}
            >
              {slide.label}
            </button>
          );
        })}
      </div>
      <p className="text-center text-[10px] text-muted-foreground mt-2">Tap a slide</p>
    </div>
  );
}
