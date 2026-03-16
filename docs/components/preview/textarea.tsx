"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "rounded-md border text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none",
  {
    variants: {
      variant: {
        default: "border-input bg-background",
        ghost: "border-transparent bg-transparent",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface PreviewTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "children">,
    VariantProps<typeof textareaVariants> {
  className?: string;
}

export function PreviewTextarea({ variant, className, ...props }: PreviewTextareaProps) {
  return (
    <textarea
      className={cn(textareaVariants({ variant }), "min-h-24 px-4 py-3 text-base", className)}
      {...props}
    />
  );
}
