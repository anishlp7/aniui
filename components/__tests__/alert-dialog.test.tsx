import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "../ui/alert-dialog";

describe("AlertDialog", () => {
  it("renders without crashing when open", () => {
    const { toJSON } = render(
      <AlertDialog open={true} onOpenChange={() => {}}>
        <AlertDialogContent>
          <Text>Body</Text>
        </AlertDialogContent>
      </AlertDialog>
    );
    expect(toJSON()).toBeTruthy();
  });

  it("renders without crashing when closed (primitive manages visibility)", () => {
    const { toJSON } = render(
      <AlertDialog open={false} onOpenChange={() => {}}>
        <AlertDialogContent>
          <Text>Hidden</Text>
        </AlertDialogContent>
      </AlertDialog>
    );
    // With the passthrough mock, content is always in the tree;
    // real primitive controls visibility via open state.
    expect(toJSON()).toBeFalsy();
  });

  it("renders all sub-components", () => {
    const { getByText } = render(
      <AlertDialog open={true} onOpenChange={() => {}}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
    expect(getByText("Are you sure?")).toBeTruthy();
    expect(getByText("This cannot be undone.")).toBeTruthy();
    expect(getByText("Cancel")).toBeTruthy();
    expect(getByText("Confirm")).toBeTruthy();
  });

  it("Action and Cancel have button accessibilityRole", () => {
    const { getAllByRole } = render(
      <AlertDialog open={true} onOpenChange={() => {}}>
        <AlertDialogContent>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
    const buttons = getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("fires onPress on Action button", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <AlertDialog open={true} onOpenChange={() => {}}>
        <AlertDialogContent>
          <AlertDialogAction onPress={onPress}>OK</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    );
    fireEvent.press(getByText("OK"));
    expect(onPress).toHaveBeenCalled();
  });
});
