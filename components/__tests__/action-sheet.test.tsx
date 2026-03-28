import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ActionSheet } from "../ui/action-sheet";

const mockActions = [
  { label: "Edit", onPress: jest.fn() },
  { label: "Delete", onPress: jest.fn(), destructive: true },
];

describe("ActionSheet", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<ActionSheet actions={mockActions} />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders action labels", () => {
    const { getByText } = render(<ActionSheet actions={mockActions} />);
    expect(getByText("Edit")).toBeTruthy();
    expect(getByText("Delete")).toBeTruthy();
  });

  it("renders title when provided", () => {
    const { getByText } = render(
      <ActionSheet title="Choose action" actions={mockActions} />
    );
    expect(getByText("Choose action")).toBeTruthy();
  });

  it("renders cancel button when onCancel is provided", () => {
    const onCancel = jest.fn();
    const { getByText } = render(
      <ActionSheet actions={mockActions} onCancel={onCancel} />
    );
    expect(getByText("Cancel")).toBeTruthy();
  });

  it("calls action onPress when pressed", () => {
    const { getByText } = render(<ActionSheet actions={mockActions} />);
    fireEvent.press(getByText("Edit"));
    expect(mockActions[0].onPress).toHaveBeenCalled();
  });
});
