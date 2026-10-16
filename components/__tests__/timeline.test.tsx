import React from "react";
import { render } from "@testing-library/react-native";
import { Timeline, TimelineItem } from "../ui/timeline";

describe("Timeline", () => {
  it("renders two items and advertises list / listitem roles", () => {
    const { UNSAFE_getByProps, UNSAFE_getAllByProps, getByText } = render(
      <Timeline>
        <TimelineItem title="One" isLast={false} />
        <TimelineItem title="Two" isLast />
      </Timeline>
    );
    expect(UNSAFE_getByProps({ accessibilityRole: "list" })).toBeTruthy();
    // TimelineItem advertises via the newer `role` prop (RN's
    // accessibilityRole union doesn't include "listitem"), picked up by
    // both the React component and its host counterpart.
    expect(UNSAFE_getAllByProps({ role: "listitem" }).length).toBeGreaterThanOrEqual(2);
    expect(getByText("One")).toBeTruthy();
    expect(getByText("Two")).toBeTruthy();
  });

  it("renders item title and optional description + time", () => {
    const { getByText } = render(
      <TimelineItem title="Shipped" description="Package handed off" time="12:40" />
    );
    expect(getByText("Shipped")).toBeTruthy();
    expect(getByText("Package handed off")).toBeTruthy();
    expect(getByText("12:40")).toBeTruthy();
  });

  it("accepts each variant without crashing", () => {
    for (const variant of ["default", "completed", "active", "pending", "destructive", "success", "muted"] as const) {
      const { toJSON } = render(<TimelineItem title="x" variant={variant} />);
      expect(toJSON()).toBeTruthy();
    }
  });
});
