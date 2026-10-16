import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { Shimmer } from "../ui/shimmer";

describe("Shimmer", () => {
  it("renders the placeholder while loading", () => {
    const { toJSON } = render(<Shimmer isLoading />);
    expect(toJSON()).toBeTruthy();
  });

  it("reveals children once isLoading flips to false", () => {
    const { getByText } = render(
      <Shimmer isLoading={false}>
        <Text>Real content</Text>
      </Shimmer>
    );
    expect(getByText("Real content")).toBeTruthy();
  });

  it("accepts each variant without crashing", () => {
    for (const variant of ["shimmer", "pulse"] as const) {
      const { toJSON } = render(<Shimmer variant={variant} />);
      expect(toJSON()).toBeTruthy();
    }
  });

  it("accepts each preset without crashing", () => {
    for (const preset of ["default", "neutral", "inverted", "brand", "subtle"] as const) {
      const { toJSON } = render(<Shimmer preset={preset} />);
      expect(toJSON()).toBeTruthy();
    }
  });

  it("accepts each sweep direction without crashing", () => {
    for (const direction of ["leftToRight", "rightToLeft", "topToBottom", "bottomToTop"] as const) {
      const { toJSON } = render(<Shimmer direction={direction} />);
      expect(toJSON()).toBeTruthy();
    }
  });
});
