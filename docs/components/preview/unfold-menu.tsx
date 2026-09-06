"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewUnfoldMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative flex h-40 w-full items-start justify-center pt-3", className)}>
      <div
        className="overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-all duration-300 ease-out"
        style={{ width: open ? 220 : 132, height: open ? 128 : 44 }}
      >
        {!open ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-11 w-[132px] items-center justify-center gap-2 rounded-full text-sm font-medium text-foreground cursor-pointer"
          >
            <span>⇪</span> Share
          </button>
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-border px-3 py-2">
              <p className="text-sm font-medium text-muted-foreground">Share</p>
              <button type="button" onClick={() => setOpen(false)} className="text-xs text-muted-foreground cursor-pointer">
                ✕
              </button>
            </div>
            <div className="grid flex-1 grid-cols-3 place-items-center gap-1 p-2 text-lg">
              <span>⭐</span>
              <span>💬</span>
              <span>📤</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
