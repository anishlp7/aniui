"use client";

import { PreviewList, PreviewListItem, PreviewListItemTitle, PreviewListItemDescription } from "@/components/preview/list";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";

const installCode = `npx aniui add list`;

const usageCode = `import { List, ListItem, ListItemTitle, ListItemDescription } from "@/components/ui/list";

export function MyScreen() {
  return (
    <List>
      <ListItem>
        <View>
          <ListItemTitle>Account Settings</ListItemTitle>
          <ListItemDescription>Manage your account preferences</ListItemDescription>
        </View>
      </ListItem>
      <ListItem>
        <View>
          <ListItemTitle>Notifications</ListItemTitle>
          <ListItemDescription>Configure push notifications</ListItemDescription>
        </View>
      </ListItem>
    </List>
  );
}`;

const sourceCode = `import React from "react";
import { View, Text, Pressable } from "react-native";
import { cn } from "@/lib/utils";

export interface ListProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  children?: React.ReactNode;
}

export function List({ className, ...props }: ListProps) {
  return <View className={cn("", className)} {...props} />;
}

export interface ListItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
  children?: React.ReactNode;
}

export function ListItem({ className, ...props }: ListItemProps) {
  return (
    <Pressable
      className={cn("flex-row items-center px-4 py-3 min-h-12 border-b border-border", className)}
      accessible={true}
      {...props}
    />
  );
}

export interface ListItemTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function ListItemTitle({ className, ...props }: ListItemTitleProps) {
  return <Text className={cn("text-base font-medium text-foreground", className)} {...props} />;
}

export interface ListItemDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string;
}

export function ListItemDescription({ className, ...props }: ListItemDescriptionProps) {
  return <Text className={cn("text-sm text-muted-foreground", className)} {...props} />;
}`;

export default function ListPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">List</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Styled list items for settings, menus, and navigation.
        </p>
      </div>

      {/* Preview */}
      <ComponentPlayground code={usageCode}>
        <div className="w-full max-w-sm">
          <PreviewList>
            <PreviewListItem>
              <div>
                <PreviewListItemTitle>Account Settings</PreviewListItemTitle>
                <PreviewListItemDescription>Manage your account preferences</PreviewListItemDescription>
              </div>
            </PreviewListItem>
            <PreviewListItem>
              <div>
                <PreviewListItemTitle>Notifications</PreviewListItemTitle>
                <PreviewListItemDescription>Configure push notifications</PreviewListItemDescription>
              </div>
            </PreviewListItem>
            <PreviewListItem>
              <div>
                <PreviewListItemTitle>Privacy</PreviewListItemTitle>
                <PreviewListItemDescription>Control your privacy settings</PreviewListItemDescription>
              </div>
            </PreviewListItem>
          </PreviewList>
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

      {/* Compound Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Compound Components</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Component</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">List</td>
                <td className="px-4 py-3 text-xs">Root container for list items</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">ListItem</td>
                <td className="px-4 py-3 text-xs">Pressable row with border separator</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">ListItemTitle</td>
                <td className="px-4 py-3 text-xs">Primary text label</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">ListItemDescription</td>
                <td className="px-4 py-3 text-xs">Secondary description text</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">children</td>
                <td className="px-4 py-3 font-mono text-xs">React.ReactNode</td>
                <td className="px-4 py-3 font-mono text-xs">-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">ListItem</code> accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Pressable</code> props. Title and Description accept all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">Text</code> props.
        </p>
      </div>

      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/list.tsx" />
      </div>
    </div>
  );
}
