import Link from "next/link";
import { Heading } from "@/components/heading";
import {
  PreviewWaveformDemo,
  PreviewWaveformStaticDemo,
  PreviewWaveformCustomDemo,
} from "@/components/preview/waveform";
import { PreviewPromptInputRecordingDemo } from "@/components/preview/prompt-input";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add waveform`;
const usageCode = `import { Waveform } from "@/components/ui/waveform";

export function VoiceRecorder() {
  const [recording, setRecording] = useState(false);

  return (
    <View className="items-center gap-4 p-4">
      {/* active animates the bars — the recording indicator */}
      <Waveform active={recording} />
    </View>
  );
}`;
const staticCode = `// active={false} renders a frozen wave — a playback scrubber look
// for voice-message bubbles.
<View className="flex-row items-center gap-3 rounded-2xl border border-input bg-background px-4 py-3">
  <PlayButton onPress={play} />
  <Waveform active={false} size="sm" className="flex-1" />
  <Text className="text-xs text-muted-foreground">0:12</Text>
</View>`;
const customCode = `// Fewer, smaller bars for tight spaces
<Waveform size="sm" bars={16} />

// Default: 28 bars, md (20pt tall)
<Waveform />

// Big and branded — color overrides the theme foreground
<Waveform size="lg" bars={40} color="#ef4444" />`;
const composerCode = `// Inside the Prompt Input composer: while recording, the toolbar
// swaps its tools for a live waveform with cancel/confirm buttons.
import { X, Check } from "lucide-react-native";
import { Waveform } from "@/components/ui/waveform";
import { PromptInputToolbar, PromptInputButton } from "@/components/ui/prompt-input";

<PromptInputToolbar>
  <PromptInputButton onPress={cancelRecording} accessibilityLabel="Cancel recording">
    <X size={20} color="#71717a" />
  </PromptInputButton>
  <Waveform active size="sm" className="flex-1" />
  <PromptInputButton onPress={finishRecording} accessibilityLabel="Finish recording" className="bg-primary">
    <Check size={20} color="#fafafa" />
  </PromptInputButton>
</PromptInputToolbar>`;
const sourceCode = `import React, { useEffect } from "react";
import { View, useColorScheme } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming, cancelAnimation } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const sizes = { sm: 12, md: 20, lg: 28 } as const;

// Deterministic per-bar amplitude/tempo so the wave looks organic without
// Math.random (keeps renders stable and tests deterministic).
const amp = (i: number) => 0.35 + 0.65 * Math.abs(Math.sin(i * 2.4) * Math.cos(i * 0.7));

function Bar({ index, max, active, color }: { index: number; max: number; active: boolean; color: string }) {
  const scale = useSharedValue(active ? 0.3 : 1);
  useEffect(() => {
    if (active) {
      const duration = 260 + (index % 5) * 70;
      scale.value = withRepeat(
        withSequence(withTiming(1, { duration }), withTiming(0.25, { duration })),
        -1,
        true
      );
    } else {
      cancelAnimation(scale);
      scale.value = withTiming(1, { duration: 150 });
    }
    return () => cancelAnimation(scale);
  }, [active, index, scale]);

  const height = Math.max(3, max * amp(index));
  const style = useAnimatedStyle(() => ({ height, transform: [{ scaleY: scale.value }] }));
  return <Animated.View style={[style, { backgroundColor: color }]} className="w-0.5 rounded-full" />;
}

export interface WaveformProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  /** Number of bars (default 28). */
  bars?: number;
  /** Animate the bars (recording/playing). false renders a static wave. */
  active?: boolean;
  size?: keyof typeof sizes;
  /** Bar color; defaults to the theme foreground. */
  color?: string;
}

export function Waveform({ className, bars = 28, active = true, size = "md", color, ...props }: WaveformProps) {
  const dark = useColorScheme() === "dark";
  const barColor = color ?? (dark ? "#fafafa" : "#18181b");
  return (
    <View
      className={cn("flex-row items-center justify-center gap-0.5", className)}
      accessibilityLabel={active ? "Recording" : "Audio waveform"}
      {...props}
    >
      {Array.from({ length: bars }, (_, i) => (
        <Bar key={i} index={i} max={sizes[size]} active={active} color={barColor} />
      ))}
    </View>
  );
}`;
export default function WaveformPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Waveform</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Animated audio waveform bars for voice-recording and playback states.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewWaveformDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="waveform" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <p className="text-sm text-muted-foreground">Each bar pulses on its own tempo while <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">active</code> (the default) — drop it in wherever the app is listening. Bar heights are deterministic, so the wave looks organic but renders identically every time.</p>
        <CodeBlock code={usageCode} title="app/recorder.tsx" />
      </div>
      {/* Static playback */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Static playback wave</Heading>
        <p className="text-sm text-muted-foreground">Set <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">active={"{false}"}</code> for a frozen wave — the classic voice-message bubble in chat UIs.</p>
        <ComponentPlayground code={staticCode}>
          <PreviewWaveformStaticDemo />
        </ComponentPlayground>
      </div>
      {/* Bars, size & color */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Bars, size &amp; color</Heading>
        <p className="text-sm text-muted-foreground">Tune density with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">bars</code>, height with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">size</code>, and pass <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">color</code> to override the theme foreground.</p>
        <ComponentPlayground code={customCode}>
          <PreviewWaveformCustomDemo />
        </ComponentPlayground>
      </div>
      {/* In the composer */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">In the composer</Heading>
        <p className="text-sm text-muted-foreground">Built for the <Link href="/docs/prompt-input" className="text-primary hover:underline">Prompt Input</Link> recording state — while recording, the composer toolbar swaps its tools for a live waveform between cancel and confirm buttons.</p>
        <ComponentPlayground code={composerCode}>
          <PreviewPromptInputRecordingDemo />
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "bars", type: "number", default: "28", description: "Number of bars in the wave." },
          { name: "active", type: "boolean", default: "true", description: "Animate the bars (recording/playing). false renders a static wave." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"' },
          { name: "color", type: "string", default: "-", description: "Bar color; defaults to the theme foreground." },
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props. Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> for the bar animations.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code> announces &ldquo;Recording&rdquo; while active and &ldquo;Audio waveform&rdquo; when static.</li>
          <li>The bars are decorative; the label conveys the state to assistive technology.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/waveform.tsx" />
      </div>
    </div>
  );
}
