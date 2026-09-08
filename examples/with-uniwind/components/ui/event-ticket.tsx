import React, { useState } from "react";
import { View, Text, LayoutChangeEvent, useColorScheme } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Calendar, MapPin, Ticket } from "lucide-react-native";
import { cn } from "@/lib/utils";

const TICKET_RADIUS = 16;
const NOTCH_RADIUS = 9;
const STUB_WIDTH = 96;
const BAR_COUNT = 18;
// Kept deliberately thin (1-3px): at a 64px-tall barcode box, taller bars
// (this used 4-22px before) don't fit 18 of them stacked and overflow the
// box, which is why the barcode wasn't rendering as anything recognizable.
const BAR_MIN_HEIGHT = 1;
const BAR_MAX_HEIGHT = 3;

export type EventTicketStubSide = "left" | "right";
export type EventTicketPerforation = "dashed" | "solid" | "none";

export interface EventTicketProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  title: string;
  date: string;
  venue: string;
  seat?: string;
  code?: string;
  stubSide?: EventTicketStubSide;
  perforation?: EventTicketPerforation;
}

// A closed circle subpath at (cx, cy) with radius r, wound the same direction
// as the outer body path. Combined with fillRule="evenodd" on the parent
// <Path>, any subpath that overlaps the body punches a hole through it.
function notchHole(cx: number, cy: number, r: number) {
  return `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${r * 2} 0 a${r} ${r} 0 1 0 ${-r * 2} 0 Z`;
}

// Builds the full ticket silhouette: a rounded-rect body plus two circular
// notches straddling the top and bottom edge at tearX (the seam where the
// stub meets the main section) -- the classic "torn ticket" cutout look.
function buildSilhouettePath(width: number, height: number, radius: number, tearX: number, notchRadius: number) {
  const r = Math.min(radius, width / 2, height / 2);
  const body = [
    `M${r} 0`,
    `H${width - r}`,
    `A${r} ${r} 0 0 1 ${width} ${r}`,
    `V${height - r}`,
    `A${r} ${r} 0 0 1 ${width - r} ${height}`,
    `H${r}`,
    `A${r} ${r} 0 0 1 0 ${height - r}`,
    `V${r}`,
    `A${r} ${r} 0 0 1 ${r} 0`,
    "Z",
  ].join(" ");
  if (notchRadius <= 0) return body;
  return `${body} ${notchHole(tearX, 0, notchRadius)} ${notchHole(tearX, height, notchRadius)}`;
}

// Deterministically derives a sequence of bar heights from a seed string, so
// the same code always renders the same barcode instead of a random one.
function buildBarHeights(seed: string, count: number) {
  const source = seed.length > 0 ? seed : "aniui";
  const span = BAR_MAX_HEIGHT - BAR_MIN_HEIGHT;
  return Array.from({ length: count }, (_, i) => {
    const code = source.charCodeAt(i % source.length);
    return BAR_MIN_HEIGHT + ((code * 7 + i * 11) % (span + 1));
  });
}

export function EventTicket({
  className,
  title,
  date,
  venue,
  seat,
  code,
  stubSide = "right",
  perforation = "dashed",
  ...props
}: EventTicketProps) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const dark = useColorScheme() === "dark";
  const surfaceColor = dark ? "#09090b" : "#ffffff";
  const strokeColor = dark ? "#27272a" : "#e4e4e7";

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== size.width || height !== size.height) setSize({ width, height });
  };

  const tearX = stubSide === "right" ? size.width - STUB_WIDTH : STUB_WIDTH;
  const path =
    size.width > 0 && size.height > 0
      ? buildSilhouettePath(size.width, size.height, TICKET_RADIUS, tearX, NOTCH_RADIUS)
      : null;
  const bars = code ? buildBarHeights(code, BAR_COUNT) : [];

  const tearBorderClass =
    perforation === "none"
      ? ""
      : cn(
          stubSide === "right" ? "border-l" : "border-r",
          perforation === "dashed" ? "border-dashed" : "border-solid",
          "border-border"
        );

  const main = (
    <View className="flex-1 gap-2 p-4">
      <View className="flex-row items-center gap-2">
        <Ticket size={16} color="#71717a" strokeWidth={2} />
        <Text className="text-xs uppercase tracking-widest text-muted-foreground">Event Ticket</Text>
      </View>
      <Text className="text-lg font-semibold text-card-foreground">{title}</Text>
      <View className="flex-row items-center gap-2">
        <Calendar size={14} color="#71717a" strokeWidth={2} />
        <Text className="text-sm text-muted-foreground">{date}</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <MapPin size={14} color="#71717a" strokeWidth={2} />
        <Text className="text-sm text-muted-foreground">{venue}</Text>
      </View>
      {seat ? <Text className="text-sm font-medium text-foreground">Seat {seat}</Text> : null}
    </View>
  );

  const stub = (
    <View className={cn("w-24 items-center justify-center gap-3 p-3", tearBorderClass)}>
      {code ? (
        <>
          <View className="h-16 w-8 flex-col justify-between">
            {bars.map((height, i) => (
              <View key={i} className="w-full bg-foreground" style={{ height }} />
            ))}
          </View>
          {/* Fixed-height box, not just the rotated Text alone: a rotate
              transform doesn't reflow surrounding layout to match its visual
              footprint, so an unwrapped rotated text keeps its pre-rotation
              (wide, short) footprint and can overlap the barcode above it. */}
          <View className="h-20 items-center justify-center">
            <Text className="rotate-90 text-[10px] font-mono text-muted-foreground">{code}</Text>
          </View>
        </>
      ) : null}
    </View>
  );

  return (
    <View className={cn("overflow-hidden rounded-2xl", className)} accessibilityRole="summary" {...props}>
      <View onLayout={onLayout} className="relative flex-row">
        {path ? (
          <Svg width={size.width} height={size.height} style={{ position: "absolute" }}>
            <Path d={path} fill={surfaceColor} stroke={strokeColor} strokeWidth={1} fillRule="evenodd" />
          </Svg>
        ) : null}
        {stubSide === "right" ? (
          <>
            {main}
            {stub}
          </>
        ) : (
          <>
            {stub}
            {main}
          </>
        )}
      </View>
    </View>
  );
}
