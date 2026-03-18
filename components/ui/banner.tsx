import React from "react";
import { View, Text, Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva("flex-row items-center px-4 py-3 gap-3", {
  variants: {
    variant: {
      default: "bg-primary",
      info: "bg-blue-500",
      warning: "bg-yellow-500",
      destructive: "bg-destructive",
      success: "bg-green-600",
    },
  },
  defaultVariants: { variant: "default" },
});

const bannerTextVariants = cva("text-sm font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      info: "text-white",
      warning: "text-white",
      destructive: "text-destructive-foreground",
      success: "text-white",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BannerProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof bannerVariants> {
  className?: string;
  children: string;
  icon?: React.ReactNode;
  action?: { label: string; onPress: () => void };
  onDismiss?: () => void;
}

export function Banner({ variant, className, children, icon, action, onDismiss, ...props }: BannerProps) {
  return (
    <View className={cn(bannerVariants({ variant }), className)} accessibilityRole="alert" {...props}>
      {icon}
      <Text className={cn(bannerTextVariants({ variant }), "flex-1")}>{children}</Text>
      {action && (
        <Pressable onPress={action.onPress} accessible={true} accessibilityRole="button">
          <Text className={cn(bannerTextVariants({ variant }), "underline")}>{action.label}</Text>
        </Pressable>
      )}
      {onDismiss && (
        <Pressable onPress={onDismiss} className="ml-1" accessible={true} accessibilityRole="button" accessibilityLabel="Dismiss">
          <Text className={cn(bannerTextVariants({ variant }))}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}
