"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { PreviewCalendar } from "@/components/preview/calendar";

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function PreviewDatePickerDemo() {
  const [selected, setSelected] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full min-h-[340px]">
      <div className="flex items-center justify-center min-h-[340px]">
        <button
          type="button"
          className="flex w-full max-w-[260px] items-center rounded-md border border-input bg-background px-4 h-11 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span className={cn("flex-1 text-left text-sm", selected ? "text-foreground" : "text-muted-foreground")}>
            {selected ? selected.toLocaleDateString() : "Pick a date..."}
          </span>
          <CalendarIcon className="text-muted-foreground" />
        </button>
      </div>

      {open && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg">
          <div className="absolute inset-0 bg-black/50 rounded-lg" onClick={() => setOpen(false)} />
          <div className="relative z-20 w-[260px] rounded-xl bg-card p-2 shadow-xl">
            <PreviewCalendar
              selected={selected}
              onSelect={(d) => { setSelected(d); setOpen(false); }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function PreviewDateRangeDemo() {
  const [start, setStart] = useState<Date | undefined>();
  const [end, setEnd] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);

  const display = start
    ? `${start.toLocaleDateString()}${end ? ` - ${end.toLocaleDateString()}` : ""}`
    : "Select range...";

  return (
    <div className="relative w-full min-h-[340px]">
      <div className="flex items-center justify-center min-h-[340px]">
        <button
          type="button"
          className="flex w-full max-w-[260px] items-center rounded-md border border-input bg-background px-4 h-11 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span className={cn("flex-1 text-left text-sm", start ? "text-foreground" : "text-muted-foreground")}>
            {display}
          </span>
          <CalendarIcon className="text-muted-foreground" />
        </button>
      </div>

      {open && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg">
          <div className="absolute inset-0 bg-black/50 rounded-lg" onClick={() => setOpen(false)} />
          <div className="relative z-20 w-[260px] rounded-xl bg-card p-2 shadow-xl">
            <PreviewCalendar
              rangeStart={start}
              rangeEnd={end}
              onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
            />
            <button type="button" onClick={() => setOpen(false)} className="w-full mt-1 mb-1 py-1.5 text-sm text-muted-foreground hover:text-foreground cursor-pointer text-center">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
