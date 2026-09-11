import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewHeaderDemo } from "@/components/preview/header";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
const installCode = `npx @aniui/cli add header`;
const usageCode = `import { Header, HeaderLeft, HeaderTitle, HeaderRight, HeaderBackButton } from "@/components/ui/header";
import { Button } from "@/components/ui/button";

export function MyScreen() {
  return (
    <Header>
      <HeaderLeft>
        <HeaderBackButton onPress={() => router.back()} />
      </HeaderLeft>
      <HeaderTitle>Settings</HeaderTitle>
      <HeaderRight>
        <Button size="sm" variant="ghost">Save</Button>
      </HeaderRight>
    </Header>
  );
}`;
const sourceCode = getComponentSource("header");
export default function HeaderPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Header</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Navigation header with back button, title, and action slots.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="header" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewHeaderDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">Header</Heading>
        <PropsTable props={[
          { name: "variant", type: '"default" | "transparent" | "primary"', default: '"default"' },
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">HeaderLeft</Heading>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">HeaderTitle</Heading>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">HeaderRight</Heading>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">HeaderBackButton</Heading>
        <PropsTable props={[
          { name: "onPress", type: "() => void", default: "-" },
          { name: "label", type: "string", default: '"\u2190"' },
          { name: "className", type: "string", default: "-" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>App header with back button navigation.</li>
          <li>Back button has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="button"</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code> for screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/header.tsx" />
      </div>
    </div>
  );
}
