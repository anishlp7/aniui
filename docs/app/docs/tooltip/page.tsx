"use client";

import { PreviewTooltip } from "@/components/preview/tooltip";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add tooltip`;

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
      <ComponentPlayground code={usageCode}>
        <div className="flex flex-wrap items-center gap-4">
          <PreviewTooltip content="This is a tooltip">
            <span className="text-sm text-foreground underline cursor-pointer">Press and hold me</span>
          </PreviewTooltip>
        </div>
      </ComponentPlayground>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
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
        <ComponentPlayground code={sidesCode}>
          <div className="flex flex-wrap items-center gap-8 py-8">
            <PreviewTooltip content="Tooltip above" side="top">
              <span className="text-sm text-foreground underline cursor-pointer">Top tooltip</span>
            </PreviewTooltip>
            <PreviewTooltip content="Tooltip below" side="bottom">
              <span className="text-sm text-foreground underline cursor-pointer">Bottom tooltip</span>
            </PreviewTooltip>
          </div>
        </ComponentPlayground>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">content</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">side</td>
                <td className="px-4 py-3 font-mono text-xs">{`"top" | "bottom"`}</td>
                <td className="px-4 py-3 font-mono text-xs">{`"top"`}</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">children</td>
                <td className="px-4 py-3 font-mono text-xs">React.ReactNode</td>
                <td className="px-4 py-3 font-mono text-xs">required</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>

      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/tooltip.tsx" />
      </div>
    </div>
  );
}
