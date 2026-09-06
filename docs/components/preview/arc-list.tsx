"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function PreviewArcList({ className }: { className?: string }) {
  const [active, setActive] = useState(2);

  return (
    <div className={cn("flex h-56 w-full items-center justify-center overflow-hidden", className)}>
      <div className="relative flex h-full w-28 flex-col items-start justify-center">
        {days.map((day, i) => {
          const offset = i - active;
          const distance = Math.abs(offset);
          const scale = Math.max(0.75, 1 - distance * 0.14);
          const opacity = Math.max(0.3, 1 - distance * 0.28);
          const bulge = Math.max(0, 26 - distance * 12);
          return (
            <button
              key={day}
              type="button"
              onClick={() => setActive(i)}
              className="absolute left-0 text-sm font-semibold text-foreground transition-all duration-200 ease-out cursor-pointer"
              style={{
                top: `calc(50% + ${offset * 30}px)`,
                transform: `translateY(-50%) translateX(${bulge}px) scale(${scale})`,
                opacity,
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
