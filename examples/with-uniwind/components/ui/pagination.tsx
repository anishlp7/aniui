import React from "react";
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
        <Text className={cn("text-base font-bold", current <= 1 ? "text-zinc-100 dark:text-zinc-800" : "text-zinc-950 dark:text-zinc-50")}>←</Text>
      </Pressable>
      {pages.map((page, i) =>
        page === "..." ? (
          <Text key={`e${i}`} className="text-zinc-500 dark:text-zinc-400 px-1">…</Text>
        ) : (
          <Pressable
            key={page}
            onPress={() => onPageChange(page)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Page ${page}`}
            accessibilityState={{ selected: page === current }}
            className={cn(
              "min-h-10 min-w-10 items-center justify-center rounded-md",
              page === current ? "bg-zinc-900 dark:bg-zinc-50" : "bg-transparent"
            )}
          >
            <Text className={cn("text-sm font-medium", page === current ? "text-zinc-50 dark:text-zinc-900" : "text-zinc-950 dark:text-zinc-50")}>
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
        <Text className={cn("text-base font-bold", current >= total ? "text-zinc-100 dark:text-zinc-800" : "text-zinc-950 dark:text-zinc-50")}>→</Text>
      </Pressable>
    </View>
  );
}
