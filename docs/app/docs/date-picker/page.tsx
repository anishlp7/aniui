"use client";

import { PreviewDatePicker } from "@/components/preview/date-picker";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add date-picker`;

const depInstallCode = `npx expo install @react-native-community/datetimepicker`;

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

const modesCode = `// Date mode (default)
<DatePicker mode="date" placeholder="Select date..." />

// Time mode
<DatePicker mode="time" placeholder="Select time..." />

// Datetime mode
<DatePicker mode="datetime" placeholder="Select date and time..." />`;

const sourceCode = `import React, { useState } from "react";
import { Pressable, Text, Platform } from "react-native";
import DateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  mode?: "date" | "time" | "datetime";
  placeholder?: string;
}

export function DatePicker({
  className,
  value,
  onChange,
  mode = "date",
  placeholder = "Select date...",
}: DatePickerProps) {
  const [show, setShow] = useState(false);
  const [internalDate, setInternalDate] = useState(value ?? new Date());
  const currentDate = value ?? internalDate;

  const handleChange = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") setShow(false);
    if (selectedDate) {
      setInternalDate(selectedDate);
      onChange?.(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    if (mode === "time") return date.toLocaleTimeString();
    if (mode === "datetime") return date.toLocaleString();
    return date.toLocaleDateString();
  };

  return (
    <>
      <Pressable
        className={cn(
          "flex-row items-center rounded-md border border-input bg-background px-4 min-h-12",
          className
        )}
        onPress={() => setShow(true)}
        accessible={true}
        accessibilityRole="button"
      >
        <Text className={cn("text-base", value ? "text-foreground" : "text-muted-foreground")}>
          {value ? formatDate(currentDate) : placeholder}
        </Text>
      </Pressable>
      {show && (
        <DateTimePicker
          value={currentDate}
          mode={mode === "datetime" ? "date" : mode}
          onChange={handleChange}
        />
      )}
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
          Native date and time picker using @react-native-community/datetimepicker.
        </p>
      </div>

      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="w-full max-w-sm">
          <PreviewDatePicker />
        </div>
      </ComponentPlayground>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
        <p className="text-sm text-muted-foreground">
          This component requires an additional dependency:
        </p>
        <CodeBlock code={depInstallCode} />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>

      {/* Modes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Modes</h2>
        <p className="text-sm text-muted-foreground">
          The DatePicker supports three modes: <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">date</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">time</code>, and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">datetime</code>.
        </p>
        <CodeBlock code={modesCode} title="app/index.tsx" />
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">mode</td>
                <td className="px-4 py-3 font-mono text-xs">{`"date" | "time" | "datetime"`}</td>
                <td className="px-4 py-3 font-mono text-xs">{`"date"`}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">placeholder</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">{`"Select date..."`}</td>
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
