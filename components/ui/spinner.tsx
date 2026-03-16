import React from "react";
import { ActivityIndicator, View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("items-center justify-center", {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const sizeMap = { sm: "small", md: "small", lg: "large" } as const;

export interface SpinnerProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof spinnerVariants> {
  className?: string;
  color?: string;
}

export function Spinner({ size, color, className, ...props }: SpinnerProps) {
  return (
    <View className={cn(spinnerVariants({ size }), className)} {...props}>
      <ActivityIndicator
        size={sizeMap[size ?? "md"]}
        color={color ?? "hsl(240, 5.9%, 10%)"}
        accessibilityRole="progressbar"
      />
    </View>
  );
}
