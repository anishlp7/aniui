import React from "react";
import { Text, View } from "react-native";
import { render } from "@testing-library/react-native";
import { FillingStack } from "../ui/filling-stack";

describe("FillingStack", () => {
  it("renders without crashing with data", () => {
    const { toJSON } = render(
      <FillingStack
        data={["a", "b", "c"]}
        renderItem={(item) => <Text>{item}</Text>}
      />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing with empty data", () => {
    const { toJSON } = render(
      <FillingStack
        data={[]}
        renderItem={(item: string) => <Text>{item}</Text>}
      />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("accepts a custom visibleCount and cardHeight", () => {
    const { toJSON } = render(
      <FillingStack
        data={["a", "b"]}
        visibleCount={4}
        cardHeight={240}
        renderItem={(item) => <View><Text>{item}</Text></View>}
      />
    );
    expect(toJSON()).toBeTruthy();
  });
});
