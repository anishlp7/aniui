import { Heading } from "@/components/heading";
import { PreviewTimelineDemo } from "@/components/preview/timeline";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add timeline`;
const usageCode = `import { Timeline, TimelineItem } from "@/components/ui/timeline";

export function MyScreen() {
  return (
    <Timeline>
      <TimelineItem
        title="Order placed"
        description="Your order has been confirmed"
        time="2:00 PM"
        variant="success"
      />
      <TimelineItem
        title="Processing"
        description="Your order is being prepared"
        time="2:15 PM"
        variant="default"
      />
      <TimelineItem
        title="Shipping"
        description="Waiting for pickup"
        time="Pending"
        variant="muted"
        isLast
      />
    </Timeline>
  );
}`;
const sourceCode = `import React from "react";
import { View, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface TimelineProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function Timeline({ className, children, ...props }: TimelineProps) {
  return (
    <View className={cn("gap-0", className)} accessibilityRole="list" {...props}>
      {children}
    </View>
  );
}

const dotVariants = cva("h-3 w-3 rounded-full z-10", {
  variants: {
    variant: {
      default: "bg-primary",
      success: "bg-green-500",
      destructive: "bg-destructive",
      muted: "bg-muted-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface TimelineItemProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof dotVariants> {
  className?: string;
  title: string;
  description?: string;
  time?: string;
  icon?: React.ReactNode;
  isLast?: boolean;
}

export function TimelineItem({
  variant,
  className,
  title,
  description,
  time,
  icon,
  isLast,
  ...props
}: TimelineItemProps) {
  return (
    <View className={cn("flex-row", className)} accessibilityRole="listitem" {...props}>
      <View className="items-center mr-3">
        {icon ?? <View className={dotVariants({ variant })} />}
        {!isLast && <View className="flex-1 w-0.5 bg-border mt-1" />}
      </View>
      <View className={cn("flex-1 pb-6", isLast && "pb-0")}>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-medium text-foreground">{title}</Text>
          {time && <Text className="text-xs text-muted-foreground">{time}</Text>}
        </View>
        {description && (
          <Text className="text-sm text-muted-foreground mt-1">{description}</Text>
        )}
      </View>
    </View>
  );
}`;
export default function TimelinePage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Timeline</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Vertical timeline for events, order tracking, and activity feeds.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="timeline" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewTimelineDemo />
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
        <Heading as="h3" className="text-lg font-medium text-foreground">Timeline</Heading>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">TimelineItem</Heading>
        <PropsTable props={[
          { name: "title", type: "string", default: "-" },
          { name: "description", type: "string", default: "-" },
          { name: "time", type: "string", default: "-" },
          { name: "variant", type: '"default" | "success" | "destructive" | "muted"', default: '"default"' },
          { name: "icon", type: "React.ReactNode", default: "-" },
          { name: "isLast", type: "boolean", default: "false" },
          { name: "className", type: "string", default: "-" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Vertical event timeline with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="list"</code>.</li>
          <li>Each timeline item is announced as a list item with its content.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/timeline.tsx" />
      </div>
    </div>
  );
}
