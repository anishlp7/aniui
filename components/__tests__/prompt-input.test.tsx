import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputSpacer,
  PromptInputButton,
  PromptInputSend,
} from "../ui/prompt-input";

function Composer(props: React.ComponentProps<typeof PromptInput>) {
  return (
    <PromptInput {...props}>
      <PromptInputTextarea placeholder="Message..." />
      <PromptInputToolbar>
        <PromptInputButton accessibilityLabel="Add attachment">
          <Text>+</Text>
        </PromptInputButton>
        <PromptInputSpacer />
        <PromptInputSend />
      </PromptInputToolbar>
    </PromptInput>
  );
}

describe("PromptInput", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<Composer onSend={jest.fn()} />);
    expect(toJSON()).toBeTruthy();
  });

  it("sends trimmed text and clears when uncontrolled", () => {
    const onSend = jest.fn();
    const { getByPlaceholderText, getByLabelText } = render(<Composer onSend={onSend} />);
    fireEvent.changeText(getByPlaceholderText("Message..."), "  hello ai  ");
    fireEvent.press(getByLabelText("Send message"));
    expect(onSend).toHaveBeenCalledWith("hello ai");
    expect(getByPlaceholderText("Message...").props.value).toBe("");
  });

  it("does not send when empty", () => {
    const onSend = jest.fn();
    const { getByLabelText } = render(<Composer onSend={onSend} />);
    fireEvent.press(getByLabelText("Send message"));
    expect(onSend).not.toHaveBeenCalled();
  });

  it("shows stop while streaming and fires onStop", () => {
    const onStop = jest.fn();
    const { getByLabelText } = render(<Composer streaming onStop={onStop} onSend={jest.fn()} />);
    fireEvent.press(getByLabelText("Stop generating"));
    expect(onStop).toHaveBeenCalledTimes(1);
  });

  it("toolbar buttons fire their handlers", () => {
    const onAttach = jest.fn();
    const { getByLabelText } = render(
      <PromptInput onSend={jest.fn()}>
        <PromptInputTextarea placeholder="Message..." />
        <PromptInputToolbar>
          <PromptInputButton accessibilityLabel="Add attachment" onPress={onAttach}>
            <Text>+</Text>
          </PromptInputButton>
          <PromptInputSend />
        </PromptInputToolbar>
      </PromptInput>
    );
    fireEvent.press(getByLabelText("Add attachment"));
    expect(onAttach).toHaveBeenCalledTimes(1);
  });

  it("renders the emptyFallback instead of send when there is no text", () => {
    const { getByLabelText, queryByLabelText, getByPlaceholderText } = render(
      <PromptInput onSend={jest.fn()}>
        <PromptInputTextarea placeholder="Message..." />
        <PromptInputToolbar>
          <PromptInputSend
            emptyFallback={
              <PromptInputButton accessibilityLabel="Voice mode">
                <Text>voice</Text>
              </PromptInputButton>
            }
          />
        </PromptInputToolbar>
      </PromptInput>
    );
    expect(getByLabelText("Voice mode")).toBeTruthy();
    expect(queryByLabelText("Send message")).toBeNull();
    fireEvent.changeText(getByPlaceholderText("Message..."), "typed");
    expect(getByLabelText("Send message")).toBeTruthy();
    expect(queryByLabelText("Voice mode")).toBeNull();
  });

  it("works controlled without clearing the consumer's value", () => {
    const onSend = jest.fn();
    const { getByLabelText, getByPlaceholderText } = render(
      <Composer value="controlled text" onSend={onSend} />
    );
    fireEvent.press(getByLabelText("Send message"));
    expect(onSend).toHaveBeenCalledWith("controlled text");
    expect(getByPlaceholderText("Message...").props.value).toBe("controlled text");
  });
});
