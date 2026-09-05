import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewSwipeDeckDemo } from "@/components/preview/swipe-deck";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add swipe-deck`;
const usageCode = `import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { SwipeDeck } from "@/components/ui/swipe-deck";

const profiles = [
  { name: "Maya", age: 27, bio: "Coffee, climbing, code." },
  { name: "Leo", age: 31, bio: "Street photography and ramen." },
  { name: "Ava", age: 24, bio: "Trail runner. Dog person." },
];

export function DiscoverScreen() {
  return (
    <SwipeDeck
      data={profiles}
      className="h-96"
      renderCard={(profile) => (
        <View className="h-96 justify-end rounded-3xl bg-secondary p-6">
          <Text className="text-2xl font-bold">{profile.name}, {profile.age}</Text>
          <Text variant="muted">{profile.bio}</Text>
        </View>
      )}
      onSwipeRight={(profile) => like(profile)}
      onSwipeLeft={(profile) => pass(profile)}
    />
  );
}`;
const setupCode = `// app/_layout.tsx — SwipeDeck's pan gesture needs the
// gesture-handler root view once, at the top of your app.
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* your navigator / screens */}
    </GestureHandlerRootView>
  );
}`;
const emptyCode = `// onEmpty fires after the last card is swiped away —
// swap in an EmptyState when the deck runs out.
import { EmptyState } from "@/components/ui/empty-state";

const [empty, setEmpty] = useState(false);

{empty ? (
  <EmptyState
    title="You're all caught up"
    description="Check back later for more profiles."
  />
) : (
  <SwipeDeck
    data={profiles}
    renderCard={renderProfile}
    onEmpty={() => setEmpty(true)}
  />
)}`;
const sourceCode = getComponentSource("swipe-deck");
export default function SwipeDeckPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Swipe Deck</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Tinder-style swipeable card stack — fling physics, rotation while dragging, and the next card scaling up underneath.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewSwipeDeckDemo />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="swipe-deck" />
        <p className="text-sm text-muted-foreground">Requires <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-gesture-handler</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-reanimated</code> — wrap your app root in <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">GestureHandlerRootView</code>.</p>
        <CodeBlock code={setupCode} title="app/_layout.tsx" />
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <p className="text-sm text-muted-foreground"><code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">SwipeDeck</code> is generic — pass any <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">data</code> array and render each card with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">renderCard</code>. Give the deck (and your card) an explicit height, since the cards are absolutely stacked.</p>
        <CodeBlock code={usageCode} title="app/discover.tsx" />
      </div>
      {/* Empty */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">When the deck runs out</Heading>
        <CodeBlock code={emptyCode} title="Empty state" />
      </div>
      {/* Physics */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Fling physics</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>A card is dismissed when dragged past <strong className="text-foreground">35% of the deck width</strong>, or flung with horizontal velocity above <strong className="text-foreground">900</strong> — otherwise it springs back to center.</li>
          <li>The top card rotates up to ±12° with the horizontal drag.</li>
          <li>The next card scales from 0.95 to 1 and slides into place as the top card travels.</li>
        </ul>
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <PropsTable props={[
          { name: "data", type: "T[]" },
          { name: "renderCard", type: "(item: T, index: number) => ReactNode" },
          { name: "onSwipeLeft", type: "(item: T, index: number) => void" },
          { name: "onSwipeRight", type: "(item: T, index: number) => void" },
          { name: "onEmpty", type: "() => void", description: "Fired after the last card is swiped away." },
          { name: "className", type: "string" },
        ]} />
        <p className="text-sm text-muted-foreground">
          Also accepts all <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">View</code> props from React Native.
        </p>
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>The top card announces its position (&ldquo;Card 2 of 5&rdquo;) via <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityLabel</code>.</li>
          <li>Swiping is gesture-only — pair the deck with visible like/pass buttons that call the same handlers for users who can&rsquo;t perform the gesture.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/swipe-deck.tsx" />
      </div>
    </div>
  );
}
