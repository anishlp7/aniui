"use client";

import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

const RadioGroupContext = createContext<{ value: string; onValueChange: (value: string) => void }>({ value: "", onValueChange: () => {} });

export interface PreviewRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}

export function PreviewRadioGroup({ value, onValueChange, defaultValue = "", className, children, ...props }: PreviewRadioGroupProps) {
  const [internal, setInternal] = useState(defaultValue);
  const controlled = value !== undefined;
  const selected = controlled ? value : internal;
  const handleChange = (v: string) => { if (!controlled) setInternal(v); onValueChange?.(v); };

  return (
    <RadioGroupContext.Provider value={{ value: selected, onValueChange: handleChange }}>
      <div className={cn("flex flex-col gap-3", className)} role="radiogroup" {...props}>{children}</div>
    </RadioGroupContext.Provider>
  );
}

export interface PreviewRadioGroupItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  className?: string;
  value: string;
  label?: string;
}

export function PreviewRadioGroupItem({ value, label, className, ...props }: PreviewRadioGroupItemProps) {
  const { value: selected, onValueChange } = useContext(RadioGroupContext);
  const isSelected = value === selected;

  return (
    <button type="button" role="radio" aria-checked={isSelected} className={cn("flex flex-row items-center gap-3 cursor-pointer", className)} onClick={() => onValueChange(value)} {...props}>
      <span className={cn("inline-flex h-5 w-5 items-center justify-center rounded-full border-2", isSelected ? "border-primary" : "border-input")}>
        {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
      </span>
      {label && <span className="text-base text-foreground">{label}</span>}
    </button>
  );
}
