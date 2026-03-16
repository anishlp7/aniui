"use client";

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

const CollapsibleContext = createContext<{ isOpen: boolean; toggle: () => void }>({
  isOpen: false,
  toggle: () => {},
});

export interface PreviewCollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function PreviewCollapsible({ open: controlledOpen, onOpenChange, className, children, ...props }: PreviewCollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const toggle = () => {
    const next = !isOpen;
    setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  return (
    <CollapsibleContext.Provider value={{ isOpen, toggle }}>
      <div className={cn("", className)} {...props}>{children}</div>
    </CollapsibleContext.Provider>
  );
}

export interface PreviewCollapsibleTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function PreviewCollapsibleTrigger({ className, children, ...props }: PreviewCollapsibleTriggerProps) {
  const { isOpen, toggle } = useContext(CollapsibleContext);
  return (
    <button
      type="button"
      className={cn("cursor-pointer", className)}
      onClick={toggle}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
    </button>
  );
}

export interface PreviewCollapsibleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function PreviewCollapsibleContent({ className, children, ...props }: PreviewCollapsibleContentProps) {
  const { isOpen } = useContext(CollapsibleContext);

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-250",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
