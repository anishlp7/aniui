import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { CurvedBottomTabs, type CurvedTab } from "../ui/curved-bottom-tabs";

const TABS: CurvedTab[] = [
  { key: "home", label: "Home" },
  { key: "search", label: "Search" },
  { key: "profile", label: "Profile" },
];

describe("CurvedBottomTabs", () => {
  it("renders each inactive tab's label (active tab shows icon only)", () => {
    const { getByText, queryByText } = render(
      <CurvedBottomTabs tabs={TABS} activeIndex={0} onTabPress={() => {}} />
    );
    // Active tab (index 0, Home) renders only its icon — no label.
    expect(queryByText("Home")).toBeNull();
    // Inactive tabs render their label beneath the icon.
    expect(getByText("Search")).toBeTruthy();
    expect(getByText("Profile")).toBeTruthy();
  });

  it("fires onTabPress with the tapped index", () => {
    const onTabPress = jest.fn();
    const { getByText } = render(
      <CurvedBottomTabs tabs={TABS} activeIndex={0} onTabPress={onTabPress} />
    );
    // Tap the "Search" label; its enclosing Pressable fires onTabPress(1).
    fireEvent.press(getByText("Search"));
    expect(onTabPress).toHaveBeenCalledWith(1);
  });

  it("renders a badge count on an item (inactive tab)", () => {
    const tabsWithBadge: CurvedTab[] = [
      { key: "home", label: "Home" },
      { key: "inbox", label: "Inbox", badge: 7 },
    ];
    const { getByText } = render(
      <CurvedBottomTabs tabs={tabsWithBadge} activeIndex={0} onTabPress={() => {}} />
    );
    expect(getByText("7")).toBeTruthy();
  });

  it("caps badge display at 99+", () => {
    const tabsWithBadge: CurvedTab[] = [
      { key: "home", label: "Home" },
      { key: "inbox", label: "Inbox", badge: 500 },
    ];
    const { getByText } = render(
      <CurvedBottomTabs tabs={tabsWithBadge} activeIndex={0} onTabPress={() => {}} />
    );
    expect(getByText("99+")).toBeTruthy();
  });
});
