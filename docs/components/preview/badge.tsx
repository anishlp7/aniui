"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const variants = ["default", "secondary", "outline", "destructive"] as const;

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold cursor-pointer transition-colors", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      outline: "border border-border bg-transparent text-foreground",
      destructive: "bg-destructive text-destructive-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface PreviewBadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  className?: string;
  clickToCycle?: boolean;
}

export function PreviewBadge({ variant, className, clickToCycle, onClick, ...props }: PreviewBadgeProps) {
  const [idx, setIdx] = useState(0);
  const activeVariant = clickToCycle ? variants[idx % variants.length] : variant;

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (clickToCycle) setIdx((i) => i + 1);
    onClick?.(e);
  };

  return (
    <span className={cn(badgeVariants({ variant: activeVariant }), className)} onClick={handleClick} {...props} />
  );
}
