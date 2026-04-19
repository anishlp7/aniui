import { Heading } from "@/components/heading";
import { PreviewTabsDemo, PreviewTabsLine, PreviewTabsVertical, PreviewTabsDisabled, PreviewTabsIcons, PreviewTabsSizes, PreviewTabsRTL } from "@/components/preview/tabs";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const usageCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function MyScreen() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Text>Account settings here.</Text>
      </TabsContent>
      <TabsContent value="password">
        <Text>Password settings here.</Text>
      </TabsContent>
    </Tabs>
  );
}`;
const lineCode = `<Tabs defaultValue="overview" variant="line">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
</Tabs>`;
const verticalCode = `<Tabs defaultValue="general" orientation="vertical" variant="line">
  <TabsList>
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="general">...</TabsContent>
</Tabs>`;
const disabledCode = `<Tabs defaultValue="active">
  <TabsList>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
    <TabsTrigger value="other">Other</TabsTrigger>
  </TabsList>
</Tabs>`;
const iconsCode = `import Svg, { Path, Circle } from "react-native-svg";

const UserIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none"
    stroke="#71717a" strokeWidth={2}>
    <Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <Circle cx={12} cy={7} r={4} />
  </Svg>
);

<Tabs defaultValue="profile">
  <TabsList>
    <TabsTrigger value="profile" icon={<UserIcon />}>Profile</TabsTrigger>
    <TabsTrigger value="settings" icon={<SettingsIcon />}>Settings</TabsTrigger>
  </TabsList>
</Tabs>`;
const sizesCode = `<Tabs defaultValue="a" size="sm">
  <TabsList>
    <TabsTrigger value="a">Small</TabsTrigger>
    <TabsTrigger value="b">Tabs</TabsTrigger>
  </TabsList>
</Tabs>

<Tabs defaultValue="a" size="md">...</Tabs>

<Tabs defaultValue="a" size="lg">...</Tabs>`;
const rtlCode = `import { DirectionProvider } from "@/components/ui/direction-provider";

<DirectionProvider defaultDirection="rtl">
  <Tabs defaultValue="home" variant="line">
    <TabsList>
      <TabsTrigger value="home">الرئيسية</TabsTrigger>
      <TabsTrigger value="settings">الإعدادات</TabsTrigger>
    </TabsList>
    <TabsContent value="home">...</TabsContent>
  </Tabs>
</DirectionProvider>`;
const sourceCode = `import React, { createContext, useContext, useState } from "react";
import { View, Pressable, Text } from "react-native";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

type TabsVariant = "filled" | "line";
type TabsSize = "sm" | "md" | "lg";
type TabsOrientation = "horizontal" | "vertical";

const TabsCtx = createContext<{
  value: string; onValueChange: (v: string) => void;
  variant: TabsVariant; size: TabsSize; orientation: TabsOrientation;
}>({ value: "", onValueChange: () => {}, variant: "filled", size: "md", orientation: "horizontal" });

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string; defaultValue: string;
  variant?: TabsVariant; size?: TabsSize; orientation?: TabsOrientation;
  children?: React.ReactNode;
}

export function Tabs({ defaultValue, variant = "filled", size = "md", orientation = "horizontal", className, children, ...props }: TabsProps) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsCtx.Provider value={{ value, onValueChange: setValue, variant, size, orientation }}>
      <View className={cn(orientation === "vertical" && "flex-row", className)} {...props}>{children}</View>
    </TabsCtx.Provider>
  );
}

// ... TabsList, TabsTrigger, TabsContent (see source)`;
export default function TabsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Tabs</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Tab navigation with filled and line variants, sizes, vertical layout, icons, disabled state, and RTL support.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewTabsDemo />
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
      {/* Line Variant */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Line Variant</Heading>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">variant=&quot;line&quot;</code> for underline-style tabs instead of the filled background.
        </p>
        <ComponentPlayground code={lineCode}>
          <PreviewTabsLine />
        </ComponentPlayground>
      </div>
      {/* Vertical */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Vertical</Heading>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">orientation=&quot;vertical&quot;</code> for sidebar-style navigation. Works with both filled and line variants.
        </p>
        <ComponentPlayground code={verticalCode}>
          <PreviewTabsVertical />
        </ComponentPlayground>
      </div>
      {/* Disabled */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Disabled</Heading>
        <p className="text-sm text-muted-foreground">
          Add <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">disabled</code> to individual triggers to prevent interaction. Disabled tabs show at reduced opacity.
        </p>
        <ComponentPlayground code={disabledCode}>
          <PreviewTabsDisabled />
        </ComponentPlayground>
      </div>
      {/* Icons */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Icons</Heading>
        <p className="text-sm text-muted-foreground">
          Pass an <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">icon</code> prop to render an icon before the tab label.
        </p>
        <ComponentPlayground code={iconsCode}>
          <PreviewTabsIcons />
        </ComponentPlayground>
      </div>
      {/* Sizes */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Sizes</Heading>
        <p className="text-sm text-muted-foreground">
          Set <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">size</code> on Tabs to control trigger height and text size. Useful for compact layouts on small screens.
        </p>
        <ComponentPlayground code={sizesCode}>
          <PreviewTabsSizes />
        </ComponentPlayground>
      </div>
      {/* RTL */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">RTL</Heading>
        <p className="text-sm text-muted-foreground">
          Tabs support right-to-left layouts automatically. Wrap in <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">DirectionProvider</code> for RTL languages.
        </p>
        <ComponentPlayground code={rtlCode}>
          <PreviewTabsRTL />
        </ComponentPlayground>
      </div>
      {/* Compound Components */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Components</Heading>
        <ComponentTable components={[
          { name: "Tabs", description: "Root container. Controls variant, size, orientation, and state." },
          { name: "TabsList", description: "Container for tab triggers. Adapts styling from variant and orientation." },
          { name: "TabsTrigger", description: "Pressable tab button with active state, disabled, and icon support." },
          { name: "TabsContent", description: "Content panel shown when its tab is active." },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">Tabs</Heading>
        <PropsTable props={[
          { name: "defaultValue", type: "string", default: "required" },
          { name: "variant", type: '"filled" | "line"', default: '"filled"' },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
          { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"' },
          { name: "className", type: "string", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">TabsTrigger</Heading>
        <PropsTable props={[
          { name: "value", type: "string", default: "required" },
          { name: "disabled", type: "boolean", default: "false" },
          { name: "icon", type: "React.ReactNode", default: "-" },
          { name: "textClassName", type: "string", default: "-" },
          { name: "className", type: "string", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">TabsContent</Heading>
        <PropsTable props={[
          { name: "value", type: "string", default: "required" },
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          All sub-components also accept their respective React Native base props.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;tab&quot;</code> on triggers, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;tablist&quot;</code> on list, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;tabpanel&quot;</code> on content.</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState</code> tracks <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">selected</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">disabled</code>.</li>
          <li>Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">will-change-variable</code> to prevent NativeWind v5 state reset warnings.</li>
          <li>RTL support via logical properties (<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">border-e</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">ms-4</code>).</li>
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
