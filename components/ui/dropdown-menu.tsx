import React, { createContext, useContext, useRef, useState } from "react";
import { View, Text, Pressable, Modal, Dimensions } from "react-native";
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

  // Vertical: respect side prop
  const posY = side === "top"
    ? { bottom: screenH - layout.y + gap }
    : { top: layout.y + layout.h + gap };

  // Horizontal: align to trigger
  const leftAligned = Math.max(8, Math.min(layout.x, screenW - menuWidth));
  const rightAligned = Math.max(8, Math.min(layout.x + layout.w - menuWidth, screenW - menuWidth));
  const posX = align === "end" ? rightAligned : leftAligned;

  return (
    <MenuCtx.Provider value={{ close: () => setOpen(false) }}>
      <Pressable ref={ref} onPress={onOpen} accessible={true} accessibilityRole="button">
        <View pointerEvents="none">{trigger}</View>
      </Pressable>
      {open && (
        <Modal transparent animationType="fade" onRequestClose={() => setOpen(false)}>
          <Pressable className="absolute inset-0" onPress={() => setOpen(false)} />
          <View style={{ position: "absolute", ...posY, left: posX }}>
            {content}
          </View>
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
    <Pressable className={cn("flex-row items-center rounded-md px-3 py-2.5 min-h-11", className)}
      onPress={(e) => { onPress?.(e); close(); }} accessible={true} accessibilityRole="menuitem" {...props}>
      {typeof children === "string" ? (
        <Text className={cn("text-sm", destructive ? "text-destructive" : "text-foreground")}>{children}</Text>
      ) : children}
    </Pressable>
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <View className={cn("my-1 h-px bg-border", className)} />;
}
