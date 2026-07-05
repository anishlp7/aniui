import React, { useState } from "react";
import { View, LayoutChangeEvent } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop, Line, G, Text as SvgText } from "react-native-svg";
import { cn } from "@/lib/utils";

export interface AreaChartDataPoint {
  label: string;
  value: number;
}

export interface AreaChartProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: AreaChartDataPoint[];
  height?: number;
  color?: string;
  fillOpacity?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  curved?: boolean;
  series?: { data: AreaChartDataPoint[]; color: string }[];
}

export function AreaChart({
  className,
  data,
  height = 200,
  color = "#2563eb",
  fillOpacity = 0.3,
  showGrid = true,
  showLabels = false,
  curved = true,
  series,
  ...props
}: AreaChartProps) {
  const [width, setWidth] = useState(0);
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);
  if (width === 0) return <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} {...props} />;

  const pad = showLabels ? { top: 10, right: 10, bottom: 24, left: 36 } : { top: 10, right: 10, bottom: 10, left: 10 };
  const cw = width - pad.left - pad.right;
  const ch = height - pad.top - pad.bottom;

  const buildPath = (pts: AreaChartDataPoint[], close: boolean) => {
    const maxVal = Math.max(...pts.map((d) => d.value), 1);
    const points = pts.map((d, i) => ({
      x: pad.left + (i / Math.max(pts.length - 1, 1)) * cw,
      y: pad.top + ch - (d.value / maxVal) * ch,
    }));
    let d: string;
    if (curved && points.length > 2) {
      d = `M${points[0].x},${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const cp = (points[i].x + points[i + 1].x) / 2;
        d += ` C${cp},${points[i].y} ${cp},${points[i + 1].y} ${points[i + 1].x},${points[i + 1].y}`;
      }
    } else {
      d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
    }
    if (close) {
      d += ` L${points[points.length - 1].x},${pad.top + ch} L${points[0].x},${pad.top + ch} Z`;
    }
    return d;
  };

  const allSeries = series ?? [{ data, color }];
  const maxVal = Math.max(...allSeries.flatMap((s) => s.data.map((d) => d.value)), 1);

  return (
    <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} accessibilityRole="image" {...props}>
      <Svg width={width} height={height}>
        <Defs>
          {allSeries.map((s, i) => (
            <LinearGradient key={i} id={`areaGrad${i}`} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={s.color} stopOpacity={fillOpacity} />
              <Stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
            </LinearGradient>
          ))}
        </Defs>
        {showGrid && [3, 2, 1, 0].map((i) => {
          const y = pad.top + (i / 3) * ch;
          return <Line key={i} x1={pad.left} y1={y} x2={pad.left + cw} y2={y} stroke="#e5e7eb" strokeWidth={1} />;
        })}
        {allSeries.map((s, i) => (
          <G key={i}>
            <Path d={buildPath(s.data, true)} fill={`url(#areaGrad${i})`} />
            <Path d={buildPath(s.data, false)} fill="none" stroke={s.color} strokeWidth={2} />
          </G>
        ))}
        {showLabels && data.map((d, i) => (
          <SvgText key={i} x={pad.left + (i / Math.max(data.length - 1, 1)) * cw} y={height - 4} fontSize={10} fill="#6b7280" textAnchor="middle">
            {d.label}
          </SvgText>
        ))}
        {showLabels && [0, 1, 2, 3].map((i) => (
          <SvgText key={`y${i}`} x={pad.left - 4} y={pad.top + ((3 - i) / 3) * ch + 3} fontSize={9} fill="#6b7280" textAnchor="end">
            {Math.round((i / 3) * maxVal)}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}
