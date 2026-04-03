"use client";

import React, { useState, useRef, useEffect } from "react";
import { themeColors, hsl } from "@/lib/theme-data";

export function ThemeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const color = themeColors.find((c) => c.name === value);
  const isRandom = !color;
  const displayColor = color ?? themeColors[0];

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 h-8 px-3 rounded-md border border-border bg-background text-sm font-medium text-foreground hover:bg-accent transition-colors cursor-pointer"
      >
        <span className="h-3.5 w-3.5 rounded-full shrink-0" style={{ background: isRandom ? "conic-gradient(red,orange,yellow,green,cyan,blue,violet,red)" : hsl(displayColor.light["--primary"]) }} />
        <span>{isRandom ? "Random" : displayColor.label}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-[100] w-44 max-h-64 overflow-y-auto rounded-lg border border-border bg-background p-1 shadow-lg">
          {themeColors.map((c) => (
            <button
              key={c.name}
              onClick={() => { onChange(c.name); setOpen(false); }}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                value === c.name ? "bg-primary/10 text-foreground font-semibold ring-1 ring-primary/30" : "text-foreground hover:bg-accent/50"
              }`}
            >
              <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: hsl(c.light["--primary"]) }} />
              {c.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
