import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewKeyboardViewDemo } from "@/components/preview/keyboard-view";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add keyboard-view`;
const usageCode = `import { View } from "react-native";
import { KeyboardView } from "@/components/ui/keyboard-view";
import { SafeArea } from "@/components/ui/safe-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginScreen() {
  return (
    <SafeArea>
      <KeyboardView>
        <View className="flex-1 justify-end gap-3 p-6">
          <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" />
          <Input placeholder="Password" secureTextEntry />
          <Button>Sign In</Button>
        </View>
      </KeyboardView>
    </SafeArea>
  );
}`;
const offsetCode = `// Account for a fixed header above the KeyboardView
// (offset maps to KeyboardAvoidingView's keyboardVerticalOffset)
<KeyboardView offset={64}>
  {/* Screen content */}
</KeyboardView>`;
const behaviorCode = `// The default behavior is "padding" on iOS and undefined on Android
// (Android's adjustResize already resizes the window). Override if needed:
<KeyboardView behavior="height">
  {/* Screen content */}
</KeyboardView>`;
const sourceCode = getComponentSource("keyboard-view");
export default function KeyboardViewPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Keyboard View</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          KeyboardAvoidingView wrapper with sensible platform defaults — keeps inputs visible above the keyboard.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewKeyboardViewDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="keyboard-view" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <p className="text-sm text-muted-foreground">Wrap the screen content in <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">KeyboardView</code> — the component is <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">flex-1</code> by default, so inputs at the bottom slide up when the keyboard opens.</p>
        <CodeBlock code={usageCode} title="app/login.tsx" />
      </div>
      {/* Offset */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Offset</Heading>
        <p className="text-sm text-muted-foreground">If a fixed header or navigation bar sits above the view, pass its height as <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">offset</code> so the keyboard math stays correct.</p>
        <CodeBlock code={offsetCode} title="Offset for fixed headers" />
      </div>
      {/* Behavior */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Behavior</Heading>
        <p className="text-sm text-muted-foreground">On iOS the default is <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">&quot;padding&quot;</code>; on Android it is <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">undefined</code> because <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">windowSoftInputMode=&quot;adjustResize&quot;</code> already resizes the window — setting a behavior there would double-shift the layout.</p>
        <CodeBlock code={behaviorCode} title="Overriding behavior" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "offset", type: "number", default: "—" },
          { name: "behavior", type: "\"height\" | \"position\" | \"padding\"", default: "\"padding\" on iOS, undefined on Android" },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">KeyboardAvoidingView</code> props from React Native. <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">offset</code> is forwarded as <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">keyboardVerticalOffset</code>.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Keeps focused inputs visible above the keyboard, which is essential for switch-access and low-vision users.</li>
          <li>Layout container only — content within inherits standard accessibility behavior.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/keyboard-view.tsx" />
      </div>
    </div>
  );
}
