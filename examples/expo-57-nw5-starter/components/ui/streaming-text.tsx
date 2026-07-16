import React, { useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, cancelAnimation } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface StreamingTextProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
  /** Target text — may grow over time as tokens stream in from an API. */
  text: string;
  /** Reveal `text` progressively (default true). false renders it instantly. */
  typewriter?: boolean;
  /** Reveal speed in characters per second (default 60). */
  speed?: number;
  /** Keep the cursor blinking even when caught up (e.g. between API chunks). */
  streaming?: boolean;
  showCursor?: boolean;
  onComplete?: () => void;
}

function Cursor() {
  const opacity = useSharedValue(1);
  useEffect(() => {
    opacity.value = withRepeat(withTiming(0, { duration: 500 }), -1, true);
    return () => cancelAnimation(opacity);
  }, [opacity]);
  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));
  // The cursor is a typographic block glyph (not an icon) so it flows inline
  // with the revealed text; Animated.Text lets it blink via opacity.
  return <Animated.Text style={style} className="text-foreground">▍</Animated.Text>;
}

export function StreamingText({
  className, text, typewriter = true, speed = 60, streaming, showCursor = true, onComplete, ...props
}: StreamingTextProps) {
  const [count, setCount] = useState(typewriter ? 0 : text.length);
  const shown = useRef("");

  // If `text` was replaced (not appended to), restart the reveal.
  useEffect(() => {
    if (!text.startsWith(shown.current)) setCount(typewriter ? 0 : text.length);
  }, [text, typewriter]);

  useEffect(() => {
    if (!typewriter || count >= text.length) return;
    const tick = 33;
    const chars = Math.max(1, Math.round((speed * tick) / 1000));
    const timer = setInterval(() => {
      setCount((c) => Math.min(text.length, c + chars));
    }, tick);
    return () => clearInterval(timer);
  }, [typewriter, count, text, speed]);

  // Fire onComplete once per reveal, only when fully caught up and not streaming.
  const completed = useRef(false);
  useEffect(() => {
    const isDone = count >= text.length && text.length > 0 && !streaming;
    if (isDone && !completed.current) { completed.current = true; onComplete?.(); }
    if (!isDone) completed.current = false;
  }, [count, text, streaming, onComplete]);

  const visible = typewriter ? text.slice(0, count) : text;
  shown.current = visible;
  const done = visible.length >= text.length && !streaming;

  return (
    <Text className={cn("text-base text-foreground", className)} {...props}>
      {visible}
      {showCursor && !done && <Cursor />}
    </Text>
  );
}
