import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
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
const sourceCode = getComponentSource("pagination");
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
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
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
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
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
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Page navigation with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityState</code> on buttons to indicate current page.</li>
          <li>Previous/next buttons are disabled at boundaries and announced as such.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/pagination.tsx" />
      </div>
    </div>
  );
}
