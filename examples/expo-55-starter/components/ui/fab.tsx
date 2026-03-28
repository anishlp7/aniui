import React from "react";
import { Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const fabVariants = cva(
  "items-center justify-center shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        destructive: "bg-destructive",
      },
      size: {
        sm: "h-12 w-12 rounded-full",
        md: "h-14 w-14 rounded-full",
        lg: "h-16 w-16 rounded-full",
        extended: "h-14 rounded-full px-6 flex-row gap-2",
      },
      position: {
        "bottom-right": "absolute bottom-6 right-6",
        "bottom-left": "absolute bottom-6 left-6",
        "bottom-center": "absolute bottom-6 self-center",
        none: "",
      },
    },
    defaultVariants: { variant: "default", size: "md", position: "bottom-right" },
  }
);

const fabTextVariants = cva("font-semibold", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface FABProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof fabVariants> {
  className?: string;
  icon?: React.ReactNode;
  label?: string;
}

export function FAB({ variant, size, position, className, icon, label, ...props }: FABProps) {
  return (
    <Pressable className={cn(fabVariants({ variant, size: label ? "extended" : size, position }), className)} accessible={true} accessibilityRole="button" accessibilityLabel={label ?? "Action button"} {...props}>
      {icon}
      {label && <Text className={cn(fabTextVariants({ variant }), "text-base")}>{label}</Text>}
    </Pressable>
  );
}
