import React from "react";
import { render } from "@testing-library/react-native";
import { Label } from "../ui/label";

describe("Label", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Label>Email</Label>);
    expect(toJSON()).toBeTruthy();
  });

  it("renders children text", () => {
    const { getByText } = render(<Label>Username</Label>);
    expect(getByText("Username")).toBeTruthy();
  });

  it("spreads additional props", () => {
    const { getByText } = render(<Label testID="my-label">Name</Label>);
    expect(getByText("Name").props.testID).toBe("my-label");
  });

  it("supports className prop", () => {
    const { toJSON } = render(<Label className="mb-4">Field</Label>);
    expect(toJSON()).toBeTruthy();
  });
});
