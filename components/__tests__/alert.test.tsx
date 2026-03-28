import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import { Alert, AlertDescription } from "../ui/alert";

describe("Alert", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Alert title="Heads up" />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders title text", () => {
    const { getByText } = render(<Alert title="Warning" />);
    expect(getByText("Warning")).toBeTruthy();
  });

  it("renders children", () => {
    const { getByText } = render(
      <Alert title="Info">
        <Text>Details here</Text>
      </Alert>
    );
    expect(getByText("Details here")).toBeTruthy();
  });

  it("has accessibilityRole alert", () => {
    const { UNSAFE_getByProps } = render(<Alert title="Error" variant="destructive" />);
    expect(UNSAFE_getByProps({ accessibilityRole: "alert" })).toBeTruthy();
  });

  it("spreads additional props", () => {
    const { getByTestId } = render(<Alert title="Test" testID="my-alert" />);
    expect(getByTestId("my-alert")).toBeTruthy();
  });
});

describe("AlertDescription", () => {
  it("renders text", () => {
    const { getByText } = render(<AlertDescription>Some details</AlertDescription>);
    expect(getByText("Some details")).toBeTruthy();
  });
});
