"use client";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add price`;
const usageCode = `import { Price } from "@/components/ui/price";

export function MyScreen() {
  return (
    <View className="gap-3">
      {/* Basic price */}
      <Price amount={29.99} />

      {/* With strikethrough (original price) */}
      <View className="flex-row items-center gap-2">
        <Price amount={49.99} strikethrough />
        <Price amount={29.99} />
      </View>

      {/* Different currency */}
      <Price amount={24.99} currency="EUR" locale="de-DE" />

      {/* With prefix */}
      <Price amount={9.99} prefix="From" />
    </View>
  );
}`;
const sourceCode = `import React from "react";
import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

export interface PriceProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  amount: number;
  currency?: string;
  locale?: string;
  strikethrough?: boolean;
  prefix?: string;
  textClassName?: string;
}

export function Price({
  className,
  amount,
  currency = "USD",
  locale = "en-US",
  strikethrough,
  prefix,
  textClassName,
  ...props
}: PriceProps) {
  const formatted = new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);

  return (
    <View className={cn("flex-row items-baseline", className)} {...props}>
      {prefix && <Text className={cn("text-sm text-muted-foreground mr-1", textClassName)}>{prefix}</Text>}
      <Text
        className={cn(
          "text-lg font-semibold text-foreground",
          strikethrough && "line-through text-muted-foreground",
          textClassName
        )}
      >
        {formatted}
      </Text>
    </View>
  );
}`;
export default function PricePage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Price</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Formatted currency display with locale support and strikethrough.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="price" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "amount", type: "number", default: "-" },
          { name: "currency", type: "string", default: '"USD"' },
          { name: "locale", type: "string", default: '"en-US"' },
          { name: "strikethrough", type: "boolean", default: "false" },
          { name: "prefix", type: "string", default: "-" },
          { name: "className", type: "string", default: "-" },
          { name: "textClassName", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Formatted currency display with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Intl.NumberFormat</code>.</li>
          <li>Screen readers announce the full formatted price including currency symbol.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/price.tsx" />
      </div>
    </div>
  );
}
