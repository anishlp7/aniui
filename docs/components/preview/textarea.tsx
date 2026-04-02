"use client";

import React, { useState } from "react";
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
  maxLength?: number;
  showCount?: boolean;
}

export function PreviewTextarea({ variant, className, value, onChange, maxLength = 200, showCount = false, ...props }: PreviewTextareaProps) {
  const [internal, setInternal] = useState((value as string) ?? "");
  const controlled = value !== undefined;
  const text = controlled ? (value as string) : internal;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!controlled) setInternal(e.target.value);
    onChange?.(e);
  };

  return (
    <div className="w-full">
      <textarea
        className={cn(textareaVariants({ variant }), "min-h-24 px-4 py-3 text-base w-full", className)}
        value={text}
        onChange={handleChange}
        maxLength={maxLength}
        {...props}
      />
      {showCount && (
        <p className="text-xs text-muted-foreground mt-1 text-right">{text.length}/{maxLength}</p>
      )}
    </div>
  );
}
