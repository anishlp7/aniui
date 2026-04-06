import React, { useState } from "react";
import { View, LayoutChangeEvent } from "react-native";
import Svg, { Path, G, Text as SvgText } from "react-native-svg";
import { cn } from "@/lib/utils";

export interface PieChartSegment {
  value: number;
  color: string;
  label?: string;
}

export interface PieChartProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: PieChartSegment[];
  height?: number;
  innerRadius?: number;
  showLabels?: boolean;
  startAngle?: number;
  endAngle?: number;
}

function polarToCartesian(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarToCartesian(cx, cy, r, start);
  const e = polarToCartesian(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M${s.x},${s.y} A${r},${r} 0 ${large} 1 ${e.x},${e.y}`;
}

export function PieChart({
  className,
  data,
  height = 200,
  innerRadius = 0,
  showLabels = false,
  startAngle = 0,
  endAngle = 360,
  ...props
}: PieChartProps) {
  const [width, setWidth] = useState(0);
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);
  if (width === 0) return <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} {...props} />;

  const size = Math.min(width, height);
  const cx = width / 2;
  const cy = height / 2;
  const outerR = size / 2 - 10;
  const innerR = outerR * innerRadius;
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const range = endAngle - startAngle;

  let currentAngle = startAngle;
  const segments = data.map((d) => {
    const sweep = (d.value / total) * range;
    const seg = { ...d, start: currentAngle, end: currentAngle + sweep };
    currentAngle += sweep;
    return seg;
  });

  return (
    <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} accessibilityRole="image" {...props}>
      <Svg width={width} height={height}>
        <G>
          {segments.map((seg, i) => {
            const sweep = seg.end - seg.start;
            if (sweep <= 0) return null;
            const safeEnd = sweep >= 360 ? seg.start + 359.99 : seg.end;
            const outerArc = arcPath(cx, cy, outerR, seg.start, safeEnd);
            if (innerR > 0) {
              const innerArc = arcPath(cx, cy, innerR, safeEnd, seg.start);
              const s1 = polarToCartesian(cx, cy, outerR, safeEnd);
              const s2 = polarToCartesian(cx, cy, innerR, safeEnd);
              const e2 = polarToCartesian(cx, cy, innerR, seg.start);
              const e1 = polarToCartesian(cx, cy, outerR, seg.start);
              const large = sweep > 180 ? 1 : 0;
              const d = `M${e1.x},${e1.y} A${outerR},${outerR} 0 ${large} 1 ${s1.x},${s1.y} L${s2.x},${s2.y} A${innerR},${innerR} 0 ${large} 0 ${e2.x},${e2.y} Z`;
              return <Path key={i} d={d} fill={seg.color} />;
            }
            const center = polarToCartesian(cx, cy, 0, 0);
            const s = polarToCartesian(cx, cy, outerR, seg.start);
            const e = polarToCartesian(cx, cy, outerR, safeEnd);
            const large = sweep > 180 ? 1 : 0;
            const d = `M${cx},${cy} L${s.x},${s.y} A${outerR},${outerR} 0 ${large} 1 ${e.x},${e.y} Z`;
            return <Path key={i} d={d} fill={seg.color} />;
          })}
          {showLabels && segments.map((seg, i) => {
            const mid = (seg.start + seg.end) / 2;
            const labelR = innerR > 0 ? (outerR + innerR) / 2 : outerR * 0.65;
            const pos = polarToCartesian(cx, cy, labelR, mid);
            return (
              <SvgText key={i} x={pos.x} y={pos.y + 4} fontSize={11} fill="white" fontWeight="600" textAnchor="middle">
                {seg.label ?? `${Math.round((seg.value / total) * 100)}%`}
              </SvgText>
            );
          })}
        </G>
      </Svg>
    </View>
  );
}
