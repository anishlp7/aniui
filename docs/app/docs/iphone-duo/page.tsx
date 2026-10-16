import Link from "next/link";
import { Heading } from "@/components/heading";
import { CodeBlock } from "@/components/code-block-server";

const installHinge = `# Opt into fold-aware overlays
npx expo install expo-hinge

# No code change needed in your app — the 10 fold-aware overlays
# (Dialog, Popover, HoverCard, DropdownMenu, ContextMenu, Tooltip,
# BottomSheet, ActionSheet, Toast, CommandMenu) consume useFoldFeatures()
# internally and automatically shift away from the fold line on an
# unfolded Duo.`;

const useFoldExample = `import { useFoldFeatures } from "@/components/ui/fold";
import { View, Text } from "react-native";

function MyPane() {
  const fold = useFoldFeatures();

  // Pre-fold / non-Duo: fold.foldX is null — short-circuit back to normal.
  if (fold.foldX === null) {
    return <View><Text>Normal layout</Text></View>;
  }

  // Unfolded Duo: fold.foldX = window.width / 2 (the fold line).
  // Pin content to the left pane:
  return (
    <View style={{ width: fold.foldX }}>
      <Text>Left pane content</Text>
    </View>
  );
}`;

const foldPaneExample = `// Clamp a BottomSheet to one pane on an unfolded Duo:
<BottomSheet ref={ref} foldPane="right">
  <Text>Shows on the right pane only</Text>
</BottomSheet>

// Opt out — span the full screen like today:
<BottomSheet ref={ref} foldPane="full">
  <Text>Spans both panes</Text>
</BottomSheet>

// Default is "left" (left pane is primary on iPhone Duo).`;

export default function IPhoneDuoPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">iPhone Duo</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Apple&apos;s first foldable (ships 2026-10-23) presents a 7.6&quot; unfolded display with a reserved fold line down the middle, and a 5.4&quot; folded cover display. AniUI&apos;s 149 components adapt out of the box; 10 overlay components also opt into fold-aware positioning when <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">expo-hinge</code> is installed.
        </p>
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">What works out of the box</Heading>
        <p className="text-sm text-muted-foreground leading-relaxed">
          All 149 AniUI components use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">useWindowDimensions()</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">useSafeAreaInsets()</code> internally. Expo SDK 58&apos;s UIKit scene-based lifecycle resizes the window when the user unfolds the device; React Native re-lays out; your UI follows along. No code change required for most layouts to work on day one on both displays.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Horizontal safe-area insets (<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">insets.left</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">insets.right</code>) are read by <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">animated-header-scrollview</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">tray</code>, and all overlay primitives (<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">popover</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">dropdown-menu</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">tooltip</code>, …), so content respects the reserved region.
        </p>
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Opt-in fold awareness</Heading>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Install the <Link href="https://docs.expo.dev/versions/latest/sdk/hinge/" className="text-primary hover:underline">expo-hinge</Link> peer dep to enable fold-aware overlay positioning. Ten overlay components (<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Dialog</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">AlertDialog</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Popover</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">HoverCard</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">DropdownMenu</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">ContextMenu</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Tooltip</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">BottomSheet</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">ActionSheet</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Toast</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">CommandMenu</code>) shift away from the fold line when the device reports as unfolded, so they stay inside one pane instead of visually bisecting the screen.
        </p>
        <CodeBlock code={installHinge} language="bash" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          Without <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">expo-hinge</code> installed, every component behaves exactly as it does today — the hook&apos;s <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">require()</code> is wrapped in a try/catch and returns all-null fields, which overlays short-circuit on.
        </p>
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">useFoldFeatures()</Heading>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The primitive hook: a React hook that returns the current fold state. Returns all-null on non-fold devices.
        </p>
        <CodeBlock code={useFoldExample} language="tsx" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          Shape:
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">isFolded</code> — <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">boolean | null</code>. True when closed, false when open, null on non-fold devices.</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">foldX</code> — <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">number | null</code>. The fold line&apos;s x-coordinate in window pixels when unfolded. Null otherwise.</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">hingeAngle</code> — <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">number | null</code>. Raw hinge angle in degrees (0 closed, 180 flat).</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">postureHint</code> — <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&quot;flat&quot; | &quot;half-open&quot; | &quot;closed&quot; | null</code>.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">foldPane prop (BottomSheet &amp; ActionSheet)</Heading>
        <p className="text-sm text-muted-foreground leading-relaxed">
          BottomSheet and ActionSheet accept a <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">foldPane</code> prop that picks which pane the sheet clamps to on an unfolded Duo. Default is <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&quot;left&quot;</code>; set to <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&quot;full&quot;</code> to opt out and keep the pre-fold screen-wide behavior.
        </p>
        <CodeBlock code={foldPaneExample} language="tsx" />
      </div>

      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">What&apos;s not yet in 0.8.0</Heading>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Deferred to 0.8.1 — tracked separately because they need testing on real hardware (which ships 2026-10-23):
        </p>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-2">
          <li>Hinge-angle-reactive components (carousels that pause mid-flip at 90°, ArcList with hinge-synced scroll).</li>
          <li>A <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">DuoSplit</code> primitive wrapping Expo UI&apos;s <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">ArrangementView</code> / <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">NavigationSplitView</code> for two-pane layouts.</li>
          <li>Posture-aware variants (tent mode, book mode). Apple&apos;s HIG explicitly warns against using hinge state for layout; this stays interactions-only.</li>
        </ul>
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          See also: <Link href="/docs/expo-58" className="text-primary hover:underline">Expo SDK 58 guide</Link> &middot; <Link href="/docs/compatibility" className="text-primary hover:underline">Compatibility matrix</Link>
        </p>
      </div>
    </div>
  );
}
