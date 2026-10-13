import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeSwitch } from "../ui/theme-switch";

describe("ThemeSwitch", () => {
  it("has a 'Switch to dark theme' label when currently light", () => {
    const { getByLabelText } = render(
      <ThemeSwitch isDark={false} onToggle={() => {}} />
    );
    expect(getByLabelText("Switch to dark theme")).toBeTruthy();
  });

  it("has a 'Switch to light theme' label when currently dark", () => {
    const { getByLabelText } = render(
      <ThemeSwitch isDark={true} onToggle={() => {}} />
    );
    expect(getByLabelText("Switch to light theme")).toBeTruthy();
  });

  it("reflects isDark via accessibilityState.checked", () => {
    const dark = render(<ThemeSwitch isDark onToggle={() => {}} />);
    expect(dark.getByRole("switch").props.accessibilityState.checked).toBe(true);
    const light = render(<ThemeSwitch isDark={false} onToggle={() => {}} />);
    expect(light.getByRole("switch").props.accessibilityState.checked).toBe(false);
  });

  it("fires onToggle on tap when wipe=false", () => {
    const onToggle = jest.fn();
    const { getByRole } = render(
      <ThemeSwitch isDark={false} onToggle={onToggle} />
    );
    fireEvent.press(getByRole("switch"));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
