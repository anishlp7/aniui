import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { KeyboardView } from "../ui/keyboard-view";

describe("KeyboardView", () => {
  it("renders children", () => {
    const { getByText } = render(
      <KeyboardView>
        <Text>form</Text>
      </KeyboardView>
    );
    expect(getByText("form")).toBeTruthy();
  });

  it("accepts an offset prop without crashing", () => {
    const { toJSON } = render(
      <KeyboardView offset={100}>
        <Text>form</Text>
      </KeyboardView>
    );
    expect(toJSON()).toBeTruthy();
  });
});
