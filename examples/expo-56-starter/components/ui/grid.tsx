import React from "react";
import { FlatList, View } from "react-native";
import { cn } from "@/lib/utils";

export interface GridProps<T> extends Omit<React.ComponentPropsWithoutRef<typeof FlatList<T>>, "numColumns"> {
  className?: string;
  columns?: number;
  gap?: number;
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
}

export function Grid<T>({
  className,
  columns = 2,
  gap = 8,
  data,
  renderItem,
  keyExtractor,
  ...props
}: GridProps<T>) {
  return (
    <FlatList
      className={cn("", className)}
      data={data}
      numColumns={columns}
      keyExtractor={keyExtractor}
      columnWrapperStyle={columns > 1 ? { gap } : undefined}
      contentContainerStyle={{ gap }}
      renderItem={({ item, index }) => (
        <View style={{ flex: 1 }}>{renderItem({ item, index })}</View>
      )}
      {...props}
    />
  );
}
