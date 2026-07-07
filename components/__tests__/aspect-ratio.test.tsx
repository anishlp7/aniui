import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { AspectRatio } from "../ui/aspect-ratio";

describe("AspectRatio", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<AspectRatio />);
    expect(toJSON()).toBeTruthy();
  });

  it("applies the ratio via style", () => {
    const { toJSON } = render(<AspectRatio ratio={16 / 9} testID="ar" />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders children", () => {
    const { getByText } = render(
      <AspectRatio ratio={1}>
        <Text>inside</Text>
      </AspectRatio>
    );
    expect(getByText("inside")).toBeTruthy();
  });

  it("supports className prop", () => {
    const { toJSON } = render(<AspectRatio className="rounded-lg" />);
    expect(toJSON()).toBeTruthy();
  });
});
