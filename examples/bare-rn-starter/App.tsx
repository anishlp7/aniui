import "./global.css";
import React from "react";
import { View, ScrollView, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4" contentContainerClassName="gap-6 py-6">
        <Text variant="h2">AniUI Demo</Text>
        <Text variant="muted">Beautiful React Native components. Copy. Paste. Ship.</Text>

        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Pressable with 5 variants and 3 sizes.</CardDescription>
          </CardHeader>
          <CardContent className="gap-3">
            <Button onPress={() => Alert.alert("Pressed!")}>
              Default Button
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <View className="flex-row gap-2">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </View>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
          </CardHeader>
          <CardContent className="gap-2">
            <Text variant="h1">Heading 1</Text>
            <Text variant="h2">Heading 2</Text>
            <Text variant="h3">Heading 3</Text>
            <Text variant="h4">Heading 4</Text>
            <Text variant="p">Paragraph text for body content.</Text>
            <Text variant="lead">Lead text for introductions.</Text>
            <Text variant="muted">Muted text for secondary info.</Text>
            <Text variant="small">Small text for captions.</Text>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <Input placeholder="Default input" />
            <Input variant="ghost" placeholder="Ghost input" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="flex-row flex-wrap gap-2">
              <Badge><Text className="text-xs text-primary-foreground">Default</Text></Badge>
              <Badge variant="secondary"><Text className="text-xs text-secondary-foreground">Secondary</Text></Badge>
              <Badge variant="outline"><Text className="text-xs text-foreground">Outline</Text></Badge>
              <Badge variant="destructive"><Text className="text-xs text-destructive-foreground">Destructive</Text></Badge>
            </View>
          </CardContent>
        </Card>

        <CardFooter>
          <Text variant="muted">Built with AniUI</Text>
        </CardFooter>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}
