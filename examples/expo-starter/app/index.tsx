import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const categories = [
  { title: "Forms", description: "Input, Checkbox, Switch, Select, Slider, and more", route: "/forms" as const, count: 17 },
  { title: "Data Display", description: "Text, Badge, Card, Avatar, Table, Calendar, and more", route: "/data-display" as const, count: 15 },
  { title: "Feedback", description: "Alert, Dialog, Toast, Banner, Tooltip, and more", route: "/feedback" as const, count: 8 },
  { title: "Navigation", description: "Tabs, Accordion, Collapsible, Drawer", route: "/navigation" as const, count: 4 },
  { title: "Overlays", description: "Bottom Sheet, Action Sheet, FAB", route: "/overlays" as const, count: 3 },
  { title: "Charts", description: "Area, Bar, Line, Pie, Radar, Radial charts", route: "/charts" as const, count: 7 },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4" contentContainerClassName="gap-4 py-6">
        <Text variant="h2">AniUI Demo</Text>
        <Text variant="muted">54 components across 6 categories. Tap to explore.</Text>

        {categories.map((cat) => (
          <Pressable key={cat.title} onPress={() => router.push(cat.route)}>
            <Card>
              <CardHeader>
                <View className="flex-row items-center justify-between">
                  <CardTitle>{cat.title}</CardTitle>
                  <Text variant="small" className="text-muted-foreground">{cat.count} components</Text>
                </View>
                <CardDescription>{cat.description}</CardDescription>
              </CardHeader>
            </Card>
          </Pressable>
        ))}

        <Text variant="muted" className="text-center mt-4">Built with AniUI</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
