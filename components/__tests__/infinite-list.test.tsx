import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { InfiniteList } from "../ui/infinite-list";

describe("InfiniteList", () => {
  it("renders items via renderItem", () => {
    const { getByText } = render(
      <InfiniteList
        data={["a", "b"]}
        keyExtractor={(it) => it}
        renderItem={({ item }) => <Text>{item.toUpperCase()}</Text>}
      />
    );
    expect(getByText("A")).toBeTruthy();
    expect(getByText("B")).toBeTruthy();
  });

  it("shows a loading indicator when loading is true", () => {
    const { UNSAFE_getByType } = render(
      <InfiniteList
        loading
        data={[]}
        keyExtractor={(it: string) => it}
        renderItem={({ item }: { item: string }) => <Text>{item}</Text>}
      />
    );
    const { ActivityIndicator } = require("react-native");
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it("renders without crashing when hasMore is false and data is empty", () => {
    const { toJSON } = render(
      <InfiniteList
        hasMore={false}
        data={[]}
        keyExtractor={(it: string) => it}
        renderItem={({ item }: { item: string }) => <Text>{item}</Text>}
      />
    );
    expect(toJSON()).toBeTruthy();
  });
});
