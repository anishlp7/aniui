"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function inRange(d: Date, start?: Date, end?: Date) {
  if (!start || !end) return false;
  return d.getTime() >= start.getTime() && d.getTime() <= end.getTime();
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export interface PreviewCalendarProps {
  className?: string;
  selected?: Date;
  onSelect?: (date: Date) => void;
  rangeStart?: Date;
  rangeEnd?: Date;
  onRangeChange?: (start: Date, end: Date | undefined) => void;
}

export function PreviewCalendar({ className, selected, onSelect, rangeStart, rangeEnd, onRangeChange }: PreviewCalendarProps) {
  const [viewing, setViewing] = useState(() => selected ?? rangeStart ?? new Date());
  const [internalSelected, setInternalSelected] = useState<Date | undefined>(selected);
  const sel = selected ?? internalSelected;

  const year = viewing.getFullYear();
  const month = viewing.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const monthLabel = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });

  const handleClick = (day: number) => {
    const date = new Date(year, month, day);
    if (onRangeChange) {
      if (!rangeStart || rangeEnd || date < rangeStart) onRangeChange(date, undefined);
      else onRangeChange(rangeStart, date);
    } else {
      setInternalSelected(date);
      onSelect?.(date);
    }
  };

  return (
    <div className={cn("rounded-lg bg-background p-3 w-full", className)}>
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => setViewing(new Date(year, month - 1, 1))}
          className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer transition-colors"
        >
          <ChevronLeft />
        </button>
        <span className="text-sm font-semibold text-foreground">{monthLabel}</span>
        <button
          type="button"
          onClick={() => setViewing(new Date(year, month + 1, 1))}
          className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer transition-colors"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center py-1 text-xs font-medium text-muted-foreground">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} className="h-8" />;
          const date = new Date(year, month, day);
          const isSelected = sel && isSameDay(date, sel);
          const isRangeStart = rangeStart && isSameDay(date, rangeStart);
          const isRangeEnd = rangeEnd && isSameDay(date, rangeEnd);
          const isInRange = inRange(date, rangeStart, rangeEnd);
          const isToday = isSameDay(date, new Date());
          return (
            <div key={day} className="flex justify-center">
              <button
                type="button"
                onClick={() => handleClick(day)}
                className={cn(
                  "h-8 w-8 rounded-full text-sm flex items-center justify-center cursor-pointer transition-colors",
                  isSelected || isRangeStart || isRangeEnd ? "bg-primary text-primary-foreground font-semibold" : isInRange ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-accent",
                  isToday && !isSelected && !isRangeStart && !isRangeEnd && "ring-1 ring-primary"
                )}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
