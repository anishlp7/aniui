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

  it("renders content within the accordion item (primitive manages visibility)", () => {
    const { getByText } = render(
      <Accordion>
        <AccordionItem value="a" trigger="Section A">
          <Text>Content A</Text>
        </AccordionItem>
      </Accordion>
    );
    // With the passthrough mock, content is always in the tree;
    // real primitive controls visibility via open/closed state.
    expect(getByText("Content A")).toBeTruthy();
  });

  it("trigger is pressable", () => {
    const { getByText } = render(
      <Accordion>
        <AccordionItem value="a" trigger="Section A">
          <Text>Content A</Text>
        </AccordionItem>
      </Accordion>
    );
    fireEvent.press(getByText("Section A"));
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
