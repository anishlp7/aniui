import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { SegmentedControlDemo, SizesDemo } from "./_demos";

const installCode = `npx @aniui/cli add segmented-control`;
const usageCode = `import { SegmentedControl } from "@/components/ui/segmented-control";

const [view, setView] = useState("List");
<SegmentedControl options={["List", "Grid", "Map"]} value={view} onValueChange={setView} />`;
const sizesCode = `<SegmentedControl size="sm" options={["S", "M", "L"]} value={size} onValueChange={setSize} />
<SegmentedControl size="md" options={["S", "M", "L"]} value={size} onValueChange={setSize} />
<SegmentedControl size="lg" options={["S", "M", "L"]} value={size} onValueChange={setSize} />`;
const sourceCode = `import React from "react";
import { View, Pressable, Text } from "react-native";

const heights = { sm: 36, md: 44, lg: 56 } as const;
export interface SegmentedControlProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
}
export function SegmentedControl({ size = "md", className, options, value, onValueChange, ...props }: SegmentedControlProps) {
  return (
    <View
      className="rounded-lg bg-muted"
      style={{ height: heights[size], padding: 4, flexDirection: "row", borderRadius: 8 }}
      accessibilityRole="tablist"
      {...props}
    >
      {options.map((option) => {
        const active = option === value;
        return (
          <Pressable
            key={option}
            style={{
              flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 6,
              backgroundColor: active ? "#ffffff" : "transparent",
              ...(active ? { shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, elevation: 1 } : {}),
            }}
            onPress={() => onValueChange(option)}
            accessible={true}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            <Text style={{ fontSize: 14, fontWeight: "500", color: active ? "#09090b" : "#71717a" }}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}`;
export default function SegmentedControlPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Segmented Control</h1>
        <p className="text-muted-foreground text-lg">iOS-style segmented control for switching between views or filter options.</p>
      </div>
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <SegmentedControlDemo />
        </ComponentPlayground>
      </PreviewToggle>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="segmented-control" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Sizes</Heading>
        <ComponentPlayground code={sizesCode}>
          <SizesDemo />
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Props</Heading>
        <PropsTable props={[
          { name: "options", type: "string[]" },
          { name: "value", type: "string" },
          { name: "onValueChange", type: "(value: string) => void" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Tab-like control with selected state announced to screen readers.</li>
          <li>Each segment has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState</code> for selected/unselected.</li>
        </ul>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/segmented-control.tsx" />
      </div>
    </div>
  );
}
