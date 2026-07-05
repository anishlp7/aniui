import React, { useRef, useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { cn } from "@/lib/utils";

export interface MenubarProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function Menubar({ className, ...props }: MenubarProps) {
  return (
    <View
      className={cn("h-10 flex-row items-center gap-1 rounded-md border border-border bg-card px-1", className)}
      accessibilityRole="menubar"
      {...props}
    />
  );
}

export interface MenubarMenuProps {
  trigger: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function MenubarMenu({ trigger, className, children }: MenubarMenuProps) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0 });
  const ref = useRef<View>(null);

  const openMenu = () => {
    // Open immediately so the menu never depends on a measure callback firing;
    // measureInWindow (not measure) then refines the anchor inside the Modal.
    setOpen(true);
    ref.current?.measureInWindow((x, y, _w, h) => {
      setAnchor({ x, y: y + h + 4 });
    });
  };

  return (
    <>
      <Pressable
        ref={ref}
        onPress={openMenu}
        accessibilityRole="menuitem"
        accessible
        className="h-8 justify-center rounded-sm px-3"
      >
        {typeof trigger === "string" ? <Text className="text-sm font-medium text-foreground">{trigger}</Text> : trigger}
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={{ flex: 1 }} onPress={() => setOpen(false)} accessible={false}>
          <View
            className={cn("min-w-40 rounded-md border border-border bg-card p-1", className)}
            style={{ position: "absolute", left: anchor.x, top: anchor.y }}
            accessibilityRole="menu"
          >
            {children}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

export interface MenubarItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

export function MenubarItem({ className, children, ...props }: MenubarItemProps) {
  return (
    <Pressable
      accessibilityRole="menuitem"
      accessible
      className={cn("min-h-10 justify-center rounded-sm px-2", className)}
      {...props}
    >
      {typeof children === "string" ? <Text className="text-sm text-foreground">{children}</Text> : children}
    </Pressable>
  );
}
