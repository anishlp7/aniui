import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import React from "react";
import { PreviewBanner } from "@/components/preview/banner";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable, type PropDef } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { BannerDemo, BannerActionDemo } from "./_demos";

const installCode = `npx @aniui/cli add banner`;
const usageCode = `import { Banner } from "@/components/ui/banner";
<Banner variant="info" onDismiss={() => {}}>
  New version available. Update now for the latest features.
</Banner>`;
const variantsCode = `<Banner variant="default">Default banner message</Banner>
<Banner variant="info">Informational update</Banner>
<Banner variant="warning">Please review your settings</Banner>
<Banner variant="destructive">Action required immediately</Banner>
<Banner variant="success">Operation completed successfully</Banner>`;
const actionCode = `<Banner
  variant="info"
  action={{ label: "Update", onPress: () => {} }}
  onDismiss={() => {}}
>
  A new version is available.
</Banner>`;
const sourceCode = getComponentSource("banner");
const bannerProps: PropDef[] = [
  {
    name: "variant",
    type: '"default" | "info" | "warning" | "destructive" | "success"',
    default: '"default"',
  },
  {
    name: "children",
    type: "string",
    description: "The banner message text.",
  },
  {
    name: "icon",
    type: "ReactNode",
    description: "Optional leading icon. Pair with your preferred icon library.",
  },
  {
    name: "action",
    type: '{ label: string; onPress: () => void }',
    description: "Inline action button with label and press handler.",
  },
  {
    name: "onDismiss",
    type: "() => void",
    description: "Shows a dismiss button when provided.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional NativeWind classes for the container.",
  },
];
export default function BannerPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Banner</h1>
        <p className="text-muted-foreground text-lg">
          Contextual notification banner with tinted backgrounds, optional icon,
          action button, and dismiss. Each variant has distinct colors that work
          in both light and dark mode.
        </p>
      </div>
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <BannerDemo />
        </ComponentPlayground>
      </PreviewToggle>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="banner" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Variants</Heading>
        <p className="text-sm text-muted-foreground mb-4">
          Each variant uses a unique tinted background with matching border and
          text color. Warning uses amber tones, success uses green, destructive
          uses red, and info uses your primary color.
        </p>
        <ComponentPlayground code={variantsCode}>
          <div className="space-y-3">
            <PreviewBanner variant="default">
              Default banner message
            </PreviewBanner>
            <PreviewBanner variant="info">Informational update</PreviewBanner>
            <PreviewBanner variant="warning">
              Please review your settings
            </PreviewBanner>
            <PreviewBanner variant="destructive">
              Action required immediately
            </PreviewBanner>
            <PreviewBanner variant="success">
              Operation completed successfully
            </PreviewBanner>
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">With Action</Heading>
        <p className="text-sm text-muted-foreground mb-4">
          Add an{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">
            action
          </code>{" "}
          prop with a label and onPress handler to show an inline action button.
        </p>
        <ComponentPlayground code={actionCode}>
          <BannerActionDemo />
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Props</Heading>
        <PropsTable props={bannerProps} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="alert"</code> for informational banners.</li>
          <li>Dismiss button includes <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel="Dismiss"</code> for screen readers.</li>
        </ul>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/banner.tsx" />
      </div>
    </div>
  );
}