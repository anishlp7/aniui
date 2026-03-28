import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Chip } from "../ui/chip";

describe("Chip", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Chip>Tag</Chip>);
    expect(toJSON()).toBeTruthy();
  });

  it("renders children text", () => {
    const { getByText } = render(<Chip>React Native</Chip>);
    expect(getByText("React Native")).toBeTruthy();
  });

  it("has accessibilityRole button", () => {
    const { getByRole } = render(<Chip>Tag</Chip>);
    expect(getByRole("button")).toBeTruthy();
  });

  it("fires onPress handler", () => {
    const onPress = jest.fn();
    const { getByText } = render(<Chip onPress={onPress}>Tap</Chip>);
    fireEvent.press(getByText("Tap"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("shows close button when onClose provided", () => {
    const onClose = jest.fn();
    const { getByLabelText } = render(<Chip onClose={onClose}>Removable</Chip>);
    expect(getByLabelText("Remove Removable")).toBeTruthy();
  });

  it("fires onClose when close button pressed", () => {
    const onClose = jest.fn();
    const { getByLabelText } = render(<Chip onClose={onClose}>Removable</Chip>);
    fireEvent.press(getByLabelText("Remove Removable"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("spreads additional props", () => {
    const { toJSON } = render(<Chip testID="my-chip">Test</Chip>);
    expect(toJSON()).toBeTruthy();
  });
});
