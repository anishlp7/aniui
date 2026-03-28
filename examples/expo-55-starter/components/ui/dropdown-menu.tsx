import React, { createContext, useContext, useState } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "../../lib/utils";

const MenuCtx = createContext<{ close: () => void }>({ close: () => {} });

export interface DropdownMenuProps { children: React.ReactNode }

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const trigger = React.Children.toArray(children).find((c) => React.isValidElement(c) && c.type === DropdownMenuTrigger);
  const content = React.Children.toArray(children).find((c) => React.isValidElement(c) && c.type === DropdownMenuContent);
  return (
    <MenuCtx.Provider value={{ close: () => setOpen(false) }}>
      <Pressable onPress={() => setOpen(true)} accessible={true} accessibilityRole="button">
        <View pointerEvents="none">{trigger}</View>
      </Pressable>
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
}
