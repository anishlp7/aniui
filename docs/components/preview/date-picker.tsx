"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface PreviewDatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  mode?: "date" | "time" | "datetime-local";
  placeholder?: string;
}

export function PreviewDatePicker({
  className,
  value,
  onChange,
  mode = "date",
  placeholder = "Select date...",
  ...props
}: PreviewDatePickerProps) {
  const [internalDate, setInternalDate] = useState<Date | undefined>(value);
  const currentDate = value ?? internalDate;

  const formatForInput = (date: Date | undefined): string => {
    if (!date) return "";
    if (mode === "time") {
      return date.toTimeString().slice(0, 5);
    }
    if (mode === "datetime-local") {
      return date.toISOString().slice(0, 16);
    }
    return date.toISOString().slice(0, 10);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) return;
    const date = new Date(val);
    if (!isNaN(date.getTime())) {
      setInternalDate(date);
      onChange?.(date);
    }
  };

  return (
    <input
      type={mode}
      className={cn(
        "flex h-12 w-full rounded-md border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      value={formatForInput(currentDate)}
      onChange={handleChange}
      placeholder={placeholder}
      {...props}
    />
  );
}
