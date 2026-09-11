import { getComponentSource } from "@/lib/registry-source";
import Link from "next/link";
import { Heading } from "@/components/heading";
import {
  PreviewWaveformDemo,
  PreviewWaveformLevelsDemo,
  PreviewWaveformPlaybackDemo,
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
const levelsCode = `// npx expo install expo-av
import { Audio } from "expo-av";
import { Waveform } from "@/components/ui/waveform";

const BARS = 28;
const [levels, setLevels] = useState<number[]>([]);

async function startRecording() {
  await Audio.requestPermissionsAsync();
  await Audio.setAudioModeAsync({ allowsRecordingIOS: true });
  await Audio.Recording.createAsync(
    { ...Audio.RecordingOptionsPresets.HIGH_QUALITY, isMeteringEnabled: true },
    (status) => {
      if (!status.isRecording || status.metering === undefined) return;
      // metering is dBFS (-160…0) — convert to a 0-1 linear amplitude
      const level = Math.min(1, 10 ** (status.metering / 20));
      setLevels((prev) => [...prev.slice(-(BARS - 1)), level]);
    },
    100 // progressUpdateIntervalMillis — matches the bars' ~100ms follow timing
  );
}

// Newest values render on the right; the wave scrolls left as you speak.
<Waveform levels={levels} bars={BARS} />`;
const playbackCode = `// levels draws real playback data: decodedPeaks is a number[] of 0-1
// amplitudes extracted from the audio file (precomputed server-side or
// decoded on load). active={false} keeps it still, and progress fades
// the bars past the playhead — the voice-message scrubber look.
const [status, setStatus] = useState({ position: 0, duration: 1 });
// e.g. expo-av: sound.setOnPlaybackStatusUpdate((s) =>
//   s.isLoaded && setStatus({ position: s.positionMillis, duration: s.durationMillis ?? 1 }));

<View className="flex-row items-center gap-3 rounded-2xl border border-input bg-background px-4 py-3">
  <PlayButton onPress={togglePlay} />
  <Waveform
    levels={decodedPeaks}
    active={false}
    progress={status.position / status.duration}
    bars={32}
    size="sm"
    className="flex-1"
  />
  <Text className="text-xs text-muted-foreground">{remaining}</Text>
</View>`;
const customCode = `// Fewer, smaller bars for tight spaces
<Waveform size="sm" bars={16} />

// Default: 28 bars, md (20pt tall)
<Waveform />

// Big and branded — color overrides the theme foreground
<Waveform size="lg" bars={40} color="#ef4444" />`;
const composerCode = `// Inside the Prompt Input composer: while recording, the toolbar
// swaps its tools for a live waveform with cancel/confirm on the right.
import { X, Check } from "lucide-react-native";
import { Waveform } from "@/components/ui/waveform";
import { PromptInputToolbar, PromptInputButton } from "@/components/ui/prompt-input";

<PromptInputToolbar>
  <Waveform active size="sm" className="flex-1" />
  <PromptInputButton onPress={cancelRecording} accessibilityLabel="Cancel recording">
    <X size={20} color="#71717a" />
  </PromptInputButton>
  <PromptInputButton onPress={finishRecording} accessibilityLabel="Finish recording" className="bg-primary">
    <Check size={20} color="#fafafa" />
  </PromptInputButton>
</PromptInputToolbar>`;
const sourceCode = getComponentSource("waveform");
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
        <p className="text-sm text-muted-foreground">Each bar pulses on its own tempo while <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">active</code> (the default) — drop it in wherever the app is listening. This ambient animation is the fallback when no real audio <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">levels</code> are wired up; bar heights are deterministic, so the wave looks organic but renders identically every time.</p>
        <CodeBlock code={usageCode} title="app/recorder.tsx" />
      </div>
      {/* Driven by real audio */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Driven by real audio</Heading>
        <p className="text-sm text-muted-foreground">Pass <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">levels</code> — an array of 0–1 amplitudes — and the bars follow the audio instead of the ambient animation. Push mic metering from expo-av into a rolling state array: metering arrives in dBFS, so convert with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">10 ** (metering / 20)</code>. The newest <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">bars</code> values are shown (newest on the right, left-padded with silence), and each bar eases to its level over ~100ms.</p>
        <ComponentPlayground code={levelsCode}>
          <PreviewWaveformLevelsDemo />
        </ComponentPlayground>
      </div>
      {/* Playback waveform */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Playback waveform</Heading>
        <p className="text-sm text-muted-foreground"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">levels</code> works for playback too: pass decoded peaks from the audio file with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">active={"{false}"}</code> to render a static wave of the actual recording — the classic voice-message bubble in chat UIs.</p>
        <ComponentPlayground code={playbackCode}>
          <PreviewWaveformPlaybackDemo />
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
        <p className="text-sm text-muted-foreground">Built for the <Link href="/docs/prompt-input" className="text-primary hover:underline">Prompt Input</Link> recording state — while recording, the composer toolbar swaps its tools for a live waveform with cancel and confirm buttons on the right.</p>
        <ComponentPlayground code={composerCode}>
          <PreviewPromptInputRecordingDemo />
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "bars", type: "number", default: "28", description: "Number of bars in the wave." },
          { name: "levels", type: "number[]", default: "-", description: "Real audio amplitudes in 0–1 (mic metering or decoded playback data). The most recent bars values are shown, newest on the right, left-padded with silence; when provided, the bars follow the audio instead of the ambient animation." },
          { name: "active", type: "boolean", default: "true", description: "Without levels: animate the ambient wave (recording). false renders a static wave. Also drives the accessibility label." },
          { name: "progress", type: "number", default: "-", description: "Playback position 0–1 — bars past the playhead render faded, the classic voice-message scrubber look." },
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
