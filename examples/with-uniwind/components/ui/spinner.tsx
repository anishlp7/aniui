import React from "react";
import { ActivityIndicator, View } from "react-native";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";

const sizeMap = { sm: "small", md: "small", lg: "large" } as const;

export interface SpinnerProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

export function Spinner({ size = "md", color, className, ...props }: SpinnerProps) {
  const colors = useThemeColors();
  return (
    <View className={cn("items-center justify-center", className)} {...props}>
      <ActivityIndicator
        size={sizeMap[size]}
        color={color ?? colors.foreground}
        accessibilityRole="progressbar"
      />
    </View>
  );
}
