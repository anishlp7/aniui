import { Heading } from "@/components/heading";
import React from "react";
import { PreviewEmptyState } from "@/components/preview/empty-state";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";

import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";
import { EmptyStateMainDemo, EmptyStateNoResultsDemo, EmptyStateErrorDemo } from "./_demos";
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
function InboxIcon() {
  return (
    <svg className="h-12 w-12 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 10h7l2 2h2l2-2h7" />
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
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <EmptyStateMainDemo />
        </ComponentPlayground>
      </PreviewToggle>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="empty-state" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Usage</Heading>
        <CodeBlock code={usageCode} title="screen.tsx" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">No Search Results</Heading>
        <p className="text-sm text-muted-foreground mb-4">Show when a search or filter returns empty.</p>
        <ComponentPlayground code={noResultsCode}>
          <EmptyStateNoResultsDemo />
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Empty List</Heading>
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
        <Heading as="h2" className="text-xl font-semibold mb-3">Error State</Heading>
        <p className="text-sm text-muted-foreground mb-4">Show when data fails to load, with a retry action.</p>
        <ComponentPlayground code={errorCode}>
          <EmptyStateErrorDemo />
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Props</Heading>
        <PropsTable props={[
          { name: "title", type: "string", default: "required" },
          { name: "description", type: "string" },
          { name: "icon", type: "ReactNode" },
          { name: "action", type: "{ label: string; onPress: () => void }" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Informational display with no required interaction.</li>
          <li>Action button (when present) has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="button"</code>.</li>
        </ul>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/empty-state.tsx" />
      </div>
    </div>
  );
}
