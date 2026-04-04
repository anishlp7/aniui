import { useState } from "react";
import { Pressable, ScrollView, View, Image, TextInput, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAppTheme } from "./_layout";

function toSlug(name: string) {
  return name.toLowerCase().replace(/ /g, "-");
}

const components = [
  // Forms
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
  { name: "Form", section: "Forms" },
  { name: "File Picker", section: "Forms" },
  // Display
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
  // Feedback
  { name: "Alert", section: "Feedback" },
  { name: "Dialog", section: "Feedback" },
  { name: "Alert Dialog", section: "Feedback" },
  { name: "Toast", section: "Feedback" },
  { name: "Connection Banner", section: "Feedback" },
  // Navigation
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
  // Overlays
  { name: "Popover", section: "Overlays" },
  { name: "Dropdown Menu", section: "Overlays" },
  { name: "Context Menu", section: "Overlays" },
  { name: "Tooltip", section: "Overlays" },
  { name: "Bottom Sheet", section: "Overlays" },
  { name: "Action Sheet", section: "Overlays" },
  { name: "FAB", section: "Overlays" },
  // Charts
  { name: "Area Chart", section: "Charts" },
  { name: "Bar Chart", section: "Charts" },
  { name: "Line Chart", section: "Charts" },
  { name: "Pie Chart", section: "Charts" },
  { name: "Radar Chart", section: "Charts" },
  { name: "Radial Chart", section: "Charts" },
];

const sectionOrder = ["Forms", "Display", "Feedback", "Navigation", "Overlays", "Charts"];

export default function HomeScreen() {
  const router = useRouter();
  const { theme, toggle, colors } = useAppTheme();
  const [search, setSearch] = useState("");
  const isDark = theme === "dark";

  const filtered = search
    ? components.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    : components;

  const grouped = sectionOrder
    .map((s) => ({ title: s, items: filtered.filter((c) => c.section === s) }))
    .filter((s) => s.items.length > 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Image source={isDark ? require("@/assets/images/logo-dark.png") : require("@/assets/images/logo-light.png")} style={{ width: 44, height: 44 }} resizeMode="contain" />
              <View>
                <Text style={{ fontSize: 20, fontWeight: "700", color: colors.fg }}>AniUI + Uniwind</Text>
                <Text style={{ fontSize: 12, color: colors.mutedFg }}>Uniwind example</Text>
              </View>
            </View>
            <Pressable onPress={toggle} style={{ height: 40, width: 40, alignItems: "center", justifyContent: "center", borderRadius: 20, backgroundColor: colors.secondary }}>
              <Text style={{ fontSize: 16 }}>{isDark ? "☀️" : "🌙"}</Text>
            </Pressable>
          </View>
          <View style={{ marginTop: 16, flexDirection: "row", alignItems: "center", borderRadius: 8, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bg, paddingHorizontal: 12, height: 44 }}>
            <Text style={{ color: colors.mutedFg, marginRight: 8 }}>🔍</Text>
            <TextInput style={{ flex: 1, color: colors.fg, fontSize: 14 }} placeholder="Search components..." placeholderTextColor={colors.mutedFg} value={search} onChangeText={setSearch} />
            {search.length > 0 && <Pressable onPress={() => setSearch("")}><Text style={{ color: colors.mutedFg }}>✕</Text></Pressable>}
          </View>
        </View>

        {grouped.map((section) => (
          <View key={section.title} style={{ marginTop: 8 }}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
              <Text style={{ fontSize: 11, fontWeight: "600", color: colors.mutedFg, textTransform: "uppercase", letterSpacing: 1 }}>{section.title} ({section.items.length})</Text>
            </View>
            {section.items.map((comp) => (
              <Pressable key={comp.name} onPress={() => router.push(`/component/${toSlug(comp.name)}` as never)} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 12 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <View style={{ height: 32, width: 32, alignItems: "center", justifyContent: "center", borderRadius: 8, backgroundColor: colors.primary + "15" }}>
                    <Text style={{ color: colors.primary, fontSize: 12, fontWeight: "700" }}>{comp.name.charAt(0)}</Text>
                  </View>
                  <Text style={{ color: colors.fg, fontSize: 14, fontWeight: "500" }}>{comp.name}</Text>
                </View>
                <Text style={{ color: colors.mutedFg, fontSize: 12 }}>→</Text>
              </Pressable>
            ))}
          </View>
        ))}

        {filtered.length === 0 && <View style={{ alignItems: "center", paddingVertical: 48 }}><Text style={{ color: colors.mutedFg }}>No results</Text></View>}
        <View style={{ alignItems: "center", marginTop: 32 }}><Text style={{ fontSize: 12, color: colors.mutedFg }}>Built with AniUI + Uniwind</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}
