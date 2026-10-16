import React from "react";
import { render } from "@testing-library/react-native";
import { ProgressSteps, ProgressStep } from "../ui/progress-steps";

describe("ProgressSteps", () => {
  it("renders each step label", () => {
    const { getByText } = render(
      <ProgressSteps current={1}>
        <ProgressStep label="One" />
        <ProgressStep label="Two" />
        <ProgressStep label="Three" />
      </ProgressSteps>
    );
    expect(getByText("One")).toBeTruthy();
    expect(getByText("Two")).toBeTruthy();
    expect(getByText("Three")).toBeTruthy();
  });

  it("exposes a list role on the container", () => {
    const { UNSAFE_getByProps } = render(
      <ProgressSteps current={0}>
        <ProgressStep label="A" />
      </ProgressSteps>
    );
    expect(UNSAFE_getByProps({ accessibilityRole: "list" })).toBeTruthy();
  });

  it("shows the step number for not-yet-completed steps", () => {
    const { getByText } = render(
      <ProgressSteps current={0}>
        <ProgressStep label="A" />
        <ProgressStep label="B" />
      </ProgressSteps>
    );
    // First step is active (shows "1"), second is pending (shows "2").
    expect(getByText("1")).toBeTruthy();
    expect(getByText("2")).toBeTruthy();
  });
});
