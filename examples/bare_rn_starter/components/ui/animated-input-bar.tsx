import React, { useEffect, useMemo, useState } from "react";
import { Platform, TextInput, View, useColorScheme } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import Animated, {
  Easing,
  FadeInDown,
  FadeOutUp,
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { cn } from "@/lib/utils";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const CHAR_DELAY_STEP = 22;
const ENTER_DURATION = 260;
const EXIT_DURATION = 180;

const animatedInputBarVariants = cva("flex-row items-center rounded-md border border-input bg-background py-2", {
  variants: {
    size: {
      sm: "min-h-9 px-3",
      md: "min-h-12 px-4",
      lg: "min-h-14 px-5",
    },
  },
  defaultVariants: { size: "md" },
});

const fontSizes = { sm: 14, md: 16, lg: 18 } as const;

export interface AnimatedInputBarProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "placeholder" | "value" | "onChangeText">,
    VariantProps<typeof animatedInputBarVariants> {
  className?: string;
  placeholderClassName?: string;
  /** Strings the placeholder cycles through, one at a time, while the field is empty and unfocused. */
  placeholders: string[];
  value?: string;
  onChangeText?: (text: string) => void;
  /** Milliseconds each placeholder stays visible before cycling to the next one. */
  cycleInterval?: number;
}

/** A text input whose placeholder cycles through multiple strings, each swap
 * done character-by-character: outgoing glyphs fly out, incoming glyphs fly
 * in with a per-character stagger (Reanimated's `entering`/`exiting` layout
 * animations, keyed per cycle so every glyph remounts), plus a brief
 * `BlurView` pulse timed to the swap for a soft "typing" blur instead of an
 * instant cut. */
export const AnimatedInputBar = React.forwardRef<React.ElementRef<typeof TextInput>, AnimatedInputBarProps>(
  function AnimatedInputBar(
    { className, placeholderClassName, size, placeholders, value, onChangeText, cycleInterval = 2600, style, ...props },
    ref,
  ) {
    const dark = useColorScheme() === "dark";
    const caret = dark ? "#fafafa" : "#18181b";
    const resolvedSize = size ?? "md";

    const [focused, setFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value ?? "");
    const [index, setIndex] = useState(0);
    const text = value ?? internalValue;
    const blurProgress = useSharedValue(0);
    const showPlaceholder = !focused && !text && placeholders.length > 0;

    useEffect(() => {
      if (!showPlaceholder || placeholders.length < 2) return;
      const id = setInterval(() => setIndex((i) => (i + 1) % placeholders.length), cycleInterval);
      return () => clearInterval(id);
    }, [showPlaceholder, placeholders.length, cycleInterval]);

    useEffect(() => {
      if (!showPlaceholder) return;
      blurProgress.value = withSequence(withTiming(1, { duration: 220 }), withTiming(0, { duration: 260 }));
    }, [index, showPlaceholder, blurProgress]);

    const animatedBlurProps = useAnimatedProps(() => ({
      intensity: interpolate(blurProgress.value, [0, 1], [0, 6]),
    }));

    const characters = useMemo(() => Array.from(placeholders[index] ?? ""), [placeholders, index]);

    return (
      <View className={cn(animatedInputBarVariants({ size }), className)}>
        {showPlaceholder && (
          <View pointerEvents="none" className="absolute left-4 right-4 flex-row flex-wrap items-center overflow-hidden">
            {characters.map((char, i) => (
              <Animated.Text
                key={`${index}-${i}`}
                entering={FadeInDown.delay(i * CHAR_DELAY_STEP).duration(ENTER_DURATION).easing(Easing.out(Easing.cubic))}
                exiting={FadeOutUp.delay(i * CHAR_DELAY_STEP).duration(EXIT_DURATION)}
                className={cn("text-muted-foreground", placeholderClassName)}
                style={{ fontSize: fontSizes[resolvedSize] }}
              >
                {char === " " ? " " : char}
              </Animated.Text>
            ))}
          </View>
        )}
        {Platform.OS === "ios" && showPlaceholder && (
          <AnimatedBlurView
            tint={dark ? "dark" : "light"}
            animatedProps={animatedBlurProps}
            pointerEvents="none"
            className="absolute inset-0 rounded-md"
          />
        )}
        <TextInput
          ref={ref}
          value={text}
          onChangeText={(next) => {
            setInternalValue(next);
            onChangeText?.(next);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=""
          className="flex-1 self-stretch p-0 text-foreground"
          style={[{ fontSize: fontSizes[resolvedSize] }, style]}
          textAlignVertical="center"
          keyboardAppearance={dark ? "dark" : "light"}
          selectionColor={caret}
          cursorColor={caret}
          {...props}
        />
      </View>
    );
  },
);
