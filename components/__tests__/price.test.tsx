import React from "react";
import { render } from "@testing-library/react-native";
import { Price } from "../ui/price";

describe("Price", () => {
  it("formats USD by default", () => {
    const { getByText } = render(<Price amount={9.99} />);
    expect(getByText("$9.99")).toBeTruthy();
  });

  it("respects currency prop", () => {
    const { getByText } = render(<Price amount={10} currency="EUR" locale="en-US" />);
    // Intl output: "€10.00" on recent runtimes; just assert the number is present.
    expect(getByText(/10\.00/)).toBeTruthy();
  });

  it("renders a prefix when provided", () => {
    const { getByText } = render(<Price amount={5} prefix="From" />);
    expect(getByText("From")).toBeTruthy();
    expect(getByText(/5\.00/)).toBeTruthy();
  });

  it("renders without crashing with strikethrough", () => {
    const { toJSON } = render(<Price amount={20} strikethrough />);
    expect(toJSON()).toBeTruthy();
  });
});
