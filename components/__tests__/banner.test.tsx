import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import { Banner } from "../ui/banner";

describe("Banner", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Banner>Hello</Banner>);
    expect(toJSON()).toBeTruthy();
  });

  it("renders children text", () => {
    const { getByText } = render(<Banner>Update available</Banner>);
    expect(getByText("Update available")).toBeTruthy();
  });

  it("has accessibilityRole alert", () => {
    const { UNSAFE_getByProps } = render(<Banner>Notice</Banner>);
    expect(UNSAFE_getByProps({ accessibilityRole: "alert" })).toBeTruthy();
  });

  it("renders icon", () => {
    const { getByText } = render(
      <Banner icon={<Text>INFO</Text>}>Message</Banner>
    );
    expect(getByText("INFO")).toBeTruthy();
  });

  it("renders action button", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Banner action={{ label: "Update", onPress }}>New version</Banner>
    );
    expect(getByText("Update")).toBeTruthy();
    fireEvent.press(getByText("Update"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("renders dismiss button when onDismiss provided", () => {
    const onDismiss = jest.fn();
    const { getByLabelText } = render(
      <Banner onDismiss={onDismiss}>Closeable</Banner>
    );
    expect(getByLabelText("Dismiss")).toBeTruthy();
    fireEvent.press(getByLabelText("Dismiss"));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("spreads additional props", () => {
    const { getByTestId } = render(<Banner testID="my-banner">Test</Banner>);
    expect(getByTestId("my-banner")).toBeTruthy();
  });
});
