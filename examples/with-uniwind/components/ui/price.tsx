import React from "react";
import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

export interface PriceProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  amount: number;
  currency?: string;
  locale?: string;
  strikethrough?: boolean;
  prefix?: string;
  textClassName?: string;
}

export function Price({
  className,
  amount,
  currency = "USD",
  locale = "en-US",
  strikethrough,
  prefix,
  textClassName,
  ...props
}: PriceProps) {
  const formatted = new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);

  return (
    <View className={cn("flex-row items-baseline", className)} {...props}>
      {prefix && <Text className={cn("text-sm text-zinc-500 dark:text-zinc-400 mr-1", textClassName)}>{prefix}</Text>}
      <Text
        className={cn(
          "text-lg font-semibold text-zinc-950 dark:text-zinc-50",
          strikethrough && "line-through text-zinc-500 dark:text-zinc-400",
          textClassName
        )}
      >
        {formatted}
      </Text>
    </View>
  );
}
