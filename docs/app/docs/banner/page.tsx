"use client";

import React from "react";
import { PreviewBanner } from "@/components/preview/banner";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add banner`;

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

const bannerVariants = cva("flex-row items-center px-4 py-3 gap-3", {
  variants: {
    variant: {
      default: "bg-primary",
      info: "bg-blue-500",
      warning: "bg-yellow-500",
      destructive: "bg-destructive",
      success: "bg-green-600",
    },
  },
  defaultVariants: { variant: "default" },
});

const bannerTextVariants = cva("text-sm font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      info: "text-white",
      warning: "text-white",
      destructive: "text-destructive-foreground",
      success: "text-white",
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

export function Banner({ variant, className, children, icon, action, onDismiss, ...props }: BannerProps) {
  return (
    <View className={cn(bannerVariants({ variant }), className)} accessibilityRole="alert" {...props}>
      {icon}
      <Text className={cn(bannerTextVariants({ variant }), "flex-1")}>{children}</Text>
      {action && (
        <Pressable onPress={action.onPress} accessible={true} accessibilityRole="button">
          <Text className={cn(bannerTextVariants({ variant }), "underline")}>{action.label}</Text>
        </Pressable>
      )}
      {onDismiss && (
        <Pressable onPress={onDismiss} className="ml-1" accessible={true} accessibilityRole="button" accessibilityLabel="Dismiss">
          <Text className={cn(bannerTextVariants({ variant }))}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}`;

export default function BannerPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Banner</h1>
        <p className="text-muted-foreground text-lg">Full-width notification banner with variants, action button, and dismiss. Ideal for app-level announcements.</p>
      </div>

      <ComponentPlayground code={usageCode}>
        <PreviewBanner variant="info" onDismiss={() => {}}>New version available. Update now for the latest features.</PreviewBanner>
      </ComponentPlayground>

      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={installCode} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Variants</h2>
        <ComponentPlayground code={variantsCode}>
          <div className="space-y-2">
            <PreviewBanner variant="default">Default banner message</PreviewBanner>
            <PreviewBanner variant="info">Informational update</PreviewBanner>
            <PreviewBanner variant="warning">Please review your settings</PreviewBanner>
            <PreviewBanner variant="destructive">Action required immediately</PreviewBanner>
            <PreviewBanner variant="success">Operation completed successfully</PreviewBanner>
          </div>
        </ComponentPlayground>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">With Action</h2>
        <p className="text-sm text-muted-foreground mb-4">Add an <code>action</code> prop with a label and onPress handler to show an inline action button.</p>
        <ComponentPlayground code={actionCode}>
          <PreviewBanner variant="info" actionLabel="Update" onAction={() => {}} onDismiss={() => {}}>A new version is available.</PreviewBanner>
        </ComponentPlayground>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="text-left py-2 pr-4">Prop</th><th className="text-left py-2 pr-4">Type</th><th className="text-left py-2">Default</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">variant</td><td className="py-2 pr-4 font-mono text-xs">{`"default" | "info" | "warning" | "destructive" | "success"`}</td><td className="py-2 font-mono text-xs">{`"default"`}</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">children</td><td className="py-2 pr-4 font-mono text-xs">string</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">icon</td><td className="py-2 pr-4 font-mono text-xs">ReactNode</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">action</td><td className="py-2 pr-4 font-mono text-xs">{`{ label: string; onPress: () => void }`}</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">onDismiss</td><td className="py-2 pr-4 font-mono text-xs">{`() => void`}</td><td className="py-2 font-mono text-xs">—</td></tr>
              <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs">className</td><td className="py-2 pr-4 font-mono text-xs">string</td><td className="py-2 font-mono text-xs">—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/banner.tsx" />
      </div>
    </div>
  );
}
