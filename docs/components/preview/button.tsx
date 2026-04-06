"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        ghost: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "bg-transparent text-primary underline hover:text-primary/80",
      },
      size: {
        sm: "h-9 px-3 gap-1.5 text-sm",
        md: "h-11 px-4 gap-2 text-base",
        lg: "h-14 px-6 gap-2.5 text-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface PreviewButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  loading?: boolean;
}

function Spinner({ light }: { light?: boolean }) {
  return (
    <svg className={cn("h-4 w-4 animate-spin", light ? "text-primary-foreground" : "text-foreground")} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export function PreviewButton({ variant, size, className, loading, disabled, children, onClick, ...props }: PreviewButtonProps) {
  const [pressed, setPressed] = useState(false);
  const isDisabled = disabled || loading;
  const light = variant === "default" || variant === "destructive";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPressed(true);
    setTimeout(() => setPressed(false), 150);
    onClick?.(e);
  };

  return (
    <button
      className={cn(buttonVariants({ variant, size }), isDisabled && "opacity-50 pointer-events-none", pressed && "scale-95", "transition-transform duration-150", className)}
      disabled={isDisabled}
      onClick={handleClick}
      {...props}
    >
      {loading && <Spinner light={light} />}
      {children}
    </button>
  );
}
