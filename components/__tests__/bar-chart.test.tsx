import React from "react";
import { render } from "@testing-library/react-native";
import { BarChart } from "../ui/bar-chart";

const sampleData = [
  { label: "Q1", value: 40 },
  { label: "Q2", value: 65 },
  { label: "Q3", value: 30 },
  { label: "Q4", value: 80 },
];

describe("BarChart", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<BarChart data={sampleData} />);
    expect(toJSON()).toBeTruthy();
  });

  it("accepts horizontal layout", () => {
    const { toJSON } = render(
      <BarChart data={sampleData} horizontal />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("accepts custom color and height", () => {
    const { toJSON } = render(
      <BarChart data={sampleData} color="#ff6600" height={250} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("accepts grouped data", () => {
    const { toJSON } = render(
      <BarChart
        data={sampleData}
        grouped={[
          { key: "series1", color: "#2563eb" },
          { key: "series2", color: "#dc2626" },
        ]}
        groupedData={[
          { label: "Jan", values: [10, 20] },
          { label: "Feb", values: [30, 15] },
        ]}
      />
    );
    expect(toJSON()).toBeTruthy();
  });
});
