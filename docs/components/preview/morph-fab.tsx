"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const items = ["📷", "🖼️", "🎤"];

export function PreviewMorphFab({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative flex h-40 w-full items-end justify-center", className)}>
      {items.map((icon, i) => (
        <button
          key={icon}
          type="button"
          className="absolute h-11 w-11 rounded-full bg-zinc-800 text-base text-white shadow-md transition-all duration-300 ease-out"
          style={{
            bottom: open ? 16 + (i + 1) * 54 : 16,
            opacity: open ? 1 : 0,
            transform: `scale(${open ? 1 : 0.4})`,
            transitionDelay: `${i * 40}ms`,
          }}
        >
          {icon}
        </button>
      ))}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative z-10 h-14 w-14 rounded-full bg-zinc-900 text-2xl font-light text-white shadow-lg transition-transform duration-300 cursor-pointer"
        style={{ transform: `rotate(${open ? 45 : 0}deg)` }}
      >
        +
      </button>
    </div>
  );
}
