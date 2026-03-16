"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = value ?? internalValue;
  const selectedLabel = options.find((o) => o.value === selected)?.label ?? placeholder;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    setInternalValue(val);
    onValueChange?.(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative" {...props}>
      <button
        type="button"
        className={cn(
          "flex w-full flex-row items-center justify-between rounded-md border border-input bg-background px-4 h-12 cursor-pointer",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={cn("text-base", selected ? "text-foreground" : "text-muted-foreground")}>
          {selectedLabel}
        </span>
        <span className="text-muted-foreground">&#x25BE;</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border border-border bg-card shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn(
                "flex w-full flex-row items-center px-4 py-3 text-left cursor-pointer hover:bg-accent transition-colors",
                option.value === selected && "bg-accent"
              )}
              onClick={() => handleSelect(option.value)}
            >
              <span className={cn("text-base flex-1", option.value === selected ? "text-accent-foreground font-medium" : "text-foreground")}>
                {option.label}
              </span>
              {option.value === selected && <span className="text-primary">&#x2713;</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
