import React from "react";
import { render } from "@testing-library/react-native";
import { Waveform } from "../ui/waveform";

describe("Waveform", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Waveform />);
    expect(toJSON()).toBeTruthy();
  });

  it("labels the recording state for accessibility", () => {
    const { getByLabelText } = render(<Waveform active />);
    expect(getByLabelText("Recording")).toBeTruthy();
  });

  it("labels the static state for accessibility", () => {
    const { getByLabelText } = render(<Waveform active={false} />);
    expect(getByLabelText("Audio waveform")).toBeTruthy();
  });

  it("renders the requested number of bars", () => {
    const { getByLabelText } = render(<Waveform bars={12} active={false} />);
    expect(getByLabelText("Audio waveform").props.children).toHaveLength(12);
  });
});
