import React from "react";
import { View } from "react-native";
import { render } from "@testing-library/react-native";
import { VerticalPageCarousel } from "../ui/vertical-page-carousel";

describe("VerticalPageCarousel", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <VerticalPageCarousel data={[<View key="a" />, <View key="b" />]} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing with empty data", () => {
    const { toJSON } = render(<VerticalPageCarousel data={[]} />);
    expect(toJSON()).toBeTruthy();
  });
});
