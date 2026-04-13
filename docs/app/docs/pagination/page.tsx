import { PreviewPaginationDemo } from "@/components/preview/pagination";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add pagination`;
const usageCode = `import { Pagination } from "@/components/ui/pagination";

export function MyScreen() {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      total={10}
      current={page}
      onPageChange={setPage}
      siblings={1}
    />
  );
}`;
const sourceCode = `import React from "react";
import { View, Pressable, Text } from "react-native";
import { cn } from "@/lib/utils";

export interface PaginationProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  total: number;
  current: number;
  onPageChange: (page: number) => void;
  siblings?: number;
}

function getPages(total: number, current: number, siblings: number): (number | "...")[] {
  const pages: (number | "...")[] = [];
  const start = Math.max(1, current - siblings);
  const end = Math.min(total, current + siblings);

  if (start > 1) { pages.push(1); if (start > 2) pages.push("..."); }
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total) { if (end < total - 1) pages.push("..."); pages.push(total); }
  return pages;
}

export function Pagination({
  className,
  total,
  current,
  onPageChange,
  siblings = 1,
  ...props
}: PaginationProps) {
  const pages = getPages(total, current, siblings);

  return (
    <View className={cn("flex-row items-center justify-center gap-1", className)} {...props}>
      <Pressable
        onPress={() => onPageChange(current - 1)}
        disabled={current <= 1}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Previous page"
        className="min-h-10 min-w-10 items-center justify-center rounded-md"
      >
        <Text className={cn("text-sm", current <= 1 ? "text-muted" : "text-foreground")}>\u2039</Text>
      </Pressable>
      {pages.map((page, i) =>
        page === "..." ? (
          <Text key={\`e\${i}\`} className="text-muted-foreground px-1">\u2026</Text>
        ) : (
          <Pressable
            key={page}
            onPress={() => onPageChange(page)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={\`Page \${page}\`}
            accessibilityState={{ selected: page === current }}
            className={cn(
              "min-h-10 min-w-10 items-center justify-center rounded-md",
              page === current ? "bg-primary" : "bg-transparent"
            )}
          >
            <Text className={cn("text-sm font-medium", page === current ? "text-primary-foreground" : "text-foreground")}>
              {page}
            </Text>
          </Pressable>
        )
      )}
      <Pressable
        onPress={() => onPageChange(current + 1)}
        disabled={current >= total}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Next page"
        className="min-h-10 min-w-10 items-center justify-center rounded-md"
      >
        <Text className={cn("text-sm", current >= total ? "text-muted" : "text-foreground")}>\u203A</Text>
      </Pressable>
    </View>
  );
}`;
export default function PaginationPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Pagination</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Page navigation with numbered buttons, prev/next, and ellipsis.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="pagination" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewPaginationDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "total", type: "number", default: "-" },
          { name: "current", type: "number", default: "-" },
          { name: "onPageChange", type: "(page: number) => void", default: "-" },
          { name: "siblings", type: "number", default: "1" },
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Page navigation with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState</code> on buttons to indicate current page.</li>
          <li>Previous/next buttons are disabled at boundaries and announced as such.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/pagination.tsx" />
      </div>
    </div>
  );
}
