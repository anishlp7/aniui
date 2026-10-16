import React from "react";
import { render } from "@testing-library/react-native";
import { StatusIndicator } from "../ui/status-indicator";

describe("StatusIndicator", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<StatusIndicator />);
    expect(toJSON()).toBeTruthy();
  });

  it("has an accessibility label describing the status", () => {
    const { getByLabelText } = render(<StatusIndicator status="online" />);
    expect(getByLabelText("Status: online")).toBeTruthy();
  });

  it("defaults the a11y label to offline when no status prop given", () => {
    const { getByLabelText } = render(<StatusIndicator />);
    expect(getByLabelText("Status: offline")).toBeTruthy();
  });

  it("accepts each status variant without crashing", () => {
    for (const status of ["online", "offline", "away", "busy"] as const) {
      const { toJSON } = render(<StatusIndicator status={status} />);
      expect(toJSON()).toBeTruthy();
    }
  });
});
