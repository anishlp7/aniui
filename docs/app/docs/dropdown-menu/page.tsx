"use client";
import React from "react";
import { PreviewDropdownMenu } from "@/components/preview/dropdown-menu";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

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
<DropdownMenu side="top" align="end">
  <DropdownMenuTrigger>
    <Button variant="outline">More</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onPress={() => {}}>Profile</DropdownMenuItem>
    <DropdownMenuItem onPress={() => {}}>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem destructive onPress={() => {}}>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;
const sourceCode = `import React, { createContext, useContext, useRef, useState } from "react";
import { View, Text, Pressable, Modal, Dimensions } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

type Layout = { x: number; y: number; w: number; h: number };
const MenuCtx = createContext<{ close: () => void }>({ close: () => {} });

export interface DropdownMenuProps {
  children: React.ReactNode;
  /** Where the menu appears relative to the trigger */
  side?: "top" | "bottom";
  /** Horizontal alignment relative to the trigger */
  align?: "start" | "end";
}

export function DropdownMenu({ children, side = "bottom", align = "start" }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState<Layout>({ x: 0, y: 0, w: 0, h: 0 });
  const ref = useRef<View>(null);
  const trigger = React.Children.toArray(children).find((c) => React.isValidElement(c) && c.type === DropdownMenuTrigger);
  const content = React.Children.toArray(children).find((c) => React.isValidElement(c) && c.type === DropdownMenuContent);

  const onOpen = () => {
    ref.current?.measureInWindow((x, y, w, h) => {
      setLayout({ x, y, w, h });
      setOpen(true);
    });
  };

  const { width: screenW, height: screenH } = Dimensions.get("window");
  const menuWidth = 196;
  const gap = 4;
  const belowY = layout.y + layout.h + gap;
  const aboveBottom = screenH - layout.y + gap;
  const showAbove = side === "top" || (side === "bottom" && belowY + 200 > screenH);
  const posY = showAbove ? { bottom: aboveBottom } : { top: belowY };
  const leftAligned = Math.max(8, Math.min(layout.x, screenW - menuWidth));
  const rightAligned = Math.max(8, Math.min(layout.x + layout.w - menuWidth, screenW - menuWidth));
  const posX = align === "end" ? rightAligned : leftAligned;

  return (
    <MenuCtx.Provider value={{ close: () => setOpen(false) }}>
      <Pressable ref={ref} onPress={onOpen} accessible={true} accessibilityRole="button">
        <View pointerEvents="none">{trigger}</View>
      </Pressable>
      {open && (
        <Modal transparent animationType="none" onRequestClose={() => setOpen(false)}>
          <Pressable style={{ flex: 1 }} onPress={() => setOpen(false)}>
            <Animated.View entering={FadeIn.duration(150)} exiting={FadeOut.duration(100)} style={{ flex: 1 }}>
              <Pressable onPress={(e) => e.stopPropagation()}
                style={{ position: "absolute", ...posY, left: posX }}>
                {content}
              </Pressable>
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
  className?: string; children?: React.ReactNode;
}
export function DropdownMenuContent({ className, children, ...props }: DropdownMenuContentProps) {
  return <View className={cn("min-w-[180px] rounded-lg border border-border bg-card p-1 shadow-lg", className)} {...props}>{children}</View>;
}
export interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string; children: React.ReactNode; destructive?: boolean;
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
        <p className="text-muted-foreground text-lg">A context menu with items, separators, and destructive actions. Measures the trigger position and renders the menu nearby using a Modal overlay.</p>
      </div>
      <ComponentPlayground code={usageCode}>
        <PreviewDropdownMenu />
      </ComponentPlayground>
      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={installCode} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Positioning</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Use <code>side</code> to control whether the menu opens above or below the trigger, and <code>align</code> to control horizontal alignment. If <code>side=&quot;bottom&quot;</code> but there isn&apos;t enough space, the menu automatically flips to the top.
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
          { component: "DropdownMenu", name: "side", type: '"top" | "bottom"', default: '"bottom"' },
          { component: "DropdownMenu", name: "align", type: '"start" | "end"', default: '"start"' },
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
