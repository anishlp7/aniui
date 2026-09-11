"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface PreviewAutoCompleteOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface PreviewAutoCompleteProps {
  className?: string;
  placeholder?: string;
  options: PreviewAutoCompleteOption[];
  minCharsToTrigger?: number;
  loading?: boolean;
  emptyText?: string;
  maxVisibleOptions?: number;
}

// Web mimic of AutoComplete: an inline (not position: absolute) dropdown that
// renders below the input as a normal sibling — same layout approach as the
// real RN component, which has no viewport-relative overlay without a portal.
export function PreviewAutoComplete({
  className, placeholder = "Start typing a city...", options, minCharsToTrigger = 1,
  loading, emptyText = "No results", maxVisibleOptions = 5,
}: PreviewAutoCompleteProps) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const showDropdown = open && text.length >= minCharsToTrigger;
  const filtered = showDropdown
    ? options.filter((o) => o.label.toLowerCase().includes(text.toLowerCase()))
    : [];

  const handleSelect = (option: PreviewAutoCompleteOption) => {
    if (option.disabled) return;
    setText(option.label);
    setOpen(false);
  };

  return (
    <div className={cn("w-full max-w-xs", className)}>
      <div className="flex h-12 items-center gap-2 rounded-md border border-input bg-background px-4">
        <input
          value={text}
          placeholder={placeholder}
          onChange={(e) => { setText(e.target.value); setOpen(e.target.value.length >= minCharsToTrigger); }}
          onFocus={() => setOpen(text.length >= minCharsToTrigger)}
          className="flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
        {!!text && (
          <button
            onClick={() => { setText(""); setOpen(false); }}
            aria-label="Clear"
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center text-muted-foreground"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        )}
      </div>
      {showDropdown && (
        <div className="mt-1 overflow-hidden rounded-md border border-border bg-card shadow-lg">
          <div style={{ maxHeight: maxVisibleOptions * 48 }} className="overflow-y-auto">
            {loading ? (
              <div className="flex h-12 items-center justify-center text-sm text-muted-foreground">Loading…</div>
            ) : filtered.length === 0 ? (
              <div className="flex h-12 items-center justify-center text-sm text-muted-foreground">{emptyText}</div>
            ) : (
              filtered.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  disabled={option.disabled}
                  className={cn(
                    "flex h-12 w-full items-center px-4 text-left text-base text-foreground transition-colors hover:bg-accent",
                    option.disabled && "cursor-default opacity-40 hover:bg-transparent"
                  )}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
