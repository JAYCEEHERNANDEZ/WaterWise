import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { generateYearlyPrediction } from "../services/purokyearlyPrediction.service.js";
import { getPurokPredictionData } from "../models/purokPrediction.model.js";

vi.mock(
  "../models/purokPrediction.model.js",
  () => ({
    getPurokPredictionData: vi.fn(),
  })
);

describe(
  "generateYearlyPrediction",
  () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it(
      "It should generate yearly prediction for every purok.",
      () => {
        // Arrange
        getPurokPredictionData.mockReturnValue([
          {
            year: 2024,
            purok: "Purok 1",
            january: 40,
            february: 40,
            march: 40,
            april: 40,
            may: 40,
          },
          {
            year: 2025,
            purok: "Purok 1",
            january: 50,
            february: 50,
            march: 50,
            april: 50,
            may: 50,
          },
          {
            year: 2024,
            purok: "Purok 2",
            january: 60,
            february: 60,
            march: 60,
            april: 60,
            may: 60,
          },
          {
            year: 2025,
            purok: "Purok 2",
            january: 70,
            february: 70,
            march: 70,
            april: 70,
            may: 70,
          },
        ]);

        // Act
        const result =
          generateYearlyPrediction();

        // Assert
        expect(result).toEqual([
          {
            purok: "Purok 1",
            historical: [
              {
                year: 2024,
                consumption: 200,
              },
              {
                year: 2025,
                consumption: 250,
              },
            ],
            predicted: 300,
          },
          {
            purok: "Purok 2",
            historical: [
              {
                year: 2024,
                consumption: 300,
              },
              {
                year: 2025,
                consumption: 350,
              },
            ],
            predicted: 400,
          },
        ]);
      }
    );

    it(
      "It should return the same value when only one historical year exists.",
      () => {
        // Arrange
        getPurokPredictionData.mockReturnValue([
          {
            year: 2025,
            purok: "Purok 1",
            january: 50,
            february: 50,
            march: 50,
            april: 50,
            may: 50,
          },
        ]);

        // Act
        const result =
          generateYearlyPrediction();

        // Assert
        expect(result[0].predicted).toBe(250);
      }
    );

    it(
      "It should return zero when a yearly record has no consumption fields.",
      () => {
        // Arrange
        getPurokPredictionData.mockReturnValue([
          {
            year: 2025,
            purok: "Purok 1",
          },
        ]);

        // Act
        const result =
          generateYearlyPrediction();

        // Assert
        expect(result[0].predicted).toBe(0);
      }
    );
  }
);