import React from "react";
import { render } from "@testing-library/react-native";
import {
  Coupon,
  COUPON_EMERALD_PALETTE,
  COUPON_INK_PALETTE,
} from "../ui/coupon";

describe("Coupon", () => {
  it("renders shorthand props (code / discount / description / expires)", () => {
    const { getByText } = render(
      <Coupon
        code="SAVE20"
        discount="20% OFF"
        description="On your next order"
        expires="12/31"
      />
    );
    expect(getByText(/20% OFF/)).toBeTruthy();
    expect(getByText(/SAVE20/)).toBeTruthy();
    expect(getByText(/On your next order/)).toBeTruthy();
    expect(getByText(/Expires 12\/31/)).toBeTruthy();
  });

  it("accepts both orientations without crashing", () => {
    for (const orientation of ["horizontal", "vertical"] as const) {
      const { toJSON } = render(
        <Coupon orientation={orientation} code="X" discount="10% OFF" />
      );
      expect(toJSON()).toBeTruthy();
    }
  });

  it("accepts a custom palette without crashing", () => {
    const { toJSON } = render(
      <Coupon palette={COUPON_EMERALD_PALETTE} code="X" discount="10% OFF" />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("accepts the dark INK palette without crashing", () => {
    const { toJSON } = render(
      <Coupon palette={COUPON_INK_PALETTE} code="X" discount="10% OFF" />
    );
    expect(toJSON()).toBeTruthy();
  });
});
