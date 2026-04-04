import React, { useRef, useState } from "react";
import { View, FlatList, Dimensions } from "react-native";
import { cn } from "@/lib/utils";

export interface CarouselProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: React.ReactNode[];
  itemWidth?: number;
  showDots?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

export function Carousel({ className, data, itemWidth, showDots = true, autoPlay, interval = 3000, ...props }: CarouselProps) {
  const [active, setActive] = useState(0);
  const width = itemWidth ?? Dimensions.get("window").width;
  const ref = useRef<FlatList>(null);

  React.useEffect(() => {
    if (!autoPlay || data.length <= 1) return;
    const timer = setInterval(() => {
      const next = (active + 1) % data.length;
      ref.current?.scrollToOffset({ offset: next * width, animated: true });
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, active, data.length, interval, width]);

  return (
    <View className={cn("", className)} accessibilityRole="adjustable" accessibilityLabel={`Carousel, item ${active + 1} of ${data.length}`} {...props}>
      <FlatList
        ref={ref}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => setActive(Math.round(e.nativeEvent.contentOffset.x / width))}
        renderItem={({ item }) => <View style={{ width }}>{item}</View>}
        keyExtractor={(_, i) => String(i)}
      />
      {showDots && data.length > 1 && (
        <View className="flex-row items-center justify-center gap-1.5 mt-3" accessibilityRole="tablist">
          {data.map((_, i) => (
            <View key={i} className={cn("h-2 rounded-full", i === active ? "w-4 bg-zinc-900 dark:bg-zinc-50" : "w-2 bg-zinc-500/30 dark:bg-zinc-400/30")} accessibilityRole="tab" accessibilityState={{ selected: i === active }} accessibilityLabel={`Page ${i + 1}`} />
          ))}
        </View>
      )}
    </View>
  );
}
