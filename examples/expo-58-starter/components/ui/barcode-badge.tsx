import React, { createContext, useContext, useMemo } from "react";
import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

export type BarcodePalette = { bars: string; label: string };

const DEFAULT_PALETTE: BarcodePalette = { bars: "#18181b", label: "#18181b" };

const BarcodeBadgeContext = createContext<{
  palette: BarcodePalette;
  seed: string;
  barCount: number;
} | null>(null);

function useBarcodeBadge(component: string) {
  const context = useContext(BarcodeBadgeContext);
  if (!context) {
    throw new Error(`${component} must be rendered inside <BarcodeBadge>.`);
  }
  return context;
}

/** Deterministic per-index bar width (2-4px) seeded from the encoded string. */
function widthForBar(seed: string, index: number): number {
  const source = seed.length > 0 ? seed : "aniui";
  const code = source.charCodeAt(index % source.length);
  return 2 + ((code + index * 5) % 3);
}

export interface BarcodeBadgeProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  /** String encoded into the bar widths, and used as the default label. */
  value: string;
  /** Overrides the rendered label text without changing the encoded value. */
  label?: string;
  /** Overrides the default Bars + Label composition. */
  children?: React.ReactNode;
  palette?: Partial<BarcodePalette>;
  barCount?: number;
  hideLabel?: boolean;
}

export function BarcodeBadge({
  className,
  value,
  label,
  children,
  palette,
  barCount = 28,
  hideLabel = false,
  ...props
}: BarcodeBadgeProps) {
  const resolvedLabel = label ?? value;
  const context = useMemo(
    () => ({ palette: { ...DEFAULT_PALETTE, ...palette }, seed: value, barCount }),
    [palette, value, barCount]
  );

  return (
    <BarcodeBadgeContext.Provider value={context}>
      <View
        className={cn("gap-1.5 rounded-md border border-border bg-card p-3 items-center", className)}
        accessible
        accessibilityRole="text"
        accessibilityLabel={resolvedLabel}
        {...props}
      >
        {children ?? (
          <>
            <BarcodeBadgeBars />
            {!hideLabel && <BarcodeBadgeLabel />}
          </>
        )}
      </View>
    </BarcodeBadgeContext.Provider>
  );
}

export interface BarcodeBadgeBarsProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  height?: number;
  gap?: number;
  color?: string;
}

export function BarcodeBadgeBars({ className, height = 32, gap = 1, color, ...props }: BarcodeBadgeBarsProps) {
  const { palette, seed, barCount } = useBarcodeBadge("BarcodeBadgeBars");
  const widths = useMemo(
    () => Array.from({ length: barCount }, (_, i) => widthForBar(seed, i)),
    [seed, barCount]
  );

  return (
    <View
      className={cn("flex-row items-stretch", className)}
      style={{ height, gap }}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      {...props}
    >
      {widths.map((width, i) => (
        <View key={`${seed}-${i}`} style={{ width, backgroundColor: color ?? palette.bars }} />
      ))}
    </View>
  );
}

export interface BarcodeBadgeLabelProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
  color?: string;
  children?: React.ReactNode;
}

export function BarcodeBadgeLabel({ className, color, children, style, ...props }: BarcodeBadgeLabelProps) {
  const { palette, seed } = useBarcodeBadge("BarcodeBadgeLabel");
  return (
    <Text
      className={cn("text-xs font-mono tracking-widest uppercase", className)}
      style={[color ? { color } : { color: palette.label }, style]}
      {...props}
    >
      {children ?? seed}
    </Text>
  );
}
