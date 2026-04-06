"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stepperVariants = cva("flex items-center rounded-lg border border-input", {
  variants: { size: { sm: "h-9", md: "h-11", lg: "h-14" } },
  defaultVariants: { size: "md" },
});

const btnSizes = { sm: "w-9", md: "w-11", lg: "w-14" } as const;

export interface PreviewStepperProps extends VariantProps<typeof stepperVariants> {
  className?: string;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

export function PreviewStepper({ size, className, value, onChange, min = 0, max = 99, step = 1, defaultValue = 0 }: PreviewStepperProps) {
  const [internal, setInternal] = useState(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : internal;
  const s = size ?? "md";
  const canDec = current - step >= min;
  const canInc = current + step <= max;

  const update = (v: number) => { if (!controlled) setInternal(v); onChange?.(v); };

  return (
    <div className={cn(stepperVariants({ size }), className)}>
      <button className={cn("flex items-center justify-center border-r border-input text-lg text-foreground cursor-pointer hover:bg-accent transition-colors", btnSizes[s], !canDec && "opacity-30 pointer-events-none")} onClick={() => canDec && update(current - step)}>&#8722;</button>
      <div className="flex-1 flex items-center justify-center px-3"><span className="text-base font-medium text-foreground">{current}</span></div>
      <button className={cn("flex items-center justify-center border-l border-input text-lg text-foreground cursor-pointer hover:bg-accent transition-colors", btnSizes[s], !canInc && "opacity-30 pointer-events-none")} onClick={() => canInc && update(current + step)}>+</button>
    </div>
  );
}
