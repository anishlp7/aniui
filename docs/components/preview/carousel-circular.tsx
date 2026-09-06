"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Nova", seed: "aniui-circ-1" },
  { label: "Bloom", seed: "aniui-circ-2" },
  { label: "Aria", seed: "aniui-circ-3" },
  { label: "Ember", seed: "aniui-circ-4" },
  { label: "Drift", seed: "aniui-circ-5" },
  { label: "Coast", seed: "aniui-circ-6" },
];

export function PreviewCarouselCircular({ className }: { className?: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      <div className="relative h-64 w-64 mx-auto">
        {items.map((item, i) => {
          const angle = ((i - active) / items.length) * Math.PI * 2;
          const x = Math.sin(angle) * 96;
          const y = Math.cos(angle) * 34;
          const isActive = i === active;
          const scale = isActive ? 1.15 : 0.82;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(i)}
              className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 shadow-md transition-all duration-300 cursor-pointer"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
                zIndex: isActive ? 2 : 1,
                opacity: isActive ? 1 : 0.7,
                borderColor: isActive ? "var(--color-primary)" : "var(--color-border)",
              }}
            >
              <img
                src={`https://picsum.photos/seed/${item.seed}/140/140`}
                alt={item.label}
                className="h-full w-full object-cover"
                style={{ filter: isActive ? "none" : "blur(1px)" }}
              />
            </button>
          );
        })}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-3">Tap an avatar to bring it to focus</p>
    </div>
  );
}
