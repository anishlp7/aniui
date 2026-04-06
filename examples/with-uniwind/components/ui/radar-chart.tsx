import React, { useState } from "react";
import { View, LayoutChangeEvent } from "react-native";
import Svg, { Polygon, Line, Circle, G, Text as SvgText } from "react-native-svg";
import { cn } from "@/lib/utils";

export interface RadarChartDataPoint {
  label: string;
  value: number;
}

export interface RadarChartSeries {
  data: RadarChartDataPoint[];
  color: string;
  fillOpacity?: number;
}

export interface RadarChartProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data?: RadarChartDataPoint[];
  height?: number;
  color?: string;
  fillOpacity?: number;
  showGrid?: boolean;
  showDots?: boolean;
  showLabels?: boolean;
  gridLevels?: number;
  series?: RadarChartSeries[];
}

function polarToXY(cx: number, cy: number, r: number, i: number, total: number) {
  const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

export function RadarChart({
  className,
  data,
  height = 200,
  color = "#2563eb",
  fillOpacity = 0.2,
  showGrid = true,
  showDots = false,
  showLabels = true,
  gridLevels = 4,
  series,
  ...props
}: RadarChartProps) {
  const [width, setWidth] = useState(0);
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);
  if (width === 0) return <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} {...props} />;

  const size = Math.min(width, height);
  const cx = width / 2;
  const cy = height / 2;
  const radius = size / 2 - (showLabels ? 30 : 10);
  const allSeries: RadarChartSeries[] = series ?? [{ data: data ?? [], color, fillOpacity }];
  const labels = allSeries[0]?.data ?? [];
  const n = labels.length;
  const maxVal = Math.max(...allSeries.flatMap((s) => s.data.map((d) => d.value)), 1);

  const getPoints = (pts: RadarChartDataPoint[]) =>
    pts.map((d, i) => polarToXY(cx, cy, (d.value / maxVal) * radius, i, n));

  return (
    <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} accessibilityRole="image" {...props}>
      <Svg width={width} height={height}>
        {showGrid && Array.from({ length: gridLevels }).map((_, level) => {
          const r = ((level + 1) / gridLevels) * radius;
          const pts = Array.from({ length: n }).map((_, i) => polarToXY(cx, cy, r, i, n));
          return <Polygon key={level} points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#e5e7eb" strokeWidth={1} />;
        })}
        {showGrid && Array.from({ length: n }).map((_, i) => {
          const p = polarToXY(cx, cy, radius, i, n);
          return <Line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e5e7eb" strokeWidth={1} />;
        })}
        {allSeries.map((s, si) => {
          const pts = getPoints(s.data);
          return (
            <G key={si}>
              <Polygon points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill={s.color} fillOpacity={s.fillOpacity ?? fillOpacity} stroke={s.color} strokeWidth={2} />
              {showDots && pts.map((p, i) => <Circle key={i} cx={p.x} cy={p.y} r={3} fill="white" stroke={s.color} strokeWidth={2} />)}
            </G>
          );
        })}
        {showLabels && labels.map((d, i) => {
          const p = polarToXY(cx, cy, radius + 14, i, n);
          return <SvgText key={i} x={p.x} y={p.y + 4} fontSize={11} fill="#6b7280" textAnchor="middle">{d.label}</SvgText>;
        })}
      </Svg>
    </View>
  );
}
