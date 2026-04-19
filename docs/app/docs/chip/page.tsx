import { Heading } from "@/components/heading";
import { PreviewChip } from "@/components/preview/chip";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { SelectableDemo, ClosableDemo } from "./_demos";

const installCode = `npx @aniui/cli add chip`;
const usageCode = `import { Chip } from "@/components/ui/chip";
<Chip variant="default">React Native</Chip>
<Chip variant="secondary">TypeScript</Chip>
<Chip variant="outline">NativeWind</Chip>`;
const variantsCode = `<Chip variant="default">Default</Chip>
<Chip variant="secondary">Secondary</Chip>
<Chip variant="outline">Outline</Chip>
<Chip variant="destructive">Destructive</Chip>`;
const sizesCode = `<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>`;
const selectableCode = `const [selected, setSelected] = useState<string[]>(["react-native"]);
const toggle = (id: string) =>
  setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
<Chip selected={selected.includes("react-native")} onPress={() => toggle("react-native")}>React Native</Chip>
<Chip selected={selected.includes("expo")} onPress={() => toggle("expo")}>Expo</Chip>
<Chip selected={selected.includes("nativewind")} onPress={() => toggle("nativewind")}>NativeWind</Chip>`;
const closableCode = `<Chip onClose={() => console.log("removed")}>Removable</Chip>
<Chip variant="secondary" onClose={() => {}}>Tag</Chip>`;
const sourceCode = `import React from "react";
import { View, Text, Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "flex-row items-center rounded-full min-h-8",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        outline: "border border-input bg-transparent",
        destructive: "bg-destructive",
      },
      size: {
        sm: "px-2.5 py-1 gap-1",
        md: "px-3 py-1.5 gap-1.5",
        lg: "px-4 py-2 gap-2",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);
const chipTextVariants = cva("font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      outline: "text-foreground",
      destructive: "text-destructive-foreground",
    },
    size: { sm: "text-xs", md: "text-sm", lg: "text-base" },
  },
  defaultVariants: { variant: "default", size: "md" },
});
export interface ChipProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof chipVariants> {
  className?: string;
  textClassName?: string;
  children: string;
  selected?: boolean;
  onClose?: () => void;
}
export function Chip({ variant, size, className, textClassName, children, selected, onClose, ...props }: ChipProps) {
  const v = selected ? "default" : (variant ?? "outline");
  return (
    <Pressable className={cn(chipVariants({ variant: v, size }), className)} accessible={true} accessibilityRole="button" accessibilityState={{ selected }} {...props}>
      <Text className={cn(chipTextVariants({ variant: v, size }), textClassName)}>{children}</Text>
      {onClose && (
        <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel={\`Remove \${children}\`} className="ml-0.5">
          <Text className={cn("text-xs", v === "outline" ? "text-muted-foreground" : chipTextVariants({ variant: v, size: "sm" }))}>✕</Text>
        </Pressable>
      )}
    </Pressable>
  );
}`;
export default function ChipPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Chip</h1>
        <p className="text-muted-foreground text-lg">Interactive tags for filters, categories, and multi-select. Unlike Badge (display-only), Chips are pressable and selectable.</p>
      </div>
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="flex flex-wrap gap-2">
            <PreviewChip variant="default">React Native</PreviewChip>
            <PreviewChip variant="secondary">TypeScript</PreviewChip>
            <PreviewChip variant="outline">NativeWind</PreviewChip>
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="chip" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Variants</Heading>
        <ComponentPlayground code={variantsCode}>
          <div className="flex flex-wrap gap-2">
            <PreviewChip variant="default">Default</PreviewChip>
            <PreviewChip variant="secondary">Secondary</PreviewChip>
            <PreviewChip variant="outline">Outline</PreviewChip>
            <PreviewChip variant="destructive">Destructive</PreviewChip>
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Sizes</Heading>
        <ComponentPlayground code={sizesCode}>
          <div className="flex flex-wrap items-center gap-2">
            <PreviewChip size="sm">Small</PreviewChip>
            <PreviewChip size="md">Medium</PreviewChip>
            <PreviewChip size="lg">Large</PreviewChip>
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Selectable</Heading>
        <p className="text-sm text-muted-foreground mb-4">Use the <code>selected</code> prop for filter chips. Selected chips switch to the default (filled) variant automatically.</p>
        <ComponentPlayground code={selectableCode}>
          <SelectableDemo />
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Closable</Heading>
        <p className="text-sm text-muted-foreground mb-4">Add an <code>onClose</code> handler to show a remove button.</p>
        <ComponentPlayground code={closableCode}>
          <ClosableDemo />
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Props</Heading>
        <PropsTable props={[
          { name: "variant", type: "\"default\" | \"secondary\" | \"outline\" | \"destructive\"", default: "\"outline\"" },
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "children", type: "string" },
          { name: "selected", type: "boolean", default: "false" },
          { name: "onClose", type: "() => void" },
          { name: "textClassName", type: "string" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="button"</code> with selected state for screen readers.</li>
          <li>Supports <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState</code> to indicate selection.</li>
        </ul>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/chip.tsx" />
      </div>
    </div>
  );
}
