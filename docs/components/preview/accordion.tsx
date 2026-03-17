"use client";

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

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
        <ChevronDown className={cn("text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
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
