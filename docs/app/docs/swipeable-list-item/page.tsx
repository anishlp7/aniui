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
const sourceCode = `import React, { useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const ACTION_WIDTH = 80;

export interface SwipeableAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  color: string;
  textColor?: string;
  onPress: () => void;
}

export interface SwipeableListItemProps extends React.ComponentPropsWithoutRef<typeof View> {
  children: React.ReactNode;
  leftActions?: SwipeableAction[];
  rightActions?: SwipeableAction[];
  onSwipeOpen?: (direction: "left" | "right") => void;
  enabled?: boolean;
  className?: string;
}

function ActionTray({ actions, side }: { actions: SwipeableAction[]; side: "left" | "right" }) {
  return (
    <View
      className={\\\`absolute \\\${side}-0 top-0 bottom-0 flex-row\\\`}
      style={{ width: actions.length * ACTION_WIDTH }}
    >
      {actions.map((action) => (
        <Pressable
          key={action.key}
          onPress={action.onPress}
          className={cn("items-center justify-center", action.color)}
          style={{ width: ACTION_WIDTH }}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={action.label}
        >
          {action.icon}
          <Text className={cn("text-xs font-medium mt-1", action.textColor ?? "text-white")}>
            {action.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export function SwipeableListItem({
  children,
  leftActions = [],
  rightActions = [],
  onSwipeOpen,
  enabled = true,
  className,
  ...props
}: SwipeableListItemProps) {
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);
  const leftWidth = leftActions.length * ACTION_WIDTH;
  const rightWidth = rightActions.length * ACTION_WIDTH;

  const notifyOpen = useCallback(
    (dir: "left" | "right") => onSwipeOpen?.(dir),
    [onSwipeOpen]
  );

  const pan = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .enabled(enabled)
    .onStart(() => { startX.value = translateX.value; })
    .onUpdate((e) => {
      translateX.value = Math.max(-rightWidth, Math.min(leftWidth, startX.value + e.translationX));
    })
    .onEnd((e) => {
      const x = translateX.value;
      if (x > 0 && leftWidth > 0) {
        const open = x > leftWidth * 0.5 || e.velocityX > 500;
        translateX.value = withSpring(open ? leftWidth : 0);
        if (open) runOnJS(notifyOpen)("left");
      } else if (x < 0 && rightWidth > 0) {
        const open = Math.abs(x) > rightWidth * 0.5 || e.velocityX < -500;
        translateX.value = withSpring(open ? -rightWidth : 0);
        if (open) runOnJS(notifyOpen)("right");
      } else {
        translateX.value = withSpring(0);
      }
    });

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View className={cn("overflow-hidden", className)} {...props}>
      {leftActions.length > 0 && <ActionTray actions={leftActions} side="left" />}
      {rightActions.length > 0 && <ActionTray actions={rightActions} side="right" />}
      <GestureDetector gesture={pan}>
        <Animated.View style={contentStyle} className="bg-background">
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}`;
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
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Installation</h2>
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
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} title="app/inbox.tsx" />
      </div>
      {/* Right actions only */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Right Actions Only</h2>
        <p className="text-sm text-muted-foreground">
          Swipe left to reveal a single delete action — the most common pattern.
        </p>
        <CodeBlock code={rightOnlyCode} />
      </div>
      {/* With icons */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">With Icons</h2>
        <p className="text-sm text-muted-foreground">
          Add an <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">icon</code> to each action for a richer look. Icons render above the label.
        </p>
        <CodeBlock code={withIconsCode} />
      </div>
      {/* In FlatList */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Inside FlatList</h2>
        <p className="text-sm text-muted-foreground">
          Works seamlessly inside <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">FlatList</code> and <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">ScrollView</code>. The gesture uses <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">activeOffsetX</code> to avoid stealing vertical scrolls.
        </p>
        <CodeBlock code={inFlatListCode} />
      </div>
      {/* Props */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Props</h2>
        <h3 className="text-lg font-medium text-foreground">SwipeableListItemProps</h3>
        <PropsTable props={[
          { name: "children", type: "React.ReactNode", default: "required" },
          { name: "leftActions", type: "SwipeableAction[]", default: "[]" },
          { name: "rightActions", type: "SwipeableAction[]", default: "[]" },
          { name: "onSwipeOpen", type: "(direction: \"left\" | \"right\") => void" },
          { name: "enabled", type: "boolean", default: "true" },
          { name: "className", type: "string" },
        ]} />
        <h3 className="text-lg font-medium text-foreground mt-6">SwipeableAction</h3>
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
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Accessibility</h2>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Gesture-based swipe with action buttons revealed on swipe.</li>
          <li>Action buttons have <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono">accessibilityRole="button"</code> for screen reader users who cannot swipe.</li>
        </ul>
      </div>
      {/* Source */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Source</h2>
        <CodeBlock code={sourceCode} title="components/ui/swipeable-list-item.tsx" />
      </div>
    </div>
  );
}
