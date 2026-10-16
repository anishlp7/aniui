import React from "react";
import { render } from "@testing-library/react-native";
import { ReceiptCard } from "../ui/receipt-card";

describe("ReceiptCard", () => {
  it("renders without crashing with minimum props", () => {
    const { toJSON } = render(
      <ReceiptCard
        merchant="Blue Bottle"
        date="2026-10-13"
        lines={[]}
        total="$0.00"
      />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders merchant and date", () => {
    const { getByText } = render(
      <ReceiptCard
        merchant="Blue Bottle"
        date="2026-10-13"
        lines={[]}
        total="$0.00"
      />
    );
    expect(getByText(/Blue Bottle/i)).toBeTruthy();
    expect(getByText(/2026-10-13/)).toBeTruthy();
  });

  it("has a a11y label of 'Receipt from {merchant}'", () => {
    const { getByLabelText } = render(
      <ReceiptCard merchant="Blue Bottle" date="x" lines={[]} total="$0.00" />
    );
    expect(getByLabelText("Receipt from Blue Bottle")).toBeTruthy();
  });

  it("renders a list of lines with labels and values", () => {
    const { getByText } = render(
      <ReceiptCard
        merchant="M"
        date="D"
        lines={[
          { label: "Latte", value: "$5.00" },
          { label: "Scone", value: "$3.50" },
        ]}
        total="$8.50"
      />
    );
    expect(getByText("Latte")).toBeTruthy();
    expect(getByText("$5.00")).toBeTruthy();
    expect(getByText("Scone")).toBeTruthy();
    expect(getByText("$3.50")).toBeTruthy();
    expect(getByText("$8.50")).toBeTruthy();
  });
});
