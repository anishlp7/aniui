import React from "react";
import { View, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva("rounded-lg border p-4", {
  variants: {
    variant: {
      default: "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950",
      destructive: "border-red-500/50 dark:border-red-900/50 bg-red-500/10 dark:bg-red-900/10",
      success: "border-green-500/50 bg-green-500/10",
      warning: "border-yellow-500/50 bg-yellow-500/10",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const alertTitleVariants = cva("text-base font-semibold mb-1", {
  variants: {
    variant: {
      default: "text-zinc-950 dark:text-zinc-50",
      destructive: "text-red-500 dark:text-red-900",
      success: "text-green-600",
      warning: "text-yellow-600",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface AlertProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof alertVariants> {
  className?: string;
  title?: string;
  titleClassName?: string;
  children?: React.ReactNode;
}

export function Alert({ variant, className, title, titleClassName, children, ...props }: AlertProps) {
  return (
    <View className={cn(alertVariants({ variant }), className)} accessibilityRole="alert" {...props}>
      {title && <Text className={cn(alertTitleVariants({ variant }), titleClassName)}>{title}</Text>}
      {children}
    </View>
  );
}

export interface AlertDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return <Text className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)} {...props} />;
}
