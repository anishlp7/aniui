import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewAvatar } from "@/components/preview/avatar";
import { PreviewAvatarGroup } from "@/components/preview/avatar-group";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add avatar-group`;
const usageCode = `import { Avatar } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";

export function TeamStack() {
  return (
    <AvatarGroup>
      <Avatar src="https://github.com/anishlp7.png" fallback="AN" />
      <Avatar fallback="JD" />
      <Avatar fallback="MK" />
    </AvatarGroup>
  );
}`;
const overflowCode = `// Only the first \`max\` avatars render; the rest collapse into "+N"
<AvatarGroup max={3}>
  <Avatar fallback="AN" />
  <Avatar fallback="JD" />
  <Avatar fallback="MK" />
  <Avatar fallback="SR" />
  <Avatar fallback="TW" />
  <Avatar fallback="PB" />
</AvatarGroup>
// Renders 3 avatars followed by a "+3" indicator`;
const spacingCode = `<AvatarGroup spacing="sm">{/* tight overlap */}</AvatarGroup>
<AvatarGroup spacing="md">{/* default overlap */}</AvatarGroup>
<AvatarGroup spacing="lg">{/* deep overlap */}</AvatarGroup>`;
const sourceCode = getComponentSource("avatar-group");
export default function AvatarGroupPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Avatar Group</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Overlapping stack of avatars with automatic &ldquo;+N&rdquo; overflow — perfect for showing team members or participants.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="flex flex-wrap items-center gap-4">
            <PreviewAvatarGroup>
              <PreviewAvatar src="https://github.com/anishlp7.png" fallback="AN" />
              <PreviewAvatar fallback="JD" />
              <PreviewAvatar fallback="MK" />
            </PreviewAvatarGroup>
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="avatar-group" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Overflow */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Overflow</Heading>
        <p className="text-sm text-muted-foreground">Avatars beyond <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">max</code> (default 4) collapse into a &ldquo;+N&rdquo; counter.</p>
        <ComponentPlayground code={overflowCode}>
          <div className="flex flex-wrap items-center gap-4">
            <PreviewAvatarGroup max={3}>
              <PreviewAvatar fallback="AN" />
              <PreviewAvatar fallback="JD" />
              <PreviewAvatar fallback="MK" />
              <PreviewAvatar fallback="SR" />
              <PreviewAvatar fallback="TW" />
              <PreviewAvatar fallback="PB" />
            </PreviewAvatarGroup>
          </div>
        </ComponentPlayground>
      </div>
      {/* Spacing */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Spacing</Heading>
        <p className="text-sm text-muted-foreground">Control how tightly the avatars overlap.</p>
        <ComponentPlayground code={spacingCode}>
          <div className="flex flex-col gap-4">
            <PreviewAvatarGroup spacing="sm">
              <PreviewAvatar fallback="AN" />
              <PreviewAvatar fallback="JD" />
              <PreviewAvatar fallback="MK" />
            </PreviewAvatarGroup>
            <PreviewAvatarGroup spacing="md">
              <PreviewAvatar fallback="AN" />
              <PreviewAvatar fallback="JD" />
              <PreviewAvatar fallback="MK" />
            </PreviewAvatarGroup>
            <PreviewAvatarGroup spacing="lg">
              <PreviewAvatar fallback="AN" />
              <PreviewAvatar fallback="JD" />
              <PreviewAvatar fallback="MK" />
            </PreviewAvatarGroup>
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "max", type: "number", default: "4" },
          { name: "spacing", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "children", type: "ReactNode" },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native. Children are typically <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Avatar</code> components.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Each child <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Avatar</code> keeps its own accessibility semantics.</li>
          <li>The &ldquo;+N&rdquo; overflow counter is rendered as text and read by screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/avatar-group.tsx" />
      </div>
    </div>
  );
}
