import React from "react";
import { View } from "react-native";
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Rect } from "react-native-svg";
import { cn } from "@/lib/utils";

export interface GradientPoint {
  x: number;
  y: number;
}

export interface GradientProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  colors?: string[];
  start?: GradientPoint;
  end?: GradientPoint;
  children?: React.ReactNode;
}

export function Gradient({
  colors = ["#18181b", "#3f3f46"],
  start = { x: 0, y: 0 },
  end = { x: 0, y: 1 },
  className,
  children,
  ...props
}: GradientProps) {
  // useId output contains ":" which is unsafe inside url(#...) references.
  const id = `grad-${React.useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <View className={cn("overflow-hidden", className)} {...props}>
      <Svg
        pointerEvents="none"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <Defs>
          <SvgLinearGradient
            id={id}
            x1={`${start.x * 100}%`}
            y1={`${start.y * 100}%`}
            x2={`${end.x * 100}%`}
            y2={`${end.y * 100}%`}
          >
            {colors.map((color, i) => (
              <Stop
                key={i}
                offset={`${(i / Math.max(colors.length - 1, 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </SvgLinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#${id})`} />
      </Svg>
      {children}
    </View>
  );
}
