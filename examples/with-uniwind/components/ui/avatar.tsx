import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva("items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden", {
  variants: {
    size: {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const avatarTextVariants = cva("font-medium text-zinc-500 dark:text-zinc-400", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof avatarVariants> {
  className?: string;
  src?: string;
  fallback?: string;
}

export function Avatar({ size, className, src, fallback, ...props }: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <View className={cn(avatarVariants({ size }), className)} {...props}>
      {src && !hasError ? (
        <Image
          source={{ uri: src }}
          className="h-full w-full"
          resizeMode="cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <Text className={cn(avatarTextVariants({ size }))}>{fallback ?? "?"}</Text>
      )}
    </View>
  );
}
