import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const safeAreaVariants = cva("flex-1", {
  variants: {
    variant: {
      default: "bg-background",
      card: "bg-card",
      transparent: "bg-transparent",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface SafeAreaProps
  extends React.ComponentPropsWithoutRef<typeof SafeAreaView>,
    VariantProps<typeof safeAreaVariants> {
  className?: string;
}

export function SafeArea({ variant, className, ...props }: SafeAreaProps) {
  return (
    <SafeAreaView
      className={cn(safeAreaVariants({ variant }), className)}
      {...props}
    />
  );
}
