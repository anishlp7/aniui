import React from "react";
import { render } from "@testing-library/react-native";
import { Spinner } from "../ui/spinner";

describe("Spinner", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Spinner />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders an ActivityIndicator", () => {
    const { UNSAFE_getByType } = render(<Spinner />);
    const { ActivityIndicator } = require("react-native");
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it("renders with sm size", () => {
    const { toJSON } = render(<Spinner size="sm" />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders with lg size", () => {
    const { toJSON } = render(<Spinner size="lg" />);
    expect(toJSON()).toBeTruthy();
  });

  it("accepts custom color", () => {
    const { UNSAFE_getByType } = render(<Spinner color="red" />);
    const { ActivityIndicator } = require("react-native");
    expect(UNSAFE_getByType(ActivityIndicator).props.color).toBe("red");
  });

  it("spreads additional props", () => {
    const { toJSON } = render(<Spinner testID="my-spinner" />);
    expect(toJSON()).toBeTruthy();
  });
});
