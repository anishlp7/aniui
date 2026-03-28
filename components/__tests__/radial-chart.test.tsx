import React from "react";
import { render } from "@testing-library/react-native";
import { RadialChart } from "../ui/radial-chart";

const sampleData = [
  { value: 75, color: "#2563eb", label: "Progress" },
  { value: 50, maxValue: 80, color: "#16a34a", label: "Goal" },
];

describe("RadialChart", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<RadialChart data={sampleData} />);
    expect(toJSON()).toBeTruthy();
  });

  it("accepts center text props", () => {
    const { toJSON } = render(
      <RadialChart data={sampleData} centerText="75%" centerSubText="Complete" />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("accepts custom strokeWidth and height", () => {
    const { toJSON } = render(
      <RadialChart data={sampleData} strokeWidth={16} height={250} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it("accepts partial arc via startAngle/endAngle", () => {
    const { toJSON } = render(
      <RadialChart data={sampleData} startAngle={-90} endAngle={270} />
    );
    expect(toJSON()).toBeTruthy();
  });
});
