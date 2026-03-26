import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

describe("DropdownMenu", () => {
  const renderMenu = () =>
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Text>Open menu</Text>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  it("renders without crashing", () => {
    const { toJSON } = renderMenu();
    expect(toJSON()).toBeTruthy();
  });

  it("renders the trigger text", () => {
    const { getByText } = renderMenu();
    expect(getByText("Open menu")).toBeTruthy();
  });

  it("shows menu items after pressing trigger", () => {
    const { getByRole, getByText } = renderMenu();
    fireEvent.press(getByRole("button"));
    expect(getByText("Edit")).toBeTruthy();
    expect(getByText("Delete")).toBeTruthy();
  });

  it("menu items have menuitem accessibilityRole", () => {
    const { getByRole, getAllByRole } = renderMenu();
    fireEvent.press(getByRole("button"));
    expect(getAllByRole("menuitem").length).toBe(2);
  });

  it("calls onPress on menu item", () => {
    const onPress = jest.fn();
    const { getByRole, getByText } = render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Text>Menu</Text>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onPress={onPress}>Action</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    fireEvent.press(getByRole("button"));
    fireEvent.press(getByText("Action"));
    expect(onPress).toHaveBeenCalled();
  });
});
