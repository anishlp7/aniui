import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { TabBar, TabBarItem } from "../ui/tab-bar";

describe("TabBar", () => {
  it("renders items with tablist/tab roles", () => {
    const { UNSAFE_getByProps, getAllByRole } = render(
      <TabBar>
        <TabBarItem label="Home" active />
        <TabBarItem label="Settings" />
      </TabBar>
    );
    expect(UNSAFE_getByProps({ accessibilityRole: "tablist" })).toBeTruthy();
    expect(getAllByRole("tab").length).toBe(2);
  });

  it("marks the active tab via accessibilityState.selected", () => {
    const { getAllByRole } = render(
      <TabBar>
        <TabBarItem label="Home" active />
        <TabBarItem label="Settings" />
      </TabBar>
    );
    const tabs = getAllByRole("tab");
    expect(tabs[0].props.accessibilityState.selected).toBe(true);
    expect(tabs[1].props.accessibilityState.selected).toBeFalsy();
  });

  it("fires onPress on tab tap", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TabBar>
        <TabBarItem label="Tapme" onPress={onPress} />
      </TabBar>
    );
    fireEvent.press(getByText("Tapme"));
    expect(onPress).toHaveBeenCalled();
  });

  it("renders a badge count on the item", () => {
    const { getByText } = render(
      <TabBar>
        <TabBarItem label="Inbox" badge={3} />
      </TabBar>
    );
    expect(getByText("3")).toBeTruthy();
  });

  it("caps the badge display at 99+", () => {
    const { getByText } = render(
      <TabBar>
        <TabBarItem label="Inbox" badge={200} />
      </TabBar>
    );
    expect(getByText("99+")).toBeTruthy();
  });

  it("hides the badge when count is 0", () => {
    const { queryByText } = render(
      <TabBar>
        <TabBarItem label="Inbox" badge={0} />
      </TabBar>
    );
    expect(queryByText("0")).toBeNull();
  });
});
