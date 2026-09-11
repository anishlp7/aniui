import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewActionSheet } from "@/components/preview/action-sheet";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add action-sheet`;
const depInstallCode = `npx expo install @gorhom/bottom-sheet react-native-gesture-handler react-native-reanimated`;
const usageCode = `import { ActionSheet } from "@/components/ui/action-sheet";
import { useRef } from "react";
import GorhomBottomSheet from "@gorhom/bottom-sheet";

export function MyScreen() {
  const sheetRef = useRef<GorhomBottomSheet>(null);
  return (
    <>
      <Button onPress={() => sheetRef.current?.expand()}>
        Show Actions
      </Button>
      <ActionSheet
        ref={sheetRef}
        title="Choose an action"
        actions={[
          { label: "Share", onPress: () => console.log("Share") },
          { label: "Edit", onPress: () => console.log("Edit") },
          { label: "Delete", onPress: () => console.log("Delete"), destructive: true },
        ]}
        onCancel={() => sheetRef.current?.close()}
      />
    </>
  );
}`;
const sourceCode = getComponentSource("action-sheet");
export default function ActionSheetPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">ActionSheet</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Action sheet with a list of actions, powered by @gorhom/bottom-sheet.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewActionSheet
            title="Add a photo"
            actions={[
              { label: "Take Photo" },
              { label: "Choose from Library" },
            ]}
          />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="action-sheet" />
        <p className="text-sm text-muted-foreground">
          This component requires additional dependencies:
        </p>
        <CodeBlock code={depInstallCode} />
        <p className="text-sm text-muted-foreground">
          You also need to wrap your app with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">GestureHandlerRootView</code> from <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-gesture-handler</code>.
        </p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "title", type: "string" },
          { name: "actions", type: "ActionSheetAction[]", default: "required" },
          { name: "onCancel", type: "() => void" },
          { name: "className", type: "string" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">ActionSheetAction</Heading>
        <PropsTable props={[
          { name: "label", type: "string", default: "required" },
          { name: "onPress", type: "() => void", default: "required" },
          { name: "destructive", type: "boolean", default: "false" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Use a ref to control the sheet imperatively. Call <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">expand()</code> to open and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">close()</code> to dismiss.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Powered by <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">@gorhom/bottom-sheet</code> for action options.</li>
          <li>Each action item is focusable with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="button"</code>.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/action-sheet.tsx" />
      </div>
    </div>
  );
}
