import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { ToastDemo } from "./_demos";

const usageCode = `import { ToastProvider, useToast } from "@/components/ui/toast";
// Wrap your app with ToastProvider
export function App() {
  return (
    <ToastProvider>
      <MyScreen />
    </ToastProvider>
  );
}
function MyScreen() {
  const { toast } = useToast();
  return (
    <Button
      onPress={() =>
        toast({ title: "Success!", description: "Your action was completed." })
      }
    >
      Show Toast
    </Button>
  );
}`;
const variantsCode = `// Default toast
toast({ title: "Notification", description: "Something happened." });
// Destructive toast
toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
// Success toast
toast({ title: "Saved", description: "Changes saved successfully.", variant: "success" });`;
const positionsCode = `// Two independent concerns:
//   position — where the toast RESTS on screen ("top" | "bottom", default "top")
//   from     — which side it SLIDES IN FROM ("top" | "bottom" | "left" | "right",
//              defaults to match position so the natural pairing just works)

// Default — drops down from above into the top resting position.
toast({ title: "Heads up" });

// Pinned to the bottom, rises in from below.
toast({ title: "Saved", position: "bottom" });

// Pinned to top but flies in from the right edge.
toast({ title: "New message", position: "top", from: "right" });

// App-wide defaults on the provider.
<ToastProvider defaultPosition="bottom" defaultFrom="left">
  <App />
</ToastProvider>`;
const sourceCode = getComponentSource("toast");
export default function ToastPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Toast</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Notification toast with slide-in animation and auto-dismiss. Toasts rest at the top or bottom of the screen and can slide in from any of the four sides — position and animation direction are independent.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="w-full max-w-sm">
            <ToastDemo />
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="toast" />
        <p className="text-sm text-muted-foreground">
          Toast renders through a Portal so it always anchors to the screen instead of the nearest positioned ancestor (otherwise wrapping <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">ToastProvider</code> inside a ScrollView would make toasts scroll with the content). The CLI adds <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&lt;PortalHost /&gt;</code> to your root layout automatically. Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> for the slide animations and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@rn-primitives/portal</code> for the portal host.
        </p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Variants */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Variants</Heading>
        <CodeBlock code={variantsCode} title="app/index.tsx" />
      </div>
      {/* Position & slide direction */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Position &amp; slide direction</Heading>
        <p className="text-sm text-muted-foreground">
          A toast has two independent controls:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ms-2">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">position</code> — where the toast rests on screen (<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">"top"</code> or <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">"bottom"</code>). Both span the full width with consistent margins.</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">from</code> — which edge the toast slides in from (<code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">"top"</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">"bottom"</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">"left"</code>, or <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">"right"</code>). Defaults to match <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">position</code>, so the natural pairing just works.</li>
        </ul>
        <CodeBlock code={positionsCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">useToast</Heading>
        <p className="text-sm text-muted-foreground">
          Returns an object with a <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">toast</code> function.
        </p>
        <PropsTable props={[
          { name: "title", type: "string", default: "required" },
          { name: "description", type: "string" },
          { name: "variant", type: "\"default\" | \"destructive\" | \"success\"", default: "\"default\"" },
          { name: "position", type: "\"top\" | \"bottom\"", default: "provider default (\"top\")", description: "Where the toast rests on screen." },
          { name: "from", type: "\"top\" | \"bottom\" | \"left\" | \"right\"", default: "matches position", description: "Which edge the toast slides in from. Defaults to match position so the natural pairing just works." },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">ToastProvider</Heading>
        <PropsTable props={[
          { name: "children", type: "React.ReactNode", default: "required" },
          { name: "defaultPosition", type: "\"top\" | \"bottom\"", default: "\"top\"", description: "App-wide default resting position." },
          { name: "defaultFrom", type: "\"top\" | \"bottom\" | \"left\" | \"right\"", default: "matches defaultPosition", description: "App-wide default slide-in direction." },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Uses React Context provider with auto-dismiss timer</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="alert"</code> on each toast for screen reader announcements.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/toast.tsx" />
      </div>
    </div>
  );
}
