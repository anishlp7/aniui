"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva("inline-flex items-center rounded-full cursor-pointer transition-colors", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-input bg-transparent text-foreground hover:bg-accent",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    },
    size: {
      sm: "px-2.5 py-1 gap-1 text-xs",
      md: "px-3 py-1.5 gap-1.5 text-sm",
      lg: "px-4 py-2 gap-2 text-base",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export interface PreviewChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  className?: string;
  selected?: boolean;
  onClose?: () => void;
}

export function PreviewChip({ variant, size, className, selected: controlledSelected, onClose, children, onClick, ...props }: PreviewChipProps) {
  const [internalSelected, setInternalSelected] = useState(false);
  const isSelected = controlledSelected !== undefined ? controlledSelected : internalSelected;
  const v = isSelected ? "default" : (variant ?? "outline");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (controlledSelected === undefined) setInternalSelected(!internalSelected);
    onClick?.(e);
  };

  return (
    <button className={cn(chipVariants({ variant: v, size }), "font-medium", className)} onClick={handleClick} {...props}>
      {children}
      {onClose && (
        <span onClick={(e) => { e.stopPropagation(); onClose(); }} className="ml-0.5 hover:opacity-70">
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </span>
      )}
    </button>
  );
}
