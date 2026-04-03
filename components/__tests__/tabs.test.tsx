import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

describe("Tabs", () => {
  const renderTabs = () =>
    render(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">
          <Text>Content One</Text>
        </TabsContent>
        <TabsContent value="two">
          <Text>Content Two</Text>
        </TabsContent>
      </Tabs>
    );

  it("renders without crashing", () => {
    const { toJSON } = renderTabs();
    expect(toJSON()).toBeTruthy();
  });

  it("renders active tab content and hides inactive", () => {
    const { getByText, queryByText } = renderTabs();
    // Only the default active tab's content is rendered
    expect(getByText("Content One")).toBeTruthy();
    expect(queryByText("Content Two")).toBeNull();
  });

  it("trigger is pressable", () => {
    const { getByText, queryByText } = renderTabs();
    fireEvent.press(getByText("Two"));
    expect(getByText("Content Two")).toBeTruthy();
  });

  it("has tab accessibilityRole on triggers", () => {
    const { getAllByRole } = renderTabs();
    expect(getAllByRole("tab").length).toBe(2);
  });
});
