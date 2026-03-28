import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Toggle } from "../ui/toggle";

describe("Toggle", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Toggle>Bold</Toggle>);
    expect(toJSON()).toBeTruthy();
  });

  it("renders string children as text", () => {
    const { getByText } = render(<Toggle>Italic</Toggle>);
    expect(getByText("Italic")).toBeTruthy();
  });

  it("has button accessibilityRole", () => {
    const { getByRole } = render(<Toggle>B</Toggle>);
    expect(getByRole("button")).toBeTruthy();
  });

  it("calls onPressedChange when pressed", () => {
    const onPressedChange = jest.fn();
    const { getByRole } = render(
      <Toggle pressed={false} onPressedChange={onPressedChange}>
        B
      </Toggle>
    );
    fireEvent.press(getByRole("button"));
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it("reflects pressed state in accessibility", () => {
    const { getByRole } = render(<Toggle pressed={true}>B</Toggle>);
    expect(getByRole("button").props.accessibilityState.selected).toBe(true);
  });
});
