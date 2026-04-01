import React from "react";
import { View, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface TimelineProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function Timeline({ className, children, ...props }: TimelineProps) {
  return (
    <View className={cn("gap-0", className)} accessibilityRole="list" {...props}>
      {children}
    </View>
  );
}

const dotVariants = cva("h-3 w-3 rounded-full z-10", {
  variants: {
    variant: {
      default: "bg-primary",
      success: "bg-green-500",
      destructive: "bg-destructive",
      muted: "bg-muted-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface TimelineItemProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof dotVariants> {
  className?: string;
  title: string;
  description?: string;
  time?: string;
  icon?: React.ReactNode;
  isLast?: boolean;
}

export function TimelineItem({
  variant,
  className,
  title,
  description,
  time,
  icon,
  isLast,
  ...props
}: TimelineItemProps) {
  return (
    <View className={cn("flex-row", className)} accessibilityRole="listitem" {...props}>
      <View className="items-center mr-3">
        {icon ?? <View className={dotVariants({ variant })} />}
        {!isLast && <View className="flex-1 w-0.5 bg-border mt-1" />}
      </View>
      <View className={cn("flex-1 pb-6", isLast && "pb-0")}>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-medium text-foreground">{title}</Text>
          {time && <Text className="text-xs text-muted-foreground">{time}</Text>}
        </View>
        {description && (
          <Text className="text-sm text-muted-foreground mt-1">{description}</Text>
        )}
      </View>
    </View>
  );
}
