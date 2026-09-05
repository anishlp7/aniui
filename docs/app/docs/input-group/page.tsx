import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewInputGroupDemo, PreviewInputGroupSuffix, PreviewInputGroupButton } from "@/components/preview/input-group";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const usageCode = `import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

export function MyScreen() {
  return (
    <InputGroup>
      <InputGroupAddon>
        <InputGroupText>$</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="0.00" keyboardType="numeric" />
    </InputGroup>
  );
}`;
const suffixCode = `import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

export function MyScreen() {
  return (
    <InputGroup>
      <InputGroupInput placeholder="you@example.com" keyboardType="email-address" />
      <InputGroupAddon align="end">
        <InputGroupText>@gmail.com</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}`;
const buttonCode = `import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Text } from "react-native";

export function MyScreen() {
  return (
    <InputGroup>
      <InputGroupInput placeholder="Search..." />
      <InputGroupButton onPress={() => console.log("search")}>
        <Text className="text-sm font-medium text-primary">Go</Text>
      </InputGroupButton>
    </InputGroup>
  );
}`;
const sourceCode = getComponentSource("input-group");
export default function InputGroupPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Input Group</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Add addons, buttons, and helper content to inputs.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewInputGroupDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="input-group" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Suffix Addon */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Suffix Addon</Heading>
        <PreviewToggle>
          <ComponentPlayground code={suffixCode}>
            <PreviewInputGroupSuffix />
          </ComponentPlayground>
        </PreviewToggle>
      </div>
      {/* Button Addon */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Button Addon</Heading>
        <PreviewToggle>
          <ComponentPlayground code={buttonCode}>
            <PreviewInputGroupButton />
          </ComponentPlayground>
        </PreviewToggle>
      </div>
      {/* Compound Components */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Components</Heading>
        <p className="text-sm text-muted-foreground">
          InputGroup is a compound component made up of several parts:
        </p>
        <ComponentTable components={[
          { name: "InputGroup", description: "Root container that provides the bordered row layout." },
          { name: "InputGroupAddon", description: "Non-interactive addon area. Supports start and end alignment." },
          { name: "InputGroupInput", description: "The text input element. Expands to fill available space." },
          { name: "InputGroupButton", description: "Pressable button placed inside the input group." },
          { name: "InputGroupText", description: "Styled text for use inside addons." },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">InputGroup</Heading>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">InputGroupAddon</Heading>
        <PropsTable props={[
          { name: "align", type: '"start" | "end"', default: '"start"' },
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">InputGroupInput</Heading>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">TextInput</code> props from React Native.
        </p>
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">InputGroupButton</Heading>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Pressable</code> props from React Native.
        </p>
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">InputGroupText</Heading>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Text</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">InputGroupButton</code> uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessible=&#123;true&#125;</code>.</li>
          <li>Minimum touch target of 48dp on interactive elements.</li>
          <li>Use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code> on addons that contain icons instead of text.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/input-group.tsx" />
      </div>
    </div>
  );
}
