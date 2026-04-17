import { PreviewAnimateDemo } from "@/components/preview/animate";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const usageCode = `import { entering, exiting, springs } from "@/components/ui/animate";
import Animated, { withSpring } from "react-native-reanimated";

// Layout animations
<Animated.View entering={entering.fadeInUp} exiting={exiting.fadeOut}>
  <Card>...</Card>
</Animated.View>

// Spring physics
translateX.value = withSpring(0, springs.snappy);`;
const springsCode = `import { springs } from "@/components/ui/animate";

// Available spring presets
springs.bouncy   // { damping: 12, stiffness: 150, mass: 0.5 }
springs.snappy   // { damping: 18, stiffness: 250, mass: 0.8 }
springs.gentle   // { damping: 20, stiffness: 120, mass: 1 }
springs.stiff    // { damping: 26, stiffness: 350, mass: 1 }
springs.default  // { damping: 15, stiffness: 180, mass: 0.8 }

// Use with withSpring
translateX.value = withSpring(targetValue, springs.bouncy);`;
const enteringCode = `import { entering } from "@/components/ui/animate";
import Animated from "react-native-reanimated";

// All entering presets
<Animated.View entering={entering.fadeIn}>       {/* Simple fade */}
<Animated.View entering={entering.fadeInUp}>     {/* Fade + slide up */}
<Animated.View entering={entering.fadeInDown}>   {/* Fade + slide down */}
<Animated.View entering={entering.slideInUp}>    {/* Slide from bottom */}
<Animated.View entering={entering.slideInDown}>  {/* Slide from top */}
<Animated.View entering={entering.slideInLeft}>  {/* Slide from left */}
<Animated.View entering={entering.slideInRight}> {/* Slide from right */}
<Animated.View entering={entering.zoomIn}>       {/* Scale up */}
<Animated.View entering={entering.bounceIn}>     {/* Bounce entrance */}
<Animated.View entering={entering.flipInX}>      {/* 3D flip */}`;
const exitingCode = `import { exiting } from "@/components/ui/animate";
import Animated from "react-native-reanimated";

// All exiting presets
<Animated.View exiting={exiting.fadeOut}>       {/* Simple fade out */}
<Animated.View exiting={exiting.fadeOutUp}>     {/* Fade + slide up */}
<Animated.View exiting={exiting.fadeOutDown}>   {/* Fade + slide down */}
<Animated.View exiting={exiting.slideOutUp}>    {/* Slide to top */}
<Animated.View exiting={exiting.slideOutDown}>  {/* Slide to bottom */}
<Animated.View exiting={exiting.zoomOut}>       {/* Scale down */}`;
const durationEasingCode = `import { duration, easing } from "@/components/ui/animate";
import { withTiming } from "react-native-reanimated";

// Duration presets (ms)
duration.fast    // 150
duration.normal  // 250
duration.slow    // 400
duration.slower  // 600

// Easing presets
easing.easeOut    // Easing.out(Easing.cubic)
easing.easeIn     // Easing.in(Easing.cubic)
easing.easeInOut  // Easing.inOut(Easing.cubic)
easing.spring     // Easing.bezier(0.175, 0.885, 0.32, 1.275)
easing.bounce     // Easing.bounce

// Use together
opacity.value = withTiming(1, {
  duration: duration.normal,
  easing: easing.easeOut,
});`;
const hookCode = `import { usePressAnimation } from "@/components/ui/animate";
import Animated from "react-native-reanimated";

function PressableCard() {
  const { animatedStyle, onPressIn, onPressOut } = usePressAnimation();
  return (
    <Animated.View style={animatedStyle}>
      <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
        <Card>Press me</Card>
      </Pressable>
    </Animated.View>
  );
}`;
const hookCustomScaleCode = `// Custom scale value (default is 0.96)
const { animatedStyle, onPressIn, onPressOut } = usePressAnimation(0.92);`;
const staggerCode = `import { stagger } from "@/components/ui/animate";
import Animated from "react-native-reanimated";

// Stagger children with 50ms intervals
{items.map((item, index) => (
  <Animated.View
    key={item.id}
    entering={FadeInUp.delay(index * 50)}
  >
    <ListItem {...item} />
  </Animated.View>
))}`;
const componentUsageCode = `import { entering, exiting, springs, usePressAnimation } from "@/components/ui/animate";
import Animated, { withSpring, useSharedValue, useAnimatedStyle } from "react-native-reanimated";
import { Pressable, View } from "react-native";
import { Card } from "@/components/ui/card";

export function AnimatedCard() {
  const { animatedStyle, onPressIn, onPressOut } = usePressAnimation();
  const offset = useSharedValue(0);

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <Animated.View
      entering={entering.fadeInUp}
      exiting={exiting.fadeOut}
      style={[animatedStyle, slideStyle]}
    >
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => {
          offset.value = withSpring(offset.value === 0 ? 50 : 0, springs.snappy);
        }}
      >
        <Card>
          <Text>Tap to slide</Text>
        </Card>
      </Pressable>
    </Animated.View>
  );
}`;
const sourceCode = `import { useCallback } from "react";
import {
  Easing,
  FadeIn, FadeOut,
  FadeInUp, FadeInDown, FadeOutUp, FadeOutDown,
  SlideInUp, SlideInDown, SlideInLeft, SlideInRight,
  SlideOutUp, SlideOutDown,
  ZoomIn, ZoomOut,
  BounceIn,
  FlipInXUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  type WithSpringConfig,
} from "react-native-reanimated";

// ── Spring Presets (iOS-quality physics) ──────────────────────
export const springs: Record<string, WithSpringConfig> = {
  bouncy:  { damping: 12, stiffness: 150, mass: 0.5 },
  snappy:  { damping: 18, stiffness: 250, mass: 0.8 },
  gentle:  { damping: 20, stiffness: 120, mass: 1 },
  stiff:   { damping: 26, stiffness: 350, mass: 1 },
  default: { damping: 15, stiffness: 180, mass: 0.8 },
};

// ── Layout Animation Presets (entering) ───────────────────────
export const entering = {
  fadeIn:       FadeIn.duration(200),
  fadeInUp:     FadeInUp.duration(250).springify().damping(18),
  fadeInDown:   FadeInDown.duration(250).springify().damping(18),
  slideInUp:    SlideInUp.duration(300).springify(),
  slideInDown:  SlideInDown.duration(300).springify(),
  slideInLeft:  SlideInLeft.duration(300).springify(),
  slideInRight: SlideInRight.duration(300).springify(),
  zoomIn:       ZoomIn.duration(250).springify().damping(15),
  bounceIn:     BounceIn.duration(400),
  flipInX:      FlipInXUp.duration(400),
};

// ── Layout Animation Presets (exiting) ────────────────────────
export const exiting = {
  fadeOut:      FadeOut.duration(150),
  fadeOutUp:    FadeOutUp.duration(200),
  fadeOutDown:  FadeOutDown.duration(200),
  slideOutUp:   SlideOutUp.duration(200),
  slideOutDown: SlideOutDown.duration(200),
  zoomOut:      ZoomOut.duration(200),
};

// ── Duration Presets (ms) ─────────────────────────────────────
export const duration = {
  fast:   150,
  normal: 250,
  slow:   400,
  slower: 600,
};

// ── Easing Presets ────────────────────────────────────────────
export const easing = {
  easeOut:   Easing.out(Easing.cubic),
  easeIn:    Easing.in(Easing.cubic),
  easeInOut: Easing.inOut(Easing.cubic),
  spring:    Easing.bezier(0.175, 0.885, 0.32, 1.275),
  bounce:    Easing.bounce,
};

// ── Hooks ─────────────────────────────────────────────────────

/** Spring-based scale for press feedback. Attach onPressIn/onPressOut to Pressable. */
export function usePressAnimation(scale = 0.96) {
  const pressed = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressed.value }],
  }));
  const onPressIn = useCallback(() => {
    pressed.value = withSpring(scale, springs.snappy);
  }, [scale, pressed]);
  const onPressOut = useCallback(() => {
    pressed.value = withSpring(1, springs.snappy);
  }, [pressed]);
  return { animatedStyle, onPressIn, onPressOut };
}

/** Staggered delay for child entrance animations. Returns delay(ms) for index. */
export function stagger(index: number, interval = 50) {
  return withDelay(index * interval, withTiming(1, { duration: duration.normal }));
}`;
export default function AnimatePage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Animate</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Animation presets, spring configs, and reusable hooks for Reanimated 4.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="animate" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewAnimateDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Spring Presets */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Spring Presets</h2>
        <p className="text-sm text-muted-foreground">
          Pre-tuned spring physics configs for <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">withSpring</code>. Each preset provides a different feel -- from playful bounces to snappy interactions.
        </p>
        <CodeBlock code={springsCode} title="Spring presets" />
        <PropsTable props={[
          { name: "bouncy", type: "WithSpringConfig", default: "damping: 12, stiffness: 150, mass: 0.5" },
          { name: "snappy", type: "WithSpringConfig", default: "damping: 18, stiffness: 250, mass: 0.8" },
          { name: "gentle", type: "WithSpringConfig", default: "damping: 20, stiffness: 120, mass: 1" },
          { name: "stiff", type: "WithSpringConfig", default: "damping: 26, stiffness: 350, mass: 1" },
          { name: "default", type: "WithSpringConfig", default: "damping: 15, stiffness: 180, mass: 0.8" },
        ]} />
      </div>
      {/* Entering Animations */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Entering Animations</h2>
        <p className="text-sm text-muted-foreground">
          Layout animation presets for <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Animated.View entering</code>. Apply directly to any Reanimated view.
        </p>
        <CodeBlock code={enteringCode} title="Entering presets" />
      </div>
      {/* Exiting Animations */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Exiting Animations</h2>
        <p className="text-sm text-muted-foreground">
          Layout animation presets for <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Animated.View exiting</code>. Pair with entering presets for smooth transitions.
        </p>
        <CodeBlock code={exitingCode} title="Exiting presets" />
      </div>
      {/* Duration & Easing */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Duration &amp; Easing</h2>
        <p className="text-sm text-muted-foreground">
          Standardized duration constants and easing curves for <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">withTiming</code>. Use these for consistent timing across your app.
        </p>
        <CodeBlock code={durationEasingCode} title="Duration & easing" />
      </div>
      {/* usePressAnimation Hook */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">usePressAnimation Hook</h2>
        <p className="text-sm text-muted-foreground">
          A spring-based scale animation hook for press feedback. Returns an animated style and press handlers to attach to any <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Pressable</code>.
        </p>
        <CodeBlock code={hookCode} title="usePressAnimation" />
        <h3 className="text-lg font-medium text-foreground mt-6">Custom Scale</h3>
        <p className="text-sm text-muted-foreground">
          Pass a custom scale value (default is <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">0.96</code>) for more or less dramatic press effects.
        </p>
        <CodeBlock code={hookCustomScaleCode} title="Custom scale" />
        <h3 className="text-lg font-medium text-foreground mt-6">Return Values</h3>
        <PropsTable props={[
          { name: "animatedStyle", type: "AnimatedStyleProp", default: "-" },
          { name: "onPressIn", type: "() => void", default: "-" },
          { name: "onPressOut", type: "() => void", default: "-" },
        ]} />
      </div>
      {/* Stagger Helper */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Stagger Helper</h2>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">stagger(index, interval)</code> to create staggered entrance animations for list items. The default interval is 50ms.
        </p>
        <CodeBlock code={staggerCode} title="Stagger children" />
      </div>
      {/* Usage in Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage in Components</h2>
        <p className="text-sm text-muted-foreground">
          Combine presets, hooks, and springs for rich interactive components.
        </p>
        <CodeBlock code={componentUsageCode} title="Combined example" />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Animations respect the system <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Reduce Motion</code> preference when used with Reanimated layout animations.</li>
          <li>Press animations provide visual feedback for interactive elements.</li>
          <li>Keep durations short (under 400ms) for responsiveness.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/animate.tsx" />
      </div>
    </div>
  );
}
