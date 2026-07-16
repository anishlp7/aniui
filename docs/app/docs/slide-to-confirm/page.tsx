import { Heading } from "@/components/heading";
import {
  PreviewSlideToConfirmDemo,
  PreviewSlideToConfirmDestructiveDemo,
} from "@/components/preview/slide-to-confirm";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add slide-to-confirm`;
const usageCode = `import { SlideToConfirm } from "@/components/ui/slide-to-confirm";

export function CheckoutScreen() {
  return (
    <SlideToConfirm
      label="Slide to pay $49.00"
      confirmedLabel="Payment confirmed"
      onConfirm={() => submitPayment()}
    />
  );
}`;
const destructiveCode = `// A deliberate slide gesture is much harder to trigger
// accidentally than a tap — ideal for destructive actions.
<SlideToConfirm
  className="bg-destructive/15"
  label="Slide to delete account"
  confirmedLabel="Account deleted"
  onConfirm={() => deleteAccount()}
/>`;
const resetCode = `// onConfirm fires exactly once. To arm the control again
// (e.g. after a failed request), remount it with a new key.
const [attempt, setAttempt] = useState(0);

<SlideToConfirm
  key={attempt}
  label="Slide to confirm"
  onConfirm={() =>
    process().catch(() => setAttempt((a) => a + 1))
  }
/>`;
const sourceCode = `import React, { useState } from "react";
import { View, Text, useColorScheme } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, interpolate, runOnJS } from "react-native-reanimated";
import { ChevronRight, Check } from "lucide-react-native";
import { cn } from "@/lib/utils";

const THUMB = 48;
const PAD = 4;

export interface SlideToConfirmProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  label?: string;
  confirmedLabel?: string;
  disabled?: boolean;
  /** Fired once when the thumb reaches the end. Remount (key) to reset. */
  onConfirm: () => void;
}

export function SlideToConfirm({
  className, label = "Slide to confirm", confirmedLabel = "Confirmed",
  disabled, onConfirm, onLayout, ...props
}: SlideToConfirmProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const tx = useSharedValue(0);
  const end = Math.max(0, trackWidth - THUMB - PAD * 2);
  const dark = useColorScheme() === "dark";

  const confirm = () => {
    setConfirmed(true);
    onConfirm();
  };

  const gesture = Gesture.Pan()
    .enabled(!disabled && !confirmed && end > 0)
    .onUpdate((e) => { tx.value = Math.max(0, Math.min(end, e.translationX)); })
    .onEnd(() => {
      if (tx.value >= end * 0.92) {
        tx.value = withTiming(end, { duration: 120 }, () => runOnJS(confirm)());
      } else {
        tx.value = withSpring(0);
      }
    });

  const thumbStyle = useAnimatedStyle(() => ({ transform: [{ translateX: tx.value }] }));
  // The hint label fades out as the thumb travels across it.
  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(tx.value, [0, end || 1], [1, 0]),
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View
        className={cn("h-14 w-full justify-center rounded-full bg-secondary", disabled && "opacity-50", className)}
        onLayout={(e) => { setTrackWidth(e.nativeEvent.layout.width); onLayout?.(e); }}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={confirmed ? confirmedLabel : label}
        accessibilityState={{ disabled: !!disabled }}
        {...props}
      >
        <Animated.View style={labelStyle} className="absolute inset-0 items-center justify-center" pointerEvents="none">
          <Text className="text-sm font-medium text-muted-foreground">{label}</Text>
        </Animated.View>
        {confirmed && (
          <View className="absolute inset-0 items-center justify-center" pointerEvents="none">
            <Text className="text-sm font-medium text-foreground">{confirmedLabel}</Text>
          </View>
        )}
        <Animated.View
          style={thumbStyle}
          className="ms-1 h-12 w-12 items-center justify-center rounded-full bg-primary"
        >
          {confirmed ? (
            <Check size={20} color={dark ? "#18181b" : "#fafafa"} strokeWidth={2.5} />
          ) : (
            <ChevronRight size={22} color={dark ? "#18181b" : "#fafafa"} />
          )}
        </Animated.View>
      </View>
    </GestureDetector>
  );
}`;
export default function SlideToConfirmPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Slide to Confirm</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Slide-to-pay style confirmation — the thumb springs back unless dragged to the end, then locks with a check icon.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewSlideToConfirmDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="slide-to-confirm" />
        <p className="text-sm text-muted-foreground">Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-gesture-handler</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> — wrap your app root in <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">GestureHandlerRootView</code>.</p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <p className="text-sm text-muted-foreground"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onConfirm</code> fires once when the thumb reaches the end of the track. Releasing below 92% of the travel springs the thumb back — no accidental confirmations.</p>
        <CodeBlock code={usageCode} title="app/checkout.tsx" />
      </div>
      {/* Destructive */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Destructive actions</Heading>
        <p className="text-sm text-muted-foreground">Restyle the track with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">className</code> for destructive confirmations.</p>
        <ComponentPlayground code={destructiveCode}>
          <PreviewSlideToConfirmDestructiveDemo />
        </ComponentPlayground>
      </div>
      {/* Reset */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Resetting</Heading>
        <CodeBlock code={resetCode} title="Reset via key" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "onConfirm", type: "() => void", description: "Fired once when the thumb reaches the end. Remount via key to reset." },
          { name: "label", type: "string", default: "\"Slide to confirm\"" },
          { name: "confirmedLabel", type: "string", default: "\"Confirmed\"" },
          { name: "disabled", type: "boolean", default: "false" },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native. Needs <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">lucide-react-native</code> for the chevron and check icons.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>The track is a single accessible element with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code> — its label switches to <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">confirmedLabel</code> after confirming.</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">disabled</code> is exposed via <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState</code> and dims the control.</li>
          <li>The 48dp thumb meets the minimum touch target size.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/slide-to-confirm.tsx" />
      </div>
    </div>
  );
}
