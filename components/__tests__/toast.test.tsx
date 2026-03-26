import React from "react";
import { Text, Pressable } from "react-native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ToastProvider, useToast } from "../ui/toast";

function ToastTrigger() {
  const { toast } = useToast();
  return (
    <Pressable testID="trigger" onPress={() => toast({ title: "Hello", description: "World" })}>
      <Text>Show Toast</Text>
    </Pressable>
  );
}

describe("Toast", () => {
  it("renders ToastProvider without crashing", () => {
    const { toJSON } = render(
      <ToastProvider>
        <Text>App</Text>
      </ToastProvider>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders children inside ToastProvider", () => {
    const { getByText } = render(
      <ToastProvider>
        <Text>App Content</Text>
      </ToastProvider>
    );
    expect(getByText("App Content")).toBeTruthy();
  });

  it("shows toast when triggered via useToast", async () => {
    const { getByTestId, getByText } = render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>
    );
    fireEvent.press(getByTestId("trigger"));
    await waitFor(() => {
      expect(getByText("Hello")).toBeTruthy();
      expect(getByText("World")).toBeTruthy();
    });
  });

  it("toast item has alert accessibilityRole", async () => {
    const { getByTestId, getByRole } = render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>
    );
    fireEvent.press(getByTestId("trigger"));
    await waitFor(() => {
      expect(getByRole("alert")).toBeTruthy();
    });
  });
});
