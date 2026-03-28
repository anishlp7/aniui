import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { Accordion, AccordionItem } from "../ui/accordion";

describe("Accordion", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(
      <Accordion>
        <AccordionItem value="a" trigger="Section A">
          <Text>Content A</Text>
        </AccordionItem>
      </Accordion>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("shows trigger text", () => {
    const { getByText } = render(
      <Accordion>
        <AccordionItem value="a" trigger="Section A">
          <Text>Content A</Text>
        </AccordionItem>
      </Accordion>
    );
    expect(getByText("Section A")).toBeTruthy();
  });

  it("does not show content when collapsed", () => {
    const { queryByText } = render(
      <Accordion>
        <AccordionItem value="a" trigger="Section A">
          <Text>Content A</Text>
        </AccordionItem>
      </Accordion>
    );
    expect(queryByText("Content A")).toBeNull();
  });

  it("shows content after pressing trigger", () => {
    const { getByText, getByRole } = render(
      <Accordion>
        <AccordionItem value="a" trigger="Section A">
          <Text>Content A</Text>
        </AccordionItem>
      </Accordion>
    );
    fireEvent.press(getByRole("button"));
    expect(getByText("Content A")).toBeTruthy();
  });

  it("expands defaultValue on mount", () => {
    const { getByText } = render(
      <Accordion defaultValue="a">
        <AccordionItem value="a" trigger="Section A">
          <Text>Content A</Text>
        </AccordionItem>
      </Accordion>
    );
    expect(getByText("Content A")).toBeTruthy();
  });
});
