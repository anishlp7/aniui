"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const segmentVariants = cva("flex rounded-lg bg-muted p-1", {
  variants: {
    size: { sm: "h-9", md: "h-11", lg: "h-13" },
  },
  defaultVariants: { size: "md" },
});

export interface PreviewSegmentedControlProps extends VariantProps<typeof segmentVariants> {
  className?: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
}

export function PreviewSegmentedControl({ size, className, options, value, onValueChange }: PreviewSegmentedControlProps) {
  return (
    <div className={cn(segmentVariants({ size }), className)}>
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            className={cn("flex-1 flex items-center justify-center rounded-md text-sm font-medium transition-all cursor-pointer", active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
            onClick={() => onValueChange(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
