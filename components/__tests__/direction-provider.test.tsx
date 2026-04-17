import React from "react";
import { Text, I18nManager } from "react-native";
import { render } from "@testing-library/react-native";
import { DirectionProvider, useDirection } from "../ui/direction-provider";

function DirectionReader() {
  const { direction } = useDirection();
  return <Text testID="dir">{direction}</Text>;
}

describe("DirectionProvider", () => {
  it("renders children without crashing", () => {
    const { getByText } = render(
      <DirectionProvider>
        <Text>Hello</Text>
      </DirectionProvider>
    );
    expect(getByText("Hello")).toBeTruthy();
  });

  it("useDirection returns direction value", () => {
    const { getByTestId } = render(
      <DirectionProvider defaultDirection="rtl">
        <DirectionReader />
      </DirectionProvider>
    );
    expect(getByTestId("dir").props.children).toBe("rtl");
  });
});
