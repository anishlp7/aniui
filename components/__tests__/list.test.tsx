import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { List, ListItem, ListItemTitle, ListItemDescription } from "../ui/list";

describe("List", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<List />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders children", () => {
    const { getByText } = render(
      <List>
        <ListItem>
          <ListItemTitle>Item 1</ListItemTitle>
        </ListItem>
      </List>
    );
    expect(getByText("Item 1")).toBeTruthy();
  });
});

describe("ListItem", () => {
  it("has accessibilityRole button", () => {
    const { getByRole } = render(
      <ListItem>
        <ListItemTitle>Tap me</ListItemTitle>
      </ListItem>
    );
    expect(getByRole("button")).toBeTruthy();
  });

  it("fires onPress handler", () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <ListItem onPress={onPress}>
        <ListItemTitle>Press</ListItemTitle>
      </ListItem>
    );
    fireEvent.press(getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe("ListItemTitle", () => {
  it("renders text", () => {
    const { getByText } = render(<ListItemTitle>Title</ListItemTitle>);
    expect(getByText("Title")).toBeTruthy();
  });
});

describe("ListItemDescription", () => {
  it("renders text", () => {
    const { getByText } = render(<ListItemDescription>Desc</ListItemDescription>);
    expect(getByText("Desc")).toBeTruthy();
  });
});
