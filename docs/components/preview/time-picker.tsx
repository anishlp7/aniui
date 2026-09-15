"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CalendarClockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 14v2.2l1.6 1" />
      <path d="M16 2v4" />
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
      <path d="M3 10h5" />
      <path d="M8 2v4" />
      <circle cx="16" cy="16" r="6" />
    </svg>
  );
}

function PreviewNativePicker({
  placeholder,
  format,
  icon: Icon,
}: {
  placeholder: string;
  format: (date: Date) => string;
  icon: typeof ClockIcon;
}) {
  const [value, setValue] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const [draftHour, setDraftHour] = useState("09");
  const [draftMinute, setDraftMinute] = useState("30");

  const confirm = () => {
    const next = new Date();
    next.setHours(Number(draftHour), Number(draftMinute), 0, 0);
    setValue(next);
    setOpen(false);
  };

  return (
    <div className="relative w-full min-h-[340px]">
      <div className="flex items-center justify-center min-h-[340px]">
        <button
          type="button"
          className="flex w-full max-w-[260px] items-center rounded-md border border-input bg-background px-4 h-11 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <span className={cn("flex-1 text-left text-sm", value ? "text-foreground" : "text-muted-foreground")}>
            {value ? format(value) : placeholder}
          </span>
          <Icon className="text-muted-foreground" />
        </button>
      </div>

      {open && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg">
          <div className="absolute inset-0 bg-black/50 rounded-lg" onClick={() => setOpen(false)} />
          <div className="relative z-20 w-[260px] rounded-xl bg-card p-4 shadow-xl">
            <p className="mb-3 text-center text-xs text-muted-foreground">Native picker preview (simulated on web)</p>
            <div className="flex items-center justify-center gap-2">
              <input
                type="number"
                min={0}
                max={23}
                value={draftHour}
                onChange={(e) => setDraftHour(e.target.value.padStart(2, "0"))}
                className="w-16 rounded-md border border-input bg-background px-2 py-2 text-center text-sm"
              />
              <span className="text-lg text-foreground">:</span>
              <input
                type="number"
                min={0}
                max={59}
                value={draftMinute}
                onChange={(e) => setDraftMinute(e.target.value.padStart(2, "0"))}
                className="w-16 rounded-md border border-input bg-background px-2 py-2 text-center text-sm"
              />
            </div>
            <button type="button" onClick={confirm} className="mt-4 w-full py-2 text-sm font-medium text-primary cursor-pointer">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function PreviewTimePickerDemo() {
  return (
    <PreviewNativePicker
      placeholder="Pick a time..."
      format={(d) => d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
      icon={ClockIcon}
    />
  );
}

export function PreviewDateTimePickerDemo() {
  return (
    <PreviewNativePicker
      placeholder="Pick date & time..."
      format={(d) => `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`}
      icon={CalendarClockIcon}
    />
  );
}
