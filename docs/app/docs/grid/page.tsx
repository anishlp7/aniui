import { Heading } from "@/components/heading";
import { PreviewGridDemo } from "@/components/preview/grid";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add grid`;
const usageCode = `import { Grid } from "@/components/ui/grid";

const items = Array.from({ length: 6 }, (_, i) => ({ id: String(i), title: \`Item \${i + 1}\` }));

export function MyScreen() {
  return (
    <Grid
      columns={2}
      gap={12}
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="bg-card rounded-lg p-4 border border-border">
          <Text className="text-foreground">{item.title}</Text>
        </View>
      )}
    />
  );
}`;
const sourceCode = `import React from "react";
import { FlatList, View } from "react-native";
import { cn } from "@/lib/utils";

export interface GridProps<T> extends Omit<React.ComponentPropsWithoutRef<typeof FlatList<T>>, "numColumns"> {
  className?: string;
  columns?: number;
  gap?: number;
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
}

export function Grid<T>({
  className,
  columns = 2,
  gap = 8,
  data,
  renderItem,
  keyExtractor,
  ...props
}: GridProps<T>) {
  return (
    <FlatList
      className={cn("", className)}
      data={data}
      numColumns={columns}
      keyExtractor={keyExtractor}
      columnWrapperStyle={columns > 1 ? { gap } : undefined}
      contentContainerStyle={{ gap }}
      renderItem={({ item, index }) => (
        <View style={{ flex: 1 }}>{renderItem({ item, index })}</View>
      )}
      {...props}
    />
  );
}`;
export default function GridPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Grid</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          FlatList-based grid layout with configurable columns and gap.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="grid" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewGridDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "columns", type: "number", default: "2" },
          { name: "gap", type: "number", default: "8" },
          { name: "data", type: "T[]", default: "-" },
          { name: "renderItem", type: "({ item, index }) => ReactElement", default: "-" },
          { name: "keyExtractor", type: "(item, index) => string", default: "-" },
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FlatList</code> props except <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">numColumns</code>.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FlatList</code>-based grid layout with column support.</li>
          <li>Grid items are individually focusable by screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/grid.tsx" />
      </div>
    </div>
  );
}
