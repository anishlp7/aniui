import React from "react";
import { View, Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { Star } from "lucide-react-native";
import { cn } from "@/lib/utils";

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

const starSizes = { sm: 16, md: 20, lg: 24 } as const;

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
          <Star
            size={starSizes[s]}
            color={filled ? "#facc15" : "#71717a"}
            fill={filled ? "#facc15" : "none"}
          />
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
