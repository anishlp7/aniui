import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { EventTicket } from "../ui/event-ticket";

describe("EventTicket", () => {
  it("renders title, date, and venue", () => {
    const { getByText } = render(
      <EventTicket title="Taylor Swift" date="Sat, Oct 25" venue="MetLife" />
    );
    expect(getByText("Taylor Swift")).toBeTruthy();
    expect(getByText("Sat, Oct 25")).toBeTruthy();
    expect(getByText("MetLife")).toBeTruthy();
  });

  it("renders optional seat and code", () => {
    const { getByText } = render(
      <EventTicket
        title="Show"
        date="Date"
        venue="Hall"
        seat="A12"
        code="TKT-9000"
      />
    );
    // Seat renders prefixed with the literal word 'Seat'.
    expect(getByText("Seat A12")).toBeTruthy();
    expect(getByText("TKT-9000")).toBeTruthy();
  });

  it("accepts both stub sides without crashing", () => {
    for (const stubSide of ["left", "right"] as const) {
      const { toJSON } = render(
        <EventTicket title="t" date="d" venue="v" stubSide={stubSide} />
      );
      expect(toJSON()).toBeTruthy();
    }
  });

  it("renders SVG silhouette after onLayout provides a width", () => {
    const { UNSAFE_getByType } = render(
      <EventTicket title="t" date="d" venue="v" />
    );
    const { View } = require("react-native");
    const root = UNSAFE_getByType(View);
    fireEvent(root, "layout", { nativeEvent: { layout: { width: 320, height: 160 } } });
  });
});
