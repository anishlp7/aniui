import React, { useRef, useState } from "react";
import { View, FlatList, Image, Pressable, Modal, useWindowDimensions } from "react-native";
import { X } from "lucide-react-native";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  uri: string;
  alt?: string;
}

export interface ImageGalleryProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  images: GalleryImage[];
  showPagination?: boolean;
}

export function ImageGallery({ className, images, showPagination = true, onLayout, ...props }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  // Size slides to the gallery's OWN measured width (survives rotation /
  // split-screen); the fullscreen modal uses the live window width instead.
  const [width, setWidth] = useState(0);
  const { width: windowWidth } = useWindowDimensions();
  const listRef = useRef<FlatList>(null);

  return (
    <View
      className={cn("", className)}
      onLayout={(e) => {
        setWidth(e.nativeEvent.layout.width);
        onLayout?.(e);
      }}
      {...props}
    >
      {width > 0 && (
        <FlatList
          ref={listRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => String(i)}
          onMomentumScrollEnd={(e) => {
            setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / width));
          }}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => setFullscreen(true)}
              accessibilityRole="image"
              accessibilityLabel={item.alt ?? `Image ${index + 1}`}
            >
              <Image source={{ uri: item.uri }} style={{ width, height: width * 0.75 }} resizeMode="cover" />
            </Pressable>
          )}
        />
      )}
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
            className="absolute top-14 end-4 z-10 min-h-12 min-w-12 items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <X size={24} color="#ffffff" strokeWidth={2} />
          </Pressable>
          <Image
            source={{ uri: images[activeIndex]?.uri }}
            style={{ width: windowWidth, height: windowWidth }}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
}
