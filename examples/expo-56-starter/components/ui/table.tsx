import React, { createContext, useContext } from "react";
import { View, Text, ScrollView, type StyleProp, type ViewStyle } from "react-native";
import { cn } from "@/lib/utils";

type TableContextValue = { truncate: boolean; defaultColumnWidth: number };
const TableContext = createContext<TableContextValue>({ truncate: false, defaultColumnWidth: 150 });

export type TableViewProps = React.ComponentPropsWithoutRef<typeof View> & { className?: string; children?: React.ReactNode };
export interface TableProps extends React.ComponentPropsWithoutRef<typeof ScrollView> {
  className?: string;
  children?: React.ReactNode;
  /** When true, fit columns to container width and truncate long content. Default false: each cell
   *  has a fixed pixel width and the table scrolls horizontally if total content exceeds the viewport. */
  truncate?: boolean;
  /** Default pixel width for each cell. Used in scroll mode (truncate=false). Defaults to 150. */
  defaultColumnWidth?: number;
}
export interface TableCellProps extends TableViewProps { textClassName?: string }

const truncateCellStyle: StyleProp<ViewStyle> = { flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 0, overflow: "hidden" };

export function Table({ className, children, truncate = false, defaultColumnWidth = 150, ...props }: TableProps) {
  return (
    <TableContext.Provider value={{ truncate, defaultColumnWidth }}>
      <ScrollView horizontal scrollEnabled={!truncate} className={cn("rounded-md border border-border", className)} {...props}>
        <View className="min-w-full">{children}</View>
      </ScrollView>
    </TableContext.Provider>
  );
}

export function TableHeader({ className, ...props }: TableViewProps) {
  return <View className={cn("bg-muted/50", className)} {...props} />;
}

export function TableBody({ className, ...props }: TableViewProps) {
  return <View className={className} {...props} />;
}

export function TableRow({ className, ...props }: TableViewProps) {
  return <View className={cn("flex-row border-b border-border", className)} {...props} />;
}

export function TableHead({ className, textClassName, children, style, ...props }: TableCellProps) {
  const { truncate, defaultColumnWidth } = useContext(TableContext);
  const isText = typeof children === "string" || typeof children === "number";
  const widthStyle: StyleProp<ViewStyle> = truncate ? truncateCellStyle : { width: defaultColumnWidth, overflow: "hidden" };
  return (
    <View style={[widthStyle, style]} className={cn("justify-center px-4 py-3", className)} {...props}>
      {isText ? <Text className={cn("text-sm font-medium text-muted-foreground", textClassName)} numberOfLines={1}>{children}</Text> : children}
    </View>
  );
}

export function TableCell({ className, textClassName, children, style, ...props }: TableCellProps) {
  const { truncate, defaultColumnWidth } = useContext(TableContext);
  const isText = typeof children === "string" || typeof children === "number";
  const widthStyle: StyleProp<ViewStyle> = truncate ? truncateCellStyle : { width: defaultColumnWidth, overflow: "hidden" };
  return (
    <View style={[widthStyle, style]} className={cn("justify-center px-4 py-3", className)} {...props}>
      {isText ? <Text className={cn("text-sm text-foreground", textClassName)} numberOfLines={1}>{children}</Text> : children}
    </View>
  );
}
