import React from "react";
import { View, Text } from "react-native";
import {
  Canvas,
  Group,
  Mask,
  Path,
  Rect,
  LinearGradient,
  vec,
  useClock,
} from "@shopify/react-native-skia";
import { useDerivedValue } from "react-native-reanimated";
import { BadgeCheck } from "lucide-react-native";
import { cn } from "@/lib/utils";

// lucide-react-native's BadgeCheck outer-shield outline (24x24 viewBox),
// reused only to build a Skia alpha mask that lines up with the icon lucide
// already renders on screen — so the shine sweep is confined to the badge's
// own silhouette instead of sweeping across the whole pill. This is
// lucide's own public glyph data (already an AniUI dependency here), not
// reacticx's path — theirs is a differently-shaped 22x22 shield/star glyph
// and is never copied.
const BADGE_MASK_PATH =
  "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z";

const ICON_VIEWBOX = 24;
const SHINE_COLORS: string[] = ["transparent", "rgba(255,255,255,0.85)", "transparent"];

export interface VerifiedShineProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  /**
   * Visually rendered pill text (AniUI extension — reacticx's `label` is
   * accessibility-only and renders no text). Pass "" for an icon-only badge.
   */
  label?: string;
  /** Size of the badge glyph itself, in dp. */
  iconSize?: number;
  /** Sweep tilt in degrees. Defaults to reacticx's own shine angle. */
  shineAngle?: number;
  /** Sweep-band width as a fraction of `iconSize`. */
  shineWidth?: number;
  /** How long one sweep takes, in ms. */
  duration?: number;
  /** Pause between sweeps, in ms — reproduces reacticx's flash-then-rest cadence. */
  delay?: number;
  width?: number;
  height?: number;
}

export function VerifiedShine({
  className,
  label = "Verified",
  iconSize = 16,
  shineAngle = 18,
  shineWidth = 0.4,
  duration = 1200,
  delay = 900,
  width = 140,
  height = 36,
  ...props
}: VerifiedShineProps) {
  const clock = useClock();
  const scale = iconSize / ICON_VIEWBOX;
  const waveWidth = iconSize * shineWidth;

  const shineX = useDerivedValue(() => {
    "worklet";
    const cycle = duration + delay;
    const t = clock.value % cycle;
    if (t > duration) return -waveWidth * 2; // parked off-canvas during the pause
    return -waveWidth + (t / duration) * (iconSize + waveWidth * 2);
  }, [clock, duration, delay, iconSize, waveWidth]);

  const groupTransform = useDerivedValue(() => [
    { translateX: shineX.value },
    { rotate: (shineAngle * Math.PI) / 180 },
  ], [shineX, shineAngle]);

  return (
    <View
      className={cn("relative flex-row items-center gap-1.5 overflow-hidden rounded-full bg-primary/10 px-3", className)}
      style={{ width, height }}
      accessibilityRole="text"
      accessibilityLabel={label || "Verified"}
      {...props}
    >
      <View style={{ width: iconSize, height: iconSize }}>
        <BadgeCheck size={iconSize} color="#2563eb" fill="#2563eb" strokeWidth={2} />
        <Canvas
          style={{ position: "absolute", top: 0, left: 0, width: iconSize, height: iconSize }}
          pointerEvents="none"
        >
          <Mask
            mask={
              <Group transform={[{ scale }]}>
                <Path path={BADGE_MASK_PATH} color="white" />
              </Group>
            }
          >
            <Group
              transform={groupTransform}
              origin={vec(waveWidth / 2, iconSize / 2)}
            >
              <Rect x={0} y={-iconSize} width={waveWidth} height={iconSize * 3}>
                <LinearGradient start={vec(0, 0)} end={vec(waveWidth, 0)} colors={SHINE_COLORS} />
              </Rect>
            </Group>
          </Mask>
        </Canvas>
      </View>
      {!!label && <Text className="text-sm font-semibold text-primary">{label}</Text>}
    </View>
  );
}
