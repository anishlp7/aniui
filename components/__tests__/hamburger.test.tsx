import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Hamburger } from "../ui/hamburger";

describe("Hamburger", () => {
  it("renders with 'Open menu' a11y label by default", () => {
    const { getByLabelText } = render(<Hamburger />);
    expect(getByLabelText("Open menu")).toBeTruthy();
  });

  it("flips the a11y label when open", () => {
    const { getByLabelText } = render(<Hamburger open />);
    expect(getByLabelText("Close menu")).toBeTruthy();
  });

  it("reflects open state via accessibilityState.expanded", () => {
    const open = render(<Hamburger open />);
    expect(open.getByRole("button").props.accessibilityState.expanded).toBe(true);
    const closed = render(<Hamburger open={false} />);
    expect(closed.getByRole("button").props.accessibilityState.expanded).toBe(false);
  });

  it("fires onOpenChange with the toggled value on press", () => {
    const onOpenChange = jest.fn();
    const { getByRole } = render(<Hamburger open={false} onOpenChange={onOpenChange} />);
    fireEvent.press(getByRole("button"));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
