import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { FilePicker } from "../ui/file-picker";

describe("FilePicker", () => {
  it("renders the empty state with the default label", () => {
    const { getByText } = render(<FilePicker onPress={() => {}} />);
    expect(getByText("Tap to select a file")).toBeTruthy();
  });

  it("fires onPress on the empty-state Pressable", () => {
    const onPress = jest.fn();
    const { getByLabelText } = render(
      <FilePicker onPress={onPress} label="Pick a file" />
    );
    fireEvent.press(getByLabelText("Pick a file"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("renders file info in the selected state", () => {
    const { getByText } = render(
      <FilePicker
        onPress={() => {}}
        file={{ name: "resume.pdf", size: 2048 }}
      />
    );
    expect(getByText("resume.pdf")).toBeTruthy();
    expect(getByText(/KB/)).toBeTruthy();
  });

  it("fires onRemove when the remove button is pressed", () => {
    const onRemove = jest.fn();
    const { getByLabelText } = render(
      <FilePicker
        onPress={() => {}}
        onRemove={onRemove}
        file={{ name: "x.png" }}
      />
    );
    fireEvent.press(getByLabelText("Remove file"));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("hides remove button when onRemove is not provided", () => {
    const { queryByLabelText } = render(
      <FilePicker onPress={() => {}} file={{ name: "x.png" }} />
    );
    expect(queryByLabelText("Remove file")).toBeNull();
  });
});
