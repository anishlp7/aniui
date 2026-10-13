import React from "react";
import { View } from "react-native";
import { render } from "@testing-library/react-native";
import { MobileDock, type DockItem } from "../ui/mobile-dock";

const items: DockItem[] = [
  { key: "home", icon: <View />, label: "Home" },
  { key: "search", icon: <View />, label: "Search" },
  { key: "profile", icon: <View />, label: "Profile" },
];

describe("MobileDock", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<MobileDock items={items} />);
    expect(toJSON()).toBeTruthy();
  });

  it("accepts custom itemSize/peakSize/spread", () => {
    const { toJSON } = render(
      <MobileDock items={items} itemSize={48} peakSize={72} spread={2} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing with empty items", () => {
    const { toJSON } = render(<MobileDock items={[]} />);
    expect(toJSON()).toBeTruthy();
  });
});
