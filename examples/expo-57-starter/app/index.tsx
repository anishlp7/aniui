import { useState } from "react";
import { Pressable, ScrollView, View, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { useAppTheme } from "./_layout";

function toSlug(name: string) {
  return name.toLowerCase().replace(/ /g, "-");
}

// A handful of display names don't collapse to their real component-file
// slug via the plain lowercase-and-hyphenate rule above (e.g. "Tab Bar" as
// two words vs. the actual "tabbar" filename) — override those specifically
// rather than making every display name match its slug exactly.
const slugOverrides: Record<string, string> = {
  "Morphing Tab Bar": "morphing-tabbar",
};

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
  { name: "Carousel", section: "Motion & Effects" },
  { name: "Carousel 3D", section: "Motion & Effects" },
  { name: "Carousel Parallax", section: "Motion & Effects" },
  { name: "Carousel Circular", section: "Motion & Effects" },
  { name: "Carousel Scale", section: "Motion & Effects" },
  { name: "Carousel Tilt", section: "Motion & Effects" },
  { name: "Vertical Flow Carousel", section: "Motion & Effects" },
  { name: "Vertical Page Carousel", section: "Motion & Effects" },
  { name: "Curved Bottom Tabs", section: "Motion & Effects" },
  { name: "Morphing Tab Bar", section: "Motion & Effects" },
  { name: "Mobile Dock", section: "Motion & Effects" },
  { name: "Fan Menu", section: "Motion & Effects" },
  { name: "Shimmer", section: "Motion & Effects" },
  { name: "Loader", section: "Motion & Effects" },
  { name: "Flip Card", section: "Motion & Effects" },
  { name: "Marquee", section: "Motion & Effects" },
  { name: "Event Ticket", section: "UI Pieces" },
  { name: "Receipt Card", section: "UI Pieces" },
  { name: "Coupon", section: "UI Pieces" },
  { name: "Polaroid", section: "UI Pieces" },
  { name: "Profile Card", section: "UI Pieces" },
  { name: "Photo Stack", section: "UI Pieces" },
  { name: "Book Page", section: "UI Pieces" },
  { name: "Barcode Badge", section: "UI Pieces" },
  { name: "Social Button", section: "UI Pieces" },
  { name: "Verified Badge", section: "UI Pieces" },
  { name: "QR Code", section: "UI Pieces" },
  { name: "Rolling Counter", section: "UI Pieces" },
  { name: "Morph Fab", section: "Motion & Effects" },
  { name: "Gooey Popover", section: "Motion & Effects" },
  { name: "Gooey Search Tabs", section: "Motion & Effects" },
  { name: "Tray", section: "Motion & Effects" },
  { name: "Unfold Menu", section: "Motion & Effects" },
  { name: "Action Rail", section: "Motion & Effects" },
  { name: "Split View", section: "Motion & Effects" },
  { name: "Expandable View", section: "Motion & Effects" },
  { name: "Matched Geometry", section: "Motion & Effects" },
  { name: "Arc List", section: "Motion & Effects" },
  { name: "Flexi Button", section: "Motion & Effects" },
  { name: "Save Button", section: "Motion & Effects" },
  { name: "Spin Button", section: "Motion & Effects" },
  { name: "Stacked Chips", section: "Motion & Effects" },
  { name: "Filling Stack", section: "Motion & Effects" },
  { name: "Hamburger", section: "Motion & Effects" },
  { name: "Theme Switch", section: "Motion & Effects" },
  { name: "Animated Header Scrollview", section: "Motion & Effects" },
  { name: "Animated Input Bar", section: "Motion & Effects" },
  { name: "Squircle View", section: "Motion & Effects" },
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

const sectionOrder = ["Foundation", "Forms & Inputs", "Feedback & Status", "Overlays & Menus", "Navigation & Structure", "Data Display & Media", "Motion & Effects", "UI Pieces", "Chat & AI", "Gestures & Actions", "Charts"];

export default function HomeScreen() {
  const router = useRouter();
  const { theme, toggle } = useAppTheme();
  const [search, setSearch] = useState("");
  const isDark = theme === "dark";
  const colors = isDark
    ? { bg: "#09090b", fg: "#fafafa", muted: "#27272a", mutedFg: "#a1a1aa", border: "#27272a", primary: "#fafafa", secondary: "#27272a" }
    : { bg: "#ffffff", fg: "#09090b", muted: "#f4f4f5", mutedFg: "#71717a", border: "#e4e4e7", primary: "#18181b", secondary: "#f4f4f5" };

  const filtered = search
    ? components.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    : components;

  const grouped = sectionOrder
    .map((s) => ({ title: s, items: filtered.filter((c) => c.section === s) }))
    .filter((s) => s.items.length > 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Image
                source={isDark ? require("@/assets/images/logo-dark.png") : require("@/assets/images/logo-light.png")}
                style={{ width: 44, height: 44 }}
                resizeMode="contain"
              />
              <View>
                <Text style={{ fontSize: 20, fontWeight: "700", color: colors.fg }}>AniUI</Text>
                <Text style={{ fontSize: 12, color: colors.mutedFg }}>{components.length} components</Text>
              </View>
            </View>
            <Pressable
              onPress={toggle}
              style={{ height: 40, width: 40, alignItems: "center", justifyContent: "center", borderRadius: 20, backgroundColor: colors.secondary }}
              accessibilityRole="button"
              accessibilityLabel={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <Text style={{ fontSize: 16 }}>{isDark ? "☀️" : "🌙"}</Text>
            </Pressable>
          </View>

          {/* Search */}
          <View style={{ marginTop: 16, flexDirection: "row", alignItems: "center", borderRadius: 8, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bg, paddingHorizontal: 12, height: 44 }}>
            <Text style={{ color: colors.mutedFg, marginRight: 8 }}>🔍</Text>
            <TextInput
              style={{ flex: 1, color: colors.fg, fontSize: 14 }}
              placeholder="Search components..."
              placeholderTextColor={colors.mutedFg}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <Pressable onPress={() => setSearch("")} accessibilityRole="button" accessibilityLabel="Clear search">
                <Text style={{ color: colors.mutedFg }}>✕</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Component List */}
        {grouped.map((section) => (
          <View key={section.title} style={{ marginTop: 8 }}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 8 }}>
              <Text style={{ fontSize: 11, fontWeight: "600", color: colors.mutedFg, textTransform: "uppercase", letterSpacing: 1 }}>
                {section.title} ({section.items.length})
              </Text>
            </View>
            {section.items.map((comp) => (
              <Pressable
                key={comp.name}
                onPress={() => router.push(`/component/${slugOverrides[comp.name] ?? toSlug(comp.name)}` as never)}
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 12 }}
                accessibilityRole="button"
              >
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

        {filtered.length === 0 && (
          <View style={{ alignItems: "center", paddingVertical: 48 }}>
            <Text style={{ color: colors.mutedFg }}>No components match &quot;{search}&quot;</Text>
          </View>
        )}

        <View style={{ alignItems: "center", marginTop: 32 }}>
          <Text style={{ fontSize: 12, color: colors.mutedFg }}>Built with AniUI</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
