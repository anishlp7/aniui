import { useState } from "react";
import { Pressable, ScrollView, View, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { useAppTheme } from "./_layout";

function toSlug(name: string) {
  return name.toLowerCase().replace(/ /g, "-");
}

const components = [
  // Foundation
  { name: "Button", section: "Foundation" },
  { name: "Text", section: "Foundation" },
  { name: "Badge", section: "Foundation" },
  { name: "Card", section: "Foundation" },
  { name: "Separator", section: "Foundation" },
  { name: "Labeled Separator", section: "Foundation" },
  { name: "Skeleton", section: "Foundation" },
  { name: "Spinner", section: "Foundation" },
  { name: "Kbd", section: "Foundation" },
  { name: "Gradient", section: "Foundation" },
  { name: "Safe Area", section: "Foundation" },
  { name: "FAB", section: "Foundation" },
  { name: "Direction Provider", section: "Foundation" },
  { name: "Theme Provider", section: "Foundation" },
  { name: "Keyboard View", section: "Foundation" },
  { name: "Animate", section: "Foundation" },
  { name: "Aspect Ratio", section: "Foundation" },
  // Forms & Inputs
  { name: "Input", section: "Forms & Inputs" },
  { name: "Textarea", section: "Forms & Inputs" },
  { name: "Checkbox", section: "Forms & Inputs" },
  { name: "Switch", section: "Forms & Inputs" },
  { name: "Radio Group", section: "Forms & Inputs" },
  { name: "Select", section: "Forms & Inputs" },
  { name: "Slider", section: "Forms & Inputs" },
  { name: "Stepper", section: "Forms & Inputs" },
  { name: "Toggle", section: "Forms & Inputs" },
  { name: "Toggle Group", section: "Forms & Inputs" },
  { name: "Rating", section: "Forms & Inputs" },
  { name: "Chip", section: "Forms & Inputs" },
  { name: "Segmented Control", section: "Forms & Inputs" },
  { name: "Search Bar", section: "Forms & Inputs" },
  { name: "Date Picker", section: "Forms & Inputs" },
  { name: "Input OTP", section: "Forms & Inputs" },
  { name: "Password Input", section: "Forms & Inputs" },
  { name: "Masked Input", section: "Forms & Inputs" },
  { name: "Phone Input", section: "Forms & Inputs" },
  { name: "Number Input", section: "Forms & Inputs" },
  { name: "Combobox", section: "Forms & Inputs" },
  { name: "Field", section: "Forms & Inputs" },
  { name: "Input Group", section: "Forms & Inputs" },
  { name: "Form", section: "Forms & Inputs" },
  { name: "File Picker", section: "Forms & Inputs" },
  { name: "AutoComplete", section: "Forms & Inputs" },
  { name: "Calendar", section: "Forms & Inputs" },
  { name: "Label", section: "Forms & Inputs" },
  // Feedback & Status
  { name: "Progress", section: "Feedback & Status" },
  { name: "Progress Steps", section: "Feedback & Status" },
  { name: "Empty State", section: "Feedback & Status" },
  { name: "Status Indicator", section: "Feedback & Status" },
  { name: "Banner", section: "Feedback & Status" },
  { name: "Alert", section: "Feedback & Status" },
  { name: "Toast", section: "Feedback & Status" },
  { name: "Connection Banner", section: "Feedback & Status" },
  // Overlays & Menus
  { name: "Command Menu", section: "Overlays & Menus" },
  { name: "Dialog", section: "Overlays & Menus" },
  { name: "Alert Dialog", section: "Overlays & Menus" },
  { name: "Drawer", section: "Overlays & Menus" },
  { name: "Popover", section: "Overlays & Menus" },
  { name: "Dropdown Menu", section: "Overlays & Menus" },
  { name: "Context Menu", section: "Overlays & Menus" },
  { name: "Tooltip", section: "Overlays & Menus" },
  { name: "Hover Card", section: "Overlays & Menus" },
  { name: "Bottom Sheet", section: "Overlays & Menus" },
  { name: "Action Sheet", section: "Overlays & Menus" },
  // Navigation & Structure
  { name: "Accordion", section: "Navigation & Structure" },
  { name: "Tabs", section: "Navigation & Structure" },
  { name: "Collapsible", section: "Navigation & Structure" },
  { name: "Header", section: "Navigation & Structure" },
  { name: "Tab Bar", section: "Navigation & Structure" },
  { name: "Pagination", section: "Navigation & Structure" },
  { name: "Breadcrumb", section: "Navigation & Structure" },
  { name: "Menubar", section: "Navigation & Structure" },
  { name: "Sidebar", section: "Navigation & Structure" },
  // Data Display & Media
  { name: "Data Table", section: "Data Display & Media" },
  { name: "Avatar", section: "Data Display & Media" },
  { name: "Image", section: "Data Display & Media" },
  { name: "List", section: "Data Display & Media" },
  { name: "Table", section: "Data Display & Media" },
  { name: "Grid", section: "Data Display & Media" },
  { name: "Timeline", section: "Data Display & Media" },
  { name: "Stat Card", section: "Data Display & Media" },
  { name: "Price", section: "Data Display & Media" },
  { name: "Avatar Group", section: "Data Display & Media" },
  { name: "Image Gallery", section: "Data Display & Media" },
  { name: "Carousel", section: "Data Display & Media" },
  { name: "Infinite List", section: "Data Display & Media" },
  { name: "Refresh Control", section: "Data Display & Media" },
  // Chat & AI
  { name: "Chat Bubble", section: "Chat & AI" },
  { name: "Typing Indicator", section: "Chat & AI" },
  { name: "Prompt Input", section: "Chat & AI" },
  { name: "Streaming Text", section: "Chat & AI" },
  { name: "Waveform", section: "Chat & AI" },
  // Gestures & Actions
  { name: "Slide To Confirm", section: "Gestures & Actions" },
  { name: "Swipeable List Item", section: "Gestures & Actions" },
  { name: "Swipe Deck", section: "Gestures & Actions" },
  // Charts
  { name: "Area Chart", section: "Charts" },
  { name: "Bar Chart", section: "Charts" },
  { name: "Line Chart", section: "Charts" },
  { name: "Pie Chart", section: "Charts" },
  { name: "Radar Chart", section: "Charts" },
  { name: "Radial Chart", section: "Charts" },
  { name: "Chart Tooltip", section: "Charts" },
];

const sectionOrder = ["Foundation", "Forms & Inputs", "Feedback & Status", "Overlays & Menus", "Navigation & Structure", "Data Display & Media", "Chat & AI", "Gestures & Actions", "Charts"];

export default function HomeScreen() {
  const router = useRouter();
  const { theme, toggle } = useAppTheme();
  const [search, setSearch] = useState("");
  const isDark = theme === "dark";

  const filtered = search
    ? components.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    : components;

  const grouped = sectionOrder
    .map((s) => ({ title: s, items: filtered.filter((c) => c.section === s) }))
    .filter((s) => s.items.length > 0);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="px-5 pt-6 pb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <Image
                source={isDark ? require("@/assets/images/logo-dark.png") : require("@/assets/images/logo-light.png")}
                style={{ width: 44, height: 44 }}
                resizeMode="contain"
              />
              <View>
                <Text variant="h3" className="text-foreground">AniUI</Text>
                <Text variant="small" className="text-muted-foreground">{components.length} components</Text>
              </View>
            </View>
            <Pressable
              onPress={toggle}
              className="h-10 w-10 items-center justify-center rounded-full bg-secondary"
              accessibilityRole="button"
              accessibilityLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <Text className="text-base">{isDark ? "☀️" : "🌙"}</Text>
            </Pressable>
          </View>

          {/* Search */}
          <View className="mt-4 flex-row items-center rounded-lg border border-input bg-background px-3 h-11">
            <Text className="text-muted-foreground mr-2">🔍</Text>
            <TextInput
              className="flex-1 text-foreground text-sm"
              placeholder="Search components..."
              placeholderTextColor={isDark ? "#a1a1aa" : "#71717a"}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <Pressable onPress={() => setSearch("")} accessibilityRole="button" accessibilityLabel="Clear search">
                <Text className="text-muted-foreground">✕</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Component List */}
        {grouped.map((section) => (
          <View key={section.title} className="mt-2">
            <View className="px-5 py-2">
              <Text variant="small" className="text-muted-foreground font-semibold uppercase tracking-wider">
                {section.title} ({section.items.length})
              </Text>
            </View>
            {section.items.map((comp) => (
              <Pressable
                key={comp.name}
                onPress={() => router.push(`/component/${toSlug(comp.name)}` as never)}
                className="flex-row items-center justify-between px-5 py-3 active:bg-accent"
                accessibilityRole="button"
              >
                <View className="flex-row items-center gap-3">
                  <View className="h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Text className="text-primary text-xs font-bold">{comp.name.charAt(0)}</Text>
                  </View>
                  <Text className="text-foreground text-sm font-medium">{comp.name}</Text>
                </View>
                <Text className="text-muted-foreground text-xs">→</Text>
              </Pressable>
            ))}
          </View>
        ))}

        {filtered.length === 0 && (
          <View className="items-center py-12">
            <Text className="text-muted-foreground">No components match &quot;{search}&quot;</Text>
          </View>
        )}

        <View className="items-center mt-8">
          <Text variant="small" className="text-muted-foreground">Built with AniUI</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
