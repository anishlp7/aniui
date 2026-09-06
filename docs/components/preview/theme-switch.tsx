"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewThemeSwitch({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsDark((d) => !d)}
      aria-checked={isDark}
      role="switch"
      className={cn("relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full cursor-pointer", className)}
    >
      <svg
        className="absolute h-6 w-6 text-foreground transition-all duration-300"
        style={{ opacity: isDark ? 0 : 1, transform: isDark ? "rotate(90deg) scale(0.4)" : "rotate(0deg) scale(1)" }}
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg
        className="absolute h-6 w-6 text-foreground transition-all duration-300"
        style={{ opacity: isDark ? 1 : 0, transform: isDark ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.4)" }}
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
      </svg>
    </button>
  );
}
