import React, { useCallback, useState } from "react";
import { Pressable, Text, View, type ViewStyle } from "react-native";
import Animated, {
  ReduceMotion,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  type WithSpringConfig,
} from "react-native-reanimated";
import QRCode from "react-native-qrcode-svg";
import { Copy, QrCodeIcon, X } from "lucide-react-native";
import { cn } from "@/lib/utils";

// Spring configs and interpolation ranges below mirror the reveal technique used by
// reacticx's QRCode (stiffness/damping/mass + width/height/radius/color progress ranges);
// the QR encoding itself comes from react-native-qrcode-svg, not reacticx's code.
const SPRING_CONFIG: WithSpringConfig = { stiffness: 135, damping: 12.5, mass: 0.5, reduceMotion: ReduceMotion.System };
const PRESS_SPRING_CONFIG: WithSpringConfig = { stiffness: 250, damping: 30, mass: 0.5, reduceMotion: ReduceMotion.System };
const COLLAPSED_W = 200;
const EXPANDED_W = 250;
const COLLAPSED_H = 50;
const EXPANDED_H = 320;
const COLLAPSED_RADIUS = 100;
const EXPANDED_RADIUS = 25;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface QrCodeProps extends Omit<React.ComponentPropsWithoutRef<typeof Pressable>, "style"> {
  className?: string;
  value: string;
  label?: string;
  size?: number;
  foreground?: string;
  background?: string;
  backgroundExpanded?: string;
  /** Called with `value` when the copy action is pressed. AniUI has no clipboard
   *  dependency yet (none of components/ui/* needs it), so copying is left to the
   *  consumer (e.g. `expo-clipboard`'s setStringAsync) instead of silently adding one. */
  onCopy?: (value: string) => void;
}

function QrCodeActionButton({
  onPress,
  accessibilityLabel,
  className,
  children,
}: {
  onPress: () => void;
  accessibilityLabel: string;
  className?: string;
  children: React.ReactNode;
}) {
  const press = useSharedValue(0);
  const pressStyle = useAnimatedStyle<Pick<ViewStyle, "transform">>(() => ({
    transform: [{ scale: interpolate(press.value, [0, 1], [1, 1.1]) }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => { press.value = withSpring(1, PRESS_SPRING_CONFIG); }}
      onPressOut={() => { press.value = withSpring(0, PRESS_SPRING_CONFIG); }}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className={cn("min-h-12 min-w-12 flex-row items-center justify-center gap-2 rounded-full bg-white px-5", className)}
      style={pressStyle}
    >
      {children}
    </AnimatedPressable>
  );
}

/** Interactive "Show QR Code" pill that springs open into a card with a real,
 *  scannable QR code (react-native-qrcode-svg) plus copy/close actions. */
export function QrCode({
  className,
  value,
  label = "Show QR Code",
  size = 190,
  foreground = "#18181b",
  background = "#eeedf4",
  backgroundExpanded = "#ffffff",
  onCopy,
  ...props
}: QrCodeProps) {
  const [expanded, setExpanded] = useState(false);
  const progress = useSharedValue(expanded ? 1 : 0);
  const press = useSharedValue(0);

  const toggle = useCallback(() => {
    const next = progress.value === 1 ? 0 : 1;
    progress.value = withSpring(next, SPRING_CONFIG);
    setExpanded(next === 1);
  }, [progress]);

  const collapse = useCallback(() => {
    progress.value = withSpring(0, SPRING_CONFIG);
    setExpanded(false);
  }, [progress]);

  const handleCopy = useCallback(() => onCopy?.(value), [onCopy, value]);

  const containerStyle = useAnimatedStyle<
    Pick<ViewStyle, "width" | "height" | "borderRadius" | "backgroundColor">
  >(() => ({
    width: interpolate(progress.value, [0, 1], [COLLAPSED_W, EXPANDED_W]),
    height: interpolate(progress.value, [0, 1], [COLLAPSED_H, EXPANDED_H]),
    borderRadius: interpolate(progress.value, [0, 1], [COLLAPSED_RADIUS, EXPANDED_RADIUS]),
    backgroundColor: interpolateColor(progress.value, [0, 1], [background, backgroundExpanded]),
  }));

  const pressStyle = useAnimatedStyle<Pick<ViewStyle, "transform">>(() => ({
    transform: [{ scale: interpolate(press.value, [0, 1], [1, 1.5]) }],
  }));

  const labelStyle = useAnimatedStyle<Pick<ViewStyle, "opacity" | "transform">>(() => ({
    opacity: interpolate(progress.value, [0, 1], [1, 0]),
    transform: [{ translateY: interpolate(progress.value, [0, 1], [0, 100]) }],
  }));

  const qrRevealStyle = useAnimatedStyle<Pick<ViewStyle, "opacity" | "transform">>(() => ({
    opacity: interpolate(progress.value, [0, 0.5, 1], [0, 0.2, 1]),
    transform: [
      { translateY: withSpring(interpolate(progress.value, [0, 0.5, 1], [0, -20, -30])) },
      { scale: interpolate(progress.value, [0, 1], [0, 1]) },
    ],
  }));

  const actionsStyle = useAnimatedStyle<Pick<ViewStyle, "opacity" | "transform">>(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    transform: [{ translateY: interpolate(progress.value, [0, 1], [0, 5]) }],
  }));

  return (
    <AnimatedPressable
      onPress={toggle}
      onPressIn={() => { press.value = withSpring(1, PRESS_SPRING_CONFIG); }}
      onPressOut={() => { press.value = withSpring(0, PRESS_SPRING_CONFIG); }}
      accessible
      accessibilityRole="button"
      accessibilityState={{ expanded }}
      accessibilityLabel={expanded ? `QR code for ${value}` : label}
      accessibilityHint={expanded ? "Double tap to collapse the QR code" : "Double tap to reveal the QR code"}
      className={cn("min-h-12 min-w-12 items-center justify-center self-start overflow-hidden", className)}
      style={[containerStyle, pressStyle]}
      {...props}
    >
      <Animated.View className="absolute flex-row items-center gap-2" style={labelStyle} pointerEvents="none">
        <QrCodeIcon size={20} color="#18181b" />
        <Text className="text-base font-medium text-zinc-900">{label}</Text>
      </Animated.View>

      <Animated.View className="absolute items-center justify-center" style={qrRevealStyle} pointerEvents="none">
        <View className="items-center justify-center rounded-3xl bg-white p-5" accessibilityRole="image" accessibilityLabel={`QR code for ${value}`}>
          <QRCode value={value || " "} size={size} color={foreground} backgroundColor="#ffffff" />
        </View>
      </Animated.View>

      <Animated.View className="absolute bottom-5 flex-row gap-3" style={actionsStyle} pointerEvents={expanded ? "box-none" : "none"}>
        <QrCodeActionButton onPress={handleCopy} accessibilityLabel="Copy QR code value">
          <Copy size={20} color="#18181b" />
          <Text className="text-sm font-bold text-zinc-900">Copy</Text>
        </QrCodeActionButton>
        <QrCodeActionButton onPress={collapse} accessibilityLabel="Close QR code" className="w-12 px-0">
          <X size={20} color="#18181b" />
        </QrCodeActionButton>
      </Animated.View>
    </AnimatedPressable>
  );
}
