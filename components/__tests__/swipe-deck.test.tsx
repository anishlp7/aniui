import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import { SwipeDeck } from "../ui/swipe-deck";

const data = ["Card A", "Card B", "Card C"];
const renderCard = (item: string) => <Text>{item}</Text>;

describe("SwipeDeck", () => {
  it("renders without crashing", () => {
    const { toJSON } = render(<SwipeDeck data={data} renderCard={renderCard} />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders the top card and the next card", () => {
    const { getByText, queryByText } = render(<SwipeDeck data={data} renderCard={renderCard} />);
    expect(getByText("Card A")).toBeTruthy();
    expect(getByText("Card B")).toBeTruthy();
    expect(queryByText("Card C")).toBeNull();
  });

  it("labels the top card for accessibility", () => {
    const { getByLabelText } = render(<SwipeDeck data={data} renderCard={renderCard} />);
    expect(getByLabelText("Card 1 of 3")).toBeTruthy();
  });

  it("renders nothing when data is empty", () => {
    const { queryByText } = render(<SwipeDeck data={[]} renderCard={renderCard} />);
    expect(queryByText(/Card/)).toBeNull();
  });

  it("measures its width via onLayout without clobbering a consumer handler", () => {
    const onLayout = jest.fn();
    const { getByLabelText } = render(
      <SwipeDeck data={data} renderCard={renderCard} onLayout={onLayout} />
    );
    fireEvent(getByLabelText("Card 1 of 3").parent ?? getByLabelText("Card 1 of 3"), "layout", {
      nativeEvent: { layout: { width: 320, height: 400 } },
    });
    expect(onLayout).not.toHaveBeenCalledTimes(0);
  });
});
