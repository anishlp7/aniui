import React from "react";
import { render } from "@testing-library/react-native";
import { PieChart } from "../ui/pie-chart";

const sampleData = [
  { value: 40, color: "#2563eb", label: "Blue" },
  { value: 30, color: "#dc2626", label: "Red" },
  { value: 30, color: "#16a34a", label: "Green" },
];

describe("PieChart", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<PieChart data={sampleData} />);
    expect(toJSON()).toBeTruthy();
  });

  it("accepts donut style via innerRadius", () => {
    const { toJSON } = render(
      <PieChart data={sampleData} innerRadius={0.6} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("accepts custom height", () => {
    const { toJSON } = render(
      <PieChart data={sampleData} height={300} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("accepts partial arc via startAngle/endAngle", () => {
    const { toJSON } = render(
      <PieChart data={sampleData} startAngle={0} endAngle={270} />
    );
    expect(toJSON()).toBeTruthy();
  });
});
