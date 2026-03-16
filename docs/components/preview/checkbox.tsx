"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface PreviewCheckboxProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function PreviewCheckbox({ checked: controlledChecked, onCheckedChange, className, disabled, ...props }: PreviewCheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = controlledChecked ?? internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const next = !isChecked;
    setInternalChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      aria-disabled={disabled}
      className={cn(
        "inline-flex h-5 w-5 items-center justify-center rounded border cursor-pointer transition-colors",
        isChecked ? "border-primary bg-primary" : "border-input bg-background",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleToggle}
      disabled={disabled}
      {...props}
    >
      {isChecked && (
        <svg className="h-3 w-3 text-primary-foreground" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 6l3 3 5-5" />
        </svg>
      )}
    </button>
  );
}
