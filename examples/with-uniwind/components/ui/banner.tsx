import React from "react";
import { View, Text, Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "flex-row items-center rounded-xl px-4 py-3 gap-3 border",
  {
    variants: {
      variant: {
        default: "bg-zinc-100/60 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-800",
        info: "bg-zinc-900/8 dark:bg-zinc-50/8 border-zinc-900/15 dark:border-zinc-50/15",
        warning: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-900/40",
        destructive: "bg-red-500/8 dark:bg-red-900/8 border-red-500/15 dark:border-red-900/15",
        success: "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900/40",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const bannerTextVariants = cva("text-sm font-medium", {
  variants: {
    variant: {
      default: "text-zinc-950 dark:text-zinc-50",
      info: "text-zinc-900 dark:text-zinc-50",
      warning: "text-yellow-800 dark:text-yellow-200",
      destructive: "text-red-500 dark:text-red-900",
      success: "text-green-800 dark:text-green-200",
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

export function Banner({
  variant,
  className,
  children,
  icon,
  action,
  onDismiss,
  ...props
}: BannerProps) {
  return (
    <View
      className={cn(bannerVariants({ variant }), className)}
      accessibilityRole="alert"
      {...props}
    >
      {icon}
      <Text className={cn(bannerTextVariants({ variant }), "flex-1")}>
        {children}
      </Text>
      {action && (
        <Pressable
          onPress={action.onPress}
          accessible={true}
          accessibilityRole="button"
          className="min-h-8 min-w-8 items-center justify-center"
        >
          <Text
            className={cn(
              bannerTextVariants({ variant }),
              "font-semibold underline"
            )}
          >
            {action.label}
          </Text>
        </Pressable>
      )}
      {onDismiss && (
        <Pressable
          onPress={onDismiss}
          className="ml-1 min-h-8 min-w-8 items-center justify-center rounded-lg"
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
        >
          <Text
            className={cn(
              bannerTextVariants({ variant }),
              "text-base opacity-60"
            )}
          >
            ×
          </Text>
        </Pressable>
      )}
    </View>
  );
}
