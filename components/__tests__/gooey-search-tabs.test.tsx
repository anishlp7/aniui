import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import {
  GooeySearchTabs,
  GooeySearchTabsTrigger,
  GooeySearchTabsTabs,
  GooeySearchTabsTab,
  GooeySearchTabsTabLabel,
} from "../ui/gooey-search-tabs";

describe("GooeySearchTabs", () => {
  it("renders tabs with labels", () => {
    const { getByText } = render(
      <GooeySearchTabs defaultValue="home">
        <GooeySearchTabsTabs>
          <GooeySearchTabsTab value="home">
            <GooeySearchTabsTabLabel>Home</GooeySearchTabsTabLabel>
          </GooeySearchTabsTab>
          <GooeySearchTabsTab value="profile">
            <GooeySearchTabsTabLabel>Profile</GooeySearchTabsTabLabel>
          </GooeySearchTabsTab>
        </GooeySearchTabsTabs>
      </GooeySearchTabs>
    );
    expect(getByText("Home")).toBeTruthy();
    expect(getByText("Profile")).toBeTruthy();
  });

  it("renders the search trigger subtree", () => {
    const { getByText } = render(
      <GooeySearchTabs>
        <GooeySearchTabsTrigger>
          <Text>search</Text>
        </GooeySearchTabsTrigger>
      </GooeySearchTabs>
    );
    expect(getByText("search")).toBeTruthy();
  });

  it("subparts throw outside their root", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <GooeySearchTabsTab value="x">
          <Text>x</Text>
        </GooeySearchTabsTab>
      )
    ).toThrow(/must be rendered inside/);
    spy.mockRestore();
  });
});
