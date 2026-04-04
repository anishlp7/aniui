import React from "react";
import { View, Pressable, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { cn } from "@/lib/utils";

export interface FileInfo {
  name: string;
  size?: number;
  type?: string;
  uri?: string;
}

export interface FilePickerProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  file?: FileInfo;
  onPress: () => void;
  onRemove?: () => void;
  label?: string;
  accept?: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FilePicker({
  className,
  file,
  onPress,
  onRemove,
  label = "Tap to select a file",
  ...props
}: FilePickerProps) {
  return (
    <View className={cn("", className)} {...props}>
      {!file ? (
        <Pressable
          onPress={onPress}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={label}
          className="min-h-24 items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-6"
        >
          <View className="mb-2">
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <Path d="M12 3v12" />
              <Path d="m17 8-5-5-5 5" />
              <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            </Svg>
          </View>
          <Text className="text-sm text-zinc-500 dark:text-zinc-400 text-center">{label}</Text>
        </Pressable>
      ) : (
        <View className="flex-row items-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3">
          <View className="flex-1 mr-3">
            <Text className="text-sm font-medium text-zinc-950 dark:text-zinc-50" numberOfLines={1}>{file.name}</Text>
            {file.size !== undefined && (
              <Text className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{formatSize(file.size)}</Text>
            )}
          </View>
          {onRemove && (
            <Pressable
              onPress={onRemove}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Remove file"
              className="min-h-8 min-w-8 items-center justify-center"
            >
              <Text className="text-red-500 dark:text-red-900 text-lg">
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M18 6 6 18" />
                  <Path d="m6 6 12 12" />
                </Svg>
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}
