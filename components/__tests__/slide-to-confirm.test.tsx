import React from "react";
import { render } from "@testing-library/react-native";
import { SlideToConfirm } from "../ui/slide-to-confirm";

describe("SlideToConfirm", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<SlideToConfirm onConfirm={jest.fn()} />);
    expect(toJSON()).toBeTruthy();
  });

  it("shows the default label", () => {
    const { getByText } = render(<SlideToConfirm onConfirm={jest.fn()} />);
    expect(getByText("Slide to confirm")).toBeTruthy();
  });

  it("shows a custom label", () => {
    const { getByText } = render(<SlideToConfirm label="Slide to pay $9.99" onConfirm={jest.fn()} />);
    expect(getByText("Slide to pay $9.99")).toBeTruthy();
  });

  it("exposes button role with the label", () => {
    const { getByRole } = render(<SlideToConfirm onConfirm={jest.fn()} />);
    expect(getByRole("button")).toBeTruthy();
  });

  it("reports disabled state", () => {
    const { getByRole } = render(<SlideToConfirm disabled onConfirm={jest.fn()} />);
    expect(getByRole("button").props.accessibilityState.disabled).toBe(true);
  });
});
