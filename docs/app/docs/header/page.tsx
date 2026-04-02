"use client";
import { CodeBlock } from "@/components/code-block";
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
const sourceCode = `import React from "react";
import { View, Text, Pressable } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headerVariants = cva("flex-row items-center min-h-14 px-4", {
  variants: {
    variant: {
      default: "bg-background border-b border-border",
      transparent: "bg-transparent",
      primary: "bg-primary",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface HeaderProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof headerVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function Header({ variant, className, children, ...props }: HeaderProps) {
  return (
    <View className={cn(headerVariants({ variant }), className)} {...props}>
      {children}
    </View>
  );
}

export interface HeaderLeftProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function HeaderLeft({ className, children, ...props }: HeaderLeftProps) {
  return <View className={cn("flex-row items-center mr-3", className)} {...props}>{children}</View>;
}

export interface HeaderTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function HeaderTitle({ className, ...props }: HeaderTitleProps) {
  return (
    <Text
      className={cn("flex-1 text-lg font-semibold text-foreground", className)}
      numberOfLines={1}
      {...props}
    />
  );
}

export interface HeaderRightProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function HeaderRight({ className, children, ...props }: HeaderRightProps) {
  return <View className={cn("flex-row items-center ml-3 gap-2", className)} {...props}>{children}</View>;
}

export interface HeaderBackButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  label?: string;
  onPress: () => void;
}

export function HeaderBackButton({ className, label = "\u2190", onPress, ...props }: HeaderBackButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      className={cn("min-h-12 min-w-12 items-center justify-center", className)}
      {...props}
    >
      <Text className="text-primary text-lg">{label}</Text>
    </Pressable>
  );
}`;
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
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="header" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">Header</h3>
        <PropsTable props={[
          { name: "variant", type: '"default" | "transparent" | "primary"', default: '"default"' },
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">HeaderLeft</h3>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">HeaderTitle</h3>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">HeaderRight</h3>
        <PropsTable props={[
          { name: "className", type: "string", default: "-" },
          { name: "children", type: "React.ReactNode", default: "-" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">HeaderBackButton</h3>
        <PropsTable props={[
          { name: "onPress", type: "() => void", default: "-" },
          { name: "label", type: "string", default: '"\u2190"' },
          { name: "className", type: "string", default: "-" },
        ]} />
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/header.tsx" />
      </div>
    </div>
  );
}
