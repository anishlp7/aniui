import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { TabsDemo } from "./_demos";

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

export function TabsList({ className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string }) {
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

  return (
    <Pressable
      className={cn("flex-1 items-center justify-center py-2 min-h-12 rounded-md", isActive && "bg-background shadow-sm", className)}
      onPress={() => onValueChange(value)}
      accessible={true}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className={cn("text-sm font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>{children}</Text>
      ) : children}
    </Pressable>
  );
}

export function TabsContent({ value, className, ...props }: React.ComponentPropsWithoutRef<typeof View> & { className?: string; value: string }) {
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
          Tab navigation for switching between content panels.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <TabsDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="tabs" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Compound Components */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Compound Components</Heading>
        <ComponentTable components={[
          { name: "Tabs", description: "Root container managing tab state" },
          { name: "TabsList", description: "Container for tab triggers" },
          { name: "TabsTrigger", description: "Pressable tab button with active state" },
          { name: "TabsContent", description: "Content panel shown when tab is active" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">Tabs</Heading>
        <PropsTable props={[
          { name: "defaultValue", type: "string", default: "required" },
          { name: "className", type: "string" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">TabsTrigger</Heading>
        <PropsTable props={[
          { name: "value", type: "string", default: "required" },
          { name: "className", type: "string" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">TabsContent</Heading>
        <PropsTable props={[
          { name: "value", type: "string", default: "required" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses React Context for state management</li>
          <li>Tab triggers and content panels are properly associated for screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/tabs.tsx" />
      </div>
    </div>
  );
}
