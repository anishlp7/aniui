import { getComponentSource } from "@/lib/registry-source";
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
const sourceCode = getComponentSource("slide-to-confirm");
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
