"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-accent/50",
        outline: "border border-input bg-transparent hover:bg-accent/50",
      },
      size: {
        sm: "h-8 px-2 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-11 px-4 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface PreviewToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  className?: string;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

export function PreviewToggle({
  pressed: controlledPressed, onPressedChange, variant, size, className, ...props
}: PreviewToggleProps) {
  const [internalPressed, setInternalPressed] = useState(false);
  const isPressed = controlledPressed ?? internalPressed;

  const handleClick = () => {
    const next = !isPressed;
    setInternalPressed(next);
    onPressedChange?.(next);
  };

  return (
    <button
      type="button"
      aria-pressed={isPressed}
      className={cn(toggleVariants({ variant, size }), isPressed && "bg-accent text-accent-foreground", className)}
      onClick={handleClick}
      {...props}
    />
  );
}
