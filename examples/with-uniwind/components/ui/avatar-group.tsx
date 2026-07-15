import React from "react";
import { View, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// spacing is applied as a negative left margin per item (not -space-x-*) because
// neither NativeWind nor Uniwind supports Tailwind's sibling-selector space utilities.
const avatarGroupItemVariants = cva("rounded-full border-2 border-background", {
  variants: {
    spacing: {
      sm: "-ml-2",
      md: "-ml-3",
      lg: "-ml-4",
    },
  },
  defaultVariants: {
    spacing: "md",
  },
});

export interface AvatarGroupProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof avatarGroupItemVariants> {
  className?: string;
  max?: number;
  children?: React.ReactNode;
}

export function AvatarGroup({ spacing, max = 4, className, children, ...props }: AvatarGroupProps) {
  const items = React.Children.toArray(children);
  const visible = items.slice(0, max);
  const overflow = items.length - visible.length;

  return (
    <View className={cn("flex-row items-center", className)} {...props}>
      {visible.map((child, index) => (
        <View
          key={index}
          className={cn(avatarGroupItemVariants({ spacing }), index === 0 && "ml-0")}
        >
          {child}
        </View>
      ))}
      {overflow > 0 && (
        <View
          className={cn(
            avatarGroupItemVariants({ spacing }),
            "h-10 w-10 items-center justify-center bg-muted",
            visible.length === 0 && "ml-0"
          )}
        >
          <Text className="text-sm font-medium text-muted-foreground">+{overflow}</Text>
        </View>
      )}
    </View>
  );
}
