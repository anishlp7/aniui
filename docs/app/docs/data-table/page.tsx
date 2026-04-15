import { PreviewDataTableDemo } from "@/components/preview/data-table";
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
const sourceCode = `import React, { useState, useMemo, useCallback } from "react";
import { View, Text, TextInput, Pressable, FlatList, ScrollView } from "react-native";
import { cn } from "@/lib/utils";
import Svg, { Path } from "react-native-svg";

export interface DataTableColumn<T> {
  key: keyof T & string;
  header: string;
  sortable?: boolean;
  width?: number;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface DataTableProps<T> extends React.ComponentPropsWithoutRef<typeof View> {
  columns: DataTableColumn<T>[];
  data: T[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSort?: (key: string, order: "asc" | "desc") => void;
  searchable?: boolean;
  searchKeys?: string[];
  searchPlaceholder?: string;
  pageSize?: number;
  emptyText?: string;
  className?: string;
  striped?: boolean;
}

function SortIcon({ order }: { order?: "asc" | "desc" }) {
  return (
    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth={2.5}>
      {order === "asc" ? <Path d="m18 15-6-6-6 6" /> : <Path d="m6 9 6 6 6-6" />}
    </Svg>
  );
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  sortBy: controlledSortBy,
  sortOrder: controlledSortOrder,
  onSort,
  searchable = false,
  searchKeys,
  searchPlaceholder = "Search...",
  pageSize,
  emptyText = "No data",
  className,
  striped = false,
  ...props
}: DataTableProps<T>) {
  const [internalSortBy, setInternalSortBy] = useState<string | undefined>();
  const [internalSortOrder, setInternalSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const sortBy = controlledSortBy ?? internalSortBy;
  const sortOrder = controlledSortOrder ?? internalSortOrder;

  const handleSort = useCallback((key: string) => {
    if (onSort) {
      onSort(key, sortBy === key && sortOrder === "asc" ? "desc" : "asc");
    } else {
      setInternalSortOrder(sortBy === key && internalSortOrder === "asc" ? "desc" : "asc");
      setInternalSortBy(key);
    }
    setPage(0);
  }, [sortBy, sortOrder, internalSortOrder, onSort]);

  const keys = searchKeys ?? columns.map((c) => c.key);

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      keys.some((k) => String(row[k] ?? "").toLowerCase().includes(q))
    );
  }, [data, search, keys]);

  const sorted = useMemo(() => {
    if (!sortBy) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortBy] ?? "";
      const bVal = b[sortBy] ?? "";
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortOrder === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortBy, sortOrder]);

  const totalPages = pageSize ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const paged = pageSize ? sorted.slice(page * pageSize, (page + 1) * pageSize) : sorted;

  const renderRow = useCallback(({ item, index }: { item: T; index: number }) => (
    <View className={cn("flex-row border-b border-border", striped && index % 2 === 1 && "bg-muted/30")}>
      {columns.map((col) => (
        <View key={col.key} className="flex-1 px-4 py-3" style={col.width ? { width: col.width, flex: 0 } : undefined}>
          {col.render ? (
            col.render(item[col.key], item)
          ) : (
            <Text className="text-sm text-foreground" numberOfLines={1}>
              {String(item[col.key] ?? "")}
            </Text>
          )}
        </View>
      ))}
    </View>
  ), [columns, striped]);

  return (
    <View className={cn("rounded-md border border-border overflow-hidden", className)} {...props}>
      {searchable && (
        <View className="px-4 py-3 border-b border-border bg-card">
          <TextInput
            className="min-h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm"
            placeholder={searchPlaceholder}
            placeholderTextColor="#71717a"
            value={search}
            onChangeText={(v) => { setSearch(v); setPage(0); }}
            accessibilityLabel="Search table"
          />
        </View>
      )}
      <ScrollView horizontal>
        <View className="min-w-full">
          <View className="flex-row bg-muted/50">
            {columns.map((col) => (
              <Pressable
                key={col.key}
                className="flex-1 flex-row items-center px-4 py-3 gap-1"
                style={col.width ? { width: col.width, flex: 0 } : undefined}
                onPress={() => col.sortable && handleSort(col.key)}
                disabled={!col.sortable}
                accessible={true}
                accessibilityRole={col.sortable ? "button" : "text"}
              >
                <Text className="text-sm font-medium text-muted-foreground">{col.header}</Text>
                {col.sortable && sortBy === col.key && <SortIcon order={sortOrder} />}
              </Pressable>
            ))}
          </View>
          <FlatList
            data={paged}
            keyExtractor={(_, i) => String(i)}
            renderItem={renderRow}
            ListEmptyComponent={
              <View className="py-8 items-center">
                <Text className="text-sm text-muted-foreground">{emptyText}</Text>
              </View>
            }
          />
        </View>
      </ScrollView>
      {pageSize && totalPages > 1 && (
        <View className="flex-row items-center justify-between px-4 py-3 border-t border-border bg-card">
          <Text className="text-xs text-muted-foreground">
            {page * pageSize + 1}-{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}
          </Text>
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className={cn("px-3 py-1.5 rounded-md border border-input", page === 0 && "opacity-40")}
              accessibilityRole="button"
              accessibilityLabel="Previous page"
            >
              <Text className="text-xs text-foreground">Prev</Text>
            </Pressable>
            <Pressable
              onPress={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className={cn("px-3 py-1.5 rounded-md border border-input", page >= totalPages - 1 && "opacity-40")}
              accessibilityRole="button"
              accessibilityLabel="Next page"
            >
              <Text className="text-xs text-foreground">Next</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}`;
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
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
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
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* Sorting */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Sorting</h2>
        <p className="text-sm text-muted-foreground">
          Mark columns as <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">sortable: true</code> to enable click-to-sort. Supports both uncontrolled (internal state) and controlled modes via <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">sortBy</code>, <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">sortOrder</code>, and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">onSort</code>.
        </p>
        <CodeBlock code={sortingCode} title="Sorting" />
      </div>
      {/* Search */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Search</h2>
        <p className="text-sm text-muted-foreground">
          Enable search with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">searchable</code>. Limit which columns are searchable with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">searchKeys</code>.
        </p>
        <CodeBlock code={searchCode} title="Searchable table" />
      </div>
      {/* Pagination */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Pagination</h2>
        <p className="text-sm text-muted-foreground">
          Set <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">pageSize</code> to enable pagination with Prev/Next controls. The current range and total count are displayed automatically.
        </p>
        <CodeBlock code={paginationCode} title="Paginated table" />
      </div>
      {/* Custom Cell */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Custom Cell Rendering</h2>
        <p className="text-sm text-muted-foreground">
          Use the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">render</code> prop on a column to provide custom cell content. The render function receives the cell value and full row.
        </p>
        <CodeBlock code={customCellCode} title="Custom cell render" />
      </div>
      {/* Striped */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Striped Rows</h2>
        <p className="text-sm text-muted-foreground">
          Add alternating row backgrounds with the <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">striped</code> prop.
        </p>
        <CodeBlock code={stripedCode} title="Striped rows" />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">DataTableProps</h3>
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
        <h3 className="text-lg font-medium text-foreground mt-6">DataTableColumn&lt;T&gt;</h3>
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
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Sortable column headers have <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;button&quot;</code>; non-sortable headers use <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole=&quot;text&quot;</code>.</li>
          <li>Search input has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel=&quot;Search table&quot;</code>.</li>
          <li>Pagination buttons have descriptive <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code> values.</li>
          <li>Empty state is announced to screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/data-table.tsx" />
      </div>
    </div>
  );
}
