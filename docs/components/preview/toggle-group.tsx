"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface PreviewToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export function PreviewToggleGroup({
  value: controlledValue, onValueChange, className, children, ...props
}: PreviewToggleGroupProps) {
  const [internalValue, setInternalValue] = useState("");
  const val = controlledValue ?? internalValue;

  const handleChange = (v: string) => {
    setInternalValue(v);
    onValueChange?.(v);
  };

  return (
    <div role="radiogroup" className={cn("inline-flex gap-1", className)} {...props}>
      {React.Children.map(children, (child) =>
        React.isValidElement<PreviewToggleGroupItemProps>(child)
          ? React.cloneElement(child, { _selected: val, _onSelect: handleChange })
          : child
      )}
    </div>
  );
}

export interface PreviewToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  value: string;
  _selected?: string;
  _onSelect?: (v: string) => void;
}

export function PreviewToggleGroupItem({
  value, _selected, _onSelect, className, ...props
}: PreviewToggleGroupItemProps) {
  const active = _selected === value;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors cursor-pointer",
        active ? "bg-accent text-accent-foreground" : "bg-transparent text-muted-foreground hover:bg-accent/50"
      , className)}
      onClick={() => _onSelect?.(value)}
      {...props}
    />
  );
}
