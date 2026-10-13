import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { Gradient } from "../ui/gradient";

describe("Gradient", () => {
  it("renders children on top of the gradient", () => {
    const { getByText } = render(
      <Gradient colors={["#ff0000", "#0000ff"]}>
        <Text>on top</Text>
      </Gradient>
    );
    expect(getByText("on top")).toBeTruthy();
  });

  it("renders with default two-stop palette", () => {
    const { toJSON } = render(<Gradient />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders with custom start/end points", () => {
    const { toJSON } = render(
      <Gradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders with a 3-stop palette without crashing", () => {
    const { toJSON } = render(
      <Gradient colors={["#ff0000", "#00ff00", "#0000ff"]} />
    );
    expect(toJSON()).toBeTruthy();
  });
});
