import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewDataTableDemo, PreviewDataTableSort, PreviewDataTableSearch, PreviewDataTablePagination, PreviewDataTableCustomCell, PreviewDataTableStriped } from "@/components/preview/data-table";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const usageCode = `import { DataTable } from "@/components/ui/data-table";

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "role", header: "Role" },
  { key: "status", header: "Status" },
];

const data = [
  { name: "Alice Johnson", email: "alice@example.com", role: "Engineer", status: "Active" },
  { name: "Bob Smith", email: "bob@example.com", role: "Designer", status: "Active" },
  { name: "Carol Williams", email: "carol@example.com", role: "Manager", status: "Away" },
];

export function MyScreen() {
  return <DataTable columns={columns} data={data} />;
}`;
const sortingCode = `const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "role", header: "Role", sortable: true },
  { key: "status", header: "Status" },
];

// Uncontrolled (internal state)
<DataTable columns={columns} data={data} />

// Controlled
const [sortBy, setSortBy] = useState("name");
const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

<DataTable
  columns={columns}
  data={data}
  sortBy={sortBy}
  sortOrder={sortOrder}
  onSort={(key, order) => {
    setSortBy(key);
    setSortOrder(order);
  }}
/>`;
const searchCode = `<DataTable
  columns={columns}
  data={data}
  searchable
  searchKeys={["name", "email"]}
  searchPlaceholder="Search by name or email..."
/>`;
const paginationCode = `<DataTable
  columns={columns}
  data={data}
  pageSize={5}
/>`;
const customCellCode = `const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email" },
  {
    key: "status",
    header: "Status",
    render: (value: unknown) => (
      <Badge variant={value === "Active" ? "default" : "secondary"}>
        {String(value)}
      </Badge>
    ),
  },
];

<DataTable columns={columns} data={data} />`;
const stripedCode = `<DataTable
  columns={columns}
  data={data}
  striped
/>`;
const sourceCode = getComponentSource("data-table");
export default function DataTablePage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Data Table</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Sortable, filterable data table with pagination and custom cell rendering.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="data-table" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewDataTableDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Sorting */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Sorting</Heading>
        <p className="text-sm text-muted-foreground">
          Mark columns as <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">sortable: true</code> to enable click-to-sort. Supports both uncontrolled (internal state) and controlled modes via <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">sortBy</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">sortOrder</code>, and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onSort</code>.
        </p>
        <ComponentPlayground code={sortingCode}>
          <PreviewDataTableSort />
        </ComponentPlayground>
      </div>
      {/* Search */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Search</Heading>
        <p className="text-sm text-muted-foreground">
          Enable search with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">searchable</code>. Limit which columns are searchable with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">searchKeys</code>.
        </p>
        <ComponentPlayground code={searchCode}>
          <PreviewDataTableSearch />
        </ComponentPlayground>
      </div>
      {/* Pagination */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Pagination</Heading>
        <p className="text-sm text-muted-foreground">
          Set <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">pageSize</code> to enable pagination with Prev/Next controls. The current range and total count are displayed automatically.
        </p>
        <ComponentPlayground code={paginationCode}>
          <PreviewDataTablePagination />
        </ComponentPlayground>
      </div>
      {/* Custom Cell */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Custom Cell Rendering</Heading>
        <p className="text-sm text-muted-foreground">
          Use the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">render</code> prop on a column to provide custom cell content. The render function receives the cell value and full row.
        </p>
        <ComponentPlayground code={customCellCode}>
          <PreviewDataTableCustomCell />
        </ComponentPlayground>
      </div>
      {/* Striped */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Striped Rows</Heading>
        <p className="text-sm text-muted-foreground">
          Add alternating row backgrounds with the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">striped</code> prop.
        </p>
        <ComponentPlayground code={stripedCode}>
          <PreviewDataTableStriped />
        </ComponentPlayground>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">DataTableProps</Heading>
        <PropsTable props={[
          { name: "columns", type: "DataTableColumn<T>[]", default: "-" },
          { name: "data", type: "T[]", default: "-" },
          { name: "sortBy", type: "string", default: "-" },
          { name: "sortOrder", type: '"asc" | "desc"', default: '"asc"' },
          { name: "onSort", type: "(key: string, order: \"asc\" | \"desc\") => void", default: "-" },
          { name: "searchable", type: "boolean", default: "false" },
          { name: "searchKeys", type: "string[]", default: "all column keys" },
          { name: "searchPlaceholder", type: "string", default: '"Search..."' },
          { name: "pageSize", type: "number", default: "-" },
          { name: "emptyText", type: "string", default: '"No data"' },
          { name: "striped", type: "boolean", default: "false" },
          { name: "className", type: "string", default: "-" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">DataTableColumn&lt;T&gt;</Heading>
        <PropsTable props={[
          { name: "key", type: "keyof T & string", default: "-" },
          { name: "header", type: "string", default: "-" },
          { name: "sortable", type: "boolean", default: "false" },
          { name: "width", type: "number", default: "-" },
          { name: "render", type: "(value: T[keyof T], row: T) => ReactNode", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Sortable column headers have <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code>; non-sortable headers use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;text&quot;</code>.</li>
          <li>Search input has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel=&quot;Search table&quot;</code>.</li>
          <li>Pagination buttons have descriptive <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code> values.</li>
          <li>Empty state is announced to screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/data-table.tsx" />
      </div>
    </div>
  );
}
