"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface PreviewInputOTPProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  className?: string;
  length?: number;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function PreviewInputOTP({ length = 6, value: controlledValue, onValueChange, className, ...props }: PreviewInputOTPProps) {
  const [internalValue, setInternalValue] = useState("");
  const val = controlledValue ?? internalValue;
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length }, (_, i) => val[i] ?? "");

  const handleChange = (text: string, index: number) => {
    const char = text.slice(-1);
    const next = [...digits];
    next[index] = char;
    const joined = next.join("");
    setInternalValue(joined);
    onValueChange?.(joined);
    if (char && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <div className={cn("flex gap-2", className)} {...props}>
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          aria-label={`Digit ${i + 1} of ${length}`}
          className={cn(
            "h-12 w-10 rounded-md border text-center text-lg font-semibold bg-background text-foreground outline-none transition-colors",
            "border-input focus:border-ring focus:ring-1 focus:ring-ring"
          )}
        />
      ))}
    </div>
  );
}
