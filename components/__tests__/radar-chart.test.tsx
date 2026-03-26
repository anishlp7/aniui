import React from "react";
import { render } from "@testing-library/react-native";
import { RadarChart } from "../ui/radar-chart";

const sampleData = [
  { label: "Speed", value: 80 },
  { label: "Power", value: 65 },
  { label: "Range", value: 90 },
  { label: "Defense", value: 50 },
  { label: "Agility", value: 70 },
];

describe("RadarChart", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<RadarChart data={sampleData} />);
    expect(toJSON()).toBeTruthy();
  });

  it("accepts custom color and fillOpacity", () => {
    const { toJSON } = render(
      <RadarChart data={sampleData} color="#dc2626" fillOpacity={0.4} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("accepts series for multi-overlay", () => {
    const { toJSON } = render(
      <RadarChart
        series={[
          { data: sampleData, color: "#2563eb", fillOpacity: 0.2 },
          { data: sampleData, color: "#dc2626", fillOpacity: 0.2 },
        ]}
      />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("spreads additional props", () => {
    const { toJSON } = render(
      <RadarChart data={sampleData} testID="radar" />
    );
    expect(toJSON()).toBeTruthy();
  });
});
