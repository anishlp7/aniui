import { Heading } from "@/components/heading";
import { PreviewCalendar } from "@/components/preview/calendar";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { RangeDemo } from "./_demos";

const installCode = `npx @aniui/cli add calendar`;
const usageCode = `import { Calendar } from "@/components/ui/calendar";

export function MyScreen() {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <Calendar
      selected={date}
      onSelect={setDate}
    />
  );
}`;
const rangeCode = `<Calendar
  rangeStart={start}
  rangeEnd={end}
  onRangeChange={(s, e) => {
    setStart(s);
    setEnd(e);
  }}
/>`;
const constrainedCode = `<Calendar
  selected={date}
  onSelect={setDate}
  min={new Date(2024, 0, 1)}
  max={new Date(2024, 11, 31)}
/>`;
const sourceCode = `import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { cn } from "@/lib/utils";

export interface CalendarProps {
  className?: string;
  selected?: Date;
  onSelect?: (date: Date) => void;
  rangeStart?: Date;
  rangeEnd?: Date;
  onRangeChange?: (start: Date, end: Date | undefined) => void;
  min?: Date;
  max?: Date;
}
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const same = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
type Mode = "days" | "months" | "years";
export function Calendar({ className, selected, onSelect, rangeStart, rangeEnd, onRangeChange, min, max }: CalendarProps) {
  const [viewing, setViewing] = useState(() => selected ?? rangeStart ?? new Date());
  const [mode, setMode] = useState<Mode>("days");
  const year = viewing.getFullYear(), month = viewing.getMonth();
  const handlePress = (day: number) => {
    const date = new Date(year, month, day);
    if ((min && date < min) || (max && date > max)) return;
    if (onRangeChange) {
      if (!rangeStart || rangeEnd || date < rangeStart) onRangeChange(date, undefined);
      else onRangeChange(rangeStart, date);
    }
    onSelect?.(date);
  };
  const handleHeaderPress = () => setMode(mode === "days" ? "years" : "days");
  const pickYear = (y: number) => { setViewing(new Date(y, month, 1)); setMode("months"); };
  const pickMonth = (m: number) => { setViewing(new Date(year, m, 1)); setMode("days"); };
  const decadeStart = Math.floor(year / 12) * 12;
  const label = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });
  // ... renders year grid, month grid, and day grid based on mode
}`;
export default function CalendarPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Calendar</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A month grid calendar with single date and range selection. Tap the header to quickly jump to any year and month.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewCalendar />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="calendar" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Year / Month Picker */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Year &amp; Month Picker</Heading>
        <p className="text-sm text-muted-foreground">Tap the month/year header to open the year grid. Select a year, then a month to quickly navigate to any date.</p>
      </div>
      {/* Range Selection */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Range Selection</Heading>
        <ComponentPlayground code={rangeCode}>
          <RangeDemo />
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "selected", type: "Date" },
          { name: "onSelect", type: "(date: Date) => void" },
          { name: "rangeStart", type: "Date" },
          { name: "rangeEnd", type: "Date" },
          { name: "onRangeChange", type: "(start: Date, end: Date | undefined) => void" },
          { name: "min", type: "Date" },
          { name: "max", type: "Date" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Date selection with day/month/year navigation.</li>
          <li>Each day cell is focusable with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code> for the full date.</li>
          <li>Navigation buttons for previous/next month are labeled for screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/calendar.tsx" />
      </div>
    </div>
  );
}
