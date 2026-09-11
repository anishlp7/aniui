import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { DrawerDefaultDemo, DrawerLeftDemo, DrawerRightDemo } from "./_demos";

const usageCode = `import { Drawer, DrawerContent } from "@/components/ui/drawer";

export function MyScreen() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onPress={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <Text>Drawer content here</Text>
        </DrawerContent>
      </Drawer>
    </>
  );
}`;
const leftDrawerCode = `<Drawer open={open} onOpenChange={setOpen} side="left">
  <DrawerContent>
    <Text>Left drawer content</Text>
  </DrawerContent>
</Drawer>`;
const rightDrawerCode = `<Drawer open={open} onOpenChange={setOpen} side="right">
  <DrawerContent>
    <Text>Right drawer content</Text>
  </DrawerContent>
</Drawer>`;
const sourceCode = getComponentSource("drawer");
export default function DrawerPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Drawer</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A sliding panel that emerges from the left or right edge of the screen, ideal for navigation menus and side content.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> (Tier 2).
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <DrawerDefaultDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="drawer" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Left Drawer */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Left Drawer (Default)</Heading>
        <ComponentPlayground code={leftDrawerCode}>
          <DrawerLeftDemo />
        </ComponentPlayground>
      </div>
      {/* Right Drawer */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Right Drawer</Heading>
        <ComponentPlayground code={rightDrawerCode}>
          <DrawerRightDemo />
        </ComponentPlayground>
      </div>
      {/* Props - Drawer */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">Drawer</Heading>
        <PropsTable props={[
          { name: "open", type: "boolean", default: "required" },
          { name: "onOpenChange", type: "(open: boolean) => void", default: "required" },
          { name: "side", type: "\"left\" | \"right\"", default: "\"left\"" },
          { name: "children", type: "ReactNode", default: "required" },
        ]} />
        {/* Props - DrawerContent */}
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">DrawerContent</Heading>
        <PropsTable props={[
          { name: "className", type: "string" },
          { name: "children", type: "ReactNode" },
        ]} />
        <p className="text-sm text-muted-foreground">
          DrawerContent also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Side drawer with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="menu"</code>.</li>
          <li>Backdrop dismiss and close button are accessible to screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/drawer.tsx" />
      </div>
    </div>
  );
}
