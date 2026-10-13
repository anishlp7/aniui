import React from "react";
import { render } from "@testing-library/react-native";
import { RollingCounter } from "../ui/rolling-counter";

describe("RollingCounter", () => {
  it("renders without crashing with a value", () => {
    const { toJSON } = render(<RollingCounter value={1234} />);
    expect(toJSON()).toBeTruthy();
  });

  it("accepts a prefix and suffix", () => {
    const { getByText } = render(
      <RollingCounter value={99} prefix="$" suffix=".00" />
    );
    expect(getByText("$")).toBeTruthy();
    expect(getByText(".00")).toBeTruthy();
  });

  it("accepts a custom digits count without crashing", () => {
    const { toJSON } = render(<RollingCounter value={5} digits={6} />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing with value 0", () => {
    const { toJSON } = render(<RollingCounter value={0} />);
    expect(toJSON()).toBeTruthy();
  });
});
