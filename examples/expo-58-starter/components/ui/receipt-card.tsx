import React, { useMemo } from "react";
import { View, Text, Platform } from "react-native";
import Svg, { Path } from "react-native-svg";
import { cn } from "@/lib/utils";

const MONO_FONT = Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" });
const RECEIPT_WIDTH = 320;
const TOOTH_WIDTH = 20;
const TOOTH_HEIGHT = 10;
const BAR_COUNT = 32;
const BARCODE_HEIGHT = 32;
const BARCODE_WIDTH = 160;

export type ReceiptCardPalette = {
  paper: string;
  ink: string;
  muted: string;
  rule: string;
  leader: string;
  accent: string;
};

const DEFAULT_RECEIPT_PALETTE: ReceiptCardPalette = {
  paper: "#FFFFFF",
  ink: "#18181B",
  muted: "#71717A",
  rule: "#D4D4D8",
  leader: "#A1A1AA",
  accent: "#18181B",
};

export interface ReceiptLine {
  label: string;
  value: string;
  bold?: boolean;
  /** Dotted rule stretching between label and value, like a printed menu. Default true. */
  leader?: boolean;
}

/**
 * Builds a "torn paper" sawtooth silhouette: `Math.ceil(width / toothWidth)`
 * triangles spanning the full width, each rising from a flat base edge (the
 * side that meets the paper body) to a point on the ragged/open side.
 */
function buildTornEdgePath(width: number, toothWidth: number, toothHeight: number, side: "top" | "bottom"): string {
  const teeth = Math.ceil(width / toothWidth);
  const baseY = side === "bottom" ? 0 : toothHeight;
  const tipY = side === "bottom" ? toothHeight : 0;
  let d = `M0,${baseY}`;
  for (let i = 0; i < teeth; i++) {
    const start = i * toothWidth;
    const mid = start + toothWidth / 2;
    const end = Math.min(start + toothWidth, width);
    d += ` L${mid},${tipY} L${end},${baseY}`;
  }
  return `${d} Z`;
}

/** Deterministic per-bar width (2-5px) seeded from the printed code, so the same code always draws the same bars. */
function receiptBarWidth(code: string, index: number): number {
  const source = code.length > 0 ? code : "aniui";
  const char = source.charCodeAt(index % source.length);
  return 2 + ((char * (index + 1)) % 4);
}

export interface ReceiptCardProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  merchant: string;
  date: string;
  lines: ReceiptLine[];
  total: string;
  /** Default "Total". */
  totalLabel?: string;
  /** Small centered muted line under the total, e.g. "THANK YOU". */
  note?: string;
  /** Seeds the printed code + width-encoded barcode at the bottom. Omit to hide the barcode entirely. */
  code?: string;
  /** Print the code string under the bars. Default true. */
  showCode?: boolean;
  /** Small tilt on the whole card, like a receipt tossed on a desk. Default true. */
  tilted?: boolean;
  /** Card width in px — also sizes the torn-edge paths. Default 320. */
  width?: number;
  palette?: Partial<ReceiptCardPalette>;
}

export function ReceiptCard({
  className,
  merchant,
  date,
  lines,
  total,
  totalLabel = "Total",
  note,
  code,
  showCode = true,
  tilted = true,
  width = RECEIPT_WIDTH,
  palette,
  style,
  ...props
}: ReceiptCardProps) {
  const p = useMemo(() => ({ ...DEFAULT_RECEIPT_PALETTE, ...palette }), [palette]);
  const topEdge = useMemo(() => buildTornEdgePath(width, TOOTH_WIDTH, TOOTH_HEIGHT, "top"), [width]);
  const bottomEdge = useMemo(() => buildTornEdgePath(width, TOOTH_WIDTH, TOOTH_HEIGHT, "bottom"), [width]);
  const bars = useMemo(
    () => (code ? Array.from({ length: BAR_COUNT }, (_, i) => receiptBarWidth(code, i)) : []),
    [code]
  );

  return (
    <View
      className={cn(tilted && "rotate-[-1deg]", className)}
      style={[{ width }, style]}
      accessibilityRole="summary"
      accessibilityLabel={`Receipt from ${merchant}`}
      {...props}
    >
      <Svg width={width} height={TOOTH_HEIGHT} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <Path d={topEdge} fill={p.paper} />
      </Svg>

      {/* A real drop shadow (shadowOpacity 0.12, radius 12, offset {0,6},
          elevation 4) — without it the card reads as flat, and the
          torn-paper edges above/below have nothing to visually separate
          them from the page. */}
      <View
        className="gap-3 px-5 py-4 shadow-lg"
        style={{ backgroundColor: p.paper, shadowColor: "#000", shadowOpacity: 0.12, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 4 }}
      >
        <View className="items-center gap-1 border-b border-dashed pb-3" style={{ borderBottomColor: p.rule }}>
          <Text className="text-base font-bold uppercase tracking-wide" style={{ color: p.accent, fontFamily: MONO_FONT }}>
            {merchant}
          </Text>
          <Text className="text-xs uppercase" style={{ color: p.muted, fontFamily: MONO_FONT }}>
            {date}
          </Text>
        </View>

        {lines.map((line) => (
          <View key={line.label} className="flex-row items-end">
            <Text
              className="shrink-0 text-sm"
              style={{ color: line.bold ? p.accent : p.muted, fontFamily: MONO_FONT, fontWeight: line.bold ? "700" : "400" }}
            >
              {line.label}
            </Text>
            {line.leader !== false ? (
              <View
                className="mx-1 mb-1 min-w-4 flex-1 border-b border-dotted"
                style={{ borderBottomColor: p.leader }}
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
              />
            ) : (
              <View className="flex-1" />
            )}
            <Text
              className="shrink-0 text-sm tabular-nums"
              style={{ color: line.bold ? p.accent : p.ink, fontFamily: MONO_FONT, fontWeight: line.bold ? "700" : "400" }}
            >
              {line.value}
            </Text>
          </View>
        ))}

        <View className="flex-row items-center justify-between border-t pt-3" style={{ borderTopColor: p.rule }}>
          <Text className="text-sm font-bold uppercase" style={{ color: p.accent, fontFamily: MONO_FONT }}>
            {totalLabel}
          </Text>
          <Text className="text-base font-bold tabular-nums" style={{ color: p.accent, fontFamily: MONO_FONT }}>
            {total}
          </Text>
        </View>

        {note ? (
          <Text className="text-center text-xs uppercase" style={{ color: p.muted, fontFamily: MONO_FONT }}>
            {note}
          </Text>
        ) : null}

        {code ? (
          <View className="items-center gap-1 pt-1">
            <View
              className="flex-row justify-between"
              style={{ height: BARCODE_HEIGHT, width: BARCODE_WIDTH }}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            >
              {bars.map((barWidth, i) => (
                <View key={`${code}-${i}`} style={{ width: barWidth, height: "100%", backgroundColor: p.ink }} />
              ))}
            </View>
            {showCode ? (
              <Text className="text-xs tracking-widest" style={{ color: p.muted, fontFamily: MONO_FONT }}>
                {code}
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>

      <Svg width={width} height={TOOTH_HEIGHT} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <Path d={bottomEdge} fill={p.paper} />
      </Svg>
    </View>
  );
}
