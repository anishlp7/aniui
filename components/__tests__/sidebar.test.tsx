import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { SidebarProvider, Sidebar, SidebarTrigger } from "../ui/sidebar";

describe("Sidebar", () => {
  it("renders provider + sidebar + trigger without crashing", () => {
    const { getByText } = render(
      <SidebarProvider>
        <Sidebar>
          <Text>Nav item</Text>
        </Sidebar>
        <SidebarTrigger />
      </SidebarProvider>
    );
    expect(getByText("Nav item")).toBeTruthy();
  });

  it("respects defaultOpen", () => {
    const { toJSON } = render(
      <SidebarProvider defaultOpen={false}>
        <Sidebar>
          <Text>Collapsed</Text>
        </Sidebar>
      </SidebarProvider>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders a custom trigger child", () => {
    const { getByText } = render(
      <SidebarProvider>
        <SidebarTrigger>
          <Text>Toggle</Text>
        </SidebarTrigger>
      </SidebarProvider>
    );
    expect(getByText("Toggle")).toBeTruthy();
  });

  it("throws when Sidebar is used outside a provider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <Sidebar>
          <Text>Orphan</Text>
        </Sidebar>
      )
    ).toThrow();
    spy.mockRestore();
  });
});
