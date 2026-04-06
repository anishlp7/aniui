"use client";
import { PreviewTabBarDemo } from "@/components/preview/tab-bar";
import { ComponentPlayground } from "@/components/component-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
const installCode = `npx @aniui/cli add tab-bar`;
const usageCode = `import { TabBar, TabBarItem } from "@/components/ui/tab-bar";
import { Ionicons } from "@expo/vector-icons";

export function MyScreen() {
  const [active, setActive] = useState("home");

  return (
    <TabBar>
      <TabBarItem
        active={active === "home"}
        icon={<Ionicons name="home" size={20} />}
        label="Home"
        onPress={() => setActive("home")}
      />
      <TabBarItem
        active={active === "search"}
        icon={<Ionicons name="search" size={20} />}
        label="Search"
        onPress={() => setActive("search")}
      />
      <TabBarItem
        active={active === "inbox"}
        icon={<Ionicons name="mail" size={20} />}
        label="Inbox"
        badge={3}
        onPress={() => setActive("inbox")}
      />
      <TabBarItem
        active={active === "profile"}
        icon={<Ionicons name="person" size={20} />}
        label="Profile"
        onPress={() => setActive("profile")}
      />
    </TabBar>
  );
}`;
const sourceCode = `import React from "react";
import { View, Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabBarVariants = cva("flex-row border-t pb-6 pt-2 px-2", {
  variants: {
    variant: {
      default: "bg-background border-border",
      card: "bg-card border-border",
      transparent: "bg-transparent border-transparent",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface TabBarProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof tabBarVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function TabBar({ variant, className, children, ...props }: TabBarProps) {
  return (
    <View className={cn(tabBarVariants({ variant }), className)} accessibilityRole="tablist" {...props}>
      {children}
    </View>
  );
}

export interface TabBarItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  active?: boolean;
  icon?: React.ReactNode;
  label?: string;
  badge?: number;
  onPress?: () => void;
}

export function TabBarItem({ active, icon, label, badge, className, onPress, ...props }: TabBarItemProps) {
  return (
    <Pressable
      className={cn("flex-1 items-center justify-center gap-1 min-h-12", className)}
      accessible={true}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      {...props}
    >
      {icon && <View>{icon}</View>}
      {label && (
        <Text className={cn("text-xs", active ? "text-primary font-medium" : "text-muted-foreground")}>
          {label}
        </Text>
      )}
      {badge !== undefined && badge > 0 && (
        <View className="absolute -top-1 right-1/4 bg-destructive rounded-full min-w-5 h-5 items-center justify-center px-1">
          <Text className="text-destructive-foreground text-[10px] font-bold">
            {badge > 99 ? "99+" : badge}
          </Text>
        </View>
      )}
    </Pressable>
  );
}`;
export default function TabBarPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Tab Bar</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Bottom tab bar with badge support and active states.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="tab-bar" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewTabBarDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">TabBar</h3>
        <PropsTable props={[
          { name: "variant", type: '"default" | "card" | "transparent"', default: '"default"' },
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">TabBarItem</h3>
        <PropsTable props={[
          { name: "active", type: "boolean", default: "false" },
          { name: "icon", type: "React.ReactNode", default: "-" },
          { name: "label", type: "string", default: "-" },
          { name: "badge", type: "number", default: "-" },
          { name: "onPress", type: "() => void", default: "-" },
          { name: "className", type: "string", default: "-" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Bottom tab navigation with badge support.</li>
          <li>Each tab has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="tab"</code> with selected state.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/tab-bar.tsx" />
      </div>
    </div>
  );
}
