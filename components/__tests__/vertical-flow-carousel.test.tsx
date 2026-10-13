import React from "react";
import { View } from "react-native";
import { render } from "@testing-library/react-native";
import { VerticalFlowCarousel } from "../ui/vertical-flow-carousel";

describe("VerticalFlowCarousel", () => {
  it("renders without crashing with items", () => {
    const { toJSON } = render(
      <VerticalFlowCarousel data={[<View key="a" />, <View key="b" />]} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing with empty data", () => {
    const { toJSON } = render(<VerticalFlowCarousel data={[]} />);
    expect(toJSON()).toBeTruthy();
  });

  it("accepts showBlur=false without crashing", () => {
    const { toJSON } = render(
      <VerticalFlowCarousel data={[<View key="a" />]} showBlur={false} />
    );
    expect(toJSON()).toBeTruthy();
  });
});
