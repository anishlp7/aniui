"use client";

import { PreviewDatePickerDemo, PreviewDateRangeDemo } from "@/components/preview/date-picker";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add date-picker`;

const usageCode = `import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";

export function MyScreen() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      placeholder="Pick a date..."
    />
  );
}`;

const rangeCode = `import { DateRangePicker } from "@/components/ui/date-picker";
import { useState } from "react";

export function MyScreen() {
  const [start, setStart] = useState<Date | undefined>();
  const [end, setEnd] = useState<Date | undefined>();

  return (
    <DateRangePicker
      startDate={start}
      endDate={end}
      onRangeChange={(s, e) => {
        setStart(s);
        setEnd(e);
      }}
      placeholder="Select range..."
    />
  );
}`;

const constrainedCode = `<DatePicker
  value={date}
  onChange={setDate}
  min={new Date(2024, 0, 1)}
  max={new Date(2024, 11, 31)}
/>`;

const sourceCode = `import React, { useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

export interface DatePickerProps {
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  min?: Date;
  max?: Date;
  formatDate?: (date: Date) => string;
}

export function DatePicker({ className, value, onChange, placeholder = "Select date...", min, max, formatDate }: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const display = value
    ? (formatDate ?? ((d: Date) => d.toLocaleDateString()))(value)
    : placeholder;

  const handleSelect = (date: Date) => {
    onChange?.(date);
    setOpen(false);
  };

  return (
    <>
      <Pressable
        className={cn("flex-row items-center rounded-md border border-input bg-background px-4 min-h-12", className)}
        onPress={() => setOpen(true)}
        accessible={true}
        accessibilityRole="button"
      >
        <Text className={cn("flex-1 text-base", value ? "text-foreground" : "text-muted-foreground")}>
          {display}
        </Text>
        <Text className="text-muted-foreground text-xs">{"▾"}</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 items-center justify-center bg-black/50" onPress={() => setOpen(false)}>
          <Pressable onPress={() => {}} className="mx-6 rounded-xl bg-card p-2 shadow-xl">
            <Calendar selected={value} onSelect={handleSelect} min={min} max={max} />
            <Pressable onPress={() => setOpen(false)} className="mt-1 mb-2 items-center py-2" accessibilityRole="button">
              <Text className="text-sm font-medium text-muted-foreground">Cancel</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

export interface DateRangePickerProps {
  className?: string;
  startDate?: Date;
  endDate?: Date;
  onRangeChange?: (start: Date, end: Date | undefined) => void;
  placeholder?: string;
  min?: Date;
  max?: Date;
}

export function DateRangePicker({ className, startDate, endDate, onRangeChange, placeholder = "Select range...", min, max }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);

  const display = startDate
    ? \`\${startDate.toLocaleDateString()}\${endDate ? \` - \${endDate.toLocaleDateString()}\` : ""}\`
    : placeholder;

  return (
    <>
      <Pressable
        className={cn("flex-row items-center rounded-md border border-input bg-background px-4 min-h-12", className)}
        onPress={() => setOpen(true)}
        accessible={true}
        accessibilityRole="button"
      >
        <Text className={cn("flex-1 text-base", startDate ? "text-foreground" : "text-muted-foreground")}>
          {display}
        </Text>
        <Text className="text-muted-foreground text-xs">{"▾"}</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 items-center justify-center bg-black/50" onPress={() => setOpen(false)}>
          <Pressable onPress={() => {}} className="mx-6 rounded-xl bg-card p-2 shadow-xl">
            <Calendar rangeStart={startDate} rangeEnd={endDate} onRangeChange={onRangeChange} min={min} max={max} />
            <Pressable onPress={() => setOpen(false)} className="mt-1 mb-2 items-center py-2" accessibilityRole="button">
              <Text className="text-sm font-medium text-muted-foreground">Done</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}`;

export default function DatePickerPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">DatePicker</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Date picker with calendar popup. Supports single date and range selection.
        </p>
      </div>

      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <PreviewDatePickerDemo />
      </ComponentPlayground>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
        <p className="text-sm text-muted-foreground">
          The DatePicker depends on the Calendar component, which will be installed automatically.
        </p>
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>

      {/* Range Selection */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Range Selection</h2>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">DateRangePicker</code> to select a start and end date.
        </p>
        <ComponentPlayground code={rangeCode}>
          <PreviewDateRangeDemo />
        </ComponentPlayground>
      </div>

      {/* Date Constraints */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Date Constraints</h2>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">min</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">max</code> to restrict the selectable date range.
        </p>
        <CodeBlock code={constrainedCode} title="app/index.tsx" />
      </div>

      {/* Props — DatePicker */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">DatePicker Props</h2>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 font-mono text-xs">Date</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onChange</td>
                <td className="px-4 py-3 font-mono text-xs">{`(date: Date) => void`}</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">placeholder</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">{`"Select date..."`}</td>
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
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">formatDate</td>
                <td className="px-4 py-3 font-mono text-xs">{`(date: Date) => string`}</td>
                <td className="px-4 py-3 font-mono text-xs">toLocaleDateString</td>
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

      {/* Props — DateRangePicker */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">DateRangePicker Props</h2>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">startDate</td>
                <td className="px-4 py-3 font-mono text-xs">Date</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">endDate</td>
                <td className="px-4 py-3 font-mono text-xs">Date</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onRangeChange</td>
                <td className="px-4 py-3 font-mono text-xs">{`(start: Date, end: Date | undefined) => void`}</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">placeholder</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">{`"Select range..."`}</td>
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
        <CodeBlock code={sourceCode} title="components/ui/date-picker.tsx" />
      </div>
    </div>
  );
}
