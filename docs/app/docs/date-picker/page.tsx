import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { DatePickerDemo, DateRangeDemo } from "./_demos";

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
const sourceCode = getComponentSource("date-picker");
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
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <DatePickerDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="date-picker" />
        <p className="text-sm text-muted-foreground">
          The DatePicker depends on the Calendar component, which will be installed automatically.
        </p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Range Selection */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Range Selection</Heading>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">DateRangePicker</code> to select a start and end date.
        </p>
        <ComponentPlayground code={rangeCode}>
          <DateRangeDemo />
        </ComponentPlayground>
      </div>
      {/* Date Constraints */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Date Constraints</Heading>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">min</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">max</code> to restrict the selectable date range.
        </p>
        <CodeBlock code={constrainedCode} title="app/index.tsx" />
      </div>
      {/* Props -- DatePicker */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">DatePicker Props</Heading>
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
      {/* Props -- DateRangePicker */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">DateRangePicker Props</Heading>
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
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Powered by <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@react-native-community/datetimepicker</code> native picker.</li>
          <li>Uses the platform's native date picker which has built-in accessibility support.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/date-picker.tsx" />
      </div>
    </div>
  );
}
