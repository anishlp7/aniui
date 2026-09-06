"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = ["All", "Music", "Podcasts"];

export function PreviewMorphingTabbar({ className }: { className?: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("flex w-full max-w-[260px] gap-2 rounded-lg bg-muted p-1", className)}>
      {tabs.map((tab, i) => {
        const isActive = i === active;
        const isAdjacent = Math.abs(i - active) === 1;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "flex-1 py-2 text-xs font-medium cursor-pointer transition-all duration-300",
              isActive ? "rounded-full bg-background text-foreground shadow-sm" : "rounded-none text-muted-foreground",
              !isActive && isAdjacent && "rounded-l-none rounded-r-none"
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
