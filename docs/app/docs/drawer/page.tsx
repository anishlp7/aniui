"use client";
import { PreviewDrawer } from "@/components/preview/drawer";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add drawer`;
const usageCode = `import { Drawer, DrawerContent } from "@/components/ui/drawer";

export function MyScreen() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <Text>Drawer content here</Text>
        </DrawerContent>
      </Drawer>
    </>
  );
}`;
const leftDrawerCode = `<Drawer open={open} onOpenChange={setOpen} side="left">
  <DrawerContent>
    <Text>Left drawer content</Text>
  </DrawerContent>
</Drawer>`;
const rightDrawerCode = `<Drawer open={open} onOpenChange={setOpen} side="right">
  <DrawerContent>
    <Text>Right drawer content</Text>
  </DrawerContent>
</Drawer>`;
const sourceCode = `import React, { useEffect } from "react";
import { View, Pressable, Modal } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right";
  children: React.ReactNode;
}
export function Drawer({ open, onOpenChange, side = "left", children }: DrawerProps) {
  const translate = useSharedValue(side === "left" ? -300 : 300);
  const opacity = useSharedValue(0);
  useEffect(() => {
    translate.value = withTiming(open ? 0 : (side === "left" ? -300 : 300), { duration: 250 });
    opacity.value = withTiming(open ? 0.5 : 0, { duration: 250 });
  }, [open, side, translate, opacity]);
  const overlayStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translate.value }],
  }));
  const close = () => onOpenChange(false);
  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={close}>
      <Pressable className="absolute inset-0" onPress={close} accessible={false}>
        <Animated.View className="flex-1 bg-black" style={overlayStyle} />
      </Pressable>
      <Animated.View
        className={cn(
          "absolute top-0 bottom-0 w-72 bg-background border-border",
          side === "left" ? "left-0 border-r" : "right-0 border-l"
        )}
        style={drawerStyle}
        accessibilityRole="menu"
      >
        {children}
      </Animated.View>
    </Modal>
  );
}
export interface DrawerContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}
export function DrawerContent({ className, ...props }: DrawerContentProps) {
  return <View className={cn("flex-1 p-4", className)} {...props} />;
}`;
export default function DrawerPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Drawer</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A sliding panel that emerges from the left or right edge of the screen, ideal for navigation menus and side content.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> (Tier 2).
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="flex flex-wrap items-center gap-4">
          <PreviewDrawer />
        </div>
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="drawer" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Left Drawer */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Left Drawer (Default)</h2>
        <ComponentPlayground code={leftDrawerCode}>
          <div className="flex flex-wrap items-center gap-3">
            <PreviewDrawer side="left" />
          </div>
        </ComponentPlayground>
      </div>
      {/* Right Drawer */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Right Drawer</h2>
        <ComponentPlayground code={rightDrawerCode}>
          <div className="flex flex-wrap items-center gap-3">
            <PreviewDrawer side="right" />
          </div>
        </ComponentPlayground>
      </div>
      {/* Props - Drawer */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">Drawer</h3>
        <PropsTable props={[
          { name: "open", type: "boolean", default: "required" },
          { name: "onOpenChange", type: "(open: boolean) => void", default: "required" },
          { name: "side", type: "\"left\" | \"right\"", default: "\"left\"" },
          { name: "children", type: "ReactNode", default: "required" },
        ]} />
        {/* Props - DrawerContent */}
        <h3 className="text-lg font-medium text-foreground mt-6">DrawerContent</h3>
        <PropsTable props={[
          { name: "className", type: "string" },
          { name: "children", type: "ReactNode" },
        ]} />
        <p className="text-sm text-muted-foreground">
          DrawerContent also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Side drawer with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="menu"</code>.</li>
          <li>Backdrop dismiss and close button are accessible to screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/drawer.tsx" />
      </div>
    </div>
  );
}