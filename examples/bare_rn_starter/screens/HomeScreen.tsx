import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const categories = [
  { title: "Forms", description: "Input, Checkbox, Switch, Select, Slider, and more", screen: "Forms", count: 24 },
  { title: "Data Display", description: "Text, Badge, Card, Avatar, Table, Calendar, and more", screen: "DataDisplay", count: 25 },
  { title: "Feedback", description: "Alert, Dialog, Toast, Banner, Tooltip, and more", screen: "Feedback", count: 9 },
  { title: "Navigation", description: "Tabs, Accordion, Collapsible, Drawer, Header, Tab Bar", screen: "Navigation", count: 6 },
  { title: "Overlays", description: "Bottom Sheet, Action Sheet, FAB", screen: "Overlays", count: 3 },
  { title: "Charts", description: "Area, Bar, Line, Pie, Radar, Radial charts", screen: "Charts", count: 7 },
];

export interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4" contentContainerClassName="gap-4 py-6">
        <Text variant="h2">AniUI Demo</Text>
        <Text variant="muted">80 components across 6 categories. Tap to explore.</Text>

        {categories.map((cat) => (
          <Pressable key={cat.title} onPress={() => onNavigate(cat.screen)}>
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
