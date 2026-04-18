import { Heading } from "@/components/heading";
import { PreviewRefreshControlDemo } from "@/components/preview/refresh-control";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
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
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="refresh-control" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewRefreshControlDemo />
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
          { name: "refreshing", type: "boolean", default: "-" },
          { name: "onRefresh", type: "() => void", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all React Native <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">RefreshControl</code> props.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Themed pull-to-refresh control using React Native's built-in <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">RefreshControl</code>.</li>
          <li>Refresh state is announced by the platform's accessibility system.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/refresh-control.tsx" />
      </div>
    </div>
  );
}
