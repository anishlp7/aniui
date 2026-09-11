"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function PreviewAnimatedHeaderScrollView({ className }: { className?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const y = ref.current?.scrollTop ?? 0;
    setScrolled(y > 30);
  };

  return (
    <div className={cn("relative h-48 w-full max-w-[260px] overflow-hidden rounded-xl border border-border bg-card", className)}>
      <div
        className={cn(
          "absolute inset-x-0 top-0 z-10 flex h-10 items-center justify-center border-b transition-all duration-200",
          scrolled ? "border-border bg-card/90 backdrop-blur opacity-100" : "border-transparent opacity-0"
        )}
      >
        <span className="text-sm font-semibold text-foreground">Settings</span>
      </div>
      <div ref={ref} onScroll={onScroll} className="h-full overflow-y-auto px-4 pb-4 pt-3">
        <h2
          className={cn("font-extrabold text-foreground transition-all duration-200", scrolled ? "text-lg opacity-0" : "text-2xl opacity-100")}
        >
          Settings
        </h2>
        <p className={cn("mb-3 text-sm text-muted-foreground transition-all duration-200", scrolled ? "opacity-0" : "opacity-100")}>
          Manage your account
        </p>
        {["Profile", "Notifications", "Privacy", "Appearance", "About"].map((row) => (
          <div key={row} className="mb-2 rounded-lg bg-secondary/60 px-3 py-2 text-xs text-secondary-foreground">
            {row}
          </div>
        ))}
      </div>
    </div>
  );
}
