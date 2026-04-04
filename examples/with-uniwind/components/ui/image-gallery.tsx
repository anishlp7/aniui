import React, { useRef, useState } from "react";
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
            accessibilityLabel={item.alt ?? `Image ${index + 1}`}
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
              className={cn("h-2 rounded-full", i === activeIndex ? "w-4 bg-zinc-900 dark:bg-zinc-50" : "w-2 bg-zinc-100 dark:bg-zinc-800")}
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
            <Text className="text-white text-2xl">×</Text>
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
}
