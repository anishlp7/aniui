import React from "react";
import { View } from "react-native";
import { render } from "@testing-library/react-native";
import { CarouselScale } from "../ui/carousel-scale";

describe("CarouselScale", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <CarouselScale data={[<View key="a" />, <View key="b" />]} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing with empty data", () => {
    const { toJSON } = render(<CarouselScale data={[]} />);
    expect(toJSON()).toBeTruthy();
  });
});
