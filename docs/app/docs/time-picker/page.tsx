import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { TimePickerDemo } from "./_demos";

const usageCode = `import { TimePicker } from "@/components/ui/time-picker";
import { useState } from "react";

export function MyScreen() {
  const [time, setTime] = useState<Date | undefined>();
  return (
    <TimePicker
      value={time}
      onChange={setTime}
      placeholder="Pick a time..."
      is24Hour={false}
    />
  );
}`;
const sourceCode = getComponentSource("time-picker");

export default function TimePickerPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">TimePicker</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Custom scroll-wheel time selection — hour, minute, and AM/PM columns in a modal. No external datetime package.
          For date + time together, use{" "}
          <a href="/docs/date-and-time-picker" className="text-primary underline underline-offset-2">DateAndTimePicker</a>.
          For calendar-only dates, use{" "}
          <a href="/docs/date-picker" className="text-primary underline underline-offset-2">DatePicker</a>.
        </p>
      </div>
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <TimePickerDemo />
        </ComponentPlayground>
      </PreviewToggle>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="time-picker" />
        <p className="text-sm text-muted-foreground">
          Also exports <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">DateAndTimePicker</code> — see the{" "}
          <a href="/docs/date-and-time-picker" className="text-primary underline underline-offset-2">Date &amp; Time Picker</a> docs.
        </p>
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "value", type: "Date" },
          { name: "onChange", type: "(date: Date) => void" },
          { name: "placeholder", type: "string", default: "\"Select time...\"" },
          { name: "is24Hour", type: "boolean" },
          { name: "minuteInterval", type: "1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30" },
          { name: "formatTime", type: "(date: Date) => string" },
          { name: "className", type: "string" },
        ]} />
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Trigger button uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="button"</code> with a 48dp minimum touch target.</li>
          <li>Each hour, minute, and AM/PM cell is a pressable button with button semantics.</li>
        </ul>
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/time-picker.tsx" />
      </div>
    </div>
  );
}
