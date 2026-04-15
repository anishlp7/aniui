"use client";

import React, { useState } from "react";

export function PreviewHoverCardDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        className="text-sm font-medium text-primary underline underline-offset-4 cursor-pointer"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen(!open)}
      >
        @aniui
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-lg border border-border bg-card p-4 shadow-lg z-50 animate-in fade-in-0 zoom-in-95">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">A</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">AniUI</p>
              <p className="text-xs text-muted-foreground">@aniui</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Beautiful React Native components. Copy. Paste. Ship.
          </p>
        </div>
      )}
    </div>
  );
}
