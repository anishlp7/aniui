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
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
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
  label?: string;
}

export function PreviewSelect({ className, placeholder = "Select...", options, value, onValueChange, label, ...props }: PreviewSelectProps) {
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
    <div className="relative w-full min-h-[340px]" {...props}>
      {/* Trigger */}
      <div className="flex items-center justify-center h-full min-h-[340px]">
        <button
          type="button"
          className={cn(
            "flex w-full max-w-[260px] items-center justify-between rounded-lg border border-input bg-background px-4 h-12 cursor-pointer transition-colors hover:bg-accent/30",
            className
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={cn("text-sm", selected ? "text-foreground" : "text-muted-foreground")}>
            {selectedLabel}
          </span>
          <ChevronDown className={cn("text-muted-foreground transition-transform", isOpen && "rotate-180")} />
        </button>
      </div>

      {/* Sheet overlay */}
      {isOpen && (
        <div className="absolute inset-0 z-10 flex flex-col justify-end rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => setIsOpen(false)} />
          <div className="relative z-20 rounded-t-2xl bg-background shadow-2xl">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
            </div>
            {/* Title + Done */}
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-sm font-semibold text-foreground">{label ?? placeholder}</span>
              <button type="button" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-blue-500 cursor-pointer">
                Done
              </button>
            </div>
            <div className="h-px bg-border" />
            {/* Options */}
            <div className="max-h-[220px] overflow-y-auto">
              {options.map((option) => {
                const isSelected = option.value === selected;
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={cn(
                      "flex w-full items-center px-5 py-3.5 cursor-pointer transition-colors",
                      isSelected ? "bg-accent" : "hover:bg-accent/50"
                    )}
                    onClick={() => handleSelect(option.value)}
                  >
                    <span className={cn("text-sm flex-1 text-left", isSelected ? "text-foreground font-semibold" : "text-foreground")}>
                      {option.label}
                    </span>
                    {isSelected && <CheckIcon className="text-blue-500" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
