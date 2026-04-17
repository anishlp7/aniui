import React from "react";
import { render } from "@testing-library/react-native";
import { CommandMenu } from "../ui/command-menu";

const items = [
  { label: "Copy", value: "copy", group: "Actions" },
  { label: "Paste", value: "paste", group: "Actions" },
  { label: "Settings", value: "settings", group: "Navigation" },
];

describe("CommandMenu", () => {
  it("renders nothing when open is false", () => {
    const { toJSON } = render(
      <CommandMenu open={false} onOpenChange={jest.fn()} items={items} />
    );
    // Modal with visible=false renders null in the test environment
    expect(toJSON()).toBeNull();
  });

  it("renders when open is true", () => {
    const { toJSON } = render(
      <CommandMenu open={true} onOpenChange={jest.fn()} items={items} />
    );
    expect(toJSON()).toBeTruthy();
  });
});
