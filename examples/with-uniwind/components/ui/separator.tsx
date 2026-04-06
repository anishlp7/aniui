import React from "react";
import { View } from "react-native";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Separator({ orientation = "horizontal", className, ...props }: SeparatorProps) {
  return (
    <View
      className={cn(
        "bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  );
}
