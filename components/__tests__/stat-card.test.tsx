import React from "react";
import { render } from "@testing-library/react-native";
import { StatCard } from "../ui/stat-card";

describe("StatCard", () => {
  it("renders label and value", () => {
    const { getByText } = render(<StatCard label="Revenue" value="$12,340" />);
    expect(getByText("Revenue")).toBeTruthy();
    expect(getByText("$12,340")).toBeTruthy();
  });

  it("renders a numeric value", () => {
    const { getByText } = render(<StatCard label="Users" value={42} />);
    expect(getByText("42")).toBeTruthy();
  });

  it("renders change percent with up trend", () => {
    const { getByText } = render(<StatCard label="Rev" value={1} change={12} trend="up" />);
    expect(getByText("+12%")).toBeTruthy();
  });

  it("renders change percent with down trend (no + sign on negatives)", () => {
    const { getByText } = render(<StatCard label="Rev" value={1} change={-5} trend="down" />);
    expect(getByText("-5%")).toBeTruthy();
  });

  it("has summary role for a11y", () => {
    const { UNSAFE_getByProps } = render(<StatCard label="X" value={0} />);
    expect(UNSAFE_getByProps({ accessibilityRole: "summary" })).toBeTruthy();
  });
});
