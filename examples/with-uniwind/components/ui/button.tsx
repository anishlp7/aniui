import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-md min-h-12 min-w-12",
  {
    variants: {
      variant: {
        default: "bg-zinc-900 dark:bg-zinc-50",
        secondary: "bg-zinc-100 dark:bg-zinc-800",
        outline: "border border-zinc-200 dark:border-zinc-800 bg-transparent",
        ghost: "bg-transparent",
        destructive: "bg-red-500 dark:bg-red-900",
        link: "bg-transparent",
      },
      size: {
        sm: "px-3 py-1.5 gap-1.5",
        md: "px-4 py-2.5 gap-2",
        lg: "px-6 py-3.5 gap-2.5",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

const buttonTextVariants = cva("text-center font-medium", {
  variants: {
    variant: {
      default: "text-zinc-50 dark:text-zinc-900",
      secondary: "text-zinc-900 dark:text-zinc-50",
      outline: "text-zinc-950 dark:text-zinc-50",
      ghost: "text-zinc-950 dark:text-zinc-50",
      destructive: "text-zinc-50 dark:text-zinc-50",
      link: "text-zinc-900 dark:text-zinc-50 underline",
    },
    size: { sm: "text-sm", md: "text-base", lg: "text-lg", icon: "text-sm" },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  textClassName?: string;
  children?: string;
  icon?: React.ReactNode;
  iconAfter?: React.ReactNode;
  loading?: boolean;
}

export function Button({ variant, size, className, textClassName, children, icon, iconAfter, loading, disabled, ...props }: ButtonProps) {
  const isDisabled = disabled || loading;
  const light = variant === "default" || variant === "destructive";

  return (
    <Pressable
      className={cn(buttonVariants({ variant, size }), isDisabled && "opacity-50", "active:opacity-80", className)}
      accessibilityRole="button"
      accessible={true}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={light ? "#fafafa" : "#18181b"} />
      ) : icon ?? null}
      {children ? (
        <Text className={cn(buttonTextVariants({ variant, size }), textClassName)}>{children}</Text>
      ) : null}
      {!loading && iconAfter ? iconAfter : null}
    </Pressable>
  );
}
