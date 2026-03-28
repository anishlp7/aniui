import React from "react";
import { render } from "@testing-library/react-native";
import { LineChart } from "../ui/line-chart";

const sampleData = [
  { label: "Mon", value: 5 },
  { label: "Tue", value: 12 },
  { label: "Wed", value: 8 },
  { label: "Thu", value: 20 },
];

describe("LineChart", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<LineChart data={sampleData} />);
    expect(toJSON()).toBeTruthy();
  });

  it("accepts custom props", () => {
    const { toJSON } = render(
      <LineChart data={sampleData} height={150} color="#10b981" showDots={false} curved={false} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("accepts series for multi-line", () => {
    const { toJSON } = render(
      <LineChart
        series={[
          { data: sampleData, color: "#2563eb" },
          { data: sampleData, color: "#dc2626", dashed: true },
        ]}
      />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("spreads additional props", () => {
    const { toJSON } = render(
      <LineChart data={sampleData} testID="my-line-chart" />
    );
    expect(toJSON()).toBeTruthy();
  });
});
