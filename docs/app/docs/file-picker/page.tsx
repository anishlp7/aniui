import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewFilePickerDemo } from "@/components/preview/file-picker";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
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
const sourceCode = getComponentSource("file-picker");
export default function Page() {
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
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="file-picker" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewFilePickerDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* FileInfo Type */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">FileInfo Type</Heading>
        <PropsTable props={[
          { name: "name", type: "string", default: "-" },
          { name: "size", type: "number", default: "-" },
          { name: "type", type: "string", default: "-" },
          { name: "uri", type: "string", default: "-" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
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
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>File upload UI with dashed border and preview.</li>
          <li>Remove action has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="button"</code> with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code>.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/file-picker.tsx" />
      </div>
    </div>
  );
}
