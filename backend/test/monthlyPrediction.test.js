import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../models/monthlyPrediction.model.js", () => ({
  getMonthlyPrediction: vi.fn(),
}));

import * as monthlyPredictionModel from "../models/monthlyPrediction.model.js";
import { generateMonthlyPrediction } from "../services/monthlyPrediction.service.js";

describe("Monthly Prediction Service", () => {

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should generate the monthly prediction", () => {

    // Arrange
    const monthlyPrediction = [
      {
        month: "2025-01",
        consumption: 40,
        predicted: false,
      },
      {
        month: "2025-05",
        consumption: 150,
        predicted: true,
      },
    ];

    monthlyPredictionModel.getMonthlyPrediction.mockReturnValue(
      monthlyPrediction
    );

    // Act
    const result = generateMonthlyPrediction();

    // Assert
    expect(
      monthlyPredictionModel.getMonthlyPrediction
    ).toHaveBeenCalledOnce();

    expect(result).toEqual(monthlyPrediction);

  });

  it("should return an empty array when there is no monthly prediction data", () => {

  // Arrange
  monthlyPredictionModel.getMonthlyPrediction.mockReturnValue([]);

  // Act
  const result = generateMonthlyPrediction();

  // Assert
  expect(
    monthlyPredictionModel.getMonthlyPrediction
  ).toHaveBeenCalledOnce();

  expect(result).toEqual([]);

});

it("should return monthly records even when no predicted month exists", () => {

  // Arrange
  const monthlyPrediction = [
    {
      month: "2025-01",
      consumption: 40,
      predicted: false,
    },
    {
      month: "2025-02",
      consumption: 45,
      predicted: false,
    },
  ];

  monthlyPredictionModel.getMonthlyPrediction.mockReturnValue(
    monthlyPrediction
  );

  // Act
  const result = generateMonthlyPrediction();

  // Assert
  expect(
    monthlyPredictionModel.getMonthlyPrediction
  ).toHaveBeenCalledOnce();

  expect(result).toEqual(monthlyPrediction);
  expect(result.some((item) => item.predicted)).toBe(false);

});

});