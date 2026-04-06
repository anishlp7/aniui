"use client";
import { PreviewTabs, PreviewTabsList, PreviewTabsTrigger, PreviewTabsContent } from "@/components/preview/tabs";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add tabs`;
const usageCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function MyScreen() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Text>Account settings content here.</Text>
      </TabsContent>
      <TabsContent value="password">
        <Text>Password settings content here.</Text>
      </TabsContent>
    </Tabs>
  );
}`;
const sourceCode = `import React, { createContext, useContext, useState } from "react";
import { View, Pressable, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const TabsCtx = createContext<{ value: string; onValueChange: (v: string) => void }>({ value: "", onValueChange: () => {} });
export interface TabsProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  defaultValue: string;
  children?: React.ReactNode;
}
export function Tabs({ defaultValue, className, children, ...props }: TabsProps) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsCtx.Provider value={{ value, onValueChange: setValue }}>
      <View className={cn("", className)} {...props}>{children}</View>
    </TabsCtx.Provider>
  );
}
export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}
export function TabsList({ className, ...props }: TabsListProps) {
  return <View className={cn("flex-row rounded-lg bg-muted p-1", className)} {...props} />;
}
export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  value: string;
  children: React.ReactNode;
}
export function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps) {
  const { value: selected, onValueChange } = useContext(TabsCtx);
  const isActive = selected === value;
  const opacity = useSharedValue(isActive ? 1 : 0);
  React.useEffect(() => { opacity.value = withTiming(isActive ? 1 : 0, { duration: 150 }); }, [isActive, opacity]);
  const bgStyle = useAnimatedStyle(() => ({ position: "absolute" as const, inset: 0, borderRadius: 6, backgroundColor: "hsl(0, 0%, 100%)", opacity: opacity.value }));
  return (
    <Pressable className={cn("flex-1 items-center justify-center py-2 min-h-12 relative", className)} onPress={() => onValueChange(value)} accessible={true} accessibilityRole="tab" accessibilityState={{ selected: isActive }} {...props}>
      <Animated.View style={bgStyle} />
      {typeof children === "string" ? <Text className={cn("text-sm font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>{children}</Text> : children}
    </Pressable>
  );
}
export interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  value: string;
  children?: React.ReactNode;
}
export function TabsContent({ value, className, ...props }: TabsContentProps) {
  const { value: selected } = useContext(TabsCtx);
  if (selected !== value) return null;
  return <View className={cn("mt-2", className)} {...props} />;
}`;
export default function TabsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Tabs</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Tab navigation with animated indicator for switching between content panels.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="w-full max-w-sm">
            <PreviewTabs defaultValue="account">
              <PreviewTabsList>
                <PreviewTabsTrigger value="account">Account</PreviewTabsTrigger>
                <PreviewTabsTrigger value="password">Password</PreviewTabsTrigger>
              </PreviewTabsList>
              <PreviewTabsContent value="account">
                <p className="text-sm text-muted-foreground p-4">Account settings content here.</p>
              </PreviewTabsContent>
              <PreviewTabsContent value="password">
                <p className="text-sm text-muted-foreground p-4">Password settings content here.</p>
              </PreviewTabsContent>
            </PreviewTabs>
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="tabs" />
        <p className="text-sm text-muted-foreground">
          This component requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> for the tab indicator animation.
        </p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Compound Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Compound Components</h2>
        <ComponentTable components={[
          { name: "Tabs", description: "Root container managing tab state" },
          { name: "TabsList", description: "Container for tab triggers" },
          { name: "TabsTrigger", description: "Pressable tab button with animated background" },
          { name: "TabsContent", description: "Content panel shown when tab is active" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">Tabs</h3>
        <PropsTable props={[
          { name: "defaultValue", type: "string", default: "required" },
          { name: "className", type: "string" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">TabsTrigger</h3>
        <PropsTable props={[
          { name: "value", type: "string", default: "required" },
          { name: "className", type: "string" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">TabsContent</h3>
        <PropsTable props={[
          { name: "value", type: "string", default: "required" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses React Context for state management</li>
          <li>Tab triggers and content panels are properly associated for screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/tabs.tsx" />
      </div>
    </div>
  );
}