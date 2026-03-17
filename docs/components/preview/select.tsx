"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export interface PreviewSelectOption {
  label: string;
  value: string;
}

export interface PreviewSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  className?: string;
  placeholder?: string;
  options: PreviewSelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export function PreviewSelect({ className, placeholder = "Select...", options, value, onValueChange, ...props }: PreviewSelectProps) {
  const [internalValue, setInternalValue] = useState(value ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const selected = value ?? internalValue;
  const selectedLabel = options.find((o) => o.value === selected)?.label ?? placeholder;

  const handleSelect = (val: string) => {
    setInternalValue(val);
    onValueChange?.(val);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full min-h-[320px]" {...props}>
      {/* Trigger */}
      <div className="flex items-center justify-center h-full min-h-[320px]">
        <button
          type="button"
          className={cn(
            "flex w-full max-w-[260px] items-center justify-between rounded-md border border-input bg-background px-4 h-12 cursor-pointer",
            className
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={cn("text-sm", selected ? "text-foreground" : "text-muted-foreground")}>
            {selectedLabel}
          </span>
          <ChevronDown className="text-muted-foreground" />
        </button>
      </div>

      {/* Bottom sheet overlay — absolute, contained in phone frame */}
      {isOpen && (
        <div className="absolute inset-0 z-10 flex flex-col justify-end rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative z-20 rounded-t-2xl bg-card shadow-xl">
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
            </div>
            {/* Options */}
            <div className="px-2 pb-6">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={cn(
                    "flex w-full items-center rounded-lg px-4 py-3.5 cursor-pointer transition-colors",
                    option.value === selected ? "bg-accent" : "hover:bg-accent/50"
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  <span className={cn("text-sm flex-1 text-left", option.value === selected ? "text-accent-foreground font-medium" : "text-foreground")}>
                    {option.label}
                  </span>
                  {option.value === selected && <CheckIcon className="text-primary" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
