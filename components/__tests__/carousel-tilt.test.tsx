import React from "react";
import { View } from "react-native";
import { render } from "@testing-library/react-native";
import { CarouselTilt } from "../ui/carousel-tilt";

describe("CarouselTilt", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <CarouselTilt data={[<View key="a" />, <View key="b" />]} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing with empty data", () => {
    const { toJSON } = render(<CarouselTilt data={[]} />);
    expect(toJSON()).toBeTruthy();
  });
});
