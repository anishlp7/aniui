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
const sourceCode = `import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { cn } from "@/lib/utils";

export interface InputGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function InputGroup({ className, children, ...props }: InputGroupProps) {
  return (
    <View
      className={cn("flex-row items-center rounded-md border border-input bg-background", className)}
      {...props}
    >
      {children}
    </View>
  );
}

export interface InputGroupAddonProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  align?: "start" | "end";
  children?: React.ReactNode;
}

export function InputGroupAddon({ className, align = "start", children, ...props }: InputGroupAddonProps) {
  return (
    <View
      className={cn(
        "items-center justify-center px-3 self-stretch",
        align === "start" ? "border-e border-input" : "border-s border-input",
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

export interface InputGroupInputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
}

export function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return (
    <TextInput
      className={cn("flex-1 min-h-12 px-3 text-base text-foreground", className)}
      placeholderTextColor="#71717a"
      {...props}
    />
  );
}

export interface InputGroupButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

export function InputGroupButton({ className, children, ...props }: InputGroupButtonProps) {
  return (
    <Pressable
      className={cn(
        "items-center justify-center px-3 min-h-12 active:opacity-70",
        className
      )}
      accessible={true}
      accessibilityRole="button"
      {...props}
    >
      {children}
    </Pressable>
  );
}

export interface InputGroupTextProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return (
    <Text className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}`;
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
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="input-group" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Suffix Addon */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Suffix Addon</h2>
        <PreviewToggle>
          <ComponentPlayground code={suffixCode}>
            <PreviewInputGroupSuffix />
          </ComponentPlayground>
        </PreviewToggle>
      </div>
      {/* Button Addon */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Button Addon</h2>
        <PreviewToggle>
          <ComponentPlayground code={buttonCode}>
            <PreviewInputGroupButton />
          </ComponentPlayground>
        </PreviewToggle>
      </div>
      {/* Compound Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Components</h2>
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
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">InputGroup</h3>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
        <h3 className="text-lg font-medium text-foreground mt-6">InputGroupAddon</h3>
        <PropsTable props={[
          { name: "align", type: '"start" | "end"', default: '"start"' },
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
        <h3 className="text-lg font-medium text-foreground mt-6">InputGroupInput</h3>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">TextInput</code> props from React Native.
        </p>
        <h3 className="text-lg font-medium text-foreground mt-6">InputGroupButton</h3>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Pressable</code> props from React Native.
        </p>
        <h3 className="text-lg font-medium text-foreground mt-6">InputGroupText</h3>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Text</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">InputGroupButton</code> uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessible=&#123;true&#125;</code>.</li>
          <li>Minimum touch target of 48dp on interactive elements.</li>
          <li>Use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code> on addons that contain icons instead of text.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/input-group.tsx" />
      </div>
    </div>
  );
}
