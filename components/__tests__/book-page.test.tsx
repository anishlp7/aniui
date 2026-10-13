import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import {
  BookPage,
  BOOK_PAGE_DARK_PALETTE,
  BOOK_PAGE_PAPER_PALETTE,
} from "../ui/book-page";

describe("BookPage", () => {
  it("renders without crashing with just children", () => {
    const { getByText } = render(
      <BookPage>
        <Text>Chapter 1</Text>
      </BookPage>
    );
    expect(getByText("Chapter 1")).toBeTruthy();
  });

  it("renders without crashing with the paper palette", () => {
    const { toJSON } = render(
      <BookPage palette={BOOK_PAGE_PAPER_PALETTE}>
        <Text>x</Text>
      </BookPage>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing with the dark palette", () => {
    const { toJSON } = render(
      <BookPage palette={BOOK_PAGE_DARK_PALETTE}>
        <Text>x</Text>
      </BookPage>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("accepts an openAngle prop without crashing", () => {
    const { toJSON } = render(
      <BookPage openAngle={45}>
        <Text>x</Text>
      </BookPage>
    );
    expect(toJSON()).toBeTruthy();
  });
});
