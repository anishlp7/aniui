import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { CommandMenu } from "../ui/command-menu";

const items = [
  { label: "Copy", value: "copy", group: "Actions" },
  { label: "Paste", value: "paste", group: "Actions" },
  { label: "Settings", value: "settings", group: "Navigation" },
];

describe("CommandMenu", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<CommandMenu open onOpenChange={jest.fn()} items={items} />);
    expect(toJSON()).toBeTruthy();
  });

  it("shows items and group headers (primitive/mock manages visibility)", () => {
    const { getByText } = render(<CommandMenu open onOpenChange={jest.fn()} items={items} />);
    expect(getByText("Copy")).toBeTruthy();
    expect(getByText("Settings")).toBeTruthy();
    expect(getByText("Actions")).toBeTruthy();
  });

  it("selecting an item fires onSelect and closes", () => {
    const onSelect = jest.fn();
    const onOpenChange = jest.fn();
    const { getByText } = render(
      <CommandMenu open onOpenChange={onOpenChange} items={items} onSelect={onSelect} />
    );
    fireEvent.press(getByText("Copy"));
    expect(onSelect).toHaveBeenCalledWith("copy");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("shows empty text when there are no items", () => {
    const { getByText } = render(
      <CommandMenu open onOpenChange={jest.fn()} items={[]} emptyText="Nothing here" />
    );
    expect(getByText("Nothing here")).toBeTruthy();
  });
});
