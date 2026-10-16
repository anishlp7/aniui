import React, { createContext, useContext, useState } from "react";
import { View, Pressable } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Menu } from "lucide-react-native";
import { duration } from "@/components/ui/animate";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";

interface SidebarCtx {
  open: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
}
const Ctx = createContext<SidebarCtx | null>(null);

export function useSidebar(): SidebarCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSidebar must be used within <SidebarProvider>");
  return ctx;
}

export interface SidebarProviderProps {
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function SidebarProvider({ defaultOpen = true, children }: SidebarProviderProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Ctx.Provider value={{ open, setOpen, toggle: () => setOpen((o) => !o) }}>
      <View className="flex-1 flex-row">{children}</View>
    </Ctx.Provider>
  );
}

export interface SidebarProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  width?: number;
  children?: React.ReactNode;
}

export function Sidebar({ className, width = 256, children, ...props }: SidebarProps) {
  const { open } = useSidebar();
  const style = useAnimatedStyle(() => ({
    width: withTiming(open ? width : 0, { duration: duration.normal }),
  }));
  return (
    <Animated.View style={[{ overflow: "hidden" }, style]}>
      <View
        className={cn("h-full border-r border-border bg-card p-3", className)}
        style={{ width }}
        accessibilityRole="menu"
        {...props}
      >
        {children}
      </View>
    </Animated.View>
  );
}

export interface SidebarTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

export function SidebarTrigger({ className, children, ...props }: SidebarTriggerProps) {
  const { toggle } = useSidebar();
  const colors = useThemeColors();
  return (
    <Pressable
      onPress={toggle}
      accessibilityRole="button"
      accessible
      className={cn("min-h-12 min-w-12 items-center justify-center", className)}
      {...props}
    >
      {children ?? <Menu size={18} color={colors.foreground} />}
    </Pressable>
  );
}
