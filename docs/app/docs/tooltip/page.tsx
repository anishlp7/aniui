import { Heading } from "@/components/heading";
import { PreviewTooltip } from "@/components/preview/tooltip";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { PreviewToggle } from "@/components/preview-toggle";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add tooltip`;
const usageCode = `import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Text } from "react-native";

export function MyScreen() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Text>Press and hold me</Text>
      </TooltipTrigger>
      <TooltipContent>This is a tooltip</TooltipContent>
    </Tooltip>
  );
}`;
const sidesCode = `<Tooltip>
  <TooltipTrigger><Text>Top tooltip</Text></TooltipTrigger>
  <TooltipContent side="top">Tooltip above</TooltipContent>
</Tooltip>
<Tooltip>
  <TooltipTrigger><Text>Bottom tooltip</Text></TooltipTrigger>
  <TooltipContent side="bottom">Tooltip below</TooltipContent>
</Tooltip>`;
const sourceCode = `import React from "react";
import { View, Text, Pressable } from "react-native";
import * as TooltipPrimitive from "@rn-primitives/tooltip";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Tooltip({ children, open, onOpenChange }: TooltipProps) {
  return <TooltipPrimitive.Root open={open} onOpenChange={onOpenChange}>{children}</TooltipPrimitive.Root>;
}

export interface TooltipTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

export function TooltipTrigger({ className, children, ...props }: TooltipTriggerProps) {
  return (
    <TooltipPrimitive.Trigger asChild>
      <Pressable className={cn("min-h-12 min-w-12", className)} accessible={true} accessibilityRole="button" {...props}>
        {children}
      </Pressable>
    </TooltipPrimitive.Trigger>
  );
}

export interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}

export function TooltipContent({ className, children, side = "top", sideOffset = 8, ...props }: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content side={side} sideOffset={sideOffset} avoidCollisions>
        <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(100)}>
          <View className={cn("rounded-md bg-primary px-3 py-1.5", className)} {...props}>
            {typeof children === "string" ? (
              <Text className="text-xs text-primary-foreground text-center">{children}</Text>
            ) : children}
          </View>
        </Animated.View>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}`;
export default function TooltipPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Tooltip</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A tooltip that displays informative text when users press and hold an element.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode} variant="inline">
        <div className="flex flex-wrap items-center gap-4 py-6">
          <PreviewTooltip content="This is a tooltip">
            <button type="button" className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent cursor-pointer">
              Hover me
            </button>
          </PreviewTooltip>
        </div>
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="tooltip" />
        <p className="text-sm text-muted-foreground">
          This component requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/tooltip</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/portal</code>, and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code>.
        </p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Sides */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Tooltip Position</Heading>
        <ComponentPlayground code={sidesCode} variant="inline">
          <div className="flex flex-wrap items-center gap-8 py-8">
            <PreviewTooltip content="Tooltip above" side="top">
              <button type="button" className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent cursor-pointer">Top</button>
            </PreviewTooltip>
            <PreviewTooltip content="Tooltip below" side="bottom">
              <button type="button" className="inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent cursor-pointer">Bottom</button>
            </PreviewTooltip>
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">Tooltip</Heading>
        <PropsTable props={[
          { name: "open", type: "boolean" },
          { name: "onOpenChange", type: "(open: boolean) => void" },
          { name: "children", type: "React.ReactNode", default: "required" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">TooltipTrigger</Heading>
        <PropsTable props={[
          { name: "className", type: "string" },
          { name: "children", type: "React.ReactNode" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">TooltipContent</Heading>
        <PropsTable props={[
          { name: "children", type: "React.ReactNode | string", default: "required" },
          { name: "side", type: "\"top\" | \"bottom\" | \"left\" | \"right\"", default: "\"top\"" },
          { name: "sideOffset", type: "number", default: "8" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/tooltip</code> for trigger-relative positioning</li>
          <li>Collision detection prevents overflow</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code> on trigger</li>
          <li>Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&lt;PortalHost /&gt;</code> at app root</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/tooltip.tsx" />
      </div>
    </div>
  );
}