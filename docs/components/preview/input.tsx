"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "rounded-md border text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default: "border-input bg-background",
        ghost: "border-transparent bg-transparent",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-12 px-4 text-base",
        lg: "h-14 px-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface PreviewInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  className?: string;
}

export function PreviewInput({ variant, size, className, ...props }: PreviewInputProps) {
  return (
    <input
      className={cn(inputVariants({ variant, size }), className)}
      {...props}
    />
  );
}
