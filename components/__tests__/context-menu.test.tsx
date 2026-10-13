import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "../ui/context-menu";

describe("ContextMenu", () => {
  it("renders the trigger subtree", () => {
    const { getByText } = render(
      <ContextMenu>
        <ContextMenuTrigger>
          <Text>press me</Text>
        </ContextMenuTrigger>
      </ContextMenu>
    );
    expect(getByText("press me")).toBeTruthy();
  });

  it("ContextMenuTrigger has a 'Long press for options' hint", () => {
    const { UNSAFE_getByProps } = render(
      <ContextMenu>
        <ContextMenuTrigger>
          <Text>x</Text>
        </ContextMenuTrigger>
      </ContextMenu>
    );
    expect(
      UNSAFE_getByProps({ accessibilityHint: "Long press for options" })
    ).toBeTruthy();
  });

  it("ContextMenuSeparator renders standalone without crashing", () => {
    const { toJSON } = render(<ContextMenuSeparator />);
    expect(toJSON()).toBeTruthy();
  });

  it("ContextMenuItem renders its label as a menuitem role", () => {
    const { getByRole, getByText } = render(
      <ContextMenu>
        <ContextMenuContent>
          <ContextMenuItem>Rename</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
    expect(getByText("Rename")).toBeTruthy();
    expect(getByRole("menuitem")).toBeTruthy();
  });
});
