import React, { useRef, useCallback } from "react";
import { ScrollView, View, Alert, Pressable, Text as RNText } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { ActionSheet } from "@/components/ui/action-sheet";
import { FAB } from "@/components/ui/fab";
import type GorhomBottomSheet from "@gorhom/bottom-sheet";

export interface OverlaysScreenProps {
  onBack: () => void;
}

export function OverlaysScreen({ onBack }: OverlaysScreenProps) {
  const bottomSheetRef = useRef<GorhomBottomSheet>(null);
  const actionSheetRef = useRef<GorhomBottomSheet>(null);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const openActionSheet = useCallback(() => {
    actionSheetRef.current?.expand();
  }, []);

  const closeActionSheet = useCallback(() => {
    actionSheetRef.current?.close();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
      <ScrollView className="flex-1 px-4" contentContainerClassName="gap-4 py-6 pb-40">
        <Pressable onPress={onBack} className="flex-row items-center gap-1 mb-2">
          <RNText className="text-primary text-base">{"\u2190"} Back</RNText>
        </Pressable>

        <Text variant="h2">Overlays</Text>
        <Text variant="muted">3 components for overlay content and actions.</Text>

        {/* BottomSheet */}
        <Card>
          <CardHeader>
            <CardTitle>Bottom Sheet</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <Text variant="muted">
              A draggable bottom sheet powered by @gorhom/bottom-sheet. Swipe down to dismiss.
            </Text>
            <Button onPress={openBottomSheet}>Open Bottom Sheet</Button>
          </CardContent>
        </Card>

        {/* ActionSheet */}
        <Card>
          <CardHeader>
            <CardTitle>Action Sheet</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <Text variant="muted">
              A contextual action menu that slides up from the bottom.
            </Text>
            <Button variant="outline" onPress={openActionSheet}>Show Actions</Button>
          </CardContent>
        </Card>

        {/* FAB */}
        <Card>
          <CardHeader>
            <CardTitle>FAB</CardTitle>
          </CardHeader>
          <CardContent className="gap-3">
            <Text variant="muted">
              A floating action button. The FAB below is positioned at the bottom-right of this screen.
            </Text>
            <View className="flex-row gap-3">
              <FAB
                position="none"
                size="sm"
                onPress={() => Alert.alert("FAB", "Small FAB pressed")}
                icon={<Text className="text-primary-foreground text-lg font-bold">+</Text>}
              />
              <FAB
                position="none"
                size="md"
                variant="secondary"
                onPress={() => Alert.alert("FAB", "Medium FAB pressed")}
                icon={<Text className="text-secondary-foreground text-xl font-bold">+</Text>}
              />
              <FAB
                position="none"
                variant="destructive"
                label="Delete"
                onPress={() => Alert.alert("FAB", "Extended FAB pressed")}
              />
            </View>
          </CardContent>
        </Card>
      </ScrollView>

      {/* Positioned FAB */}
      <FAB
        onPress={() => Alert.alert("FAB", "Compose new message")}
        icon={<Text className="text-primary-foreground text-2xl font-light">+</Text>}
      />

      {/* Bottom Sheet instance */}
      <BottomSheet ref={bottomSheetRef} snapPoints={["30%", "60%"]}>
        <Text variant="h3" className="mb-3">Bottom Sheet</Text>
        <Text variant="muted" className="mb-4">
          This is a bottom sheet with two snap points. Drag the handle to resize or swipe down to dismiss.
        </Text>
        <View className="gap-3">
          <View className="flex-row justify-between py-2 border-b border-border">
            <Text variant="small">Account</Text>
            <Text variant="muted">john@example.com</Text>
          </View>
          <View className="flex-row justify-between py-2 border-b border-border">
            <Text variant="small">Plan</Text>
            <Text variant="muted">Pro ($19/mo)</Text>
          </View>
          <View className="flex-row justify-between py-2 border-b border-border">
            <Text variant="small">Storage</Text>
            <Text variant="muted">42 GB / 100 GB</Text>
          </View>
          <View className="flex-row justify-between py-2">
            <Text variant="small">Members</Text>
            <Text variant="muted">5 of 10</Text>
          </View>
        </View>
      </BottomSheet>

      {/* Action Sheet instance */}
      <ActionSheet
        ref={actionSheetRef}
        title="Choose an action"
        actions={[
          { label: "Share", onPress: () => { closeActionSheet(); Alert.alert("Shared!"); } },
          { label: "Copy Link", onPress: () => { closeActionSheet(); Alert.alert("Link copied!"); } },
          { label: "Edit", onPress: () => { closeActionSheet(); Alert.alert("Edit mode"); } },
          { label: "Delete", destructive: true, onPress: () => { closeActionSheet(); Alert.alert("Deleted!"); } },
        ]}
        onCancel={closeActionSheet}
      />
    </SafeAreaView>
  );
}
