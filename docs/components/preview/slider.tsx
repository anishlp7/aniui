"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface PreviewSliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  className?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onValueChange?: (value: number) => void;
}

export function PreviewSlider({
  value: controlledValue, min = 0, max = 100, step = 1, disabled, onValueChange, className, ...props
}: PreviewSliderProps) {
  const [internalValue, setInternalValue] = useState(50);
  const val = controlledValue ?? internalValue;
  const pct = ((val - min) / (max - min)) * 100;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const raw = min + ((e.clientX - rect.left) / rect.width) * (max - min);
    const stepped = Math.round(raw / step) * step;
    const clamped = Math.max(min, Math.min(max, stepped));
    setInternalValue(clamped);
    onValueChange?.(clamped);
  };

  return (
    <div
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={val}
      aria-disabled={disabled}
      className={cn("relative flex w-full cursor-pointer items-center py-4", disabled && "opacity-50 cursor-not-allowed", className)}
      onClick={handleClick}
      {...props}
    >
      <div className="h-1.5 w-full rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div
        className="absolute h-5 w-5 rounded-full border-2 border-primary bg-background shadow transition-all"
        style={{ left: `${pct}%`, marginLeft: -10 }}
      />
    </div>
  );
}
