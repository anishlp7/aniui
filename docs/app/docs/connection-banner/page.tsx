"use client";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

const installCode = `npx @aniui/cli add connection-banner`;
const usageCode = `import { ConnectionBanner } from "@/components/ui/connection-banner";
import { useNetInfo } from "@react-native-community/netinfo";

export function MyScreen() {
  const netInfo = useNetInfo();

  return (
    <View className="flex-1">
      <ConnectionBanner
        connected={netInfo.isConnected ?? true}
        offlineText="No internet connection"
        onlineText="Back online"
      />
      {/* Rest of your app */}
    </View>
  );
}`;
const sourceCode = `import React from "react";
import { Text } from "react-native";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface ConnectionBannerProps {
  className?: string;
  connected: boolean;
  offlineText?: string;
  onlineText?: string;
}

export function ConnectionBanner({
  className,
  connected,
  offlineText = "No internet connection",
  onlineText = "Back online",
}: ConnectionBannerProps) {
  if (connected === undefined) return null;

  return (
    <Animated.View
      entering={SlideInUp.duration(300)}
      exiting={SlideOutUp.duration(200)}
      className={cn(
        "px-4 py-2 items-center",
        connected ? "bg-green-600" : "bg-destructive",
        className
      )}
    >
      <Text className="text-white text-sm font-medium">
        {connected ? onlineText : offlineText}
      </Text>
    </Animated.View>
  );
}`;
export default function ConnectionBannerPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Connection Banner</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Animated banner showing online/offline connection status.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
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
          { name: "connected", type: "boolean", default: "-" },
          { name: "offlineText", type: "string", default: '"No internet connection"' },
          { name: "onlineText", type: "string", default: '"Back online"' },
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> for slide animations.
        </p>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/connection-banner.tsx" />
      </div>
    </div>
  );
}
