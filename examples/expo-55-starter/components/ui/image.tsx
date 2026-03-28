import React, { useState } from "react";
import { Image as RNImage, View, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const imageVariants = cva("overflow-hidden bg-muted", {
  variants: {
    rounded: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: { rounded: "md" },
});

export interface ImageProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RNImage>, "source">,
    VariantProps<typeof imageVariants> {
  className?: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  fallback?: React.ReactNode;
}

export function Image({ rounded, className, src, alt, width, height, fallback, style, ...props }: ImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <View className={cn(imageVariants({ rounded }), className)} style={[width && height ? { width, height } : undefined, style as object]}>
      {status === "loading" && (
        <View className="absolute inset-0 items-center justify-center bg-muted">
          <View className="h-8 w-8 rounded-full bg-muted-foreground/10" />
        </View>
      )}
      {status === "error" ? (
        fallback ?? (
          <View className="flex-1 items-center justify-center bg-muted">
            <Text className="text-xs text-muted-foreground">Failed to load</Text>
          </View>
        )
      ) : (
        <RNImage
          source={{ uri: src }}
          className="w-full h-full"
          accessibilityLabel={alt}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          {...props}
        />
      )}
    </View>
  );
}
