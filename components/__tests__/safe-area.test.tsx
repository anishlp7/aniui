import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { SafeArea } from "../ui/safe-area";

describe("SafeArea", () => {
  it("renders children", () => {
    const { getByText } = render(
      <SafeArea>
        <Text>hello</Text>
      </SafeArea>
    );
    expect(getByText("hello")).toBeTruthy();
  });

  it("accepts each variant without crashing", () => {
    for (const variant of ["default", "card", "transparent"] as const) {
      const { toJSON } = render(
        <SafeArea variant={variant}>
          <Text>x</Text>
        </SafeArea>
      );
      expect(toJSON()).toBeTruthy();
    }
  });
});
