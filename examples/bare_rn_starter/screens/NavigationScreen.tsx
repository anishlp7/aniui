import React, { useState } from "react";
import { ScrollView, View, Pressable, Text as RNText } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Header, HeaderLeft, HeaderTitle, HeaderRight, HeaderBackButton } from "@/components/ui/header";
import { TabBar, TabBarItem } from "@/components/ui/tab-bar";

export interface NavigationScreenProps {
  onBack: () => void;
}

export function NavigationScreen({ onBack }: NavigationScreenProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView className="flex-1 px-4" contentContainerClassName="gap-4 py-6 pb-20">
        <Pressable onPress={onBack} className="flex-row items-center gap-1 mb-2">
          <RNText className="text-primary text-base">{"\u2190"} Back</RNText>
        </Pressable>

        <Text variant="h2">Navigation</Text>
        <Text variant="muted">6 components for navigation and content organization.</Text>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Tabs</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="notifications">Alerts</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <View className="rounded-lg bg-muted p-4 mt-2">
                  <Text variant="large" className="mb-2">Account</Text>
                  <Text variant="muted">Manage your account settings and preferences.</Text>
                  <Text variant="small" className="mt-2">Name: John Doe</Text>
                  <Text variant="small">Email: john@example.com</Text>
                </View>
              </TabsContent>
              <TabsContent value="password">
                <View className="rounded-lg bg-muted p-4 mt-2">
                  <Text variant="large" className="mb-2">Password</Text>
                  <Text variant="muted">Change your password and security settings.</Text>
                  <Text variant="small" className="mt-2">Last changed: 30 days ago</Text>
                  <Text variant="small">Two-factor: Enabled</Text>
                </View>
              </TabsContent>
              <TabsContent value="notifications">
                <View className="rounded-lg bg-muted p-4 mt-2">
                  <Text variant="large" className="mb-2">Notifications</Text>
                  <Text variant="muted">Configure how you receive alerts.</Text>
                  <Text variant="small" className="mt-2">Push: Enabled</Text>
                  <Text variant="small">Email: Weekly digest</Text>
                </View>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Accordion */}
        <Card>
          <CardHeader>
            <CardTitle>Accordion</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion>
              <AccordionItem value="item-1" trigger="Is it accessible?">
                <Text variant="muted">
                  Yes. All interactive components include accessibilityRole and accessible props for screen reader support.
                </Text>
              </AccordionItem>
              <AccordionItem value="item-2" trigger="Is it styled?">
                <Text variant="muted">
                  Yes. Components use NativeWind with class-variance-authority for consistent, theme-aware styling with full dark mode support.
                </Text>
              </AccordionItem>
              <AccordionItem value="item-3" trigger="Is it animated?">
                <Text variant="muted">
                  Yes. Tier 2 components use react-native-reanimated for smooth 60fps animations including fade, slide, and scale transitions.
                </Text>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Collapsible */}
        <Card>
          <CardHeader>
            <CardTitle>Collapsible</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
              <View className="flex-row items-center justify-between">
                <Text variant="small">@aniui/components</Text>
                <CollapsibleTrigger>
                  <Button variant="ghost" size="sm">
                    {collapsibleOpen ? "Hide" : "Show"}
                  </Button>
                </CollapsibleTrigger>
              </View>
              <View className="rounded-md border border-border px-4 py-3 mt-2">
                <Text variant="small">@/components/ui/button.tsx</Text>
              </View>
              <CollapsibleContent>
                <View className="gap-2 mt-2">
                  <View className="rounded-md border border-border px-4 py-3">
                    <Text variant="small">@/components/ui/card.tsx</Text>
                  </View>
                  <View className="rounded-md border border-border px-4 py-3">
                    <Text variant="small">@/components/ui/text.tsx</Text>
                  </View>
                  <View className="rounded-md border border-border px-4 py-3">
                    <Text variant="small">@/components/ui/input.tsx</Text>
                  </View>
                </View>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Drawer */}
        <Card>
          <CardHeader>
            <CardTitle>Drawer</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <Button onPress={() => setDrawerOpen(true)}>Open Drawer</Button>
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} side="left">
              <DrawerContent>
                <Text variant="h3" className="mb-6">Menu</Text>
                <View className="gap-4">
                  <Button variant="ghost" onPress={() => setDrawerOpen(false)}>Home</Button>
                  <Button variant="ghost" onPress={() => setDrawerOpen(false)}>Profile</Button>
                  <Button variant="ghost" onPress={() => setDrawerOpen(false)}>Settings</Button>
                  <Button variant="ghost" onPress={() => setDrawerOpen(false)}>Help</Button>
                  <View className="h-px bg-border my-2" />
                  <Button variant="destructive" onPress={() => setDrawerOpen(false)}>Log Out</Button>
                </View>
              </DrawerContent>
            </Drawer>
          </CardContent>
        </Card>

        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle>Header</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <Header variant="default">
              <HeaderLeft>
                <HeaderBackButton onPress={() => {}} />
              </HeaderLeft>
              <HeaderTitle>Settings</HeaderTitle>
              <HeaderRight>
                <Button variant="ghost" size="sm">Save</Button>
              </HeaderRight>
            </Header>
            <Header variant="primary" className="rounded-lg mt-2">
              <HeaderTitle className="text-primary-foreground">Dashboard</HeaderTitle>
            </Header>
          </CardContent>
        </Card>

        {/* Tab Bar */}
        <Card>
          <CardHeader>
            <CardTitle>Tab Bar</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <TabBar className="rounded-lg">
              <TabBarItem active={activeTab === 0} label="Home" onPress={() => setActiveTab(0)} />
              <TabBarItem active={activeTab === 1} label="Search" onPress={() => setActiveTab(1)} />
              <TabBarItem active={activeTab === 2} label="Profile" badge={3} onPress={() => setActiveTab(2)} />
            </TabBar>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
