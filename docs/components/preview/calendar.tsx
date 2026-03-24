"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

type Mode = "days" | "months" | "years";

export function PreviewCalendar({ className, selected, onSelect, rangeStart, rangeEnd, onRangeChange }: PreviewCalendarProps) {
  const [viewing, setViewing] = useState(() => selected ?? rangeStart ?? new Date());
  const [internalSelected, setInternalSelected] = useState<Date | undefined>(selected);
  const [mode, setMode] = useState<Mode>("days");
  const sel = selected ?? internalSelected;

  const year = viewing.getFullYear();
  const month = viewing.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const monthLabel = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });
  const decadeStart = Math.floor(year / 12) * 12;

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

  const handleHeaderClick = () => setMode(mode === "days" ? "years" : "days");
  const pickYear = (y: number) => { setViewing(new Date(y, month, 1)); setMode("months"); };
  const pickMonth = (m: number) => { setViewing(new Date(year, m, 1)); setMode("days"); };

  const handlePrev = () => {
    if (mode === "days") setViewing(new Date(year, month - 1, 1));
    else if (mode === "months") setViewing(new Date(year - 1, month, 1));
    else setViewing(new Date(decadeStart - 12, month, 1));
  };
  const handleNext = () => {
    if (mode === "days") setViewing(new Date(year, month + 1, 1));
    else if (mode === "months") setViewing(new Date(year + 1, month, 1));
    else setViewing(new Date(decadeStart + 12, month, 1));
  };

  return (
    <div className={cn("rounded-lg bg-background p-3 w-full", className)}>
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={handlePrev} className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer transition-colors">
          <ChevronLeft />
        </button>
        <button type="button" onClick={handleHeaderClick} className="text-sm font-semibold text-foreground cursor-pointer hover:text-primary transition-colors">
          {mode === "days" ? monthLabel : mode === "months" ? `${year}` : `${decadeStart} – ${decadeStart + 11}`}
        </button>
        <button type="button" onClick={handleNext} className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer transition-colors">
          <ChevronRight />
        </button>
      </div>

      {/* Year grid */}
      {mode === "years" && (
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 12 }, (_, i) => decadeStart + i).map((y) => (
            <button key={y} type="button" onClick={() => pickYear(y)} className={cn("h-8 rounded-md text-sm flex items-center justify-center cursor-pointer transition-colors", y === year ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-accent")}>
              {y}
            </button>
          ))}
        </div>
      )}

      {/* Month grid */}
      {mode === "months" && (
        <div className="grid grid-cols-3 gap-1">
          {MONTHS.map((m, i) => (
            <button key={m} type="button" onClick={() => pickMonth(i)} className={cn("h-8 rounded-md text-sm flex items-center justify-center cursor-pointer transition-colors", i === month && year === viewing.getFullYear() ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-accent")}>
              {m}
            </button>
          ))}
        </div>
      )}

      {/* Days grid */}
      {mode === "days" && (
        <>
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
        </>
      )}
    </div>
  );
}
