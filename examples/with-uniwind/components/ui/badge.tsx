import React from "react";
import { View, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("flex-row items-center rounded-full px-2.5 py-0.5", {
  variants: {
    variant: {
      default: "bg-zinc-900 dark:bg-zinc-50",
      secondary: "bg-zinc-100 dark:bg-zinc-800",
      outline: "border border-zinc-200 dark:border-zinc-800 bg-transparent",
      destructive: "bg-red-500 dark:bg-red-900",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const badgeTextVariants = cva("text-xs font-semibold", {
  variants: {
    variant: {
      default: "text-zinc-50 dark:text-zinc-900",
      secondary: "text-zinc-900 dark:text-zinc-50",
      outline: "text-zinc-950 dark:text-zinc-50",
      destructive: "text-zinc-50 dark:text-zinc-50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof badgeVariants> {
  className?: string;
  textClassName?: string;
  children: string;
}

export function Badge({ variant, className, textClassName, children, ...props }: BadgeProps) {
  return (
    <View className={cn(badgeVariants({ variant }), className)} {...props}>
      <Text className={cn(badgeTextVariants({ variant }), textClassName)}>{children}</Text>
    </View>
  );
}
