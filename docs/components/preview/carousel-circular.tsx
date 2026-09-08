"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const seeds = ["aniui-circ-1", "aniui-circ-2", "aniui-circ-3", "aniui-circ-4", "aniui-circ-5"];

export function PreviewCarouselCircular({ className }: { className?: string }) {
  const [active, setActive] = useState(2);

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="relative h-56">
        {seeds.map((seed, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          const isActive = offset === 0;
          return (
            <button
              key={seed}
              type="button"
              onClick={() => setActive(i)}
              className="absolute left-1/2 top-6 h-44 w-44 -translate-x-1/2 overflow-hidden rounded-2xl border border-border shadow-lg transition-all duration-300 cursor-pointer"
              style={{
                transform: `translateX(${offset * 60}px) translateY(${abs * 14}px) scale(${isActive ? 1 : 0.82}) rotateZ(${offset * -15}deg)`,
                zIndex: isActive ? 3 : 3 - abs,
                opacity: abs > 2 ? 0 : isActive ? 1 : 0.6,
                filter: isActive ? "none" : "blur(1px)",
              }}
            >
              <img src={`https://picsum.photos/seed/${seed}/180/180`} alt="" className="h-full w-full object-cover" />
            </button>
          );
        })}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-3">Swipe the deck — the centered card lifts forward, its neighbors fall back</p>
    </div>
  );
}
