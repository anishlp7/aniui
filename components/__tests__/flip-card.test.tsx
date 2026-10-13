import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { FlipCard } from "../ui/flip-card";

describe("FlipCard", () => {
  it("renders both front and back (both are mounted and 3D-rotated into view)", () => {
    const { getByText } = render(
      <FlipCard front={<Text>front</Text>} back={<Text>back</Text>} />
    );
    expect(getByText("front")).toBeTruthy();
    expect(getByText("back")).toBeTruthy();
  });

  it("accepts each animation mode without crashing", () => {
    for (const animation of ["horizontal", "vertical", "depth"] as const) {
      const { toJSON } = render(
        <FlipCard
          front={<Text>f</Text>}
          back={<Text>b</Text>}
          animation={animation}
        />
      );
      expect(toJSON()).toBeTruthy();
    }
  });

  it("respects the controlled flipped prop without crashing", () => {
    const { toJSON } = render(
      <FlipCard front={<Text>f</Text>} back={<Text>b</Text>} flipped />
    );
    expect(toJSON()).toBeTruthy();
  });
});
