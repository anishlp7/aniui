"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PreviewProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  value?: number;
  indicatorClassName?: string;
}

export function PreviewProgress({ value = 0, className, indicatorClassName, ...props }: PreviewProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <div
        className={cn("h-full rounded-full bg-primary transition-all", indicatorClassName)}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}
