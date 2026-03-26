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

  it("shows the default tab content", () => {
    const { getByText, queryByText } = renderTabs();
    expect(getByText("Content One")).toBeTruthy();
    expect(queryByText("Content Two")).toBeNull();
  });

  it("switches content when a trigger is pressed", () => {
    const { getByText, queryByText } = renderTabs();
    fireEvent.press(getByText("Two"));
    expect(getByText("Content Two")).toBeTruthy();
    expect(queryByText("Content One")).toBeNull();
  });

  it("has tab accessibilityRole on triggers", () => {
    const { getAllByRole } = renderTabs();
    expect(getAllByRole("tab").length).toBe(2);
  });
});
