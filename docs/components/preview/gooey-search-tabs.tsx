"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = ["Home", "Profile"];

export function PreviewGooeySearchTabs({ className }: { className?: string }) {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <div className={cn("flex w-full max-w-[260px] items-center justify-center", className)}>
      <div className="relative flex h-[46px] w-full items-center rounded-full bg-white shadow-md">
        {!expanded ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="absolute left-0 flex h-[46px] w-[46px] items-center justify-center rounded-full text-sm cursor-pointer"
            aria-label="Search"
          >
            🔍
          </button>
        ) : null}

        {expanded ? (
          <input
            autoFocus
            placeholder="Search"
            className="h-full flex-1 rounded-full bg-transparent pl-4 pr-2 text-sm text-zinc-900 outline-none"
          />
        ) : (
          <div className="ml-[46px] flex flex-1 items-center justify-end gap-1 px-1.5">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer",
                  active === i ? "bg-black/[0.06] text-zinc-900" : "text-zinc-500"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {expanded ? (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="flex h-[46px] w-[46px] items-center justify-center rounded-full text-sm cursor-pointer"
            aria-label="Close search"
          >
            ✕
          </button>
        ) : null}
      </div>
    </div>
  );
}
