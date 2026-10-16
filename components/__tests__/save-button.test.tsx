import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SaveButton } from "../ui/save-button";

describe("SaveButton", () => {
  it("renders with the default idle label", () => {
    const { getByText } = render(<SaveButton />);
    expect(getByText("Save")).toBeTruthy();
  });

  it("renders a custom label", () => {
    const { getByText } = render(<SaveButton label="Publish" />);
    expect(getByText("Publish")).toBeTruthy();
  });

  it("invokes onSave on press from idle", async () => {
    const onSave = jest.fn();
    const { getByText } = render(<SaveButton onSave={onSave} />);
    fireEvent.press(getByText("Save"));
    expect(onSave).toHaveBeenCalled();
  });

  it("ignores presses when disabled", () => {
    const onSave = jest.fn();
    const { getByText } = render(<SaveButton onSave={onSave} disabled />);
    fireEvent.press(getByText("Save"));
    expect(onSave).not.toHaveBeenCalled();
  });
});
