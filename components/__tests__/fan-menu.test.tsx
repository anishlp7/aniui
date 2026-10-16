import React from "react";
import { View } from "react-native";
import { render } from "@testing-library/react-native";
import { FanMenu, type FanMenuItem } from "../ui/fan-menu";

const items: FanMenuItem[] = [
  { key: "a", icon: <View /> },
  { key: "b", icon: <View /> },
  { key: "c", icon: <View /> },
];

describe("FanMenu", () => {
  it("renders without crashing with items", () => {
    const { toJSON } = render(<FanMenu items={items} />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing with empty items", () => {
    const { toJSON } = render(<FanMenu items={[]} />);
    expect(toJSON()).toBeTruthy();
  });

  it("accepts a custom radius", () => {
    const { toJSON } = render(<FanMenu items={items} radius={140} />);
    expect(toJSON()).toBeTruthy();
  });
});
