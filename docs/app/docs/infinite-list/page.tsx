import { Heading } from "@/components/heading";
import { PreviewInfiniteListDemo } from "@/components/preview/infinite-list";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add infinite-list`;
const usageCode = `import { InfiniteList } from "@/components/ui/infinite-list";

export function MyScreen() {
  const [data, setData] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    setLoading(true);
    const newItems = await fetchMore(data.length);
    setData((prev) => [...prev, ...newItems]);
    setHasMore(newItems.length > 0);
    setLoading(false);
  };

  return (
    <InfiniteList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View className="p-4 border-b border-border">
          <Text className="text-foreground">{item.title}</Text>
        </View>
      )}
      onLoadMore={loadMore}
      hasMore={hasMore}
      loading={loading}
      threshold={0.5}
    />
  );
}`;
const sourceCode = `import React from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { cn } from "@/lib/utils";

export interface InfiniteListProps<T> extends React.ComponentPropsWithoutRef<typeof FlatList<T>> {
  className?: string;
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
  threshold?: number;
}

export function InfiniteList<T>({
  className,
  data,
  renderItem,
  keyExtractor,
  onLoadMore,
  hasMore = false,
  loading = false,
  threshold = 0.5,
  ...props
}: InfiniteListProps<T>) {
  return (
    <FlatList
      className={cn("", className)}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={hasMore && !loading ? onLoadMore : undefined}
      onEndReachedThreshold={threshold}
      ListFooterComponent={
        loading ? (
          <View className="py-4 items-center">
            <ActivityIndicator size="small" color="hsl(240 5.9% 10%)" accessibilityRole="progressbar" />
          </View>
        ) : null
      }
      {...props}
    />
  );
}`;
export default function InfiniteListPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Infinite List</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          FlatList wrapper with automatic load-more on scroll.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="infinite-list" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewInfiniteListDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "data", type: "T[]", default: "-" },
          { name: "renderItem", type: "({ item, index }) => ReactElement", default: "-" },
          { name: "keyExtractor", type: "(item, index) => string", default: "-" },
          { name: "onLoadMore", type: "() => void", default: "-" },
          { name: "hasMore", type: "boolean", default: "false" },
          { name: "loading", type: "boolean", default: "false" },
          { name: "threshold", type: "number", default: "0.5" },
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FlatList</code> props.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FlatList</code> with auto-load-more on scroll.</li>
          <li>List items are individually focusable by screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/infinite-list.tsx" />
      </div>
    </div>
  );
}
