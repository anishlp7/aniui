"use client";
import { PreviewDatePickerDemo, PreviewDateRangeDemo } from "@/components/preview/date-picker";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

import { AddComponentTabs } from "@/components/package-manager-tabs";
const installCode = `npx @aniui/cli add date-picker`;
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
function PickerShell({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 items-center justify-center bg-black/50" onPress={onClose}>
        <Pressable onPress={() => {}} className="mx-6 rounded-xl bg-card p-2 shadow-xl">
          {children}
          <Pressable onPress={onClose} className="mt-1 mb-2 items-center py-2" accessibilityRole="button">
            <Text className="text-sm font-medium text-muted-foreground">Cancel</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
function TriggerButton({ label, hasValue, className, onPress }: { label: string; hasValue: boolean; className?: string; onPress: () => void }) {
  return (
    <Pressable className={cn("flex-row items-center rounded-md border border-input bg-background px-4 min-h-12", className)} onPress={onPress} accessible={true} accessibilityRole="button">
      <Text className={cn("flex-1 text-base", hasValue ? "text-foreground" : "text-muted-foreground")}>{label}</Text>
      <Text className="text-muted-foreground text-xs">{"▾"}</Text>
    </Pressable>
  );
}
export function DatePicker({ className, value, onChange, placeholder = "Select date...", min, max, formatDate }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const display = value ? (formatDate ?? ((d: Date) => d.toLocaleDateString()))(value) : placeholder;
  return (
    <>
      <TriggerButton label={display} hasValue={!!value} className={className} onPress={() => setOpen(true)} />
      <PickerShell open={open} onClose={() => setOpen(false)}>
        <Calendar selected={value} onSelect={(d) => { onChange?.(d); setOpen(false); }} min={min} max={max} />
      </PickerShell>
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
  const display = startDate ? \`\${startDate.toLocaleDateString()}\${endDate ? \` - \${endDate.toLocaleDateString()}\` : ""}\` : placeholder;
  return (
    <>
      <TriggerButton label={display} hasValue={!!startDate} className={className} onPress={() => setOpen(true)} />
      <PickerShell open={open} onClose={() => setOpen(false)}>
        <Calendar rangeStart={startDate} rangeEnd={endDate} onRangeChange={onRangeChange} min={min} max={max} />
      </PickerShell>
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
        <AddComponentTabs names="date-picker" />
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
        <PropsTable props={[
          { name: "value", type: "Date" },
          { name: "onChange", type: "(date: Date) => void" },
          { name: "placeholder", type: "string", default: "\"Select date...\"" },
          { name: "min", type: "Date" },
          { name: "max", type: "Date" },
          { name: "formatDate", type: "(date: Date) => string", default: "toLocaleDateString" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Props — DateRangePicker */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">DateRangePicker Props</h2>
        <PropsTable props={[
          { name: "startDate", type: "Date" },
          { name: "endDate", type: "Date" },
          { name: "onRangeChange", type: "(start: Date, end: Date | undefined) => void" },
          { name: "placeholder", type: "string", default: "\"Select range...\"" },
          { name: "min", type: "Date" },
          { name: "max", type: "Date" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Powered by <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@react-native-community/datetimepicker</code> native picker.</li>
          <li>Uses the platform's native date picker which has built-in accessibility support.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/date-picker.tsx" />
      </div>
    </div>
  );
}
