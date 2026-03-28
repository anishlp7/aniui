import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { Drawer, DrawerContent } from "../ui/drawer";

describe("Drawer", () => {
  it("renders without crashing when open", () => {
    const { toJSON } = render(
      <Drawer open={true} onOpenChange={() => {}}>
        <DrawerContent>
          <Text>Drawer body</Text>
        </DrawerContent>
      </Drawer>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("does not render content when closed", () => {
    const { queryByText } = render(
      <Drawer open={false} onOpenChange={() => {}}>
        <DrawerContent>
          <Text>Hidden</Text>
        </DrawerContent>
      </Drawer>
    );
    expect(queryByText("Hidden")).toBeNull();
  });

  it("renders children inside DrawerContent", () => {
    const { getByText } = render(
      <Drawer open={true} onOpenChange={() => {}}>
        <DrawerContent>
          <Text>Menu items</Text>
        </DrawerContent>
      </Drawer>
    );
    expect(getByText("Menu items")).toBeTruthy();
  });

  it("has menu accessibilityRole", () => {
    const { UNSAFE_getByProps } = render(
      <Drawer open={true} onOpenChange={() => {}}>
        <DrawerContent>
          <Text>Menu</Text>
        </DrawerContent>
      </Drawer>
    );
    expect(UNSAFE_getByProps({ accessibilityRole: "menu" })).toBeTruthy();
  });
});
