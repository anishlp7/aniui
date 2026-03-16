"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "rounded-full border-2 border-muted border-t-primary animate-spin",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface PreviewSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  className?: string;
}

export function PreviewSpinner({ size, className, ...props }: PreviewSpinnerProps) {
  return (
    <div
      className={cn(spinnerVariants({ size }), className)}
      role="status"
      aria-label="Loading"
      {...props}
    />
  );
}
