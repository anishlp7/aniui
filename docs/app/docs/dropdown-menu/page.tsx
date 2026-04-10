"use client";
import React from "react";
import { PreviewDropdownMenu } from "@/components/preview/dropdown-menu";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";
import { PreviewToggle } from "@/components/preview-toggle";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add dropdown-menu`;
const usageCode = `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onPress={() => {}}>Edit</DropdownMenuItem>
    <DropdownMenuItem onPress={() => {}}>Duplicate</DropdownMenuItem>
    <DropdownMenuItem onPress={() => {}}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;
const separatorCode = `<DropdownMenu>
  <DropdownMenuTrigger><Button>Options</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onPress={() => {}}>Edit</DropdownMenuItem>
    <DropdownMenuItem onPress={() => {}}>Share</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem destructive onPress={() => {}}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;
const positioningCode = `// Menu appears above the trigger, aligned to the right edge
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline">More</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent side="top" align="end">
    <DropdownMenuItem onPress={() => {}}>Profile</DropdownMenuItem>
    <DropdownMenuItem onPress={() => {}}>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem destructive onPress={() => {}}>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;
const sourceCode = `import React from "react";
import { View, Text, Pressable } from "react-native";
import * as DropdownMenuPrimitive from "@rn-primitives/dropdown-menu";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface DropdownMenuProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DropdownMenu({ children, open, onOpenChange }: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root open={open} onOpenChange={onOpenChange}>{children}</DropdownMenuPrimitive.Root>;
}

export function DropdownMenuTrigger({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof Pressable> & { className?: string; children: React.ReactNode }) {
  return (
    <DropdownMenuPrimitive.Trigger asChild>
      <Pressable className={cn("min-h-12 min-w-12", className)} accessible={true} accessibilityRole="button" {...props}>
        {children}
      </Pressable>
    </DropdownMenuPrimitive.Trigger>
  );
}

export interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

export function DropdownMenuContent({ className, children, side = "bottom", sideOffset = 4, align = "start", ...props }: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Overlay className="absolute inset-0" />
      <DropdownMenuPrimitive.Content side={side} sideOffset={sideOffset} align={align} avoidCollisions>
        <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(100)}>
          <View className={cn("min-w-[180px] rounded-lg border border-border bg-card p-1 shadow-lg", className)} {...props}>
            {children}
          </View>
        </Animated.View>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
}

export interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children: React.ReactNode;
  destructive?: boolean;
}

export function DropdownMenuItem({ className, children, destructive, ...props }: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item asChild>
      <Pressable className={cn("flex-row items-center rounded-md px-3 py-2.5 min-h-11", className)} accessible={true} accessibilityRole="menuitem" {...props}>
        {typeof children === "string" ? (
          <Text className={cn("text-sm", destructive ? "text-destructive" : "text-foreground")}>{children}</Text>
        ) : children}
      </Pressable>
    </DropdownMenuPrimitive.Item>
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <DropdownMenuPrimitive.Separator className={cn("my-1 h-px bg-border", className)} />;
}`;
export default function DropdownMenuPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dropdown Menu</h1>
        <p className="text-muted-foreground text-lg">A context menu with items, separators, and destructive actions. Measures the trigger position and renders the menu nearby using a Modal overlay.</p>
      </div>
      <ComponentPlayground code={usageCode}>
        <PreviewDropdownMenu />
      </ComponentPlayground>
      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <AddComponentTabs names="dropdown-menu" />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Positioning</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Pass <code>side</code> and <code>align</code> to <code>DropdownMenuContent</code> to control positioning. Collision detection automatically flips the menu if there isn&apos;t enough space.
        </p>
        <ComponentPlayground code={positioningCode}>
          <PreviewDropdownMenu />
        </ComponentPlayground>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">With Separator &amp; Destructive</h2>
        <p className="text-sm text-muted-foreground mb-4">Use <code>DropdownMenuSeparator</code> to divide groups and the <code>destructive</code> prop for danger actions.</p>
        <ComponentPlayground code={separatorCode}>
          <PreviewDropdownMenu />
        </ComponentPlayground>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Props</h2>
        <PropsTable props={[
          { component: "DropdownMenu", name: "children", type: "ReactNode" },
          { component: "DropdownMenu", name: "open", type: "boolean" },
          { component: "DropdownMenu", name: "onOpenChange", type: "(open: boolean) => void" },
          { component: "DropdownMenuContent", name: "side", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"' },
          { component: "DropdownMenuContent", name: "sideOffset", type: "number", default: "4" },
          { component: "DropdownMenuContent", name: "align", type: '"start" | "center" | "end"', default: '"start"' },
          { component: "DropdownMenuContent", name: "className", type: "string" },
          { component: "DropdownMenuItem", name: "destructive", type: "boolean", default: "false" },
          { component: "DropdownMenuItem", name: "onPress", type: "() => void" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/dropdown-menu</code> for menu semantics</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;menuitem&quot;</code> on each item</li>
          <li>BackHandler dismisses on Android</li>
          <li>Collision detection for screen edge positioning</li>
          <li>Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&lt;PortalHost /&gt;</code> at app root</li>
        </ul>
      </div>
      {/* Source */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/dropdown-menu.tsx" />
      </div>
    </div>
  );
}
