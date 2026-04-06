"use client";
import { PreviewTooltip } from "@/components/preview/tooltip";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";
import { PreviewToggle } from "@/components/preview-toggle";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add tooltip`;
const usageCode = `import { Tooltip } from "@/components/ui/tooltip";
import { Text } from "react-native";

export function MyScreen() {
  return (
    <Tooltip content="This is a tooltip">
      <Text>Press and hold me</Text>
    </Tooltip>
  );
}`;
const sidesCode = `<Tooltip content="Tooltip above" side="top">
  <Text>Top tooltip</Text>
</Tooltip>
<Tooltip content="Tooltip below" side="bottom">
  <Text>Bottom tooltip</Text>
</Tooltip>`;
const sourceCode = `import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface TooltipProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  content: string;
  side?: "top" | "bottom";
  children: React.ReactNode;
}
export function Tooltip({ content, side = "top", className, children, ...props }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  return (
    <View className={cn("relative", className)} {...props}>
      <Pressable
        onPressIn={() => setVisible(true)}
        onPressOut={() => setVisible(false)}
        onLongPress={() => setVisible(true)}
        accessible={true}
        accessibilityRole="button"
        accessibilityHint={content}
      >
        {children}
      </Pressable>
      {visible && (
        <Animated.View
          entering={FadeIn.duration(150)}
          exiting={FadeOut.duration(100)}
          className={cn(
            "absolute left-1/2 z-50 -translate-x-1/2 rounded-md bg-primary px-3 py-1.5",
            side === "top" ? "bottom-full mb-2" : "top-full mt-2"
          )}
          pointerEvents="none"
        >
          <Text className="text-xs text-primary-foreground text-center">{content}</Text>
        </Animated.View>
      )}
    </View>
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
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="tooltip" />
        <p className="text-sm text-muted-foreground">
          This component requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> to be installed in your project.
        </p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Sides */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Tooltip Position</h2>
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
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "content", type: "string", default: "required" },
          { name: "side", type: "\"top\" | \"bottom\"", default: "\"top\"" },
          { name: "className", type: "string" },
          { name: "children", type: "React.ReactNode", default: "required" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/tooltip</code> for trigger-relative positioning</li>
          <li>Collision detection prevents overflow</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code> on trigger</li>
          <li>Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&lt;PortalHost /&gt;</code> at app root</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/tooltip.tsx" />
      </div>
    </div>
  );
}