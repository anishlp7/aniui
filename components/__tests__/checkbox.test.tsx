import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Checkbox } from "../ui/checkbox";

describe("Checkbox", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Checkbox />);
    expect(toJSON()).toBeTruthy();
  });

  it("has accessibilityRole checkbox", () => {
    const { getByRole } = render(<Checkbox />);
    expect(getByRole("checkbox")).toBeTruthy();
  });

  it("fires onCheckedChange when pressed", () => {
    const onCheckedChange = jest.fn();
    const { getByRole } = render(
      <Checkbox checked={false} onCheckedChange={onCheckedChange} />
    );
    fireEvent.press(getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("shows checkmark when checked", () => {
    const { getByText } = render(<Checkbox checked={true} />);
    expect(getByText("\u2713")).toBeTruthy();
  });

  it("does not fire when disabled", () => {
    const onCheckedChange = jest.fn();
    const { getByRole } = render(
      <Checkbox disabled onCheckedChange={onCheckedChange} />
    );
    fireEvent.press(getByRole("checkbox"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("spreads additional props", () => {
    const { getByRole } = render(<Checkbox testID="my-checkbox" />);
    expect(getByRole("checkbox").props.testID).toBe("my-checkbox");
  });
});
