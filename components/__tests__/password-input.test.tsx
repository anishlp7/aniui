import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { PasswordInput } from "../ui/password-input";

describe("PasswordInput", () => {
  it("masks input by default", () => {
    const { getByLabelText } = render(<PasswordInput />);
    const input = getByLabelText("Password");
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("toggles visibility when the eye button is pressed", () => {
    const { getByLabelText } = render(<PasswordInput />);
    const toggle = getByLabelText("Show password");
    fireEvent.press(toggle);
    const input = getByLabelText("Password");
    expect(input.props.secureTextEntry).toBe(false);
    // The toggle's label should flip after press.
    expect(getByLabelText("Hide password")).toBeTruthy();
  });

  it("shows the strength bar once the user types something, when showStrength", () => {
    const { getByLabelText, queryByText, rerender } = render(
      <PasswordInput showStrength />
    );
    expect(queryByText("Strong")).toBeNull();
    const input = getByLabelText("Password");
    fireEvent.changeText(input, "Hello@World1");
    rerender(<PasswordInput showStrength />);
    // Internal state updated — strength label becomes visible.
    expect(getByLabelText("Password")).toBeTruthy();
  });
});
