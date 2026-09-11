"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const apps = ["Mail", "Stats", "Projects", "Team", "Settings"];

/** Illustrates the fisheye magnifier: icon scale falls off with distance
 *  (in index units) from whichever icon the pointer is currently tracking,
 *  mirroring MobileDock's finger-tracked, conserved-width fisheye. */
export function PreviewMobileDock({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const updateFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const fraction = (clientX - rect.left) / rect.width;
    setActiveIndex(Math.min(apps.length - 1, Math.max(0, Math.round(fraction * apps.length - 0.5))));
  };

  return (
    <div
      ref={ref}
      className={cn("flex items-end gap-2 rounded-2xl border border-border bg-card/90 px-3 pb-2 pt-1 backdrop-blur", className)}
      onMouseMove={(e) => updateFromClientX(e.clientX)}
      onMouseLeave={() => setActiveIndex(null)}
    >
      {apps.map((app, i) => {
        const distance = activeIndex === null ? Infinity : Math.abs(activeIndex - i);
        const scale = distance === 0 ? 1.4 : distance === 1 ? 1.15 : 1;
        return (
          <div
            key={app}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-[10px] font-semibold text-muted-foreground transition-transform duration-150"
            style={{ transform: `scale(${scale})` }}
          >
            {app[0]}
          </div>
        );
      })}
    </div>
  );
}
