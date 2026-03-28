import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import { FAB } from "../ui/fab";

describe("FAB", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<FAB />);
    expect(toJSON()).toBeTruthy();
  });

  it("has accessibilityRole button", () => {
    const { getByRole } = render(<FAB />);
    expect(getByRole("button")).toBeTruthy();
  });

  it("has default accessibilityLabel", () => {
    const { getByLabelText } = render(<FAB />);
    expect(getByLabelText("Action button")).toBeTruthy();
  });

  it("renders label text", () => {
    const { getByText } = render(<FAB label="Add" />);
    expect(getByText("Add")).toBeTruthy();
  });

  it("renders icon", () => {
    const { getByText } = render(<FAB icon={<Text>+</Text>} />);
    expect(getByText("+")).toBeTruthy();
  });

  it("fires onPress handler", () => {
    const onPress = jest.fn();
    const { getByRole } = render(<FAB onPress={onPress} />);
    fireEvent.press(getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("spreads additional props", () => {
    const { getByRole } = render(<FAB testID="my-fab" />);
    expect(getByRole("button").props.testID).toBe("my-fab");
  });
});
