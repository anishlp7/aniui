"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ratingVariants = cva("flex items-center", {
  variants: { size: { sm: "gap-0.5", md: "gap-1", lg: "gap-1.5" } },
  defaultVariants: { size: "md" },
});

const starSizes = { sm: "text-base", md: "text-xl", lg: "text-2xl" } as const;

export interface PreviewRatingProps extends VariantProps<typeof ratingVariants> {
  className?: string;
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  defaultValue?: number;
}

export function PreviewRating({ size, className, value, max = 5, onChange, readOnly, defaultValue = 0 }: PreviewRatingProps) {
  const [internal, setInternal] = useState(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : internal;
  const s = size ?? "md";

  const handleClick = (i: number) => {
    if (!controlled) setInternal(i);
    onChange?.(i);
  };

  return (
    <div className={cn(ratingVariants({ size }), className)}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < current;
        return readOnly ? (
          <span key={i} className={cn(starSizes[s], filled ? "text-yellow-400" : "text-muted-foreground/30")}>&#9733;</span>
        ) : (
          <button key={i} onClick={() => handleClick(i + 1)} className={cn(starSizes[s], filled ? "text-yellow-400" : "text-muted-foreground/30", "cursor-pointer hover:scale-110 transition-transform")}>&#9733;</button>
        );
      })}
    </div>
  );
}
