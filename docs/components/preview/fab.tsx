"use client";

import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const fabVariants = cva(
  "inline-flex items-center justify-center shadow-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        sm: "h-12 w-12 rounded-full",
        md: "h-14 w-14 rounded-full",
        lg: "h-16 w-16 rounded-full",
        extended: "h-14 rounded-full px-6 gap-2",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

function PlusIcon() {
  return <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>;
}

export interface PreviewFABProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof fabVariants> {
  className?: string;
  icon?: React.ReactNode;
  label?: string;
}

export function PreviewFAB({ variant, size, className, icon, label, onClick, ...props }: PreviewFABProps) {
  const [toast, setToast] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setToast(true);
    setTimeout(() => setToast(false), 1500);
    onClick?.(e);
  };

  return (
    <div className="relative inline-flex">
      <button className={cn(fabVariants({ variant, size: label ? "extended" : size }), className)} onClick={handleClick} {...props}>
        {icon ?? <PlusIcon />}
        {label && <span className="text-base font-semibold">{label}</span>}
      </button>
      {toast && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground text-background px-3 py-1.5 text-xs font-medium shadow-lg animate-in fade-in slide-in-from-bottom-2">
          Action triggered
        </div>
      )}
    </div>
  );
}
