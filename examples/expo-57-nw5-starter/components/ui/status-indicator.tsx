import React from "react";
import { View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusVariants = cva("rounded-full", {
  variants: {
    status: {
      online: "bg-green-500",
      offline: "bg-muted-foreground",
      away: "bg-amber-500",
      busy: "bg-destructive",
    },
    size: {
      sm: "h-2 w-2",
      md: "h-3 w-3",
      lg: "h-4 w-4",
    },
  },
  defaultVariants: { status: "offline", size: "md" },
});

export interface StatusIndicatorProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof statusVariants> {
  className?: string;
  pulse?: boolean;
}

export function StatusIndicator({ status, size, pulse, className, ...props }: StatusIndicatorProps) {
  return (
    <View
      className={cn(
        statusVariants({ status, size }),
        pulse && status === "online" && "animate-pulse",
        className
      )}
      accessibilityLabel={`Status: ${status ?? "offline"}`}
      {...props}
    />
  );
}
