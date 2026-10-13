import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SocialButton } from "../ui/social-button";

describe("SocialButton", () => {
  it("renders a default 'Continue with X' label for each provider", () => {
    const labels: Record<string, string> = {
      google: "Continue with Google",
      apple: "Continue with Apple",
      github: "Continue with GitHub",
      twitter: "Continue with X",
    };
    for (const [provider, label] of Object.entries(labels)) {
      const { getByText } = render(
        <SocialButton provider={provider as "google" | "apple" | "github" | "twitter"} />
      );
      expect(getByText(label)).toBeTruthy();
    }
  });

  it("respects a custom label", () => {
    const { getByText } = render(
      <SocialButton provider="google" label="Sign in with Google" />
    );
    expect(getByText("Sign in with Google")).toBeTruthy();
  });

  it("fires onPress on tap", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <SocialButton provider="google" onPress={onPress} />
    );
    fireEvent.press(getByText("Continue with Google"));
    expect(onPress).toHaveBeenCalled();
  });

  it("accepts each variant without crashing", () => {
    for (const variant of ["outline", "filled", "ghost"] as const) {
      const { toJSON } = render(
        <SocialButton provider="github" variant={variant} />
      );
      expect(toJSON()).toBeTruthy();
    }
  });
});
