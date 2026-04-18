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
const sourceCode = `import React, { useRef, useState } from "react";
import { View, FlatList, Image, Dimensions, Pressable, Modal, Text } from "react-native";
import { cn } from "@/lib/utils";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export interface GalleryImage {
  uri: string;
  alt?: string;
}

export interface ImageGalleryProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  images: GalleryImage[];
  showPagination?: boolean;
}

export function ImageGallery({ className, images, showPagination = true, ...props }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const listRef = useRef<FlatList>(null);

  return (
    <View className={cn("", className)} {...props}>
      <FlatList
        ref={listRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => String(i)}
        onMomentumScrollEnd={(e) => {
          setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH));
        }}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => setFullscreen(true)}
            accessibilityRole="image"
            accessibilityLabel={item.alt ?? \`Image \${index + 1}\`}
          >
            <Image source={{ uri: item.uri }} style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 0.75 }} resizeMode="cover" />
          </Pressable>
        )}
      />
      {showPagination && images.length > 1 && (
        <View className="flex-row justify-center gap-1.5 mt-3">
          {images.map((_, i) => (
            <View
              key={i}
              className={cn("h-2 rounded-full", i === activeIndex ? "w-4 bg-primary" : "w-2 bg-muted")}
            />
          ))}
        </View>
      )}
      <Modal visible={fullscreen} transparent animationType="fade" onRequestClose={() => setFullscreen(false)}>
        <View className="flex-1 bg-black items-center justify-center">
          <Pressable
            onPress={() => setFullscreen(false)}
            className="absolute top-14 right-4 z-10 min-h-12 min-w-12 items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <Text className="text-white text-2xl">\u00D7</Text>
          </Pressable>
          <Image
            source={{ uri: images[activeIndex]?.uri }}
            style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
}`;
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
