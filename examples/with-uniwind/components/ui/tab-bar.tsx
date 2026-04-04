import React from "react";
import { View, Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabBarVariants = cva("flex-row border-t pb-6 pt-2 px-2", {
  variants: {
    variant: {
      default: "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800",
      card: "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800",
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
        <Text className={cn("text-xs", active ? "text-zinc-900 dark:text-zinc-50 font-medium" : "text-zinc-500 dark:text-zinc-400")}>
          {label}
        </Text>
      )}
      {badge !== undefined && badge > 0 && (
        <View className="absolute -top-1 right-1/4 bg-red-500 dark:bg-red-900 rounded-full min-w-5 h-5 items-center justify-center px-1">
          <Text className="text-zinc-50 dark:text-zinc-50 text-[10px] font-bold">
            {badge > 99 ? "99+" : badge}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
