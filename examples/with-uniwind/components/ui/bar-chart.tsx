import React, { useState } from "react";
import { View, LayoutChangeEvent } from "react-native";
import Svg, { Rect, Line, G, Text as SvgText } from "react-native-svg";
import { cn } from "@/lib/utils";

export interface BarChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: BarChartDataPoint[];
  height?: number;
  color?: string;
  horizontal?: boolean;
  showGrid?: boolean;
  showLabels?: boolean;
  barRadius?: number;
  grouped?: { key: string; color: string }[];
  groupedData?: { label: string; values: number[] }[];
}

export function BarChart({
  className,
  data,
  height = 200,
  color = "#2563eb",
  horizontal = false,
  showGrid = true,
  showLabels = false,
  barRadius = 4,
  grouped,
  groupedData,
  ...props
}: BarChartProps) {
  const [width, setWidth] = useState(0);
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);
  if (width === 0) return <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} {...props} />;

  const pad = showLabels ? { top: 10, right: 10, bottom: 28, left: 36 } : { top: 10, right: 10, bottom: 10, left: 10 };
  const cw = width - pad.left - pad.right;
  const ch = height - pad.top - pad.bottom;

  if (grouped && groupedData) {
    const maxVal = Math.max(...groupedData.flatMap((d) => d.values), 1);
    const groupW = cw / groupedData.length;
    const barW = (groupW * 0.7) / grouped.length;
    return (
      <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} accessibilityRole="image" {...props}>
        <Svg width={width} height={height}>
          {showGrid && [3, 2, 1, 0].map((i) => <Line key={i} x1={pad.left} y1={pad.top + (i / 3) * ch} x2={pad.left + cw} y2={pad.top + (i / 3) * ch} stroke="#e5e7eb" strokeWidth={1} />)}
          {groupedData.map((d, gi) => d.values.map((v, bi) => {
            const bh = (v / maxVal) * ch;
            const x = pad.left + gi * groupW + (groupW * 0.15) + bi * barW;
            return <Rect key={`${gi}-${bi}`} x={x} y={pad.top + ch - bh} width={barW * 0.85} height={bh} fill={grouped[bi]?.color ?? color} rx={barRadius} />;
          }))}
          {showLabels && groupedData.map((d, i) => (
            <SvgText key={i} x={pad.left + i * groupW + groupW / 2} y={height - 4} fontSize={10} fill="#6b7280" textAnchor="middle">{d.label}</SvgText>
          ))}
        </Svg>
      </View>
    );
  }

  const maxVal = Math.max(...data.map((d) => Math.abs(d.value)), 1);
  const barW = (cw / data.length) * 0.7;
  const gap = (cw / data.length) * 0.3;

  return (
    <View className={cn("w-full", className)} onLayout={onLayout} style={{ height }} accessibilityRole="image" {...props}>
      <Svg width={width} height={height}>
        {showGrid && !horizontal && [3, 2, 1, 0].map((i) => <Line key={i} x1={pad.left} y1={pad.top + (i / 3) * ch} x2={pad.left + cw} y2={pad.top + (i / 3) * ch} stroke="#e5e7eb" strokeWidth={1} />)}
        {data.map((d, i) => {
          const c = d.color ?? color;
          if (horizontal) {
            const bw = (Math.abs(d.value) / maxVal) * cw;
            const bh = (ch / data.length) * 0.7;
            const y = pad.top + (i / data.length) * ch + ((ch / data.length) * 0.15);
            return <Rect key={i} x={pad.left} y={y} width={bw} height={bh} fill={c} rx={barRadius} />;
          }
          const bh = (Math.abs(d.value) / maxVal) * ch;
          const x = pad.left + i * (barW + gap) + gap / 2;
          const y = d.value >= 0 ? pad.top + ch - bh : pad.top + ch;
          return <Rect key={i} x={x} y={y} width={barW} height={bh} fill={c} rx={barRadius} />;
        })}
        {showLabels && !horizontal && data.map((d, i) => (
          <SvgText key={i} x={pad.left + i * (barW + gap) + gap / 2 + barW / 2} y={height - 4} fontSize={10} fill="#6b7280" textAnchor="middle">{d.label}</SvgText>
        ))}
        {showLabels && horizontal && data.map((d, i) => {
          const bh = (ch / data.length) * 0.7;
          const y = pad.top + (i / data.length) * ch + ((ch / data.length) * 0.15) + bh / 2 + 3;
          return <SvgText key={i} x={pad.left - 4} y={y} fontSize={10} fill="#6b7280" textAnchor="end">{d.label}</SvgText>;
        })}
      </Svg>
    </View>
  );
}
