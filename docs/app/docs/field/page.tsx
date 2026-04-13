import { PreviewFieldDemo, PreviewFieldHorizontal, PreviewFieldError } from "@/components/preview/field";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable, ComponentTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const usageCode = `import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function MyScreen() {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input placeholder="you@example.com" />
      <FieldDescription>We'll never share your email.</FieldDescription>
    </Field>
  );
}`;
const horizontalCode = `import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function MyScreen() {
  return (
    <Field orientation="horizontal">
      <FieldLabel>Name</FieldLabel>
      <Input placeholder="John Doe" />
    </Field>
  );
}`;
const errorCode = `import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function MyScreen() {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input placeholder="you@example.com" />
      <FieldError errors={["Email is required", "Must be a valid email"]} />
    </Field>
  );
}`;
const sourceCode = `import React, { createContext, useContext } from "react";
import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

type Orientation = "vertical" | "horizontal";

const FieldContext = createContext<{ orientation: Orientation }>({
  orientation: "vertical",
});

export interface FieldProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  orientation?: Orientation;
  children?: React.ReactNode;
}

export function Field({ orientation = "vertical", className, children, ...props }: FieldProps) {
  return (
    <FieldContext.Provider value={{ orientation }}>
      <View
        className={cn(
          orientation === "vertical" ? "gap-1.5" : "flex-row items-start gap-3",
          className
        )}
        {...props}
      >
        {children}
      </View>
    </FieldContext.Provider>
  );
}

export interface FieldLabelProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function FieldLabel({ className, ...props }: FieldLabelProps) {
  const { orientation } = useContext(FieldContext);
  return (
    <Text
      className={cn(
        "text-sm font-medium text-foreground",
        orientation === "horizontal" && "min-w-[100px] pt-3",
        className
      )}
      accessibilityRole="text"
      {...props}
    />
  );
}

export interface FieldDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <Text className={cn("text-xs text-muted-foreground", className)} {...props} />
  );
}

export interface FieldErrorProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  errors?: string[];
  children?: React.ReactNode;
}

export function FieldError({ className, errors, children, ...props }: FieldErrorProps) {
  if (!errors?.length && !children) return null;

  return (
    <View className={cn("gap-0.5", className)} accessibilityRole="alert" {...props}>
      {errors?.map((err, i) => (
        <Text key={i} className="text-sm text-destructive">{err}</Text>
      ))}
      {children}
    </View>
  );
}`;
export default function FieldPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Field</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Compound form field with label, description, and error message support.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewFieldDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="field" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Horizontal Layout */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Horizontal Layout</h2>
        <PreviewToggle>
          <ComponentPlayground code={horizontalCode}>
            <PreviewFieldHorizontal />
          </ComponentPlayground>
        </PreviewToggle>
      </div>
      {/* Error State */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Error State</h2>
        <PreviewToggle>
          <ComponentPlayground code={errorCode}>
            <PreviewFieldError />
          </ComponentPlayground>
        </PreviewToggle>
      </div>
      {/* Compound Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Components</h2>
        <p className="text-sm text-muted-foreground">
          Field is a compound component made up of several parts:
        </p>
        <ComponentTable components={[
          { name: "Field", description: "Root component that provides orientation context. Wraps label, input, description, and error." },
          { name: "FieldLabel", description: "Styled label text. Adjusts layout based on orientation." },
          { name: "FieldDescription", description: "Helper text displayed below the input." },
          { name: "FieldError", description: "Displays one or more error messages. Renders nothing when no errors are present." },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">Field</h3>
        <PropsTable props={[
          { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"' },
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
        <h3 className="text-lg font-medium text-foreground mt-6">FieldLabel</h3>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Text</code> props from React Native.
        </p>
        <h3 className="text-lg font-medium text-foreground mt-6">FieldDescription</h3>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Text</code> props from React Native.
        </p>
        <h3 className="text-lg font-medium text-foreground mt-6">FieldError</h3>
        <PropsTable props={[
          { name: "errors", type: "string[]", default: "-" },
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FieldLabel</code> uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;text&quot;</code> for screen readers.</li>
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FieldError</code> uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;alert&quot;</code> to announce errors.</li>
          <li>Horizontal layout maintains minimum touch target with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">min-w-[100px]</code> on the label.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/field.tsx" />
      </div>
    </div>
  );
}
