import React from "react";
import { render } from "@testing-library/react-native";
import { Avatar } from "../ui/avatar";

describe("Avatar", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Avatar />);
    expect(toJSON()).toBeTruthy();
  });

  it("shows fallback text when no src", () => {
    const { getByText } = render(<Avatar fallback="AB" />);
    expect(getByText("AB")).toBeTruthy();
  });

  it("shows ? when no src and no fallback", () => {
    const { getByText } = render(<Avatar />);
    expect(getByText("?")).toBeTruthy();
  });

  it("renders image when src is provided", () => {
    const { toJSON } = render(<Avatar src="https://example.com/pic.jpg" />);
    expect(toJSON()).toBeTruthy();
  });

  it("spreads additional props", () => {
    const { toJSON } = render(<Avatar testID="avatar" />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders with different sizes", () => {
    const { toJSON } = render(<Avatar size="lg" fallback="XL" />);
    expect(toJSON()).toBeTruthy();
  });
});
