"use client";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

import { AddComponentTabs } from "@/components/package-manager-tabs";
const installCode = `npx @aniui/cli add file-picker`;
const usageCode = `import { FilePicker, type FileInfo } from "@/components/ui/file-picker";
import * as DocumentPicker from "expo-document-picker";

export function MyScreen() {
  const [file, setFile] = useState<FileInfo | undefined>();

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.assets?.[0]) {
      const asset = result.assets[0];
      setFile({ name: asset.name, size: asset.size, uri: asset.uri });
    }
  };

  return (
    <FilePicker
      file={file}
      onPress={pickFile}
      onRemove={() => setFile(undefined)}
      label="Tap to upload a document"
    />
  );
}`;
const sourceCode = `import React from "react";
import { View, Pressable, Text } from "react-native";
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
  if (bytes < 1024) return \`\${bytes} B\`;
  if (bytes < 1024 * 1024) return \`\${(bytes / 1024).toFixed(1)} KB\`;
  return \`\${(bytes / (1024 * 1024)).toFixed(1)} MB\`;
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
          className="min-h-24 items-center justify-center rounded-lg border-2 border-dashed border-input bg-background px-4 py-6"
        >
          <Text className="text-2xl text-muted-foreground mb-2">\u2191</Text>
          <Text className="text-sm text-muted-foreground text-center">{label}</Text>
        </Pressable>
      ) : (
        <View className="flex-row items-center rounded-lg border border-border bg-card px-4 py-3">
          <View className="flex-1 mr-3">
            <Text className="text-sm font-medium text-foreground" numberOfLines={1}>{file.name}</Text>
            {file.size !== undefined && (
              <Text className="text-xs text-muted-foreground mt-0.5">{formatSize(file.size)}</Text>
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
              <Text className="text-destructive text-lg">\u00D7</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}`;
export default function FilePickerPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">File Picker</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          File upload UI with dashed border, file preview, and remove button.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
        <AddComponentTabs names="file-picker" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* FileInfo Type */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">FileInfo Type</h2>
        <PropsTable props={[
          { name: "name", type: "string", default: "-" },
          { name: "size", type: "number", default: "-" },
          { name: "type", type: "string", default: "-" },
          { name: "uri", type: "string", default: "-" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <PropsTable props={[
          { name: "file", type: "FileInfo", default: "-" },
          { name: "onPress", type: "() => void", default: "-" },
          { name: "onRemove", type: "() => void", default: "-" },
          { name: "label", type: "string", default: '"Tap to select a file"' },
          { name: "className", type: "string", default: "-" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props.
        </p>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/file-picker.tsx" />
      </div>
    </div>
  );
}
