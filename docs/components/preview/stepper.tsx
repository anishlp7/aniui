"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const stepperVariants = cva("flex items-center rounded-lg border border-input", {
  variants: {
    size: { sm: "h-9", md: "h-11", lg: "h-13" },
  },
  defaultVariants: { size: "md" },
});

const btnSizes = { sm: "w-9", md: "w-11", lg: "w-13" } as const;

export interface PreviewStepperProps extends VariantProps<typeof stepperVariants> {
  className?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function PreviewStepper({ size, className, value, onChange, min = 0, max = 99, step = 1 }: PreviewStepperProps) {
  const s = size ?? "md";
  const canDec = value - step >= min;
  const canInc = value + step <= max;
  return (
    <div className={cn(stepperVariants({ size }), className)}>
      <button className={cn("flex items-center justify-center border-r border-input text-lg text-foreground cursor-pointer hover:bg-accent transition-colors", btnSizes[s], !canDec && "opacity-30 pointer-events-none")} onClick={() => canDec && onChange(value - step)}>−</button>
      <div className="flex-1 flex items-center justify-center px-3"><span className="text-base font-medium text-foreground">{value}</span></div>
      <button className={cn("flex items-center justify-center border-l border-input text-lg text-foreground cursor-pointer hover:bg-accent transition-colors", btnSizes[s], !canInc && "opacity-30 pointer-events-none")} onClick={() => canInc && onChange(value + step)}>+</button>
    </div>
  );
}
