"use client";

import { PreviewCalendar } from "@/components/preview/calendar";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import React, { useState } from "react";

const installCode = `npx aniui add calendar`;

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
const same = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export function Calendar({ className, selected, onSelect, rangeStart, rangeEnd, onRangeChange, min, max }: CalendarProps) {
  const [viewing, setViewing] = useState(() => selected ?? rangeStart ?? new Date());
  const year = viewing.getFullYear(), month = viewing.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const label = new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" });

  const handlePress = (day: number) => {
    const date = new Date(year, month, day);
    if ((min && date < min) || (max && date > max)) return;
    if (onRangeChange) {
      if (!rangeStart || rangeEnd || date < rangeStart) onRangeChange(date, undefined);
      else onRangeChange(rangeStart, date);
    }
    onSelect?.(date);
  };

  return (
    <View className={cn("rounded-lg bg-background p-3", className)}>
      <View className="flex-row items-center justify-between mb-3">
        <Pressable onPress={() => setViewing(new Date(year, month - 1, 1))} className="h-9 w-9 items-center justify-center rounded-md" accessibilityRole="button" accessibilityLabel="Previous month">
          <Text className="text-base text-muted-foreground">{"\u2039"}</Text>
        </Pressable>
        <Text className="text-sm font-semibold text-foreground">{label}</Text>
        <Pressable onPress={() => setViewing(new Date(year, month + 1, 1))} className="h-9 w-9 items-center justify-center rounded-md" accessibilityRole="button" accessibilityLabel="Next month">
          <Text className="text-base text-muted-foreground">{"\u203A"}</Text>
        </Pressable>
      </View>
      <View className="flex-row mb-1">
        {DAYS.map((d) => <View key={d} className="flex-1 items-center py-1"><Text className="text-xs font-medium text-muted-foreground">{d}</Text></View>)}
      </View>
      <View className="flex-row flex-wrap">
        {cells.map((day, i) => {
          if (day === null) return <View key={\`e-\${i}\`} className="w-[14.28%] h-9" />;
          const date = new Date(year, month, day);
          const sel = selected && same(date, selected);
          const rs = rangeStart && same(date, rangeStart);
          const re = rangeEnd && same(date, rangeEnd);
          const inR = rangeStart && rangeEnd && date.getTime() >= rangeStart.getTime() && date.getTime() <= rangeEnd.getTime();
          const today = same(date, new Date());
          const off = (min && date < min) || (max && date > max);
          return (
            <View key={day} className="w-[14.28%] items-center">
              <Pressable onPress={() => handlePress(day)} disabled={!!off} className={cn("h-9 w-9 items-center justify-center rounded-full", sel || rs || re ? "bg-primary" : inR ? "bg-accent" : "", today && !sel && "border border-primary", off && "opacity-30")} accessibilityRole="button" accessibilityLabel={\`\${label} \${day}\`}>
                <Text className={cn("text-sm", sel || rs || re ? "text-primary-foreground font-semibold" : "text-foreground")}>{day}</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}`;

function RangeDemo() {
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

export default function CalendarPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Calendar</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A month grid calendar with single date and range selection.
        </p>
      </div>

      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <PreviewCalendar />
      </ComponentPlayground>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>

      {/* Range Selection */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Range Selection</h2>
        <ComponentPlayground code={rangeCode}>
          <RangeDemo />
        </ComponentPlayground>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">selected</td>
                <td className="px-4 py-3 font-mono text-xs">Date</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onSelect</td>
                <td className="px-4 py-3 font-mono text-xs">{`(date: Date) => void`}</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">rangeStart</td>
                <td className="px-4 py-3 font-mono text-xs">Date</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">rangeEnd</td>
                <td className="px-4 py-3 font-mono text-xs">Date</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onRangeChange</td>
                <td className="px-4 py-3 font-mono text-xs">{`(start: Date, end: Date | undefined) => void`}</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">min</td>
                <td className="px-4 py-3 font-mono text-xs">Date</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">max</td>
                <td className="px-4 py-3 font-mono text-xs">Date</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/calendar.tsx" />
      </div>
    </div>
  );
}
