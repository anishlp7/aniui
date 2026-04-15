import { useState } from "react";
import { Pressable, ScrollView, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../components/ui/text";
import { useAppTheme } from "../App";

function toSlug(name: string) {
  return name.toLowerCase().replace(/ /g, "-");
}

const components = [
  { name: "Button", section: "Forms" },
  { name: "Input", section: "Forms" },
  { name: "Textarea", section: "Forms" },
  { name: "Checkbox", section: "Forms" },
  { name: "Switch", section: "Forms" },
  { name: "Radio Group", section: "Forms" },
  { name: "Select", section: "Forms" },
  { name: "Slider", section: "Forms" },
  { name: "Stepper", section: "Forms" },
  { name: "Toggle", section: "Forms" },
  { name: "Toggle Group", section: "Forms" },
  { name: "Rating", section: "Forms" },
  { name: "Chip", section: "Forms" },
  { name: "Segmented Control", section: "Forms" },
  { name: "Search Bar", section: "Forms" },
  { name: "Date Picker", section: "Forms" },
  { name: "Input OTP", section: "Forms" },
  { name: "Password Input", section: "Forms" },
  { name: "Masked Input", section: "Forms" },
  { name: "Phone Input", section: "Forms" },
  { name: "Number Input", section: "Forms" },
  { name: "Combobox", section: "Forms" },
  { name: "Command Menu", section: "Forms" },
  { name: "Data Table", section: "Display" },
  { name: "Form", section: "Forms" },
  { name: "File Picker", section: "Forms" },
  { name: "Text", section: "Display" },
  { name: "Badge", section: "Display" },
  { name: "Card", section: "Display" },
  { name: "Avatar", section: "Display" },
  { name: "Separator", section: "Display" },
  { name: "Labeled Separator", section: "Display" },
  { name: "Label", section: "Display" },
  { name: "Image", section: "Display" },
  { name: "Skeleton", section: "Display" },
  { name: "Spinner", section: "Display" },
  { name: "Progress", section: "Display" },
  { name: "Progress Steps", section: "Display" },
  { name: "Empty State", section: "Display" },
  { name: "List", section: "Display" },
  { name: "Table", section: "Display" },
  { name: "Grid", section: "Display" },
  { name: "Timeline", section: "Display" },
  { name: "Chat Bubble", section: "Display" },
  { name: "Stat Card", section: "Display" },
  { name: "Price", section: "Display" },
  { name: "Status Indicator", section: "Display" },
  { name: "Banner", section: "Display" },
  { name: "Typing Indicator", section: "Display" },
  { name: "Alert", section: "Feedback" },
  { name: "Dialog", section: "Feedback" },
  { name: "Alert Dialog", section: "Feedback" },
  { name: "Toast", section: "Feedback" },
  { name: "Connection Banner", section: "Feedback" },
  { name: "Accordion", section: "Navigation" },
  { name: "Tabs", section: "Navigation" },
  { name: "Collapsible", section: "Navigation" },
  { name: "Drawer", section: "Navigation" },
  { name: "Header", section: "Navigation" },
  { name: "Tab Bar", section: "Navigation" },
  { name: "Carousel", section: "Navigation" },
  { name: "Pagination", section: "Navigation" },
  { name: "Infinite List", section: "Navigation" },
  { name: "Swipeable List Item", section: "Navigation" },
  { name: "Safe Area", section: "Navigation" },
  { name: "Refresh Control", section: "Navigation" },
  { name: "Popover", section: "Overlays" },
  { name: "Dropdown Menu", section: "Overlays" },
  { name: "Context Menu", section: "Overlays" },
  { name: "Tooltip", section: "Overlays" },
  { name: "Bottom Sheet", section: "Overlays" },
  { name: "Action Sheet", section: "Overlays" },
  { name: "FAB", section: "Overlays" },
  { name: "Area Chart", section: "Charts" },
  { name: "Bar Chart", section: "Charts" },
  { name: "Line Chart", section: "Charts" },
  { name: "Pie Chart", section: "Charts" },
  { name: "Radar Chart", section: "Charts" },
  { name: "Radial Chart", section: "Charts" },
];

const sectionOrder = ["Forms", "Display", "Feedback", "Navigation", "Overlays", "Charts"];

export interface HomeScreenProps {
  onNavigate: (slug: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
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
        <View className="px-5 pt-6 pb-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text variant="h3" className="text-foreground">AniUI</Text>
              <Text variant="small" className="text-muted-foreground">77 components</Text>
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

          <View className="mt-4 flex-row items-center rounded-lg border border-input bg-background px-3 h-11">
            <Text className="text-muted-foreground mr-2">🔍</Text>
            <TextInput
              className="flex-1 text-foreground text-sm"
              placeholder="Search components..."
              placeholderTextColor="#71717a"
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
                onPress={() => onNavigate(toSlug(comp.name))}
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
