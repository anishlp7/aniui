import React from "react";
import { render } from "@testing-library/react-native";
import { ChatBubble } from "../ui/chat-bubble";

describe("ChatBubble", () => {
  it("renders the message text", () => {
    const { getByText } = render(<ChatBubble>Hi there</ChatBubble>);
    expect(getByText("Hi there")).toBeTruthy();
  });

  it("renders the timestamp", () => {
    const { getByText } = render(
      <ChatBubble variant="sent" timestamp="12:34" status="sent">
        Hello
      </ChatBubble>
    );
    expect(getByText("12:34")).toBeTruthy();
  });

  it("accepts sent and received variants without crashing", () => {
    for (const variant of ["sent", "received"] as const) {
      const { toJSON } = render(<ChatBubble variant={variant}>msg</ChatBubble>);
      expect(toJSON()).toBeTruthy();
    }
  });

  it("accepts each status without crashing", () => {
    for (const status of ["sent", "delivered", "read"] as const) {
      const { toJSON } = render(
        <ChatBubble variant="sent" status={status}>msg</ChatBubble>
      );
      expect(toJSON()).toBeTruthy();
    }
  });
});
