import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { MorphingTabBar, type MorphTab } from "../ui/morphing-tabbar";

const TABS: MorphTab[] = [
  { key: "home", label: "Home" },
  { key: "search", label: "Search" },
  { key: "profile", label: "Profile" },
];

describe("MorphingTabBar", () => {
  it("renders every tab label", () => {
    const { getByText } = render(
      <MorphingTabBar tabs={TABS} activeKey="home" onTabPress={() => {}} />
    );
    expect(getByText("Home")).toBeTruthy();
    expect(getByText("Search")).toBeTruthy();
    expect(getByText("Profile")).toBeTruthy();
  });

  it("fires onTabPress with the tapped key", () => {
    const onTabPress = jest.fn();
    const { getByText } = render(
      <MorphingTabBar tabs={TABS} activeKey="home" onTabPress={onTabPress} />
    );
    fireEvent.press(getByText("Search"));
    expect(onTabPress).toHaveBeenCalledWith("search");
  });

  it("renders without crashing when tabs is empty", () => {
    const { toJSON } = render(
      <MorphingTabBar tabs={[]} activeKey="" onTabPress={() => {}} />
    );
    expect(toJSON()).toBeTruthy();
  });
});
