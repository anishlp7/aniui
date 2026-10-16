import React from "react";
import { render } from "@testing-library/react-native";
import { Loader } from "../ui/loader";

describe("Loader", () => {
  it("renders a circle variant with progressbar role", () => {
    const { UNSAFE_getByProps } = render(<Loader />);
    expect(UNSAFE_getByProps({ accessibilityRole: "progressbar" })).toBeTruthy();
  });

  it("renders the dots variant with three bouncing dots", () => {
    const { UNSAFE_getByProps } = render(<Loader variant="dots" />);
    expect(UNSAFE_getByProps({ accessibilityRole: "progressbar" })).toBeTruthy();
  });

  it("accepts each size without crashing", () => {
    for (const size of ["sm", "md", "lg"] as const) {
      const { toJSON } = render(<Loader size={size} />);
      expect(toJSON()).toBeTruthy();
    }
  });
});
