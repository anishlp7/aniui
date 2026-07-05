import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Menubar, MenubarMenu, MenubarItem } from "../ui/menubar";

describe("Menubar", () => {
  it("renders triggers without crashing", () => {
    const { getByText } = render(
      <Menubar>
        <MenubarMenu trigger="File">
          <MenubarItem>New</MenubarItem>
        </MenubarMenu>
        <MenubarMenu trigger="Edit">
          <MenubarItem>Undo</MenubarItem>
        </MenubarMenu>
      </Menubar>
    );
    expect(getByText("File")).toBeTruthy();
    expect(getByText("Edit")).toBeTruthy();
  });

  it("opens a menu on trigger press", () => {
    const { getByText } = render(
      <Menubar>
        <MenubarMenu trigger="File">
          <MenubarItem>New File</MenubarItem>
        </MenubarMenu>
      </Menubar>
    );
    fireEvent.press(getByText("File"));
    expect(getByText("New File")).toBeTruthy();
  });

  it("fires onPress for a menu item", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Menubar>
        <MenubarMenu trigger="File">
          <MenubarItem onPress={onPress}>Save</MenubarItem>
        </MenubarMenu>
      </Menubar>
    );
    fireEvent.press(getByText("File"));
    fireEvent.press(getByText("Save"));
    expect(onPress).toHaveBeenCalled();
  });
});
