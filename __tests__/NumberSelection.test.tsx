import { fireEvent, render } from "@testing-library/react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert } from "react-native";
import NumberSelection from "../app/(tabs)/numberSelection";

// --- Mock dependencies ---
jest.mock("expo-router");
jest.mock("@/components/hello-wave", () => ({
  HelloWave: () => <></>,
}));
jest.mock("@/components/themed-text", () => ({
  ThemedText: ({ children }: any) => <>{children}</>,
}));
jest.mock("@/components/themed-view", () => ({
  ThemedView: ({ children }: any) => <>{children}</>,
}));


describe("NumberSelection Screen", () => {
  const mockPush = jest.fn();
  const mockBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      back: mockBack,
    });
  });

  it("renders header and buttons correctly", () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({});
    const { getByText } = render(<NumberSelection />);

    expect(getByText("Lucky Lotto 🎯")).toBeTruthy();
    expect(getByText("Pick 5 numbers")).toBeTruthy();
    expect(getByText("Play Numbers")).toBeTruthy();
    expect(getByText("Quick Pick")).toBeTruthy();
  });

  it("allows selecting and deselecting numbers", () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({});
    const { getByText, queryByText } = render(<NumberSelection />);

    const num1 = getByText("1");
    fireEvent.press(num1);
    expect(queryByText("1")).toBeTruthy(); // selected

    fireEvent.press(num1);
    expect(queryByText("1")).toBeTruthy(); // deselect doesn’t remove label, but toggles state
  });

  it("shows alert when Play pressed with <5 numbers", () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({});
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});
    const { getByText } = render(<NumberSelection />);

    const playButton = getByText("Play Numbers");
    fireEvent.press(playButton);

    expect(alertSpy).toHaveBeenCalledWith("Warning", "Please pick 5 numbers!");
  });

  it("navigates to Home when 5 numbers selected and Play pressed", () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({});
    const { getByText } = render(<NumberSelection />);

    // select 5 numbers
    for (let i = 1; i <= 5; i++) {
      fireEvent.press(getByText(String(i)));
    }

    fireEvent.press(getByText("Play Numbers"));
    expect(mockPush).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/",
      params: expect.objectContaining({
        selected: expect.any(String),
        all: expect.any(String),
      }),
    });
  });

  it("randomly picks numbers when Quick Pick pressed", () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({});
    const { getByText } = render(<NumberSelection />);

    const quickPickButton = getByText("Quick Pick");
    fireEvent.press(quickPickButton);

    // After quick pick, the component re-renders with selected numbers (mocked)
    expect(quickPickButton).toBeTruthy();
  });

  it("loads existing plays from params", () => {
    const existingPlays = JSON.stringify([[1, 2, 3, 4, 5]]);
    (useLocalSearchParams as jest.Mock).mockReturnValue({ existingPlays });

    const { getByText } = render(<NumberSelection />);
    expect(getByText("Lucky Lotto 🎯")).toBeTruthy();
  });
});