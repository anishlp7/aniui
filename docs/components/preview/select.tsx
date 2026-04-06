"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface PreviewSelectOption { label: string; value: string }

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export interface PreviewSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  className?: string;
  placeholder?: string;
  options: PreviewSelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  searchable?: boolean;
}

export function PreviewSelect({
  className, placeholder = "Select...", options, value, onValueChange, label, searchable = true, ...props
}: PreviewSelectProps) {
  const [internalValue, setInternalValue] = useState(value ?? "");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selected = value ?? internalValue;
  const selectedLabel = options.find((o) => o.value === selected)?.label ?? placeholder;
  const filtered = search ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase())) : options;

  const pick = (val: string) => { setInternalValue(val); onValueChange?.(val); setOpen(false); setSearch(""); };

  return (
    <div className="relative w-full min-h-[340px]" {...props}>
      <div className="flex items-center justify-center h-full min-h-[340px]">
        <div className="relative w-full max-w-[260px]">
          <button
            type="button"
            className={cn("flex w-full items-center justify-between rounded-lg border border-input bg-background px-4 h-12 cursor-pointer transition-colors hover:bg-accent/30", className)}
            onClick={() => { setOpen(!open); setSearch(""); }}
          >
            <span className={cn("text-sm", selected ? "text-foreground" : "text-muted-foreground")}>{selectedLabel}</span>
            <ChevronDown className={cn("text-muted-foreground transition-transform", open && "rotate-180")} />
          </button>
          {open && (
            <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
              {searchable && (
                <div className="px-3 pt-3 pb-2">
                  <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring" autoFocus />
                </div>
              )}
              <div className="max-h-[200px] overflow-y-auto">
                {filtered.map((o) => {
                  const isSel = o.value === selected;
                  return (
                    <button key={o.value} type="button" className={cn("flex w-full items-center h-11 px-4 cursor-pointer transition-colors", isSel ? "bg-accent" : "hover:bg-accent/50")} onClick={() => pick(o.value)}>
                      <span className={cn("flex-1 text-left text-sm text-foreground", isSel && "font-semibold")}>{o.label}</span>
                      {isSel && <span className="text-sm text-primary font-bold">&#x2713;</span>}
                    </button>
                  );
                })}
                {filtered.length === 0 && <div className="h-11 flex items-center justify-center text-sm text-muted-foreground">No results</div>}
              </div>
            </div>
          )}
        </div>
      </div>
      {open && <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />}
    </div>
  );
}
