import React, { useState } from "react";
import { View, LayoutChangeEvent } from "react-native";
import Svg, { Path, Circle, Line, G, Text as SvgText } from "react-native-svg";
import { cn } from "@/lib/utils";

export interface LineChartDataPoint {
  label: string;
  value: number;
}

export interface LineChartSeries {
  data: LineChartDataPoint[];
  color: string;
  dashed?: boolean;
}

export interface LineChartProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data?: LineChartDataPoint[];
  height?: number;
  color?: string;
  showDots?: boolean;
  showGrid?: boolean;
  showLabels?: boolean;
  curved?: boolean;
  series?: LineChartSeries[];
}

export function LineChart({
  className,
  data,
  height = 200,
  color = "#2563eb",
  showDots = true,
  showGrid = true,
  showLabels = false,
  curved = true,
  series,
  ...props
}: LineChartProps) {
  const [width, setWidth] = useState(0);
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);
  if (width === 0) return <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} {...props} />;

  const pad = showLabels ? { top: 10, right: 10, bottom: 24, left: 36 } : { top: 10, right: 10, bottom: 10, left: 10 };
  const cw = width - pad.left - pad.right;
  const ch = height - pad.top - pad.bottom;
  const allSeries: LineChartSeries[] = series ?? [{ data: data ?? [], color }];
  const maxVal = Math.max(...allSeries.flatMap((s) => s.data.map((d) => d.value)), 1);

  const getPoints = (pts: LineChartDataPoint[]) =>
    pts.map((d, i) => ({
      x: pad.left + (i / Math.max(pts.length - 1, 1)) * cw,
      y: pad.top + ch - (d.value / maxVal) * ch,
    }));

  const buildPath = (pts: LineChartDataPoint[]) => {
    const points = getPoints(pts);
    if (curved && points.length > 2) {
      let d = `M${points[0].x},${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const cp = (points[i].x + points[i + 1].x) / 2;
        d += ` C${cp},${points[i].y} ${cp},${points[i + 1].y} ${points[i + 1].x},${points[i + 1].y}`;
      }
      return d;
    }
    return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  };

  const labels = allSeries[0]?.data ?? [];

  return (
    <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} accessibilityRole="image" {...props}>
      <Svg width={width} height={height}>
        {showGrid && [3, 2, 1, 0].map((i) => {
          const y = pad.top + (i / 3) * ch;
          return <Line key={i} x1={pad.left} y1={y} x2={pad.left + cw} y2={y} stroke="#e5e7eb" strokeWidth={1} />;
        })}
        {allSeries.map((s, i) => (
          <G key={i}>
            <Path d={buildPath(s.data)} fill="none" stroke={s.color} strokeWidth={2} strokeDasharray={s.dashed ? "6,4" : undefined} />
            {showDots && getPoints(s.data).map((p, j) => (
              <Circle key={j} cx={p.x} cy={p.y} r={3} fill="white" stroke={s.color} strokeWidth={2} />
            ))}
          </G>
        ))}
        {showLabels && labels.map((d, i) => (
          <SvgText key={i} x={pad.left + (i / Math.max(labels.length - 1, 1)) * cw} y={height - 4} fontSize={10} fill="#6b7280" textAnchor="middle">{d.label}</SvgText>
        ))}
        {showLabels && [0, 1, 2, 3].map((i) => (
          <SvgText key={`y${i}`} x={pad.left - 4} y={pad.top + ((3 - i) / 3) * ch + 3} fontSize={9} fill="#6b7280" textAnchor="end">{Math.round((i / 3) * maxVal)}</SvgText>
        ))}
      </Svg>
    </View>
  );
}
