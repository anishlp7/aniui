"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ratingVariants = cva("flex items-center", {
  variants: {
    size: { sm: "gap-0.5", md: "gap-1", lg: "gap-1.5" },
  },
  defaultVariants: { size: "md" },
});

const starSizes = { sm: "text-base", md: "text-xl", lg: "text-2xl" } as const;

export interface PreviewRatingProps extends VariantProps<typeof ratingVariants> {
  className?: string;
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export function PreviewRating({ size, className, value, max = 5, onChange, readOnly }: PreviewRatingProps) {
  const s = size ?? "md";
  return (
    <div className={cn(ratingVariants({ size }), className)}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < value;
        return readOnly ? (
          <span key={i} className={cn(starSizes[s], filled ? "text-yellow-400" : "text-muted-foreground/30")}>★</span>
        ) : (
          <button key={i} onClick={() => onChange?.(i + 1)} className={cn(starSizes[s], filled ? "text-yellow-400" : "text-muted-foreground/30", "cursor-pointer hover:scale-110 transition-transform")}>★</button>
        );
      })}
    </div>
  );
}
