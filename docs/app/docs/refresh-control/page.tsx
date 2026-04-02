"use client";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add refresh-control`;
const usageCode = `import { RefreshControl } from "@/components/ui/refresh-control";

export function MyScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Content */}
    </ScrollView>
  );
}`;
const sourceCode = `import React from "react";
import { RefreshControl as RNRefreshControl } from "react-native";

export interface RefreshControlProps extends React.ComponentPropsWithoutRef<typeof RNRefreshControl> {
  refreshing: boolean;
  onRefresh: () => void;
}

export function RefreshControl({ refreshing, onRefresh, ...props }: RefreshControlProps) {
  return (
    <RNRefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="hsl(240 5.9% 10%)"
      colors={["hsl(240 5.9% 10%)"]}
      {...props}
    />
  );
}`;
export default function RefreshControlPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Refresh Control</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Themed pull-to-refresh control for ScrollView and FlatList.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="refresh-control" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "refreshing", type: "boolean", default: "-" },
          { name: "onRefresh", type: "() => void", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all React Native <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">RefreshControl</code> props.
        </p>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/refresh-control.tsx" />
      </div>
    </div>
  );
}
