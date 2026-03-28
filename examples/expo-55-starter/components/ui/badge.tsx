import React from "react";
import { View, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva("flex-row items-center rounded-full px-2.5 py-0.5", {
  variants: {
    variant: {
      default: "bg-primary",
      secondary: "bg-secondary",
      outline: "border border-border bg-transparent",
      destructive: "bg-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const badgeTextVariants = cva("text-xs font-semibold", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      outline: "text-foreground",
      destructive: "text-destructive-foreground",
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
