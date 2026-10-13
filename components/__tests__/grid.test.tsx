import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { Grid } from "../ui/grid";

describe("Grid", () => {
  it("renders items via renderItem", () => {
    const { getByText } = render(
      <Grid
        columns={2}
        data={["a", "b", "c"]}
        keyExtractor={(it) => it}
        renderItem={({ item }) => <Text>{item.toUpperCase()}</Text>}
      />
    );
    expect(getByText("A")).toBeTruthy();
    expect(getByText("B")).toBeTruthy();
    expect(getByText("C")).toBeTruthy();
  });

  it("renders without crashing when data is empty", () => {
    const { toJSON } = render(
      <Grid
        data={[]}
        keyExtractor={(it: string) => it}
        renderItem={({ item }: { item: string }) => <Text>{item}</Text>}
      />
    );
    expect(toJSON()).toBeTruthy();
  });
});
