import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../models/yearlyPrediction.model.js", () => ({
  getYearlyPrediction: vi.fn(),
}));

import * as yearlyPredictionModel from "../../models/yearlyPrediction.model.js";
import { generateYearlyPrediction } from "../../services/yearlyPrediction.service.js";

describe("Yearly Prediction Service", () => {

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should generate the yearly prediction", () => {

    // Arrange
    const yearlyPrediction = [
      {
        year: 2025,
        consumption: 143,
        predicted: false,
      },
      {
        year: 2026,
        consumption: 1800,
        predicted: true,
      },
    ];

    yearlyPredictionModel.getYearlyPrediction.mockReturnValue(
      yearlyPrediction
    );

    // Act
    const result = generateYearlyPrediction();

    // Assert
    expect(
      yearlyPredictionModel.getYearlyPrediction
    ).toHaveBeenCalledOnce();

    expect(result).toEqual(yearlyPrediction);

  });

  it("should return an empty array when there is no yearly prediction data", () => {

  // Arrange
  yearlyPredictionModel.getYearlyPrediction.mockReturnValue([]);

  // Act
  const result = generateYearlyPrediction();

  // Assert
  expect(
    yearlyPredictionModel.getYearlyPrediction
  ).toHaveBeenCalledOnce();

  expect(result).toEqual([]);

});

it("should return yearly records even when no predicted year exists", () => {

  // Arrange
  const yearlyPrediction = [
    {
      year: 2025,
      consumption: 143,
      predicted: false,
    },
  ];

  yearlyPredictionModel.getYearlyPrediction.mockReturnValue(
    yearlyPrediction
  );

  // Act
  const result = generateYearlyPrediction();

  // Assert
  expect(
    yearlyPredictionModel.getYearlyPrediction
  ).toHaveBeenCalledOnce();

  expect(result).toEqual(yearlyPrediction);
  expect(result.some((item) => item.predicted)).toBe(false);

});

});