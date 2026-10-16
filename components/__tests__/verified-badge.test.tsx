import React from "react";
import { render } from "@testing-library/react-native";
import { VerifiedBadge } from "../ui/verified-badge";

describe("VerifiedBadge", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<VerifiedBadge />);
    expect(toJSON()).toBeTruthy();
  });

  it("defaults a11y label to 'Verified'", () => {
    const { getByLabelText } = render(<VerifiedBadge />);
    expect(getByLabelText("Verified")).toBeTruthy();
  });

  it("accepts a custom label", () => {
    const { getByLabelText } = render(<VerifiedBadge label="Trusted" />);
    expect(getByLabelText("Trusted")).toBeTruthy();
  });

  it("accepts sm and md sizes without crashing", () => {
    for (const size of ["sm", "md"] as const) {
      const { toJSON } = render(<VerifiedBadge size={size} />);
      expect(toJSON()).toBeTruthy();
    }
  });
});
