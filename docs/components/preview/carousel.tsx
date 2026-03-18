"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface PreviewCarouselProps {
  className?: string;
  items: React.ReactNode[];
  showDots?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

export function PreviewCarousel({ className, items, showDots = true, autoPlay, interval = 3000 }: PreviewCarouselProps) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const timer = setInterval(() => setActive((p) => (p + 1) % items.length), interval);
    return () => clearInterval(timer);
  }, [autoPlay, items.length, interval]);

  useEffect(() => {
    ref.current?.children[active]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [active]);

  return (
    <div className={cn("", className)}>
      <div ref={ref} className="flex overflow-hidden rounded-lg snap-x snap-mandatory" style={{ scrollSnapType: "x mandatory" }}>
        {items.map((item, i) => (
          <div key={i} className="w-full shrink-0 snap-center">{item}</div>
        ))}
      </div>
      {showDots && items.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {items.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={cn("h-2 rounded-full transition-all cursor-pointer", i === active ? "w-4 bg-primary" : "w-2 bg-muted-foreground/30")} />
          ))}
        </div>
      )}
    </div>
  );
}
