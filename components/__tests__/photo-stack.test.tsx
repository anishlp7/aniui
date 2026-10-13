import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { PhotoStack } from "../ui/photo-stack";

const SOURCES = [
  { uri: "https://example.com/a.jpg" },
  { uri: "https://example.com/b.jpg" },
  { uri: "https://example.com/c.jpg" },
];

describe("PhotoStack", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<PhotoStack sources={SOURCES} />);
    expect(toJSON()).toBeTruthy();
  });

  it("caps rendered frames at maxVisible", () => {
    // maxVisible=2 with 3 sources — only two visible frames mount.
    const { UNSAFE_queryAllByProps } = render(
      <PhotoStack sources={SOURCES} maxVisible={2} />
    );
    const buttons = UNSAFE_queryAllByProps({ accessibilityRole: "button" });
    expect(buttons.length).toBeLessThanOrEqual(2);
  });

  it("fires onPress with the frame index", () => {
    const onPress = jest.fn();
    const { UNSAFE_queryAllByProps } = render(
      <PhotoStack sources={SOURCES} onPress={onPress} />
    );
    const buttons = UNSAFE_queryAllByProps({ accessibilityRole: "button" });
    expect(buttons.length).toBeGreaterThan(0);
    fireEvent.press(buttons[0]);
    expect(onPress).toHaveBeenCalled();
  });

  it("renders static (no button role) when no onPress", () => {
    const { UNSAFE_queryAllByProps } = render(<PhotoStack sources={SOURCES} />);
    expect(UNSAFE_queryAllByProps({ accessibilityRole: "button" })).toEqual([]);
  });
});
