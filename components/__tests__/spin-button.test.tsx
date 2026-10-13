import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SpinButton } from "../ui/spin-button";

describe("SpinButton", () => {
  it("renders the idle label by default", () => {
    const { getByText } = render(<SpinButton />);
    expect(getByText("Save")).toBeTruthy();
  });

  it("renders the active label too (both are mounted and crossfaded)", () => {
    const { getAllByText } = render(<SpinButton saving />);
    // Both idle "Save" and active "Saving" Text nodes are mounted.
    expect(getAllByText("Saving").length).toBeGreaterThan(0);
  });

  it("respects custom idleText / activeText", () => {
    const { getAllByText } = render(
      <SpinButton idleText="Publish" activeText="Publishing" />
    );
    expect(getAllByText("Publish").length).toBeGreaterThan(0);
    expect(getAllByText("Publishing").length).toBeGreaterThan(0);
  });

  it("fires onSavingChange on press (toggles the controlled saving state)", () => {
    const onSavingChange = jest.fn();
    const { getAllByText } = render(
      <SpinButton saving={false} onSavingChange={onSavingChange} />
    );
    fireEvent.press(getAllByText("Save")[0]);
    expect(onSavingChange).toHaveBeenCalledWith(true);
  });

  it("ignores presses when disabled", () => {
    const onSavingChange = jest.fn();
    const { getAllByText } = render(
      <SpinButton onSavingChange={onSavingChange} disabled />
    );
    fireEvent.press(getAllByText("Save")[0]);
    expect(onSavingChange).not.toHaveBeenCalled();
  });
});
