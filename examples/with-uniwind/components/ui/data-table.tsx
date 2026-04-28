import React, { useState, useMemo, useCallback } from "react";
import { View, Text, TextInput, Pressable, ScrollView, type ViewStyle } from "react-native";
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
  /** When true, fit columns to container width and truncate long content with ellipsis.
   *  Default false: each column has a fixed width (col.width or defaultColumnWidth) and the
   *  table scrolls horizontally if total content exceeds the viewport. */
  truncate?: boolean;
  /** Default pixel width for columns that don't specify `col.width`. Used in scroll mode only. */
  defaultColumnWidth?: number;
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
  truncate = false,
  defaultColumnWidth = 150,
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

  const [contentWidth, setContentWidth] = useState(0);
  const fixedSum = columns.reduce((s, c) => s + (c.width ?? 0), 0);
  const autoCount = columns.filter((c) => !c.width).length;
  const truncatedAutoWidth = autoCount > 0 && contentWidth > 0
    ? Math.max((contentWidth - fixedSum) / autoCount, 80)
    : 0;

  const colStyle = (col: DataTableColumn<T>): ViewStyle => {
    if (col.width) return { width: col.width, overflow: "hidden" };
    if (truncate) {
      if (truncatedAutoWidth > 0) return { width: truncatedAutoWidth, overflow: "hidden" };
      return { flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 0, overflow: "hidden" };
    }
    return { width: defaultColumnWidth, overflow: "hidden" };
  };

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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{ minWidth: "100%" }}
          onLayout={truncate ? (e) => setContentWidth(e.nativeEvent.layout.width) : undefined}
        >
          {/* Header */}
          <View className="flex-row bg-muted/50">
            {columns.map((col) => (
              <Pressable
                key={col.key}
                className="flex-row items-center px-4 py-3 gap-1"
                style={colStyle(col)}
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
          {/* Body */}
          {paged.length === 0 ? (
            <View className="py-8 items-center">
              <Text className="text-sm text-muted-foreground">{emptyText}</Text>
            </View>
          ) : (
            paged.map((item, index) => (
              <View key={index} className={cn("flex-row border-t border-border", striped && index % 2 === 1 && "bg-muted/30")}>
                {columns.map((col) => (
                  <View key={col.key} className="px-4 py-3" style={colStyle(col)}>
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
            ))
          )}
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
}
