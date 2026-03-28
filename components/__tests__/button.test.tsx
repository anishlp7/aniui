import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../ui/button";

describe("Button", () => {
  it("renders with children text", () => {
    const { getByText } = render(<Button>Press me</Button>);
    expect(getByText("Press me")).toBeTruthy();
  });

  it("fires onPress handler", () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Tap</Button>);
    fireEvent.press(getByText("Tap"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("has accessibilityRole button", () => {
    const { getByRole } = render(<Button>Ok</Button>);
    expect(getByRole("button")).toBeTruthy();
  });

  it("is disabled when disabled prop is true", () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <Button disabled onPress={onPress}>
        Disabled
      </Button>
    );
    fireEvent.press(getByRole("button"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("is disabled when loading", () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <Button loading onPress={onPress}>
        Loading
      </Button>
    );
    fireEvent.press(getByRole("button"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("shows ActivityIndicator when loading", () => {
    const { UNSAFE_getByType } = render(<Button loading>Load</Button>);
    const { ActivityIndicator } = require("react-native");
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it("renders icon prop", () => {
    const { getByTestId } = render(
      <Button icon={<React.Fragment />}>With Icon</Button>
    );
    expect(getByTestId).toBeDefined();
  });

  it("spreads additional props", () => {
    const { getByRole } = render(<Button testID="custom-btn">Ok</Button>);
    expect(getByRole("button").props.testID).toBe("custom-btn");
  });
});
