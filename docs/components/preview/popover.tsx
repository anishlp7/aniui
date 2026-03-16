"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface PreviewPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function PreviewPopover({ open, onOpenChange, children, className }: PreviewPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onOpenChange]);

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      {children}
    </div>
  );
}

export interface PreviewPopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function PreviewPopoverTrigger({ className, ...props }: PreviewPopoverTriggerProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
        className
      )}
      {...props}
    />
  );
}

export interface PreviewPopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  align?: "start" | "center" | "end";
}

export function PreviewPopoverContent({ className, align = "center", ...props }: PreviewPopoverContentProps) {
  return (
    <div
      className={cn(
        "absolute z-50 mt-2 w-72 rounded-lg border border-border bg-card p-4 shadow-lg animate-in fade-in-0 zoom-in-95",
        align === "start" && "left-0",
        align === "center" && "left-1/2 -translate-x-1/2",
        align === "end" && "right-0",
        className
      )}
      {...props}
    />
  );
}
