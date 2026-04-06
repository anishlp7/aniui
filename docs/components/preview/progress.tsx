"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface PreviewProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  value?: number;
  indicatorClassName?: string;
  animated?: boolean;
}

export function PreviewProgress({ value, className, indicatorClassName, animated = false, ...props }: PreviewProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const displayValue = animated ? animatedValue : Math.min(100, Math.max(0, value ?? 0));

  useEffect(() => {
    if (!animated) return;
    const target = value ?? 100;
    const start = performance.now();
    const duration = 3000;
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setAnimatedValue(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [animated, value]);

  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)} role="progressbar" aria-valuenow={displayValue} aria-valuemin={0} aria-valuemax={100} {...props}>
      <div className={cn("h-full rounded-full bg-primary transition-all", indicatorClassName)} style={{ width: `${displayValue}%` }} />
    </div>
  );
}
