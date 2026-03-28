import React from "react";
import { View, Pressable, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const ratingVariants = cva("flex-row items-center", {
  variants: {
    size: {
      sm: "gap-0.5",
      md: "gap-1",
      lg: "gap-1.5",
    },
  },
  defaultVariants: { size: "md" },
});

const starSizes = { sm: "text-base", md: "text-xl", lg: "text-2xl" } as const;

export interface RatingProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof ratingVariants> {
  className?: string;
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export function Rating({ size, className, value, max = 5, onChange, readOnly, ...props }: RatingProps) {
  const s = size ?? "md";
  return (
    <View className={cn(ratingVariants({ size }), className)} accessibilityRole="adjustable" accessibilityValue={{ min: 0, max, now: value }} {...props}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < value;
        const star = (
          <Text className={cn(starSizes[s], filled ? "text-yellow-400" : "text-muted-foreground/30")}>★</Text>
        );
        return readOnly ? (
          <View key={i}>{star}</View>
        ) : (
          <Pressable key={i} onPress={() => onChange?.(i + 1)} accessible={true} accessibilityRole="button" accessibilityLabel={`${i + 1} star`}>
            {star}
          </Pressable>
        );
      })}
    </View>
  );
}
