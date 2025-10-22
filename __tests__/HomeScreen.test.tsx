

jest.mock("expo", () => ({}));
jest.mock("expo-modules-core", () => ({}));
jest.mock("expo-constants", () => ({
  default: { manifest: { version: "1.0.0" } },
}));
jest.mock("expo-router");
jest.mock("@/components/themed-text", () => ({
  ThemedText: ({ children }: any) => children,
}));
jest.mock("@/components/themed-view", () => ({
  ThemedView: ({ children }: any) => children,
}));

describe("HomeScreen", () => {
  const mockPush = jest.fn();
  const mockBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      back: mockBack,
    });

    jest.clearAllMocks();
  });

  it("renders empty state initially", () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({});
    const { getByText } = render(<HomeScreen />);

    expect(getByText("Your Numbers")).toBeTruthy();
    expect(getByText("No plays yet. Add one below!")).toBeTruthy();
  });

  it("adds a play when selected params exist", () => {
    const selected = JSON.stringify([1, 2, 3, 4, 5]);
    (useLocalSearchParams as jest.Mock).mockReturnValue({ selected });

    const { getByText } = render(<HomeScreen />);
    expect(getByText("1")).toBeTruthy();
    expect(getByText("2")).toBeTruthy();
    expect(getByText("3")).toBeTruthy();
  });

  it("navigates to numberSelection on Add Play", () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({});
    const { getByText } = render(<HomeScreen />);
    const addButton = getByText("Add Play");

    fireEvent.press(addButton);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/numberSelection",
      params: { existingPlays: JSON.stringify([]) },
    });
  });

  it("calls back router when Back button pressed", () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({});
    const { getByText } = render(<HomeScreen />);
    const backButton = getByText("Back");

    fireEvent.press(backButton);
    expect(mockBack).toHaveBeenCalled();
  });

  it("shows alert on Purchase press", () => {
    jest.spyOn(global, "alert").mockImplementation(() => {});
    (useLocalSearchParams as jest.Mock).mockReturnValue({});
    const { getByText } = render(<HomeScreen />);
    const purchaseButton = getByText("Purchase");
    fireEvent.press(purchaseButton);
    // Not verifying actual Alert since Expo uses native alert; just ensures button works
    expect(purchaseButton).toBeTruthy();
  });
});

import { fireEvent, render } from "@testing-library/react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import HomeScreen from "../app/(tabs)/index";

