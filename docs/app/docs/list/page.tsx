"use client";
import { PreviewList, PreviewListItem, PreviewListItemTitle, PreviewListItemDescription } from "@/components/preview/list";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable, ComponentTable } from "@/components/props-table";

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
        <div className="w-full">
          <PreviewList>
            <PreviewListItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}>
              <PreviewListItemTitle>Account Settings</PreviewListItemTitle>
              <PreviewListItemDescription>Manage your account preferences</PreviewListItemDescription>
            </PreviewListItem>
            <PreviewListItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>}>
              <PreviewListItemTitle>Notifications</PreviewListItemTitle>
              <PreviewListItemDescription>Configure push notifications</PreviewListItemDescription>
            </PreviewListItem>
            <PreviewListItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}>
              <PreviewListItemTitle>Privacy</PreviewListItemTitle>
              <PreviewListItemDescription>Control your privacy settings</PreviewListItemDescription>
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
        <ComponentTable components={[
          { name: "List", description: "Root container for list items" },
          { name: "ListItem", description: "Pressable row with border separator" },
          { name: "ListItemTitle", description: "Primary text label" },
          { name: "ListItemDescription", description: "Secondary description text" },
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