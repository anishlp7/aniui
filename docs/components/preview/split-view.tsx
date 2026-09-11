"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const MIN = 60;
const MAX = 220;

const PLACES = ["Blue Bottle Coffee", "Golden Gate Park", "Ferry Building"];

export function PreviewSplitView({ className }: { className?: string }) {
  const [topHeight, setTopHeight] = useState(130);
  const dragging = useRef(false);

  const onMove = (clientY: number, containerTop: number) => {
    const next = Math.min(MAX, Math.max(MIN, clientY - containerTop));
    setTopHeight(next);
  };

  return (
    <div
      className={cn("flex h-64 w-full flex-col overflow-hidden rounded-xl border border-border bg-card select-none", className)}
      onMouseMove={(e) => {
        if (!dragging.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        onMove(e.clientY, rect.top);
      }}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
    >
      <div className="flex items-center justify-center rounded-b-2xl bg-primary/10 transition-[height] duration-150" style={{ height: topHeight }}>
        <p className="text-xs font-semibold text-muted-foreground">Map</p>
      </div>
      <div
        onMouseDown={() => (dragging.current = true)}
        className="flex h-6 w-full cursor-row-resize items-center justify-center bg-background"
      >
        <div className="h-1 w-10 rounded-full bg-foreground/25" />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden rounded-t-2xl bg-muted/40">
        <p className="px-4 pt-3 pb-1 text-xs font-semibold text-foreground">Nearby results</p>
        {PLACES.map((place) => (
          <div key={place} className="border-t border-border/60 px-4 py-2 text-xs text-muted-foreground">
            {place}
          </div>
        ))}
      </div>
    </div>
  );
}
