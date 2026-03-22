"use client";
import React from "react";
import { PreviewCarousel } from "@/components/preview/carousel";
import { ComponentPlayground } from "@/components/component-playground";
import { CodeBlock } from "@/components/code-block";
import { PropsTable } from "@/components/props-table";

const installCode = `npx @aniui/cli add carousel`;
const usageCode = `import { Carousel } from "@/components/ui/carousel";
<Carousel
  data={[
    <View className="h-48 bg-primary rounded-lg items-center justify-center"><Text className="text-primary-foreground text-lg">Slide 1</Text></View>,
    <View className="h-48 bg-secondary rounded-lg items-center justify-center"><Text className="text-secondary-foreground text-lg">Slide 2</Text></View>,
    <View className="h-48 bg-accent rounded-lg items-center justify-center"><Text className="text-accent-foreground text-lg">Slide 3</Text></View>,
  ]}
/>`;
const autoPlayCode = `<Carousel
  data={slides}
  autoPlay
  interval={3000}
/>`;
const sourceCode = `import React, { useRef, useState } from "react";
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
    <View className={cn("", className)} {...props}>
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
        <View className="flex-row items-center justify-center gap-1.5 mt-3">
          {data.map((_, i) => (
            <View key={i} className={cn("h-2 rounded-full", i === active ? "w-4 bg-primary" : "w-2 bg-muted-foreground/30")} />
          ))}
        </View>
      )}
    </View>
  );
}`;
const slides = [
  <div key="1" className="h-48 bg-primary rounded-lg flex items-center justify-center"><span className="text-primary-foreground text-lg font-medium">Slide 1</span></div>,
  <div key="2" className="h-48 bg-secondary rounded-lg flex items-center justify-center"><span className="text-secondary-foreground text-lg font-medium">Slide 2</span></div>,
  <div key="3" className="h-48 bg-accent rounded-lg flex items-center justify-center"><span className="text-accent-foreground text-lg font-medium">Slide 3</span></div>,
];
export default function CarouselPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Carousel</h1>
        <p className="text-muted-foreground text-lg">Horizontal scrollable carousel with pagination dots and optional auto-play. Uses FlatList for performant scrolling.</p>
      </div>
      <ComponentPlayground code={usageCode}>
        <div className="max-w-md">
          <PreviewCarousel items={slides} />
        </div>
      </ComponentPlayground>
      <div>
        <h2 className="text-xl font-semibold mb-3">Installation</h2>
        <CodeBlock code={installCode} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Auto-Play</h2>
        <p className="text-sm text-muted-foreground mb-4">Set <code>autoPlay</code> to automatically cycle through slides. Configure the <code>interval</code> in milliseconds.</p>
        <ComponentPlayground code={autoPlayCode}>
          <div className="max-w-md">
            <PreviewCarousel items={slides} autoPlay interval={3000} />
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Props</h2>
        <PropsTable props={[
          { name: "data", type: "ReactNode[]" },
          { name: "itemWidth", type: "number", default: "screen width" },
          { name: "showDots", type: "boolean", default: "true" },
          { name: "autoPlay", type: "boolean", default: "false" },
          { name: "interval", type: "number", default: "3000" },
          { name: "className", type: "string" },
        ]} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/carousel.tsx" />
      </div>
    </div>
  );
}