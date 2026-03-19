import React, { useState } from "react";
import { View, ScrollView, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = ["All", "Clothing", "Shoes", "Accessories"];

const PRODUCTS = [
  { id: "1", name: "Classic T-Shirt", price: "$29.99", rating: 4.5, bg: "bg-primary/5 to bg-primary/10" },
  { id: "2", name: "Denim Jacket", price: "$89.99", rating: 4.8, bg: "bg-accent to bg-accent/50" },
  { id: "3", name: "Running Shoes", price: "$119.99", rating: 4.6, bg: "bg-secondary to bg-secondary/70" },
  { id: "4", name: "Leather Bag", price: "$149.99", rating: 4.7, bg: "bg-muted to bg-muted/60" },
];

function StarIcon() {
  return (
    <View style={{ width: 12, height: 12 }}>
      {/* Inline SVG not available in RN — use a text star or react-native-svg */}
    </View>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return null; // Replace with react-native-svg Heart
}

function FilterIcon() {
  return null; // Replace with react-native-svg SlidersHorizontal
}

export function ProductListScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [liked, setLiked] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text variant="h3" className="font-bold">Shop</Text>
        <Pressable
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Filter products"
          className="min-h-12 min-w-12 items-center justify-center rounded-full bg-muted"
        >
          {/* SlidersHorizontal icon via react-native-svg */}
        </Pressable>
      </View>

      {/* Category pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-6 mb-4"
        contentContainerStyle={{ gap: 8 }}
      >
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Filter by ${cat}`}
            onPress={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 ${
              activeCategory === cat
                ? "bg-primary"
                : "bg-muted"
            }`}
          >
            <Text
              variant="small"
              className={`font-medium ${
                activeCategory === cat
                  ? "text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Product grid */}
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, gap: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <Pressable
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`${item.name}, ${item.price}, rated ${item.rating} stars`}
            className="flex-1"
          >
            <Card className="flex-1 rounded-2xl overflow-hidden border border-border shadow-sm">
              <View className={`h-32 relative ${item.bg}`}>
                <Pressable
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Save to wishlist"
                  onPress={() => toggleLike(item.id)}
                  className="absolute top-2 right-2 h-8 w-8 items-center justify-center rounded-full bg-background/80"
                >
                  {/* Heart icon via react-native-svg */}
                </Pressable>
              </View>
              <CardContent className="py-2.5 px-3">
                <Text variant="small" className="font-medium text-foreground mb-0.5" numberOfLines={1}>
                  {item.name}
                </Text>
                <Text variant="small" className="font-semibold text-foreground mb-1">
                  {item.price}
                </Text>
                <View className="flex-row items-center gap-1">
                  {/* Star icon via react-native-svg */}
                  <Text variant="small" className="text-muted-foreground">{item.rating}</Text>
                </View>
              </CardContent>
            </Card>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
