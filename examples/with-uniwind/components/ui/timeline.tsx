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
    <View className={cn("", className)} accessibilityRole="list" {...props}>
      {children}
    </View>
  );
}

const dotVariants = cva("h-3 w-3 rounded-full", {
  variants: {
    variant: {
      default: "bg-zinc-900 dark:bg-zinc-50",
      completed: "bg-green-500",
      active: "bg-zinc-900 dark:bg-zinc-50",
      pending: "bg-zinc-500/40 dark:bg-zinc-400/40",
      destructive: "bg-red-500 dark:bg-red-900",
      success: "bg-green-500",
      muted: "bg-zinc-500 dark:bg-zinc-400",
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
  const isActive = variant === "active";

  return (
    <View className={cn("flex-row", className)} accessibilityRole="listitem" {...props}>
      {/* Dot + Line */}
      <View className="items-center w-6" style={{ paddingTop: 4 }}>
        {icon ?? (
          <View className={cn(dotVariants({ variant }), isActive && "border-2 border-zinc-900/30 dark:border-zinc-50/30")}>
            {variant === "completed" && (
              <View className="flex-1 items-center justify-center">
                <Text className="text-[8px] text-white leading-none">✓</Text>
              </View>
            )}
          </View>
        )}
        {!isLast && <View className="flex-1 w-px bg-zinc-200 dark:bg-zinc-800 mt-1.5 mb-0" />}
      </View>

      {/* Content */}
      <View className={cn("flex-1 ml-3 pb-6", isLast && "pb-0")}>
        <View className="flex-row items-start justify-between gap-2">
          <Text className={cn("text-sm font-medium flex-1", variant === "pending" ? "text-zinc-500 dark:text-zinc-400" : "text-zinc-950 dark:text-zinc-50")}>{title}</Text>
          {time && <Text className="text-[11px] text-zinc-500 dark:text-zinc-400">{time}</Text>}
        </View>
        {description && (
          <Text className={cn("text-[13px] leading-5 mt-1", variant === "pending" ? "text-zinc-500/60 dark:text-zinc-400/60" : "text-zinc-500 dark:text-zinc-400")}>{description}</Text>
        )}
      </View>
    </View>
  );
}
