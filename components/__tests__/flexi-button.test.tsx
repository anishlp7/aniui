import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { FlexiButton } from "../ui/flexi-button";

describe("FlexiButton", () => {
  it("renders with a default label", () => {
    const { getByText } = render(<FlexiButton />);
    expect(getByText("Clear all")).toBeTruthy();
  });

  it("renders a custom label", () => {
    const { getByText } = render(<FlexiButton label="Save draft" />);
    expect(getByText("Save draft")).toBeTruthy();
  });

  it("fires onExpandedChange on tap (collapsed → expanded)", () => {
    const onExpandedChange = jest.fn();
    const onPress = jest.fn();
    const { getByText } = render(
      <FlexiButton label="Tap" onExpandedChange={onExpandedChange} onPress={onPress} />
    );
    fireEvent.press(getByText("Tap"));
    expect(onExpandedChange).toHaveBeenCalledWith(true);
    expect(onPress).toHaveBeenCalled();
  });

  it("starts expanded when defaultExpanded is true", () => {
    const onExpandedChange = jest.fn();
    const { getByText } = render(
      <FlexiButton defaultExpanded onExpandedChange={onExpandedChange} />
    );
    fireEvent.press(getByText("Clear all"));
    // First press from expanded collapses it.
    expect(onExpandedChange).toHaveBeenCalledWith(false);
  });
});
