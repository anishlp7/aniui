import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Text } from "react-native";
import { EmptyState } from "../ui/empty-state";

describe("EmptyState", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<EmptyState title="No items" />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders title", () => {
    const { getByText } = render(<EmptyState title="Nothing here" />);
    expect(getByText("Nothing here")).toBeTruthy();
  });

  it("renders description", () => {
    const { getByText } = render(
      <EmptyState title="Empty" description="Try adding something" />
    );
    expect(getByText("Try adding something")).toBeTruthy();
  });

  it("renders icon", () => {
    const { getByText } = render(
      <EmptyState title="Empty" icon={<Text>ICON</Text>} />
    );
    expect(getByText("ICON")).toBeTruthy();
  });

  it("renders action button", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <EmptyState title="Empty" action={{ label: "Add item", onPress }} />
    );
    expect(getByText("Add item")).toBeTruthy();
  });

  it("fires action onPress", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <EmptyState title="Empty" action={{ label: "Add item", onPress }} />
    );
    fireEvent.press(getByText("Add item"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("spreads additional props", () => {
    const { toJSON } = render(<EmptyState title="Empty" testID="empty" />);
    expect(toJSON()).toBeTruthy();
  });
});
