"use client";

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

const AccordionContext = createContext<{
  expanded: string | null;
  toggle: (value: string) => void;
}>({ expanded: null, toggle: () => {} });

export interface PreviewAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  defaultValue?: string;
}

export function PreviewAccordion({ className, defaultValue, children, ...props }: PreviewAccordionProps) {
  const [expanded, setExpanded] = useState<string | null>(defaultValue ?? null);
  const toggle = (value: string) => setExpanded((prev) => (prev === value ? null : value));

  return (
    <AccordionContext.Provider value={{ expanded, toggle }}>
      <div className={cn("", className)} {...props}>{children}</div>
    </AccordionContext.Provider>
  );
}

export interface PreviewAccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  value: string;
  trigger: string;
}

export function PreviewAccordionItem({ value, trigger, className, children, ...props }: PreviewAccordionItemProps) {
  const { expanded, toggle } = useContext(AccordionContext);
  const isOpen = expanded === value;

  return (
    <div className={cn("border-b border-border", className)} {...props}>
      <button
        type="button"
        className="flex w-full flex-row items-center justify-between py-4 cursor-pointer"
        onClick={() => toggle(value)}
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-foreground">{trigger}</span>
        <span className={cn("text-muted-foreground text-lg transition-transform", isOpen && "rotate-45")}>+</span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-250",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="pb-4">{children}</div>
      </div>
    </div>
  );
}
