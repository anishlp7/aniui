import React from "react";
import { render } from "@testing-library/react-native";
import { ChartTooltip } from "../ui/chart-tooltip";

describe("ChartTooltip", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<ChartTooltip value={42} />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders label and value", () => {
    const { getByText } = render(
      <ChartTooltip label="Revenue" value="$1,200" />
    );
    expect(getByText("Revenue")).toBeTruthy();
    expect(getByText("$1,200")).toBeTruthy();
  });

  it("has accessibilityRole summary", () => {
    const { UNSAFE_getByProps } = render(
      <ChartTooltip label="Test" value={10} />
    );
    expect(UNSAFE_getByProps({ accessibilityRole: "summary" })).toBeTruthy();
  });

  it("renders multiple items", () => {
    const items = [
      { label: "Series A", value: 100, color: "#2563eb" },
      { label: "Series B", value: 200, color: "#dc2626" },
    ];
    const { getByText } = render(
      <ChartTooltip label="January" items={items} />
    );
    expect(getByText("Series A")).toBeTruthy();
    expect(getByText("Series B")).toBeTruthy();
    expect(getByText("100")).toBeTruthy();
    expect(getByText("200")).toBeTruthy();
  });

  it("spreads additional props", () => {
    const { getByTestId } = render(
      <ChartTooltip value={5} testID="tooltip" />
    );
    expect(getByTestId("tooltip")).toBeTruthy();
  });
});
