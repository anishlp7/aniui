import React from "react";
import { render } from "@testing-library/react-native";
import { Field, FieldLabel, FieldDescription, FieldError } from "../ui/field";

describe("Field", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <Field>
        <FieldLabel>Name</FieldLabel>
      </Field>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders FieldLabel text", () => {
    const { getByText } = render(
      <Field>
        <FieldLabel>Email</FieldLabel>
      </Field>
    );
    expect(getByText("Email")).toBeTruthy();
  });

  it("renders FieldDescription text", () => {
    const { getByText } = render(
      <Field>
        <FieldLabel>Name</FieldLabel>
        <FieldDescription>Enter your full name</FieldDescription>
      </Field>
    );
    expect(getByText("Enter your full name")).toBeTruthy();
  });

  it("renders FieldError with errors array", () => {
    const { getByText } = render(
      <Field>
        <FieldLabel>Email</FieldLabel>
        <FieldError errors={["Required", "Must be valid"]} />
      </Field>
    );
    expect(getByText("Required")).toBeTruthy();
    expect(getByText("Must be valid")).toBeTruthy();
  });

  it("FieldError returns null when no errors", () => {
    const { toJSON } = render(<FieldError />);
    expect(toJSON()).toBeNull();
  });
});
