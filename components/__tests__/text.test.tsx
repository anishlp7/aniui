import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "../ui/text";

describe("Text", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Text>Hello</Text>);
    expect(toJSON()).toBeTruthy();
  });

  it("renders children text", () => {
    const { getByText } = render(<Text>Hello World</Text>);
    expect(getByText("Hello World")).toBeTruthy();
  });

  it("renders with h1 variant", () => {
    const { getByText } = render(<Text variant="h1">Title</Text>);
    expect(getByText("Title")).toBeTruthy();
  });

  it("renders with muted variant", () => {
    const { getByText } = render(<Text variant="muted">Subtle</Text>);
    expect(getByText("Subtle")).toBeTruthy();
  });

  it("spreads additional props", () => {
    const { getByText } = render(<Text testID="custom-text">Test</Text>);
    expect(getByText("Test").props.testID).toBe("custom-text");
  });

  it("supports className prop", () => {
    const { toJSON } = render(<Text className="mt-4">Styled</Text>);
    expect(toJSON()).toBeTruthy();
  });
});
