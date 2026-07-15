import React from "react";
import { render, act } from "@testing-library/react-native";
import { StreamingText } from "../ui/streaming-text";

describe("StreamingText", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("renders without crashing", () => {
    const { toJSON } = render(<StreamingText text="Hello" />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders full text instantly when typewriter is false", () => {
    const { getByText } = render(<StreamingText text="Hello world" typewriter={false} />);
    expect(getByText(/Hello world/)).toBeTruthy();
  });

  it("reveals text progressively and fires onComplete", () => {
    const onComplete = jest.fn();
    const { getByText } = render(
      <StreamingText text="Hi!" speed={1000} onComplete={onComplete} />
    );
    act(() => { jest.advanceTimersByTime(500); });
    expect(getByText(/Hi!/)).toBeTruthy();
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("keeps revealing when text grows (streaming append)", () => {
    const { getByText, rerender } = render(<StreamingText text="Hel" speed={1000} streaming />);
    act(() => { jest.advanceTimersByTime(300); });
    rerender(<StreamingText text="Hello there" speed={1000} streaming />);
    act(() => { jest.advanceTimersByTime(1000); });
    expect(getByText(/Hello there/)).toBeTruthy();
  });

  it("does not fire onComplete while streaming", () => {
    const onComplete = jest.fn();
    render(<StreamingText text="Hi" speed={1000} streaming onComplete={onComplete} />);
    act(() => { jest.advanceTimersByTime(1000); });
    expect(onComplete).not.toHaveBeenCalled();
  });
});
