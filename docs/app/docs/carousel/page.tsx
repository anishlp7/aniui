import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewCarousel } from "@/components/preview/carousel";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

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
const sourceCode = getComponentSource("carousel");

const slides = [
  <div key="1" className="h-48 bg-primary/10 rounded-lg flex items-center justify-center px-6"><span className="text-foreground text-lg font-semibold text-center">Track every habit in one place</span></div>,
  <div key="2" className="h-48 bg-primary/20 rounded-lg flex items-center justify-center px-6"><span className="text-foreground text-lg font-semibold text-center">Get a nudge right when you need it</span></div>,
  <div key="3" className="h-48 bg-primary/30 rounded-lg flex items-center justify-center px-6"><span className="text-foreground text-lg font-semibold text-center">Celebrate every streak you build</span></div>,
];

export default function CarouselPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Carousel</h1>
        <p className="text-muted-foreground text-lg">Horizontal scrollable carousel with pagination dots and optional auto-play. Uses FlatList for performant scrolling.</p>
      </div>
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <div className="max-w-md">
            <PreviewCarousel items={slides} />
          </div>
        </ComponentPlayground>
      </PreviewToggle>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Installation</Heading>
        <AddComponentTabs names="carousel" />
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Auto-Play</Heading>
        <p className="text-sm text-muted-foreground mb-4">Set <code>autoPlay</code> to automatically cycle through slides. Configure the <code>interval</code> in milliseconds.</p>
        <ComponentPlayground code={autoPlayCode}>
          <div className="max-w-md">
            <PreviewCarousel items={slides} autoPlay interval={3000} />
          </div>
        </ComponentPlayground>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Props</Heading>
        <PropsTable props={[
          { name: "data", type: "ReactNode[]" },
          { name: "itemWidth", type: "number", default: "measured container width" },
          { name: "showDots", type: "boolean", default: "true" },
          { name: "autoPlay", type: "boolean", default: "false" },
          { name: "interval", type: "number", default: "3000" },
          { name: "className", type: "string" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="adjustable"</code> with page indicators.</li>
          <li>Swipe gestures are supplemented with navigation controls for motor accessibility.</li>
        </ul>
      </div>
      <div>
        <Heading as="h2" className="text-xl font-semibold mb-3">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/carousel.tsx" />
      </div>
    </div>
  );
}
