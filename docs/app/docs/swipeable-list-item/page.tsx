import { getComponentSource } from "@/lib/registry-source";
import { Heading } from "@/components/heading";
import { PreviewSwipeableListItem } from "@/components/preview/swipeable-list-item";
import { ComponentPlayground } from "@/components/highlighted-playground";
import { CodeBlock } from "@/components/code-block-server";
import { PropsTable } from "@/components/props-table";
import { AddComponentTabs } from "@/components/package-manager-tabs";
import { PreviewToggle } from "@/components/preview-toggle";

const installCode = `npx @aniui/cli add swipeable-list-item`;
const depInstallCode = `npx expo install react-native-reanimated react-native-gesture-handler`;
const usageCode = `import { SwipeableListItem } from "@/components/ui/swipeable-list-item";
import { ListItem, ListItemTitle, ListItemDescription } from "@/components/ui/list";

export function InboxScreen() {
  return (
    <SwipeableListItem
      rightActions={[
        { key: "archive", label: "Archive", color: "bg-amber-500", onPress: () => {} },
        { key: "delete", label: "Delete", color: "bg-destructive", onPress: () => {} },
      ]}
      leftActions={[
        { key: "pin", label: "Pin", color: "bg-green-600", onPress: () => {} },
      ]}
    >
      <ListItem>
        <View className="flex-1">
          <ListItemTitle>Design Review</ListItemTitle>
          <ListItemDescription>Review the new onboarding flow</ListItemDescription>
        </View>
      </ListItem>
    </SwipeableListItem>
  );
}`;
const rightOnlyCode = `<SwipeableListItem
  rightActions={[
    {
      key: "delete",
      label: "Delete",
      color: "bg-destructive",
      onPress: () => handleDelete(item.id),
    },
  ]}
>
  <ListItem>
    <ListItemTitle>{item.title}</ListItemTitle>
  </ListItem>
</SwipeableListItem>`;
const withIconsCode = `import { Text } from "react-native";

<SwipeableListItem
  rightActions={[
    {
      key: "archive",
      label: "Archive",
      color: "bg-amber-500",
      icon: <Text className="text-white text-lg">📦</Text>,
      onPress: () => archiveItem(id),
    },
    {
      key: "delete",
      label: "Delete",
      color: "bg-destructive",
      icon: <Text className="text-white text-lg">🗑️</Text>,
      onPress: () => deleteItem(id),
    },
  ]}
>
  {children}
</SwipeableListItem>`;
const inFlatListCode = `import { FlatList } from "react-native";
import { SwipeableListItem } from "@/components/ui/swipeable-list-item";
import { ListItem, ListItemTitle } from "@/components/ui/list";

const actions = [
  { key: "delete", label: "Delete", color: "bg-destructive", onPress: () => {} },
];

export function MessageList({ messages }) {
  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SwipeableListItem
          rightActions={actions.map((a) => ({
            ...a,
            onPress: () => handleDelete(item.id),
          }))}
        >
          <ListItem>
            <ListItemTitle>{item.text}</ListItemTitle>
          </ListItem>
        </SwipeableListItem>
      )}
    />
  );
}`;
const sourceCode = getComponentSource("swipeable-list-item");
export default function SwipeableListItemPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">SwipeableListItem</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Swipeable list item that reveals action buttons on left or right swipe. Like iOS Mail.
        </p>
      </div>
      {/* Preview */}
      <PreviewToggle>
        <ComponentPlayground code={usageCode}>
          <PreviewSwipeableListItem />
        </ComponentPlayground>
      </PreviewToggle>
      {/* Installation */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Installation</Heading>
        <AddComponentTabs names="swipeable-list-item" />
        <p className="text-sm text-muted-foreground">
          This component requires additional dependencies:
        </p>
        <CodeBlock code={depInstallCode} />
        <p className="text-sm text-muted-foreground">
          You also need to wrap your app with <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">GestureHandlerRootView</code> from <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">react-native-gesture-handler</code>.
        </p>
      </div>
      {/* Usage */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Usage</Heading>
        <CodeBlock code={usageCode} title="app/inbox.tsx" />
      </div>
      {/* Right actions only */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Right Actions Only</Heading>
        <p className="text-sm text-muted-foreground">
          Swipe left to reveal a single delete action — the most common pattern.
        </p>
        <CodeBlock code={rightOnlyCode} />
      </div>
      {/* With icons */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">With Icons</Heading>
        <p className="text-sm text-muted-foreground">
          Add an <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">icon</code> to each action for a richer look. Icons render above the label.
        </p>
        <CodeBlock code={withIconsCode} />
      </div>
      {/* In FlatList */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Inside FlatList</Heading>
        <p className="text-sm text-muted-foreground">
          Works seamlessly inside <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FlatList</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">ScrollView</code>. The gesture uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">activeOffsetX</code> to avoid stealing vertical scrolls.
        </p>
        <CodeBlock code={inFlatListCode} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Props</Heading>
        <Heading as="h3" className="text-lg font-medium text-foreground">SwipeableListItemProps</Heading>
        <PropsTable props={[
          { name: "children", type: "React.ReactNode", default: "required" },
          { name: "leftActions", type: "SwipeableAction[]", default: "[]" },
          { name: "rightActions", type: "SwipeableAction[]", default: "[]" },
          { name: "onSwipeOpen", type: "(direction: \"left\" | \"right\") => void" },
          { name: "enabled", type: "boolean", default: "true" },
          { name: "className", type: "string" },
        ]} />
        <Heading as="h3" className="text-lg font-medium text-foreground mt-6">SwipeableAction</Heading>
        <PropsTable props={[
          { name: "key", type: "string", default: "required" },
          { name: "label", type: "string", default: "required" },
          { name: "icon", type: "React.ReactNode" },
          { name: "color", type: "string", default: "required" },
          { name: "textColor", type: "string", default: '"text-white"' },
          { name: "onPress", type: "() => void", default: "required" },
        ]} />
      </div>
      {/* Accessibility */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</Heading>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Gesture-based swipe with action buttons revealed on swipe.</li>
          <li>Action buttons have <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="button"</code> for screen reader users who cannot swipe.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <Heading as="h2" className="text-2xl font-semibold tracking-tight text-foreground">Source</Heading>
        <CodeBlock code={sourceCode} title="components/ui/swipeable-list-item.tsx" />
      </div>
    </div>
  );
}
