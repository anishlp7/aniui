"use client";
import React from "react";
import { PreviewBanner } from "@/components/preview/banner";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable, type PropDef } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

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
const sourceCode = `import React from "react";
import { View, Text, Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "flex-row items-center rounded-xl px-4 py-3 gap-3 border",
  {
    variants: {
      variant: {
        default: "bg-secondary/60 border-border",
        info: "bg-primary/8 border-primary/15",
        warning: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-900/40",
        destructive: "bg-destructive/8 border-destructive/15",
        success: "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900/40",
      },
    },
    defaultVariants: { variant: "default" },
  }
);
const bannerTextVariants = cva("text-sm font-medium", {
  variants: {
    variant: {
      default: "text-foreground",
      info: "text-primary",
      warning: "text-yellow-800 dark:text-yellow-200",
      destructive: "text-destructive",
      success: "text-green-800 dark:text-green-200",
    },
  },
  defaultVariants: { variant: "default" },
});
export interface BannerProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof bannerVariants> {
  className?: string;
  children: string;
  icon?: React.ReactNode;
  action?: { label: string; onPress: () => void };
  onDismiss?: () => void;
}
export function Banner({
  variant,
  className,
  children,
  icon,
  action,
  onDismiss,
  ...props
}: BannerProps) {
  return (
    <View
      className={cn(bannerVariants({ variant }), className)}
      accessibilityRole="alert"
      {...props}
    >
      {icon}
      <Text className={cn(bannerTextVariants({ variant }), "flex-1")}>
        {children}
      </Text>
      {action && (
        <Pressable
          onPress={action.onPress}
          accessible={true}
          accessibilityRole="button"
          className="min-h-8 min-w-8 items-center justify-center"
        >
          <Text
            className={cn(
              bannerTextVariants({ variant }),
              "font-semibold underline"
            )}
          >
            {action.label}
          </Text>
        </Pressable>
      )}
      {onDismiss && (
        <Pressable
          onPress={onDismiss}
          className="ml-1 min-h-8 min-w-8 items-center justify-center rounded-lg"
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
        >
          <Text
            className={cn(
              bannerTextVariants({ variant }),
              "text-base opacity-60"
            )}
          >
            ×
          </Text>
        </Pressable>
      )}
    </View>
  );
}`;
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
          <PreviewBanner variant="info" onDismiss={() => {}}>
            New version available. Update now for the latest features.
          </PreviewBanner>
        </ComponentPlayground>
      </PreviewToggle>
      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <AddComponentTabs names="banner" />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Variants</h2>
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
        <h2 className="text-xl font-semibold mb-3">With Action</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Add an{" "}
          <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">
            action
          </code>{" "}
          prop with a label and onPress handler to show an inline action button.
        </p>
        <ComponentPlayground code={actionCode}>
          <PreviewBanner
            variant="info"
            actionLabel="Update"
            onAction={() => {}}
            onDismiss={() => {}}
          >
            A new version is available.
          </PreviewBanner>
        </ComponentPlayground>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Props</h2>
        <PropsTable props={bannerProps} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="alert"</code> for informational banners.</li>
          <li>Dismiss button includes <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel="Dismiss"</code> for screen readers.</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/banner.tsx" />
      </div>
    </div>
  );
}