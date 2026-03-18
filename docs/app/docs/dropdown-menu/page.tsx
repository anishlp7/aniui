"use client";
import React from "react";
import { PreviewDropdownMenu } from "@/components/preview/dropdown-menu";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

const installCode = `npx aniui add dropdown-menu`;
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
const sourceCode = `import React, { createContext, useContext, useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const MenuCtx = createContext<{ close: () => void }>({ close: () => {} });
export interface DropdownMenuProps { children: React.ReactNode }
export function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const trigger = React.Children.toArray(children).find((c) => React.isValidElement(c) && c.type === DropdownMenuTrigger);
  const content = React.Children.toArray(children).find((c) => React.isValidElement(c) && c.type === DropdownMenuContent);
  return (
    <MenuCtx.Provider value={{ close: () => setOpen(false) }}>
      <Pressable onPress={() => setOpen(true)} accessible={true} accessibilityRole="button">{trigger}</Pressable>
      {open && (
        <Modal transparent animationType="none" onRequestClose={() => setOpen(false)}>
          <Pressable className="flex-1" onPress={() => setOpen(false)}>
            <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(100)} className="flex-1 items-center justify-center">
              <Pressable onPress={(e) => e.stopPropagation()}>{content}</Pressable>
            </Animated.View>
          </Pressable>
        </Modal>
      )}
    </MenuCtx.Provider>
  );
}
export function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export interface DropdownMenuContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}
export function DropdownMenuContent({ className, children, ...props }: DropdownMenuContentProps) {
  return <View className={cn("min-w-[180px] rounded-lg border border-border bg-card p-1 shadow-lg", className)} {...props}>{children}</View>;
}
export interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children: React.ReactNode;
  destructive?: boolean;
}
export function DropdownMenuItem({ className, children, destructive, onPress, ...props }: DropdownMenuItemProps) {
  const { close } = useContext(MenuCtx);
  return (
    <Pressable
      className={cn("flex-row items-center rounded-md px-3 py-2.5 min-h-11", className)}
      onPress={(e) => { onPress?.(e); close(); }}
      accessible={true} accessibilityRole="menuitem" {...props}
    >
      {typeof children === "string" ? (
        <Text className={cn("text-sm", destructive ? "text-destructive" : "text-foreground")}>{children}</Text>
      ) : children}
    </Pressable>
  );
}
export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <View className={cn("my-1 h-px bg-border", className)} />;
}`;
export default function DropdownMenuPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dropdown Menu</h1>
        <p className="text-muted-foreground text-lg">A context menu with items, separators, and destructive actions. Uses a Modal overlay with reanimated fade animation.</p>
      </div>
      <ComponentPlayground code={usageCode}>
        <PreviewDropdownMenu />
      </ComponentPlayground>
      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={installCode} />
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
          { component: "DropdownMenuContent", name: "className", type: "string" },
          { component: "DropdownMenuItem", name: "destructive", type: "boolean", default: "false" },
          { component: "DropdownMenuItem", name: "onPress", type: "() => void" },
        ]} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/dropdown-menu.tsx" />
      </div>
    </div>
  );
}