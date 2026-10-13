import React from "react";
import { render } from "@testing-library/react-native";
import {
  BarcodeBadge,
  BarcodeBadgeBars,
  BarcodeBadgeLabel,
} from "../ui/barcode-badge";

describe("BarcodeBadge", () => {
  it("renders the default label from value", () => {
    const { getByText } = render(<BarcodeBadge value="A1B2C3" />);
    expect(getByText("A1B2C3")).toBeTruthy();
  });

  it("a custom label overrides the a11y label but visible text stays as value", () => {
    // Label only overrides the accessibilityLabel; the default BarcodeBadgeLabel
    // sub-component reads context.seed (= value), not the readable label.
    const { getByText, getByLabelText } = render(
      <BarcodeBadge value="A1B2C3" label="SKU-42" />
    );
    expect(getByLabelText("SKU-42")).toBeTruthy();
    expect(getByText("A1B2C3")).toBeTruthy();
  });

  it("hides the label when hideLabel is set", () => {
    const { queryByText } = render(<BarcodeBadge value="HIDDEN" hideLabel />);
    expect(queryByText("HIDDEN")).toBeNull();
  });

  it("the a11y label resolves to the readable label", () => {
    const { getByLabelText } = render(<BarcodeBadge value="X" label="Product X" />);
    expect(getByLabelText("Product X")).toBeTruthy();
  });

  it("compound Bars/Label composition is supported", () => {
    const { getByText } = render(
      <BarcodeBadge value="SEED">
        <BarcodeBadgeBars />
        <BarcodeBadgeLabel>Custom</BarcodeBadgeLabel>
      </BarcodeBadge>
    );
    expect(getByText("Custom")).toBeTruthy();
  });

  it("throws when subparts render without a BarcodeBadge parent", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<BarcodeBadgeBars />)).toThrow(/must be rendered inside/);
    spy.mockRestore();
  });
});
