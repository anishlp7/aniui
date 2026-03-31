import React from "react";
import { Text, View } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { SwipeableListItem } from "../ui/swipeable-list-item";

describe("SwipeableListItem", () => {
  const rightActions = [
    { key: "delete", label: "Delete", color: "bg-destructive", onPress: jest.fn() },
    { key: "archive", label: "Archive", color: "bg-amber-500", onPress: jest.fn() },
  ];

  const leftActions = [
    { key: "pin", label: "Pin", color: "bg-green-600", onPress: jest.fn() },
  ];

  beforeEach(() => {
    rightActions.forEach((a) => a.onPress.mockClear());
    leftActions.forEach((a) => a.onPress.mockClear());
  });

  it("renders without crashing", () => {
    const { toJSON } = render(
      <SwipeableListItem>
        <Text>Item content</Text>
      </SwipeableListItem>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders children", () => {
    const { getByText } = render(
      <SwipeableListItem>
        <Text>Hello world</Text>
      </SwipeableListItem>
    );
    expect(getByText("Hello world")).toBeTruthy();
  });

  it("renders right action labels", () => {
    const { getByText } = render(
      <SwipeableListItem rightActions={rightActions}>
        <Text>Content</Text>
      </SwipeableListItem>
    );
    expect(getByText("Delete")).toBeTruthy();
    expect(getByText("Archive")).toBeTruthy();
  });

  it("renders left action labels", () => {
    const { getByText } = render(
      <SwipeableListItem leftActions={leftActions}>
        <Text>Content</Text>
      </SwipeableListItem>
    );
    expect(getByText("Pin")).toBeTruthy();
  });

  it("calls onPress when action button is pressed", () => {
    const { getByLabelText } = render(
      <SwipeableListItem rightActions={rightActions}>
        <Text>Content</Text>
      </SwipeableListItem>
    );
    fireEvent.press(getByLabelText("Delete"));
    expect(rightActions[0].onPress).toHaveBeenCalledTimes(1);
  });

  it("renders action buttons with accessibilityRole=button", () => {
    const { getAllByRole } = render(
      <SwipeableListItem rightActions={rightActions} leftActions={leftActions}>
        <Text>Content</Text>
      </SwipeableListItem>
    );
    const buttons = getAllByRole("button");
    expect(buttons.length).toBe(3);
  });

  it("renders action buttons with accessibilityLabel", () => {
    const { getByLabelText } = render(
      <SwipeableListItem rightActions={rightActions}>
        <Text>Content</Text>
      </SwipeableListItem>
    );
    expect(getByLabelText("Delete")).toBeTruthy();
    expect(getByLabelText("Archive")).toBeTruthy();
  });

  it("renders with custom className", () => {
    const { toJSON } = render(
      <SwipeableListItem className="mt-4">
        <Text>Content</Text>
      </SwipeableListItem>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("does not render action trays when no actions provided", () => {
    const { queryByText } = render(
      <SwipeableListItem>
        <Text>Content</Text>
      </SwipeableListItem>
    );
    expect(queryByText("Delete")).toBeNull();
    expect(queryByText("Pin")).toBeNull();
  });

  it("renders icon when provided in action", () => {
    const actionsWithIcon = [
      {
        key: "delete",
        label: "Delete",
        color: "bg-destructive",
        icon: <Text testID="delete-icon">🗑️</Text>,
        onPress: jest.fn(),
      },
    ];
    const { getByTestId } = render(
      <SwipeableListItem rightActions={actionsWithIcon}>
        <Text>Content</Text>
      </SwipeableListItem>
    );
    expect(getByTestId("delete-icon")).toBeTruthy();
  });

  it("supports enabled=false prop", () => {
    const { toJSON } = render(
      <SwipeableListItem rightActions={rightActions} enabled={false}>
        <Text>Content</Text>
      </SwipeableListItem>
    );
    expect(toJSON()).toBeTruthy();
  });
});
