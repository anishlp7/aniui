import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { PromptInput } from "../ui/prompt-input";

describe("PromptInput", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<PromptInput onSend={jest.fn()} />);
    expect(toJSON()).toBeTruthy();
  });

  it("sends trimmed text and clears when uncontrolled", () => {
    const onSend = jest.fn();
    const { getByPlaceholderText, getByLabelText } = render(<PromptInput onSend={onSend} />);
    fireEvent.changeText(getByPlaceholderText("Message..."), "  hello ai  ");
    fireEvent.press(getByLabelText("Send message"));
    expect(onSend).toHaveBeenCalledWith("hello ai");
    expect(getByPlaceholderText("Message...").props.value).toBe("");
  });

  it("does not send when empty", () => {
    const onSend = jest.fn();
    const { getByLabelText } = render(<PromptInput onSend={onSend} />);
    fireEvent.press(getByLabelText("Send message"));
    expect(onSend).not.toHaveBeenCalled();
  });

  it("shows stop button while streaming and fires onStop", () => {
    const onStop = jest.fn();
    const { getByLabelText } = render(<PromptInput streaming onStop={onStop} onSend={jest.fn()} />);
    fireEvent.press(getByLabelText("Stop generating"));
    expect(onStop).toHaveBeenCalledTimes(1);
  });

  it("shows attach and voice buttons when handlers provided", () => {
    const onAttach = jest.fn();
    const { getByLabelText } = render(
      <PromptInput onSend={jest.fn()} onAttach={onAttach} onVoice={jest.fn()} />
    );
    fireEvent.press(getByLabelText("Add attachment"));
    expect(onAttach).toHaveBeenCalledTimes(1);
    expect(getByLabelText("Voice input")).toBeTruthy();
  });

  it("works controlled without clearing the consumer's value", () => {
    const onSend = jest.fn();
    const { getByLabelText, getByPlaceholderText } = render(
      <PromptInput value="controlled text" onSend={onSend} />
    );
    fireEvent.press(getByLabelText("Send message"));
    expect(onSend).toHaveBeenCalledWith("controlled text");
    expect(getByPlaceholderText("Message...").props.value).toBe("controlled text");
  });
});
