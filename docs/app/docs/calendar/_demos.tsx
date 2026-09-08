"use client";
import { useState } from "react";
import { PreviewCalendar } from "@/components/preview/calendar";

export function RangeDemo() {
  const [start, setStart] = useState<Date | undefined>();
  const [end, setEnd] = useState<Date | undefined>();
  const nights = start && end ? Math.round((end.getTime() - start.getTime()) / 86400000) : 0;
  return (
    <div className="w-full">
      <PreviewCalendar
        rangeStart={start}
        rangeEnd={end}
        onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
      />
      <p className="text-xs text-muted-foreground text-center mt-2">
        {start
          ? `${start.toLocaleDateString()}${end ? ` – ${end.toLocaleDateString()} · ${nights} night${nights === 1 ? "" : "s"}` : " — select checkout date"}`
          : "Select a check-in date for your hotel stay"}
      </p>
    </div>
  );
}
