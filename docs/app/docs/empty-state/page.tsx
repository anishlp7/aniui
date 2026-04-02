"use client";
import React from "react";
import { PreviewEmptyState } from "@/components/preview/empty-state";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

import { AddComponentTabs } from "@/components/package-manager-tabs";
const installCode = `npx @aniui/cli add empty-state`;
const usageCode = `import { EmptyState } from "@/components/ui/empty-state";
import { Ionicons } from "@expo/vector-icons";
<EmptyState
  icon={<Ionicons name="search-outline" size={48} color="#a1a1aa" />}
  title="No results found"
  description="Try adjusting your search or filters to find what you're looking for."
  action={{ label: "Clear Filters", onPress: () => {} }}
/>`;
const noResultsCode = `<EmptyState
  icon={<SearchIcon />}
  title="No results found"
  description="Try adjusting your search or filters."
  action={{ label: "Clear Filters", onPress: () => {} }}
/>`;
const emptyListCode = `<EmptyState
  icon={<InboxIcon />}
  title="No messages yet"
  description="When you receive messages, they'll appear here."
/>`;
const errorCode = `<EmptyState
  icon={<AlertIcon />}
  title="Something went wrong"
  description="We couldn't load your data. Please try again."
  action={{ label: "Retry", onPress: () => {} }}
/>`;
const sourceCode = `import React from "react";
import { View, Text, Pressable } from "react-native";
import { cn } from "@/lib/utils";

export interface EmptyStateProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onPress: () => void };
}
export function EmptyState({ className, icon, title, description, action, ...props }: EmptyStateProps) {
  return (
    <View className={cn("items-center justify-center px-8 py-16", className)} {...props}>
      {icon && <View className="mb-4">{icon}</View>}
      <Text className="text-lg font-semibold text-foreground text-center mb-1">{title}</Text>
      {description && <Text className="text-sm text-muted-foreground text-center mb-6 max-w-[280px]">{description}</Text>}
      {action && (
        <Pressable
          onPress={action.onPress}
          className="rounded-lg bg-primary px-6 py-2.5 min-h-12 items-center justify-center"
          accessible={true}
          accessibilityRole="button"
        >
          <Text className="text-sm font-medium text-primary-foreground">{action.label}</Text>
        </Pressable>
      )}
    </View>
  );
}`;
function SearchIcon() {
  return (
    <svg className="h-12 w-12 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  );
}
function InboxIcon() {
  return (
    <svg className="h-12 w-12 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 10h7l2 2h2l2-2h7" />
    </svg>
  );
}
function AlertIcon() {
  return (
    <svg className="h-12 w-12 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
    </svg>
  );
}
export default function EmptyStatePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">EmptyState</h1>
        <p className="text-muted-foreground text-lg">A placeholder for empty screens, search results, and error states. Every list needs one.</p>
      </div>
      <ComponentPlayground code={usageCode}>
        <PreviewEmptyState
          icon={<SearchIcon />}
          title="No results found"
          description="Try adjusting your search or filters to find what you're looking for."
          actionLabel="Clear Filters"
          onAction={() => {}}
        />
      </ComponentPlayground>
      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <AddComponentTabs names="empty-state" />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Usage</h2>
        <CodeBlock code={usageCode} title="screen.tsx" />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">No Search Results</h2>
        <p className="text-sm text-muted-foreground mb-4">Show when a search or filter returns empty.</p>
        <ComponentPlayground code={noResultsCode}>
          <PreviewEmptyState
            icon={<SearchIcon />}
            title="No results found"
            description="Try adjusting your search or filters."
            actionLabel="Clear Filters"
            onAction={() => {}}
          />
        </ComponentPlayground>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Empty List</h2>
        <p className="text-sm text-muted-foreground mb-4">Show when a list has no items yet.</p>
        <ComponentPlayground code={emptyListCode}>
          <PreviewEmptyState
            icon={<InboxIcon />}
            title="No messages yet"
            description="When you receive messages, they'll appear here."
          />
        </ComponentPlayground>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Error State</h2>
        <p className="text-sm text-muted-foreground mb-4">Show when data fails to load, with a retry action.</p>
        <ComponentPlayground code={errorCode}>
          <PreviewEmptyState
            icon={<AlertIcon />}
            title="Something went wrong"
            description="We couldn't load your data. Please try again."
            actionLabel="Retry"
            onAction={() => {}}
          />
        </ComponentPlayground>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Props</h2>
        <PropsTable props={[
          { name: "title", type: "string", default: "required" },
          { name: "description", type: "string" },
          { name: "icon", type: "ReactNode" },
          { name: "action", type: "{ label: string; onPress: () => void }" },
          { name: "className", type: "string" },
        ]} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/empty-state.tsx" />
      </div>
    </div>
  );
}
