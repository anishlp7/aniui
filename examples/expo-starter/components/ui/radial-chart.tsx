import React, { useState } from "react";
import { View, LayoutChangeEvent } from "react-native";
import Svg, { Path, G, Text as SvgText } from "react-native-svg";
import { cn } from "../../lib/utils";

export interface RadialChartSegment {
  value: number;
  maxValue?: number;
  color: string;
  label?: string;
}

export interface RadialChartProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: RadialChartSegment[];
  height?: number;
  strokeWidth?: number;
  showLabels?: boolean;
  startAngle?: number;
  endAngle?: number;
  centerText?: string;
  centerSubText?: string;
}

function polarToCartesian(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarToCartesian(cx, cy, r, start);
  const e = polarToCartesian(cx, cy, r, end);
  const sweep = end - start;
  const large = sweep > 180 ? 1 : 0;
  return `M${s.x},${s.y} A${r},${r} 0 ${large} 1 ${e.x},${e.y}`;
}

export function RadialChart({
  className,
  data,
  height = 200,
  strokeWidth = 12,
  showLabels = false,
  startAngle = 0,
  endAngle = 360,
  centerText,
  centerSubText,
  ...props
}: RadialChartProps) {
  const [width, setWidth] = useState(0);
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);
  if (width === 0) return <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} {...props} />;

  const size = Math.min(width, height);
  const cx = width / 2;
  const cy = height / 2;
  const maxR = size / 2 - 10;
  const range = endAngle - startAngle;

  return (
    <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} accessibilityRole="image" {...props}>
      <Svg width={width} height={height}>
        <G>
          {data.map((seg, i) => {
            const r = maxR - i * (strokeWidth + 6);
            if (r <= 0) return null;
            const max = seg.maxValue ?? 100;
            const pct = Math.min(seg.value / max, 1);
            const sweep = pct * range;
            const safeEnd = sweep >= 360 ? startAngle + 359.99 : startAngle + sweep;
            // Background track
            const bgEnd = range >= 360 ? startAngle + 359.99 : startAngle + range;
            return (
              <G key={i}>
                <Path d={arcPath(cx, cy, r, startAngle, bgEnd)} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} strokeLinecap="round" />
                {sweep > 0 && <Path d={arcPath(cx, cy, r, startAngle, safeEnd)} fill="none" stroke={seg.color} strokeWidth={strokeWidth} strokeLinecap="round" />}
              </G>
            );
          })}
          {centerText && (
            <SvgText x={cx} y={cy + (centerSubText ? -4 : 5)} fontSize={20} fontWeight="700" fill="#1f2937" textAnchor="middle">
              {centerText}
            </SvgText>
          )}
          {centerSubText && (
            <SvgText x={cx} y={cy + 16} fontSize={11} fill="#6b7280" textAnchor="middle">
              {centerSubText}
            </SvgText>
          )}
          {showLabels && data.map((seg, i) => {
            const r = maxR - i * (strokeWidth + 6);
            if (r <= 0) return null;
            const labelPos = polarToCartesian(cx, cy, r, startAngle - 10);
            return <SvgText key={i} x={labelPos.x} y={labelPos.y} fontSize={9} fill="#6b7280" textAnchor="end">{seg.label ?? `${seg.value}`}</SvgText>;
          })}
        </G>
      </Svg>
    </View>
  );
}
