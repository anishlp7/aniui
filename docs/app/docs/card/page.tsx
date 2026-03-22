"use client";
import { PreviewCard, PreviewCardHeader, PreviewCardTitle, PreviewCardDescription, PreviewCardContent, PreviewCardFooter } from "@/components/preview/card";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable, ComponentTable } from "@/components/props-table";

const installCode = `npx @aniui/cli add card`;
const usageCode = `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export function MyScreen() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>Card content</Text>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  );
}`;
const sourceCode = `import React from "react";
import { View, Text } from "react-native";
import { cn } from "@/lib/utils";

export interface CardProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}
export function Card({ className, ...props }: CardProps) {
  return (
    <View
      className={cn("rounded-lg border border-border bg-card p-6", className)}
      {...props}
    />
  );
}
export interface CardHeaderProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}
export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <View className={cn("pb-4", className)} {...props} />;
}
export interface CardTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}
export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <Text
      className={cn("text-2xl font-semibold text-card-foreground tracking-tight", className)}
      {...props}
    />
  );
}
export interface CardDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}
export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return <Text className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
export interface CardContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}
export function CardContent({ className, ...props }: CardContentProps) {
  return <View className={cn("py-2", className)} {...props} />;
}
export interface CardFooterProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}
export function CardFooter({ className, ...props }: CardFooterProps) {
  return <View className={cn("flex-row items-center pt-4", className)} {...props} />;
}`;
export default function CardPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Card</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Card container with header, content, and footer sections.
        </p>
      </div>
      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="w-full max-w-sm">
          <PreviewCard>
            <PreviewCardHeader>
              <PreviewCardTitle>Card Title</PreviewCardTitle>
              <PreviewCardDescription>Card description goes here.</PreviewCardDescription>
            </PreviewCardHeader>
            <PreviewCardContent>
              <p className="text-sm text-muted-foreground">Card content area.</p>
            </PreviewCardContent>
            <PreviewCardFooter>
              <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Action</button>
            </PreviewCardFooter>
          </PreviewCard>
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
      {/* Exports */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Compound Components</h2>
        <p className="text-sm text-muted-foreground">
          Card is a compound component with the following exports:
        </p>
        <ComponentTable components={[
          { name: "Card", description: "Root container with border and padding" },
          { name: "CardHeader", description: "Header section with bottom padding" },
          { name: "CardTitle", description: "Title text component" },
          { name: "CardDescription", description: "Description text in muted color" },
          { name: "CardContent", description: "Main content area" },
          { name: "CardFooter", description: "Footer with row layout for actions" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "className", type: "string" },
          { name: "children", type: "React.ReactNode" },
        ]} />
        <p className="text-sm text-muted-foreground">
          All sub-components accept <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">className</code> and their respective React Native base props.
        </p>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/card.tsx" />
      </div>
    </div>
  );
}