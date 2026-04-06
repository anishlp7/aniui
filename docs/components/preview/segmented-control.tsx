"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const segmentVariants = cva("flex rounded-lg bg-muted p-1", {
  variants: { size: { sm: "h-9", md: "h-11", lg: "h-14" } },
  defaultVariants: { size: "md" },
});

export interface PreviewSegmentedControlProps extends VariantProps<typeof segmentVariants> {
  className?: string;
  options: string[];
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}

export function PreviewSegmentedControl({ size, className, options, value, onValueChange, defaultValue }: PreviewSegmentedControlProps) {
  const [internal, setInternal] = useState(defaultValue ?? options[0] ?? "");
  const controlled = value !== undefined;
  const selected = controlled ? value : internal;

  const handleChange = (v: string) => { if (!controlled) setInternal(v); onValueChange?.(v); };

  return (
    <div className={cn(segmentVariants({ size }), className)}>
      {options.map((option) => {
        const active = option === selected;
        return (
          <button key={option} className={cn("flex-1 flex items-center justify-center rounded-md text-sm font-medium transition-all cursor-pointer", active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")} onClick={() => handleChange(option)}>
            {option}
          </button>
        );
      })}
    </div>
  );
}
