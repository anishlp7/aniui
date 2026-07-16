import React, { useRef, useState } from "react";
import { View, FlatList } from "react-native";
import { cn } from "@/lib/utils";

export interface CarouselProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  data: React.ReactNode[];
  itemWidth?: number;
  showDots?: boolean;
  autoPlay?: boolean;
  interval?: number;
}

export function Carousel({ className, data, itemWidth, showDots = true, autoPlay, interval = 3000, onLayout, ...props }: CarouselProps) {
  const [active, setActive] = useState(0);
  const [measured, setMeasured] = useState(0);
  // Size each slide to the carousel's OWN width (measured), not the window —
  // otherwise slides overflow when the carousel sits inside padding.
  const width = itemWidth ?? measured;
  const ref = useRef<FlatList>(null);

  React.useEffect(() => {
    if (!autoPlay || data.length <= 1 || !width) return;
    const timer = setInterval(() => {
      const next = (active + 1) % data.length;
      ref.current?.scrollToOffset({ offset: next * width, animated: true });
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, active, data.length, interval, width]);

  return (
    <View
      className={cn("", className)}
      onLayout={(e) => {
        setMeasured(e.nativeEvent.layout.width);
        onLayout?.(e);
      }}
      accessibilityRole="adjustable"
      accessibilityLabel={`Carousel, item ${active + 1} of ${data.length}`}
      {...props}
    >
      {width > 0 ? (
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
      ) : null}
      {showDots && data.length > 1 && (
        <View className="flex-row items-center justify-center gap-1.5 mt-3" accessibilityRole="tablist">
          {data.map((_, i) => (
            <View key={i} className={cn("h-2 rounded-full", i === active ? "w-4 bg-primary" : "w-2 bg-muted-foreground/30")} accessibilityRole="tab" accessibilityState={{ selected: i === active }} accessibilityLabel={`Page ${i + 1}`} />
          ))}
        </View>
      )}
    </View>
  );
}
