import React from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/components/ui/theme-provider";

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
  const colors = useThemeColors();
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
            <ActivityIndicator size="small" color={colors.foreground} accessibilityRole="progressbar" />
          </View>
        ) : null
      }
      {...props}
    />
  );
}
