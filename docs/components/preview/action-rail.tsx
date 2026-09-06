"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewActionRail({ className }: { className?: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn("flex w-full items-center justify-center", className)}>
      <div className="flex items-center gap-1.5 rounded-full border border-border bg-white p-1.5 shadow-sm">
        <button type="button" className="flex h-9 items-center justify-center rounded-full bg-zinc-100 px-3.5 text-xs font-medium text-zinc-900 cursor-pointer">
          ❤️ Like
        </button>
        {expanded ? (
          <>
            <button type="button" className="flex h-9 items-center justify-center rounded-full bg-zinc-100 px-3.5 text-xs font-medium text-zinc-900 cursor-pointer animate-in fade-in">
              ↗️ Share
            </button>
            <button type="button" className="flex h-9 items-center justify-center rounded-full bg-zinc-100 px-3.5 text-xs font-medium text-zinc-900 cursor-pointer animate-in fade-in">
              🔖 Save
            </button>
          </>
        ) : null}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-sm text-white cursor-pointer"
        >
          {expanded ? "✕" : "⋯"}
        </button>
      </div>
    </div>
  );
}
