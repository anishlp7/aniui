import { PreviewAlert } from "@/components/preview/alert";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add alert`;
const usageCode = `import { Alert, AlertDescription } from "@/components/ui/alert";

export function MyScreen() {
  return (
    <Alert title="Heads up!">
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  );
}`;
const variantsCode = `<Alert variant="default" title="Default">
  <AlertDescription>This is a default alert.</AlertDescription>
</Alert>
<Alert variant="destructive" title="Error">
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
<Alert variant="success" title="Success">
  <AlertDescription>Operation completed.</AlertDescription>
</Alert>
<Alert variant="warning" title="Warning">
  <AlertDescription>Please review before continuing.</AlertDescription>
</Alert>`;
const sourceCode = `import React from "react";
import { View, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva("rounded-lg border p-4", {
  variants: {
    variant: {
      default: "border-border bg-background",
      destructive: "border-destructive/50 bg-destructive/10",
      success: "border-green-500/50 bg-green-500/10",
      warning: "border-yellow-500/50 bg-yellow-500/10",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const alertTitleVariants = cva("text-base font-semibold mb-1", {
  variants: {
    variant: {
      default: "text-foreground",
      destructive: "text-destructive",
      success: "text-green-600",
      warning: "text-yellow-600",
    },
  },
  defaultVariants: { variant: "default" },
});
export interface AlertProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof alertVariants> {
  className?: string;
  title?: string;
  titleClassName?: string;
  children?: React.ReactNode;
}
export function Alert({ variant, className, title, titleClassName, children, ...props }: AlertProps) {
  return (
    <View className={cn(alertVariants({ variant }), className)} accessibilityRole="alert" {...props}>
      {title && <Text className={cn(alertTitleVariants({ variant }), titleClassName)}>{title}</Text>}
      {children}
    </View>
  );
}
export interface AlertDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}
export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return <Text className={cn("text-sm text-muted-foreground", className)} {...props} />;
}`;
export default function AlertPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Alert</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Alert message with multiple variants for different contexts.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="w-full max-w-sm">
            <PreviewAlert variant="default" title="Heads up!">
              You can add components to your app using the CLI.
            </PreviewAlert>
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="alert" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Variants */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Variants</h2>
        <ComponentPlayground code={variantsCode}>
          <div className="space-y-3 w-full max-w-sm">
            <PreviewAlert variant="default" title="Default">This is a default alert.</PreviewAlert>
            <PreviewAlert variant="destructive" title="Error">Something went wrong.</PreviewAlert>
            <PreviewAlert variant="success" title="Success">Operation completed.</PreviewAlert>
            <PreviewAlert variant="warning" title="Warning">Please review before continuing.</PreviewAlert>
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <p className="text-sm text-muted-foreground">
          This component exports <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Alert</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">AlertDescription</code>.
        </p>
        <PropsTable props={[
          { name: "variant", type: "\"default\" | \"destructive\" | \"success\" | \"warning\"", default: "\"default\"" },
          { name: "title", type: "string" },
          { name: "titleClassName", type: "string" },
          { name: "className", type: "string" },
          { name: "children", type: "React.ReactNode" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="alert"</code> for screen reader announcements.</li>
          <li>Alert content is announced immediately when it appears.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/alert.tsx" />
      </div>
    </div>
  );
}