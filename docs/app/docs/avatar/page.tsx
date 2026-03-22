"use client";
import { PreviewAvatar } from "@/components/preview/avatar";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

const installCode = `npx aniui add avatar`;
const usageCode = `import { Avatar } from "@/components/ui/avatar";

export function MyScreen() {
  return (
    <Avatar
      src="https://github.com/anishlp7.png"
      fallback="AN"
    />
  );
}`;
const sizesCode = `<Avatar size="sm" fallback="SM" />
<Avatar size="md" fallback="MD" />
<Avatar size="lg" fallback="LG" />`;
const fallbackCode = `<Avatar fallback="AB" />
<Avatar fallback="?" />`;
const sourceCode = `import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva("items-center justify-center rounded-full bg-muted overflow-hidden", {
  variants: {
    size: {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
const avatarTextVariants = cva("font-medium text-muted-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof avatarVariants> {
  className?: string;
  src?: string;
  fallback?: string;
}
export function Avatar({ size, className, src, fallback, ...props }: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  return (
    <View className={cn(avatarVariants({ size }), className)} {...props}>
      {src && !hasError ? (
        <Image
          source={{ uri: src }}
          className="h-full w-full"
          resizeMode="cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <Text className={cn(avatarTextVariants({ size }))}>{fallback ?? "?"}</Text>
      )}
    </View>
  );
}`;
export default function AvatarPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Avatar</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          User avatar with image and fallback initials.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="flex flex-wrap items-center gap-4">
          <PreviewAvatar src="https://github.com/anishlp7.png" fallback="AN" />
        </div>
      </ComponentPlayground>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCode} />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Sizes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Sizes</h2>
        <ComponentPlayground code={sizesCode}>
          <div className="flex flex-wrap items-center gap-3">
            <PreviewAvatar size="sm" fallback="SM" />
            <PreviewAvatar size="md" fallback="MD" />
            <PreviewAvatar size="lg" fallback="LG" />
          </div>
        </ComponentPlayground>
      </div>
      {/* Fallback */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Fallback</h2>
        <p className="text-sm text-muted-foreground">When no image source is provided or the image fails to load, the fallback initials are displayed.</p>
        <ComponentPlayground code={fallbackCode}>
          <div className="flex flex-wrap items-center gap-3">
            <PreviewAvatar fallback="AB" />
            <PreviewAvatar fallback="?" />
          </div>
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"" },
          { name: "src", type: "string" },
          { name: "fallback", type: "string", default: "\"?\"" },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/avatar.tsx" />
      </div>
    </div>
  );
}