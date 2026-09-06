"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewCarouselTilt({ className }: { className?: string }) {
  const [active, setActive] = useState(1);

  return (
    <div className={cn("flex items-center justify-center gap-3 h-32 [perspective:600px]", className)}>
      {[0, 1, 2].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => setActive(i)}
          className="h-24 w-16 rounded-xl border border-border bg-card shadow-md transition-all duration-300 cursor-pointer"
          style={{
            transform: `rotateY(${(i - active) * 18}deg) scale(${i === active ? 1 : 0.85})`,
            opacity: i === active ? 1 : 0.6,
          }}
        />
      ))}
    </div>
  );
}
