"use client";
import { useState } from "react";
import { PreviewCalendar } from "@/components/preview/calendar";

export function RangeDemo() {
  const [start, setStart] = useState<Date | undefined>();
  const [end, setEnd] = useState<Date | undefined>();
  return (
    <div className="w-full">
      <PreviewCalendar
        rangeStart={start}
        rangeEnd={end}
        onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
      />
      <p className="text-xs text-muted-foreground text-center mt-2">
        {start ? `${start.toLocaleDateString()}${end ? ` - ${end.toLocaleDateString()}` : " — select end date"}` : "Click to select start date"}
      </p>
    </div>
  );
}
