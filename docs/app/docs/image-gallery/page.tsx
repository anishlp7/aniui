import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewImageGalleryDemo } from "@/components/preview/image-gallery";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { PreviewToggle } from "@/components/preview-toggle";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";

const installCode = `npx @aniui/cli add image-gallery`;
const usageCode = `import { ImageGallery, type GalleryImage } from "@/components/ui/image-gallery";

const images: GalleryImage[] = [
  { uri: "https://picsum.photos/400/300?random=1", alt: "Mountain landscape" },
  { uri: "https://picsum.photos/400/300?random=2", alt: "Ocean sunset" },
  { uri: "https://picsum.photos/400/300?random=3", alt: "Forest trail" },
];

export function MyScreen() {
  return (
    <ImageGallery
      images={images}
      showPagination
    />
  );
}`;
const sourceCode = getComponentSource("image-gallery");
export default function ImageGalleryPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Image Gallery</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Horizontal image carousel with fullscreen modal and pagination dots.
        </p>
      </div>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="image-gallery" />
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewImageGalleryDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/index.tsx" />
      </div>
      {/* GalleryImage Type */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">GalleryImage Type</Heading>
        <PropsTable props={[
          { name: "uri", type: "string", default: "-" },
          { name: "alt", type: "string", default: "-" },
        ]} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "images", type: "GalleryImage[]", default: "-" },
          { name: "showPagination", type: "boolean", default: "true" },
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
          <li>Horizontal gallery with fullscreen modal viewer.</li>
          <li>Each image has <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="image"</code> and close button is labeled for screen readers.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/image-gallery.tsx" />
      </div>
    </div>
  );
}
