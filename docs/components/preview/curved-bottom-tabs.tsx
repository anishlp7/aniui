"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = ["Home", "Search", "Profile"];

export function PreviewCurvedBottomTabs({ className }: { className?: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("w-full max-w-[280px] rounded-2xl border border-border bg-card overflow-hidden", className)}>
      <div className="h-20 bg-secondary/30" />
      <div className="relative flex items-end justify-around px-4 pb-3 pt-6 bg-background">
        <div className="absolute inset-x-0 top-0 h-6 rounded-t-[50%] bg-background -translate-y-3 border-t border-border" />
        {tabs.map((tab, i) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "relative z-10 flex flex-col items-center gap-1 text-[10px] font-medium cursor-pointer",
              i === active ? "text-primary -translate-y-2" : "text-muted-foreground"
            )}
          >
            <span className={cn("h-2 w-2 rounded-full", i === active ? "bg-primary" : "bg-muted-foreground/40")} />
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
