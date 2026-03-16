import React from "react";
import { Text } from "react-native";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function Label({ className, ...props }: LabelProps) {
  return (
    <Text
      className={cn("text-sm font-medium text-foreground leading-none", className)}
      {...props}
    />
  );
}
