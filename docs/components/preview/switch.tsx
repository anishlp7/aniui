"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface PreviewSwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function PreviewSwitch({ checked: controlledChecked, onCheckedChange, className, ...props }: PreviewSwitchProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = controlledChecked ?? internalChecked;

  const handleToggle = () => {
    const next = !isChecked;
    setInternalChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
        isChecked ? "bg-primary" : "bg-secondary",
        className
      )}
      onClick={handleToggle}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 rounded-full bg-primary-foreground shadow-sm transition-transform",
          isChecked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}
