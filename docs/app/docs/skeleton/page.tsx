"use client";
import { PreviewSkeleton } from "@/components/preview/skeleton";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add skeleton`;
const usageCode = `import { Skeleton } from "@/components/ui/skeleton";

export function MyScreen() {
  return (
    <View className="space-y-3">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-10 w-10 rounded-full" />
    </View>
  );
}`;
const sourceCode = `import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}
export function Skeleton({ className, ...props }: SkeletonProps) {
  const opacity = useSharedValue(1);
  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1,
      false
    );
  }, [opacity]);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  return (
    <Animated.View
      className={cn("rounded-md bg-muted", className)}
      style={animatedStyle}
      {...props}
    />
  );
}`;
export default function SkeletonPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Skeleton</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Animated loading placeholder with pulse effect.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="space-y-3 w-full max-w-sm">
          <PreviewSkeleton className="h-4 w-48" />
          <PreviewSkeleton className="h-4 w-32" />
          <PreviewSkeleton className="h-10 w-10 rounded-full" />
        </div>
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="skeleton" />
        <p className="text-sm text-muted-foreground">
          This component requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> for the pulse animation.
        </p>
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
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native. Use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">className</code> to set width, height, and border radius.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Decorative loading placeholder -- hidden from screen readers by default.</li>
          <li>Pair with an <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code> on the parent container to indicate loading state.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/skeleton.tsx" />
      </div>
    </div>
  );
}