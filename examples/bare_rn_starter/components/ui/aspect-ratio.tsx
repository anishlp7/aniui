import React from "react";
import { View } from "react-native";
import { cn } from "../../lib/utils";

export interface AspectRatioProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  ratio?: number;
  children?: React.ReactNode;
}

// `aspectRatio` is a dynamic numeric layout value, so it goes through the style
// prop — NativeWind/Uniwind only expose static `aspect-*` utility classes.
export function AspectRatio({ ratio = 1, className, style, children, ...props }: AspectRatioProps) {
  return (
    <View
      className={cn("w-full overflow-hidden", className)}
      style={[{ aspectRatio: ratio }, style]}
      {...props}
    >
      {children}
    </View>
  );
}
