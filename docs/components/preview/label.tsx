"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

export interface PreviewLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

export function PreviewLabel({ className, htmlFor, onClick, ...props }: PreviewLabelProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (!htmlFor && inputRef.current) inputRef.current.focus();
    onClick?.(e);
  };

  return (
    <div className="space-y-1.5">
      <label className={cn("text-sm font-medium text-foreground leading-none cursor-pointer", className)} htmlFor={htmlFor} onClick={handleClick} {...props} />
      {!htmlFor && <input ref={inputRef} className="w-full min-h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm" placeholder="Click the label above..." />}
    </div>
  );
}
