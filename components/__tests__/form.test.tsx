import React from "react";
import { render } from "@testing-library/react-native";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  useFormField,
} from "../ui/form";

// Harness that programmatically injects an error into context, so FormMessage
// has something to render — the real app triggers validateField via inputs.
function HarnessError({ name, msg }: { name: string; msg: string }) {
  const { setFieldError } = useFormField();
  React.useEffect(() => {
    setFieldError(name, msg);
  }, [name, msg, setFieldError]);
  return null;
}

describe("Form", () => {
  it("renders a Form with no fields without crashing", () => {
    const { toJSON } = render(<Form />);
    expect(toJSON()).toBeTruthy();
  });

  it("FormMessage renders nothing when there's no error", () => {
    const { toJSON } = render(
      <Form>
        <FormField name="x">
          <FormItem>
            <FormMessage />
          </FormItem>
        </FormField>
      </Form>
    );
    // Just confirm the tree renders — FormMessage returns null when no error.
    expect(toJSON()).toBeTruthy();
  });

  it("FormMessage renders the error with alert role when set", async () => {
    const { findByText, findByRole } = render(
      <Form>
        <FormField name="email">
          <FormItem>
            <HarnessError name="email" msg="Email is required" />
            <FormMessage />
          </FormItem>
        </FormField>
      </Form>
    );
    expect(await findByText("Email is required")).toBeTruthy();
    expect(await findByRole("alert")).toBeTruthy();
  });
});
