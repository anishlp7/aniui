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

  it("accepts real audio levels and still renders exactly `bars` bars", () => {
    const levels = [0.1, 0.9, 0.5];
    const { getByLabelText } = render(<Waveform bars={8} levels={levels} active={false} />);
    expect(getByLabelText("Audio waveform").props.children).toHaveLength(8);
  });

  it("shows the most recent levels when more samples than bars arrive", () => {
    const levels = Array.from({ length: 100 }, (_, i) => i / 100);
    const { getByLabelText } = render(<Waveform bars={10} levels={levels} />);
    expect(getByLabelText("Recording").props.children).toHaveLength(10);
  });
});
