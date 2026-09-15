import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { DateAndTimePickerDemo } from "./_demos";

const usageCode = `import { DateAndTimePicker } from "@/components/ui/time-picker";
import { useState } from "react";

export function MyScreen() {
  const [when, setWhen] = useState<Date | undefined>();
  return (
    <DateAndTimePicker
      value={when}
      onChange={setWhen}
      placeholder="Schedule event..."
      min={new Date()}
    />
  );
}`;
const aliasCode = `import { DateTimePicker } from "@/components/ui/time-picker";

// DateTimePicker is an alias — same props and UI as DateAndTimePicker
<DateTimePicker value={when} onChange={setWhen} placeholder="Schedule event..." />`;
const constrainedCode = `<DateAndTimePicker
  value={when}
  onChange={setWhen}
  min={new Date(2025, 0, 1)}
  max={new Date(2025, 11, 31)}
  is24Hour={true}
  minuteInterval={15}
/>`;
const formatCode = `<DateAndTimePicker
  value={when}
  onChange={setWhen}
  formatDateTime={(d) =>
    d.toLocaleString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }
/>`;
const sourceCode = getComponentSource("time-picker");

export default function DateAndTimePickerPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">DateAndTimePicker</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Combined date and time picker — the AniUI{" "}
          <a href="/docs/calendar" className="text-primary underline underline-offset-2">Calendar</a> for the date,
          plus scroll-wheel hour, minute, and AM/PM columns. Exported from{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">time-picker</code> alongside{" "}
          <a href="/docs/time-picker" className="text-primary underline underline-offset-2">TimePicker</a>.
          For date-only, use{" "}
          <a href="/docs/date-picker" className="text-primary underline underline-offset-2">DatePicker</a>.
        </p>
      </div>
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <DateAndTimePickerDemo />
        </ComponentPlayground>
      </PreviewToggle>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="time-picker" />
        <p className="text-sm text-muted-foreground">
          Run <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">aniui add time-picker</code> — installs{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">components/ui/time-picker.tsx</code> and
          auto-installs the Calendar dependency. No extra npm packages.
        </p>
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">DateTimePicker alias</Heading>
        <p className="text-sm text-muted-foreground">
          Prefer the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">DateAndTimePicker</code> name for clarity.
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">DateTimePicker</code> is a drop-in alias with identical props.
        </p>
        <CodeBlock code={aliasCode} title="app/index.tsx" />
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Constraints &amp; intervals</Heading>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">min</code> and{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">max</code> on the calendar portion,
          and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">minuteInterval</code> to snap minute choices.
        </p>
        <CodeBlock code={constrainedCode} title="app/index.tsx" />
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Custom formatting</Heading>
        <CodeBlock code={formatCode} title="app/index.tsx" />
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "value", type: "Date" },
          { name: "onChange", type: "(date: Date) => void" },
          { name: "placeholder", type: "string", default: "\"Select date & time...\"" },
          { name: "is24Hour", type: "boolean" },
          { name: "minuteInterval", type: "1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30" },
          { name: "min", type: "Date", description: "Earliest selectable calendar date" },
          { name: "max", type: "Date", description: "Latest selectable calendar date" },
          { name: "formatDateTime", type: "(date: Date) => string" },
          { name: "className", type: "string" },
        ]} />
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Trigger button uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="button"</code> with a 48dp minimum touch target.</li>
          <li>Calendar day cells and each time wheel cell are pressable with button semantics.</li>
        </ul>
      </div>
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <p className="text-sm text-muted-foreground">
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">DateAndTimePicker</code> is defined in{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">components/ui/time-picker.tsx</code>.
        </p>
        <CodeBlock code={sourceCode} title="components/ui/time-picker.tsx" />
      </div>
    </div>
  );
}
